import { Cast, Head, Push, Resolve, Shift } from '../../../types';
import { slice } from '../../arrayLike';
import { forOwn } from '../forOwn/forOwn';


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
  0: T,
  1: Assigned<Assign<T, Head<U>>, Shift<U>, N, Push<C>>,
}[ C['length'] extends N ? 0 : 1 ] extends infer A ? Cast<A, any> : never;

export function assign<T extends object>( object: T ): T;

export function assign<T extends object, U extends object[]>(
  object: T,
  ...sources: U
): Resolve<Assigned<T, U, U['length']>>

/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object - An object to assign properties to.
 *
 * @return An object assigned properties of the sources to.
 */
export function assign<T extends object>( object: T ): any {
  // eslint-disable-next-line prefer-rest-params, prefer-spread
  slice( arguments, 1 ).forEach( source => {
    forOwn( source, ( value, key ) => {
      object[ key ] = source[ key ];
    } );
  } );

  return object;
}
