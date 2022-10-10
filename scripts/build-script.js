import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { minify } from './plugins/minify.js';
import { BANNER } from './constants/banner.js';
import fs from 'fs/promises';
import * as zlib from 'zlib';


const name = 'splide';

async function buildScript( compress, type = 'default' ) {
  const file = `./dist/js/${ name }${ type !== 'default' ? `-${ type }` : '' }${ compress ? '.min' : '' }.js`;

  const bundle = await rollup( {
    input: `./src/js/build/${ type }.ts`,
    plugins: [
      esbuild( { minify: false } ),
      compress ? minify() : false,
    ],
  } );

  await bundle.write( {
    file,
    banner   : BANNER,
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

export const buildJs       = () => buildScript();
export const buildMin      = () => buildScript( true );
export const buildRenderer = () => buildScript( 'renderer' );