const config  = require( '../complete/config' );

module.exports = {
	...config,
	entry: './build/module/module.js',
	output: {
		filename     : 'splide.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
	mode: 'production',
};