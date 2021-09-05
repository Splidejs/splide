const { parallel, src, dest } = require( 'gulp' );
const rollup           = require( 'rollup' ).rollup;
const typescript       = require( 'rollup-plugin-typescript2' );
const rename           = require( 'ts-transformer-properties-rename' ).default;
const uglify           = require( 'rollup-plugin-uglify' ).uglify;
const babel            = require( '@rollup/plugin-babel' );
const resolve          = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const gzip             = require( 'gulp-gzip' );
const path             = require( 'path' );
const banner           = require( './constants/banner' );
const { promises: fs } = require( 'fs' );


function buildScript( type, minify ) {
	const file  = buildFilename( type, minify );
	const input = `./src/js/build/${ type }/${ type }.ts`;

	const plugins = [
		resolve(),
		typescript( {
      transformers: [
        service => ( {
          before: [
            rename( service.getProgram(), { internalPrefix: '' } ),
          ],
          after : [],
        } ),
      ],
    } ),
		babel.getBabelOutputPlugin( {
			configFile: path.resolve( __dirname, '../.babelrc' ),
			allowAllFormats: true,
		} ),
	];

	if ( minify ) {
		plugins.push(
			uglify( {
				output: {
					comments: /^!/,
				},
				mangle: {
					properties: {
						regex: /^_(private)_/,
					},
				},
			} ),
		);
	}

	return rollup( { input, plugins } )
		.then( bundle => {
			return bundle.write( {
				banner,
				file,
				format   : 'umd',
				name     : 'Splide',
				sourcemap: ! minify,
			} );
		} ).then( () => {
			if ( minify ) {
				return src( file )
					.pipe( gzip() )
					.pipe( dest( './dist/js/' ) );
			}
		} );
}

function buildFilename( type, minify ) {
	if ( type === 'default' ) {
		return `./dist/js/splide${ minify ? '.min' : '' }.js`;
	}

	return `./dist/js/splide-${ type }${ minify ? '.min' : '' }.js`;
}

function buildModule( format, declaration ) {
  const declarationDir = './dist/types';

  const options = declaration ? {
    check: false,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declarationDir,
        declaration   : true,
        declarationMap: true,
      },
    },
  } : {};

  return ( declaration ? fs.rmdir( declarationDir, { recursive: true } ) : Promise.resolve() ).then( () => {
    return rollup( {
      input  : './src/js/index.ts',
      plugins: [
        resolve(),
        typescript( options ),
        babel.getBabelOutputPlugin( {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                loose  : true,
              }
            ]
          ],
          allowAllFormats: true,
        } ),
      ]
    } ).then( bundle => {
      return bundle.write( {
        banner,
        file  : `./dist/js/splide.${ format }.js`,
        format,
        exports: 'named',
      } );
    } );
  } )
}

exports.buildDevCode = function buildDevCode() {
  return buildScript( 'default' );
}

exports.buildScript = parallel(
	function jsDefault() { return buildScript( 'default' ) },
	function jsMinified() { return buildScript( 'default', true ) },
);

exports.buildModule = parallel(
	function moduleCjs() { return buildModule( 'cjs' ) },
	function moduleEsm() { return buildModule( 'esm', true ) },
);
