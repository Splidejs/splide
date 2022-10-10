const sass = require( 'sass' );
const fs   = require( 'fs' ).promises;
const path = require( 'path' );
const name = 'splide';

const files = [
  './src/css/core/index.scss',
  './src/css/themes/default/index.scss',
  './src/css/themes/sea-green/index.scss',
  './src/css/themes/skyblue/index.scss',
];

async function buildCss( file ) {
  const result  = await sass.compileAsync( file, { style: 'compressed' } );
  const outFile = rename( file );

  await fs.mkdir( './dist/css/themes', { recursive: true } );
  await fs.writeFile( outFile, result.css );

  if ( outFile.includes( 'splide-default' ) ) {
    const dir = path.dirname( outFile ).split( '/' ).slice( 0, -1 ).join( '/' );
    await fs.writeFile( `${ dir }/${ name }.min.css`, result.css );
  }
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
