const rollup  = require( 'rollup' ).rollup;
const esbuild = require( 'rollup-plugin-esbuild' ).default;
const babel   = require( '@rollup/plugin-babel' );
const resolve = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const path    = require( 'path' );
const minify  = require( './plugins/minify' ).minify;
const banner  = require( './constants/banner' );
const fs      = require( 'fs' ).promises;
const zlib    = require( 'zlib' );
const name    = 'splide';


async function buildScript( compress, type = 'default' ) {
  const file = `./dist/js/${ name }${ type !== 'default' ? `-${ type }` : '' }${ compress ? '.min' : '' }.js`;

  const bundle = await rollup( {
    input: `./src/js/build/${ type }.ts`,
    plugins: [
      resolve(),
      esbuild( { minify: false } ),
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '../.babelrc' ),
        allowAllFormats: true,
      } ),
      compress ? minify() : false,
    ],
  } );

  await bundle.write( {
    banner,
    file,
    format   : 'umd',
    name     : type === 'default' ? 'Splide' : 'SplideRenderer',
    sourcemap: compress,
  } );

  if ( compress && type === 'default' ) {
    await fs.readFile( file ).then( content => {
      return new Promise( ( resolve, reject ) => {
        zlib.gzip( content, ( err, binary ) => {
          if ( err ) {
            return reject( err );
          }

          fs.writeFile( `${ file }.gz`, binary ).then( resolve, reject );
        } );
      } );
    } );
  }
}

Promise.all( [
  buildScript(),
  buildScript( true ),
  buildScript( true, 'renderer' ),
] ).catch( console.error );

exports.buildJs       = () => buildScript();
exports.buildMin      = () => buildScript( true );
exports.buildRenderer = () => buildScript( true, 'renderer' );
