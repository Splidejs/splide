const rollup  = require( 'rollup' ).rollup;
const resolve = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const esbuild = require( 'rollup-plugin-esbuild' ).default;
const banner  = require( './constants/banner' );
const babel   = require( '@rollup/plugin-babel' );
const path    = require( 'path' );
const name    = 'splide';


function buildModule( type ) {
  return rollup( {
    input: './src/js/index.ts',
    plugins: [
      resolve(),
      esbuild(),
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '../.babelrc' ),
        allowAllFormats: true,
      } ),
    ],
  } ).then( bundle => {
    return bundle.write( {
      banner,
      file     : `./dist/js/${ name }.${ type }.js`,
      format   : type,
      sourcemap: false,
      exports  : 'named',
    } );
  } );
}

Promise.all( [ buildModule( 'cjs' ), buildModule( 'esm' ) ] ).catch( e => console.error( e ) );

exports.buildCjs = () => buildModule( 'cjs' );
exports.buildEsm = () => buildModule( 'esm' );
