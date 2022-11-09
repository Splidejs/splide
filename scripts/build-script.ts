import { buildScriptFile } from './build/build-script.js';
import { buildCss } from './build/build-css.js';
import { readJson } from './utils/read-json.js';


async function build(): Promise<void> {
  const info = await readJson('./package.json');

  await buildScriptFile({
    entry: './src/js/index.ts',
    name: 'Splide',
    fileName: 'splide',
    outDir: './dist/js',
    formats: ['es', 'cjs'],
    info,
  });

  await buildScriptFile({
    entry: './src/js/build/default.ts',
    name: 'Splide',
    fileName: 'splide',
    emptyOutDir: false,
    outDir: './dist/js',
    formats: ['iife'],
    minify: true,
    info,
  });

  await buildCss({
    entry: './src/css/core/index.scss',
    outDir: './dist/css',
    fileName: 'splide-core.min.css',
  });

  await buildCss({
    entry: './src/css/themes/default/index.scss',
    outDir: './dist/css',
    fileName: 'splide.min.css',
  });

  await Promise.all(
    ['default', 'skyblue', 'sea-green'].map(async theme => {
      await buildCss({
        entry: `./src/css/themes/${ theme }/index.scss`,
        outDir: './dist/css/themes',
        fileName: `splide-${ theme }.min.css`,
      });
    }),
  );
}

await build();