const gulp          = require( 'gulp' );
const webpack       = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );
const gzip          = require( 'gulp-gzip' );


const js = {
	complete: {
		path: '../build/complete/config',
		dest: './dist/js',
	},
	minified: {
		path: '../build/complete/config-min',
		dest: './dist/js',
		gzip: true,
	},
	module: {
		path: '../build/module/config',
		dest: './dist/js',
	},
};

function buildJs( done ) {
	Object.values( js ).forEach( settings => {
		const stream = webpackStream( { config: require( settings.path ) }, webpack )
			.pipe( gulp.dest( settings.dest ) );

		if ( settings.gzip ) {
			stream.pipe( gzip() ).pipe( gulp.dest( settings.dest ) );
		}
	} );

	done();
}

module.exports = buildJs;
