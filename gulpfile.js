const { parallel } = require( 'gulp' );
const { buildCss } = require( './gulp/build-css' );
const { buildScript, buildModule } = require( './gulp/build-script' );

exports[ 'build:js' ]     = buildScript;
exports[ 'build:module' ] = buildModule;
exports[ 'build:css' ]    = buildCss;
exports[ 'build:all' ]    = parallel( buildScript, buildModule, buildCss );
