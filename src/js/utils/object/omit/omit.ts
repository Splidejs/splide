import { forEach } from '../../array';
import { ownKeys } from '../ownKeys/ownKeys';


/**
 * Deletes specified own keys from the object.
 *
 * @param object - An object.
 * @param keys   - A key or keys to delete. If not specified, all own enumerable keys will be deleted.
 */
export function omit( object: object, keys?: string | string[] ): void {
  forEach( keys || ownKeys( object ), key => {
    delete object[ key ];
  } );
}