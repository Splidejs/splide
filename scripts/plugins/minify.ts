import uglify, { MinifyOptions } from 'uglify-js';
import { Plugin, RenderChunkHook } from 'rollup';


const DEFAULTS = {
  minify: {
    sourceMap: true,
    output: {
      comments: /^!/,
    },
    toplevel: true,
  },
};

export interface MinifyPluginOptions {
  minify?: MinifyOptions,
}

export function minify(pluginOptions: MinifyPluginOptions = {}): Plugin {
  pluginOptions = { ...DEFAULTS, ...pluginOptions };

  return {
    name: 'uglify',
    renderChunk(code): ReturnType<RenderChunkHook> {
      const result = uglify.minify(code, pluginOptions.minify);

      if (result.error) {
        throw result.error;
      }

      return result;
    },
  };
}