/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */
export declare function find<T>(arrayLike: ArrayLike<T>, predicate: (value: T, index: number, array: T[]) => any): T | undefined;
//# sourceMappingURL=../../../../../src/js/utils/arrayLike/find/find.d.ts.map