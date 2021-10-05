const sass         = require( 'sass' );
const fs           = require( 'fs' ).promises;
const path         = require( 'path' );
const postcss      = require( 'postcss' );
const cssnano      = require( 'cssnano' );
const autoprefixer = require( 'autoprefixer' );
const name         = 'splide';

const files = [
  './src/css/core/index.scss',
  './src/css/themes/default/index.scss',
  './src/css/themes/sea-green/index.scss',
  './src/css/themes/skyblue/index.scss',
];

function buildCss( file ) {
  const result  = sass.renderSync( { file, outputStyle: 'compressed' } );
  const outFile = rename( file );

  return postcss( [
    cssnano( { reduceIdents: false } ),
    autoprefixer(),
  ] )
    .process( result.css, { from: undefined } )
    .then( result => {
      result.warnings().forEach( warn => {
        console.warn( warn.toString() );
      } );

      return fs.writeFile( outFile, result.css ).then( () => result );
    } )
    .then( result => {
      if ( outFile.includes( 'splide-default' ) ) {
        const dir = path.dirname( outFile ).split( '/' ).slice( 0, -1 ).join( '/' );
        return fs.writeFile( `${ dir }/${ name }.min.css`, result.css ).then( () => result );
      }
    } );
}

function rename( file ) {
  file = file.replace( './src/', '' );

  const fragments = path.dirname( file ).split( '/' );
  const dirname   = fragments.slice( 0, -1 ).join( '/' );
  return `./dist/${ dirname }/${ name }-${ fragments[ fragments.length - 1 ] }.min.css`;
}

Promise.all( files.map( buildCss ) ).catch( e => console.error( e ) );

exports.buildCss = () => {
  files.forEach( buildCss );
};
