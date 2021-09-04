import { arrayProto } from '../../array';


/**
 * The splice method for an array-like object.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * @param arrayLike   - An array-like object.
 * @param start       - A start index.
 * @param deleteCount - Optional. A number of elements to remove from the `start` index.
 * @param args        - Optional. Any number of items to add.
 *
 * @return An array with deleted items.
 */
export function splice<T>( arrayLike: ArrayLike<T>, start: number, deleteCount?: number, ...args: T[] ): T[] {
  return arrayProto.splice.call( arrayLike, start, deleteCount, ...args );
}
