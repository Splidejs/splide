const { src, dest } = require( 'gulp' );
const sass         = require( 'gulp-dart-sass' );
const postcss      = require( 'gulp-postcss' );
const cssnano      = require( 'cssnano' );
const autoprefixer = require( 'autoprefixer' );
const rename       = require( 'gulp-rename' );
const through      = require( 'through2' );
const fs           = require( 'fs' );
const path         = require( 'path' );

function buildCss() {
	return src( [
		'./src/css/core/index.scss',
		'./src/css/themes/default/index.scss',
		'./src/css/themes/sea-green/index.scss',
		'./src/css/themes/skyblue/index.scss',
	], { base: 'src' } )
		.pipe( sass() )
		.pipe( postcss( [
			cssnano( { reduceIdents: false } ),
			autoprefixer(),
		] ) )
		.pipe( rename( path => {
			const fragments = path.dirname.split( '\\' );
			const dirname   = fragments.slice( 0, -1 ).join( '\\' );

			return {
				dirname,
				basename: `splide-${ fragments[ fragments.length - 1 ] }.min`,
				extname : '.css',
			};
		} ) )
		.pipe( dest( 'dist' ) )
		.pipe( copy() );
}

function copy() {
	return through( { objectMode: true }, ( file, encoding, cb ) => {
		if ( file.path.includes( 'splide-default' ) ) {
			const result    = path.parse( file.path );
			const fragments = result.dir.split( '\\' );
			const dirname   = fragments.slice( 0, -1 ).join( '\\' );

			fs.copyFile( file.path, `${ dirname }\\splide.min.css`, error => {
				if ( error ) {
					throw error;
				}
			} );
		}

		cb( null, file );
	} );
}

exports.buildCss = buildCss;
