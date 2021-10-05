/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */
export declare function forOwn<T extends object>(object: T, iteratee: (value: T[keyof T], key: string) => boolean | void): T;
//# sourceMappingURL=../../../../../src/js/utils/object/forOwn/forOwn.d.ts.map