const { buildJs, buildMin } = require( './build-script' );
const { buildEsm, buildCjs } = require( './build-module' );
const { buildCss } = require( './build-css' );


Promise.all( [
  buildJs(),
  buildMin(),
  buildEsm(),
  buildCjs(),
  buildCss(),
] ).catch( e => console.error( e ) );
