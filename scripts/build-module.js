import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { BANNER } from './constants/banner.js';


const name = 'splide';

function buildModule( type ) {
  return rollup( {
    input: './src/js/index.ts',
    plugins: [
      esbuild(),
    ],
  } ).then( bundle => {
    return bundle.write( {
      banner   : BANNER,
      file     : `./dist/js/${ name }.${ type }.js`,
      format   : type,
      sourcemap: false,
      exports  : 'named',
    } );
  } );
}

Promise.all( [ buildModule( 'cjs' ), buildModule( 'esm' ) ] ).catch( e => console.error( e ) );