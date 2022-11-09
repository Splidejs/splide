import { ModuleFormat } from 'rollup';
import { LibraryFormats, build } from 'vite';
import { buildBanner } from './build-banner.js';
import { minify as pluginMinify } from '../plugins/minify.js';


export interface BuildScriptFileConfig {
  entry: string;
  name: string;
  fileName: string;
  formats: LibraryFormats[];
  outDir: string;
  minify?: boolean;
  emptyOutDir?: boolean;
  sourcemap?: boolean;
  info?: Record<string, any>;
}

export async function buildScriptFile(config: BuildScriptFileConfig): Promise<void> {
  const {
    entry,
    name,
    fileName,
    formats,
    outDir,
    emptyOutDir = true,
    minify = false,
    sourcemap,
    info,
  } = config;

  const banner = info ? await buildBanner(info) : undefined;

  await build({
    configFile: false,
    build: {
      emptyOutDir,
      outDir,
      sourcemap,
      target: 'esnext',
      minify: false,
      lib: {
        entry,
        name,
        formats,
        fileName: format => `${ fileName }.${ getExtension(format, minify) }js`,
      },
      rollupOptions: {
        plugins: minify ? [pluginMinify()] : undefined,
        output: {
          exports: 'named',
          banner,
        },
      },
    },
  });
}

function getExtension(format: ModuleFormat, minify?: boolean): string {
  if (format === 'es') {
    return 'esm.';
  } else if (format === 'cjs') {
    return 'cjs.';
  } else if (format === 'iife' || format === 'umd') {
    return minify ? 'min.' : '';
  }

  throw new TypeError('Unknown file format.');
}