const uglify  = require( 'uglifyjs-webpack-plugin' );
const webpack = require( 'webpack' );

module.exports = {
	entry: './build/complete/complete.js',
	output: {
		filename: 'splide.js',
	},
	module: {
		rules: [
			{
				test   : /.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin( {
			banner: require( '../banner' ),
			raw   : true,
		} ),
	],
	optimization: {
		minimizer: [ new uglify() ],
	},
	mode: 'production',
};