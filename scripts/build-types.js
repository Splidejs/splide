const { default: dts } = require( 'rollup-plugin-dts' );
const { rollup }       = require( 'rollup' );
const { promises: fs } = require( 'fs' );
const path             = require( 'path' );
const util             = require( 'util' );
const exec             = util.promisify( require( 'child_process' ).exec );
const dir              = './dist/types';


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
