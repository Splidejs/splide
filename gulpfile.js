'use strict';

/*
 * Dependencies.
 */
const gulp          = require( 'gulp' );
const rename        = require( 'gulp-rename' );
const sass          = require( 'gulp-sass' );
const sassGlob      = require( 'gulp-sass-glob' );
const postcss       = require( 'gulp-postcss' );
const autoprefixer  = require( 'autoprefixer' );
const cssnano       = require( 'cssnano' );
const merge         = require( 'merge-stream' );
const concat        = require( 'gulp-concat' );
const webpackStream = require( 'webpack-stream' );
const eslint        = require( 'gulp-eslint' );
const gzip          = require( 'gulp-gzip' );

/*
 * Webpack config paths.
 */
const js = {
	complete: {
		path: './build/complete/config',
		dest: './dist/js',
	},
	minified: {
		path: './build/complete/config-min',
		dest: './dist/js',
		gzip: true,
	},
	modular: {
		path: './build/module/config',
		dest: './dist/js',
	},
};

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
	default: {
		path    : './src/sass/core/*.scss',
		dest    : './dist/css/themes',
		basename: 'splide-default',
		merge   : {
			filename: 'splide.css',
			path    : './src/sass/themes/default/*.scss',
		},
	},
	skyblue: {
		path    : './src/sass/core/*.scss',
		dest    : './dist/css/themes',
		basename: 'splide-skyblue',
		merge   : {
			filename: 'splide.css',
			path    : './src/sass/themes/sky-blue/*.scss',
		},
	},
	seagreen: {
		path    : './src/sass/core/*.scss',
		dest    : './dist/css/themes',
		basename: 'splide-sea-green',
		merge   : {
			filename: 'splide.css',
			path    : './src/sass/themes/sea-green/*.scss',
		},
	},
};

/*
 * Build a script file.
 */
gulp.task( 'build:js', done => {
	Object.values( js ).forEach( settings => {
		const stream = webpackStream( { config: require( settings.path ) } )
			.pipe( gulp.dest( settings.dest ) );

		if ( settings.gzip ) {
			stream.pipe( gzip() ).pipe( gulp.dest( settings.dest ) );
		}
	} );

	done();
} );

/*
 * Build sass files.
 */
gulp.task( 'build:sass', done => {
	Object.values( css ).forEach( settings => {
		let stream = gulp.src( settings.path );

		if ( settings.merge ) {
			stream = merge( stream, gulp.src( settings.merge.path ) )
				.pipe( sassGlob() )
				.pipe( sass() )
				.pipe( concat( settings.merge.filename ) );
		}

		stream = stream
			.pipe( sassGlob() )
			.pipe( sass() )
			.pipe( postcss( [
				cssnano( { reduceIdents: false } ),
				autoprefixer( { overrideBrowserslist: [ '> 5%' ] } )
			] ) );

		if ( settings.basename ) {
			stream = stream.pipe( rename( { basename: settings.basename } ) );
		}

		stream
			.pipe( rename( { suffix: '.min' } ) )
			.pipe( gulp.dest( settings.dest ) );
	} );

	done();
} );

/*
 * Run lint.
 */
gulp.task( 'lint', () => {
	return gulp.src( [ './src/**/*.js', './tests/**/*.js' ] )
		.pipe( eslint( { useEslintrc: true } ) )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );