import { Cast, Head, Push, Resolve, Shift } from '../../../types';
/**
 * Assigns U to T.
 *
 * @typeParam T - An object to assign to.
 * @typeParam U - An object to assign.
 *
 * @return An assigned object type.
 */
export type Assign<T, U> = Omit<T, keyof U> & U;
/**
 * Recursively assigns U[] to T.
 *
 * @typeParam T - An object to assign to.
 * @typeParam U - A tuple contains objects.
 *
 * @return An assigned object type.
 */
export type Assigned<T extends object, U extends object[], N extends number, C extends any[] = []> = {
    0: T;
    1: Assigned<Assign<T, Head<U>>, Shift<U>, N, Push<C>>;
}[C['length'] extends N ? 0 : 1] extends infer A ? Cast<A, any> : never;
export declare function assign<T extends object>(object: T): T;
export declare function assign<T extends object, U extends object[]>(object: T, ...sources: U): Resolve<Assigned<T, U, U['length']>>;
