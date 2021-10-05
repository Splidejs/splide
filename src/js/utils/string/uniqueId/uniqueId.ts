import { pad } from '../pad/pad';


/**
 * Stores unique IDs.
 *
 * @since 3.0.0
 */
const ids: Record<string, number> = {};

/**
 * Returns a sequential unique ID as "{ prefix }-{ number }".
 *
 * @param prefix - A prefix for the ID.
 */
export function uniqueId( prefix: string ): string {
  return `${ prefix }${ pad( ( ids[ prefix ] = ( ids[ prefix ] || 0 ) + 1 ) ) }`;
}
