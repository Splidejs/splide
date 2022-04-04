const rollup  = require( 'rollup' ).rollup;
const esbuild = require( 'rollup-plugin-esbuild' ).default;
const name    = 'splide-utils';


function buildModule( type ) {
  return rollup( {
    input: './src/js/utils/index.ts',
    plugins: [
      esbuild(),
    ],
  } ).then( bundle => {
    return bundle.write( {
      file     : `./dist/js/utils/${ name }.${ type }.js`,
      format   : type,
      sourcemap: false,
      exports  : 'named',
    } );
  } );
}

Promise.all( [ buildModule( 'cjs' ), buildModule( 'esm' ) ] ).catch( e => console.error( e ) );