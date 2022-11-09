import sass from 'sass';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';


export interface buildCSSConfig {
  entry: string;
  outDir: string;
  fileName: string;
}

export async function buildCss(config: buildCSSConfig): Promise<void> {
  const { entry, outDir, fileName } = config;

  const result = await sass.compileAsync(entry, { style: 'compressed' });

  if (!existsSync(outDir)) {
    await fs.mkdir(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, fileName);
  await fs.writeFile(outFile, result.css);
  console.log('Finished compiling', fileName, outFile);
}