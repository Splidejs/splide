const chokidar = require( 'chokidar' );
const { buildJs, buildRenderer } = require( './build-script' );
const { buildCss } = require( './build-css' );

chokidar.watch( [ './src/js/**/*.ts', '!*.test.ts', '!./src/js/renderer/**/*.ts' ] ).on( 'change', async () => {
  console.log( 'Building Script...' );
  await buildJs()
  console.log( 'Finished' );
} );

chokidar.watch( [ './src/js/renderer/**/*.ts', '!*.test.ts' ] ).on( 'change', async () => {
  console.log( 'Building Renderer Script...' );
  await buildRenderer()
  console.log( 'Finished' );
} );

chokidar.watch( [ './src/css/**/*.scss' ] ).on( 'change', async () => {
  console.log( 'Building CSS...' );
  await buildCss()
  console.log( 'Finished' );
} );

