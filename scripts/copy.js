const fs = require( 'fs' ).promises;


async function copy() {
  const module = await fs.readFile( './src/js/types/module.d.ts', 'utf-8' );
  await fs.appendFile( './dist/types/index.d.ts', '\n' + module );
}

copy().catch( e => console.error( e ) );
