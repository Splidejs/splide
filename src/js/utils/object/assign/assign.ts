import { slice } from '../../arrayLike';
import { forOwn } from '../forOwn/forOwn';


/**
 * Assign U to T.
 *
 * @typeParam T - An object to assign to.
 * @typeParam U - An object to assign.
 *
 * @return An assigned object type.
 */
export type Assign<T, U> = Omit<T, keyof U> & U;

export function assign<T extends object>( object: T ): T;

// There is a way to type arguments recursively, but these fixed definitions are enough for this project.
export function assign<T extends object, U extends object>( object: T, source: U ): Assign<T, U>;

export function assign<T extends object, U1 extends object, U2 extends object>(
  object: T, source1: U1, source2: U2
): Assign<Assign<T, U1>, U2>;

export function assign<T extends object, U1 extends object, U2 extends object, U3 extends object>(
  object: T, source1: U1, source2: U2, source3: U3
): Assign<Assign<Assign<T, U1>, U2>, U3>;

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
