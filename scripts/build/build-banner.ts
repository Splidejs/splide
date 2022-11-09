/**
 * Builds a banner from the package json.
 *
 * @param info - An object with package.json.
 */
export async function buildBanner(info: Record<string, any>): Promise<string> {
  const { name, version, license, author } = info;

  if (!(name && version && license && author)) {
    throw new Error('Missing required info to generate a banner');
  }

  return `/*!
 * ${ name }
 * Version  : ${ version }
 * License  : ${ license }
 * Copyright: ${ new Date().getFullYear() } ${ author }
 */`;
}