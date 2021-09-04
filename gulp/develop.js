const { watch } = require( 'gulp' );
const { buildDevCode } = require( './build-script' );
const { buildCss } = require( './build-css' );

function develop() {
  watch( [ 'src/js/**/*.ts', '!src/js/**/*.test.ts' ], buildDevCode );
  watch( [ 'src/css/**/*.scss' ], buildCss );
}

exports.develop = develop;
