const chokidar = require( 'chokidar' );
const { buildJs } = require( './build-script' );
const { buildCss } = require( './build-css' );

chokidar.watch( [ './src/js/**/*.ts', '!*.test.ts' ] ).on( 'change', async () => {
  console.log( 'Building Script...' );
  await buildJs()
  console.log( 'Finished' );
} );

chokidar.watch( [ './src/css/**/*.scss' ] ).on( 'change', async () => {
  console.log( 'Building CSS...' );
  await buildCss()
  console.log( 'Finished' );
} );

