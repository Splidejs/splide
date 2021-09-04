import { slice } from '../slice/slice';


/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */
export function find<T>(
  arrayLike: ArrayLike<T>,
  predicate: ( value: T, index: number, array: T[] ) => any
): T | undefined {
  return slice( arrayLike ).filter( predicate )[ 0 ];
}
