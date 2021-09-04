import { arrayProto } from '../../array';


/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */
export function slice<T>( arrayLike: ArrayLike<T>, start?: number, end?: number ): T[] {
  return arrayProto.slice.call( arrayLike, start, end );
}
