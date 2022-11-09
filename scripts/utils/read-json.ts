import { readFile } from 'fs/promises';


/**
 * Reads the JSON file on the path and returns an object.
 *
 * @param path - A path to the JSON.
 *
 * @return A promise resolved with a JSON object.
 */
export async function readJson(path: string): Promise<Record<string, any>> {
  const json = await readFile(path, 'utf-8');
  return JSON.parse(json);
}