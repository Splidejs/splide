/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes `value` and `key` as arguments.
 * @param right    - If `true`, the method iterates over the object from the end like `forEachRight()`.
 *
 * @return A provided object itself.
 */
export declare function forOwn<T extends object>(object: T, iteratee: (value: T[keyof T], key: string) => boolean | void, right?: boolean): T;
