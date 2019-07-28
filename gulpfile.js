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
	all: {
		path : './src/sass/core/*.scss',
		dest : './dist/css',
		merge: {
			filename: 'splide.css',
			path    : './src/sass/themes/default/*.scss',
		},
	},
	core: {
		path: './src/sass/core/*.scss',
		dest: './dist/css',
	},
	themes: {
		path: [
			'./src/sass/themes/default/*.scss',
		],
		dest: './dist/css/themes',
	},
};

/*
 * Build a script file.
 */
gulp.task( 'build:js', () => {
	js.forEach( path => {
		return webpackStream( { config: require( path ) } )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( './dist/js' ) );
	} );
} );

/*
 * Build sass files.
 */
gulp.task( 'build:sass', () => {
	Object.values( css ).forEach( settings => {
		let stream = gulp.src( settings.path );

		if ( settings.merge ) {
			stream = merge( stream, gulp.src( settings.merge.path ) )
				.pipe( sass() )
				.pipe( concat( settings.merge.filename ) );
		}

		stream
			.pipe( sass() )
			.pipe( postcss( [
				cssnano( { reduceIdents: false } ),
				autoprefixer( { browsers: [ '> 5%' ] } )
			] ) )
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( settings.dest ) );
	} );
} );

gulp.task( 'lint', () => {
	return gulp.src( [ './src/**/*.js', './tests/**/*.js' ] )
		.pipe( eslint( { useEslintrc: true } ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );