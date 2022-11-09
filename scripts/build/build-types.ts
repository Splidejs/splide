import dts from 'rollup-plugin-dts';
import { rollup } from 'rollup';
import fs from 'fs/promises';
import path from 'path';
import * as util from 'util';
import { exec as _exec } from 'child_process';


const exec = util.promisify(_exec);


async function clean(outDir: string): Promise<void> {
  const files = await fs.readdir(outDir);

  await Promise.all(files.map(file => {
    if (file !== 'index.d.ts') {
      return fs.rm(path.join(outDir, file), { recursive: true, force: true });
    }
  }));
}

async function emit(outDir: string): Promise<void> {
  await exec(`tsc --emitDeclarationOnly --declarationDir ${ outDir }`);
}

async function bundle(outDir: string): Promise<void> {
  const file = path.join(outDir, 'index.d.ts');

  const bundle = await rollup({
    input: file,
    plugins: [dts({ respectExternal: true })],
  });

  await bundle.write({ file });
}

interface BuildTypesConfig {
  outDir: string;
}

export async function buildTypes(config: BuildTypesConfig): Promise<void> {
  const { outDir } = config;

  await clean(outDir);
  await emit(outDir);
  await bundle(outDir);
  await clean(outDir);
}