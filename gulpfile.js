'use strict';

/*
 * Dependencies.
 */
const gulp          = require( 'gulp' );
const rename        = require( 'gulp-rename' );
const sass          = require( 'gulp-sass' );
const postcss       = require( 'gulp-postcss' );
const autoprefixer  = require( 'autoprefixer' );
const cssnano       = require( 'cssnano' );
const merge         = require( 'merge-stream' );
const concat        = require( 'gulp-concat' );
const webpackStream = require( 'webpack-stream' );
const eslint        = require( 'gulp-eslint' );

/*
 * Webpack config paths.
 */
const js = [
	'./build/complete/config',
];

/*
 * Path definitions.
 */
const css = {
	core: {
		path: './src/sass/core/splide-core.scss',
		dest: './dist',
	},
	theme: {
		path: './src/sass/theme/splide-theme.scss',
		dest: './dist',
	},
};

/*
 * Build a script file.
 */
gulp.task( 'build:js', () => {
	js.forEach( path => {
		return webpackStream( { config: require( path ) } )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( './dist' ) );
	} );
} );

/*
 * Build sass files.
 */
gulp.task( 'build:sass', () => {
	let mergedStream;

	Object.values( css ).forEach( settings => {
		const stream = gulp.src( settings.path )
			.pipe( sass() )
			.pipe( postcss( [
				cssnano( { reduceIdents: false } ),
				autoprefixer( { browsers: [ '> 5%' ] } )
			] ) )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( settings.dest ) );

		mergedStream = ! mergedStream ? stream : merge( mergedStream, stream );
	} );

	if ( mergedStream ) {
		mergedStream
			.pipe( concat( 'splide.min.css' ) )
			.pipe( postcss( [ cssnano( { reduceIdents: false } ) ] ) )
			.pipe( gulp.dest( './dest' ) );
	}
} );

gulp.task( 'lint', () => {
	return gulp.src( [ './src/**/*.js', './tests/**/*.js' ] )
		.pipe( eslint( { useEslintrc: true } ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );