/**
 * Assign U to T.
 *
 * @typeParam T - An object to assign to.
 * @typeParam U - An object to assign.
 *
 * @return An assigned object type.
 */
export declare type Assign<T, U> = Omit<T, keyof U> & U;
export declare function assign<T extends object>(object: T): T;
export declare function assign<T extends object, U extends object>(object: T, source: U): Assign<T, U>;
export declare function assign<T extends object, U1 extends object, U2 extends object>(object: T, source1: U1, source2: U2): Assign<Assign<T, U1>, U2>;
export declare function assign<T extends object, U1 extends object, U2 extends object, U3 extends object>(object: T, source1: U1, source2: U2, source3: U3): Assign<Assign<Assign<T, U1>, U2>, U3>;
//# sourceMappingURL=../../../../../src/js/utils/object/assign/assign.d.ts.map