const fs = require( 'fs' ).promises;


async function clean() {
  await fs.rm( './dist/types', { recursive: true, force: true } );
}

clean().catch( e => console.error( e ) );
