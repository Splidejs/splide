/**
 * Converts the provided string in the camel case to the kebab case.
 *
 * @param string - A string to convert.
 */
export function camelToKebab( string: string ): string {
  return string.replace( /([a-z0-9])([A-Z])/g, '$1-$2' ).toLowerCase();
}
