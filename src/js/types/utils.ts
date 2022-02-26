/**
 * Casts T to U.
 *
 * @internal
 */
export type Cast<T, U> = T extends U ? T : U;

/**
 * Makes the T easy to read.
 */
export type Resolve<T> = {
  [ K in keyof T ]: T[ K ];
} & unknown;

/**
 * Pushes U to tuple T.
 *
 * @internal
 */
export type Push<T extends any[], U = any> = [ ...T, U ];

/**
 * Returns the first type of the tuple.
 *
 * @internal
 */
export type Head<T extends any[]> = ( ( ...args: T ) => any ) extends ( arg: infer A, ...args: any[] ) => any
  ? A
  : never;

/**
 * Removes the first type from the tuple T.
 *
 * @internal
 */
export type Shift<T extends any[]> = ( ( ...args: T ) => any ) extends ( arg: any, ...args: infer A ) => any
  ? A
  : never;

/**
 * Removes the N types from the tuple T.
 *
 * @internal
 */
export type ShiftN<T extends any[], N extends number, C extends any[] = []> = {
  0: T,
  1: ShiftN<Shift<T>, N, Push<C>>,
}[ C['length'] extends N ? 0 : 1 ] extends infer A ? Cast<A, any[]> : never;