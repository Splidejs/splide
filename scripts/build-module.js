const rollup  = require( 'rollup' ).rollup;
const esbuild = require( 'rollup-plugin-esbuild' ).default;
const banner  = require( './constants/banner' );
const name    = 'splide';


function buildModule( type ) {
  return rollup( {
    input: './src/js/index.ts',
    plugins: [
      esbuild(),
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
