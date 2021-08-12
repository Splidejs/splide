const { parallel } = require( 'gulp' );
const buildCss = require( './gulp/build-css' );
const buildJs  = require( './gulp/build-js' );

exports[ 'build:js' ]  = buildJs;
exports[ 'build:css' ] = buildCss;
exports[ 'build:all' ] = parallel( buildJs, buildCss );
