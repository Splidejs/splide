const webpack = require( 'webpack' );

module.exports = {
	entry: './build/complete/complete.js',
	output: {
		filename: 'splide.js',
		environment: {
			arrowFunction: false,
			bigIntLiteral: false,
			const        : false,
			destructuring: false,
			dynamicImport: false,
			forOf        : false,
			module       : false,
		},
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