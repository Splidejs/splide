const watch = require( 'glob-watcher' );
const { buildJs } = require( './build-script' );

watch( [ './src/js/**/*.ts', '!*.test.ts' ], async () => {
  console.log( 'Building...' );
  await buildJs();
  console.log( 'Finished' );
} );
