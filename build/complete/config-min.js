const uglify  = require( 'uglifyjs-webpack-plugin' );
const config  = require( './config' );

module.exports = {
	...config,
	output: {
		filename: 'splide.min.js',
	},
	optimization: {
		minimizer: [ new uglify() ],
	},
};