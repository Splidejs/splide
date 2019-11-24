const webpack = require( 'webpack' );

module.exports = {
	entry: './build/module/module.js',
	output: {
		filename     : 'splide.js',
		library      : 'Splide',
		libraryTarget: 'umd',
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
		minimize: false,
	},
	mode: 'production',
};