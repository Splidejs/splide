const config       = require( './config' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	...config,
	output      : {
		filename: 'splide.min.js',
		environment: config.output.environment,
	},
	optimization: {
		minimize : true,
		minimizer: [ new TerserPlugin( {
			terserOptions: {
				format: {
					comments: /^\**!|@preserve|@license|@cc_on/i,
				},
			},
			extractComments: false,
		} ) ],
	},
};