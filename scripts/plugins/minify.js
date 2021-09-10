const uglify = require( 'uglify-js' );

const DEFAULTS = {
  minify: {
    sourceMap: false,
    output: {
      comments: /^!/,
    },
    toplevel: true,
    mangle: {
      properties: {
        regex: /^_/,
      },
    },
  },
};

function minify( pluginOptions = {} ) {
  pluginOptions = { ...DEFAULTS, ...pluginOptions };

  return {
    name: 'minify',
    renderChunk( code ) {
      const result = uglify.minify( code, pluginOptions.minify );

      if ( result.error ) {
        throw new Error( result.error );
      }

      return result.code;
    },
  }
}

exports.minify = minify;
