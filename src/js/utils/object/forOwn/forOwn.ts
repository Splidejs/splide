import { ownKeys } from '../ownKeys/ownKeys';


/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 * @param right    - If `true`, the method iterates over the object from the end like `forEachRight()`.
 *
 * @return A provided object itself.
 */
export function forOwn<T extends object>(
  object: T,
  iteratee: ( value: T[ keyof T ], key: string ) => boolean | void,
  right?: boolean
): T {
  if ( object ) {
    let keys = ownKeys( object );
    keys = right ? keys.reverse() : keys;

    for ( let i = 0; i < keys.length; i++ ) {
      const key = keys[ i ];

      if ( key !== '__proto__' ) {
        if ( iteratee( object[ key ], key ) === false ) {
          break;
        }
      }
    }
  }

  return object;
}
