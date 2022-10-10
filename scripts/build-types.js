import dts from 'rollup-plugin-dts';
import { rollup } from 'rollup';
import fs from 'fs/promises';
import path from 'path';
import * as util from 'util';
import { exec as _exec } from 'child_process';


const exec = util.promisify( _exec );
const dir  = './dist/types';


async function clean() {
  const files = await fs.readdir( dir );

  await Promise.all( files.map( file => {
    if ( file !== 'index.d.ts' ) {
      return fs.rm( path.join( dir, file ), { recursive: true, force: true } );
    }
  } ) );
}

async function emit() {
  await exec( 'tsc --emitDeclarationOnly' );
}

async function bundle() {
  const file = path.join( dir, 'index.d.ts' );

  const bundle = await rollup( {
    input  : file,
    plugins: [ dts( { respectExternal: true } ) ],
  } );

  await bundle.write( { file } );
}

async function build() {
  await clean();
  await emit();
  await bundle();
  await clean();
}

build().catch( e => console.error( e ) );
