const chokidar = require( 'chokidar' );
const { buildJs } = require( './build-script' );

chokidar.watch( [ './src/js/**/*.ts', '!*.test.ts' ] ).on( 'change', async () => {
  console.log( 'Building...' );
  await buildJs();
  console.log( 'Finished' );
} );
