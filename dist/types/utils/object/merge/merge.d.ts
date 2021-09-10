/**
 * Merges U to T.
 *
 * @typeParam T - An object to merge to.
 * @typeParam U - An object to to.
 *
 * @return An merged object type.
 */
export declare type Merge<T extends object, U extends object> = Omit<T, keyof U> & {
    [K in (keyof T & keyof U)]: U[K] extends object ? U[K] extends any[] ? T[K] extends any[] ? Array<T[K][number] | U[K][number]> : U[K] : T[K] extends object ? Merge<T[K], U[K]> extends infer A ? Cast<A, object> : never : U[K] : U[K];
} & Omit<U, keyof T>;
declare type Cast<T, U> = T extends U ? T : U;
/**
 * Recursively merges source properties to the object.
 * Be aware that this method does not merge arrays. They are just duplicated by `slice()`.
 *
 * @param object - An object to merge properties to.
 * @param source - A source object to merge properties from.
 *
 * @return A new object with merged properties.
 */
export declare function merge<T extends object, U extends object>(object: T, source: U): Merge<T, U>;
export {};
//# sourceMappingURL=../../../../../src/js/utils/object/merge/merge.d.ts.map