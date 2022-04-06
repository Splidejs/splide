import { Cast, Head, Push, Resolve, Shift } from '../../../types';
import { slice } from '../../arrayLike';
import { isArray, isObject } from '../../type/type';
import { forOwn } from '../forOwn/forOwn';


/**
 * Merges U to T.
 *
 * @typeParam T - An object to merge U into.
 * @typeParam U - An object to merge properties from.
 *
 * @return A merged object type.
 */
export type Merge<T extends object, U extends object> = Omit<T, keyof U> & {
  [ K in ( keyof T & keyof U ) ]: U[ K ] extends object
    ? U[ K ] extends any[]
      ? U[ K ]
      : T[ K ] extends object
        ? Merge<T[ K ], U[ K ]> extends infer A ? Resolve<Cast<A, object>> : never
        : U[ K ]
    : U[ K ];
} & Omit<U, keyof T>;

/**
 * Recursively merges U[] to T.
 *
 * @typeParam T - An object to assign to.
 * @typeParam U - A tuple contains objects.
 *
 * @return An assigned object type.
 */
export type Merged<T extends object, U extends object[], N extends number, C extends any[] = []> = {
  0: T,
  1: Merged<Merge<T, Head<U>>, Shift<U>, N, Push<C>>,
}[ C['length'] extends N ? 0 : 1 ] extends infer A ? Cast<A, any> : never;

export function merge<T extends object>( object: T ): T;

export function merge<T extends object, U extends object[]>(
  object: T,
  ...sources: U
): Resolve<Merged<T, U, U['length']>>

/**
 * Recursively merges source properties to the object.
 * Be aware that this method does not merge arrays. They are just duplicated by `slice()`.
 *
 * @param object - An object to merge properties to.
 *
 * @return A new object with merged properties.
 */
export function merge<T extends object>( object: T ): any {
  // eslint-disable-next-line prefer-rest-params
  slice( arguments, 1 ).forEach( source => {
    forOwn( source, ( value, key ) => {
      if ( isArray( value ) ) {
        object[ key ] = value.slice();
      } else if ( isObject( value ) ) {
        object[ key ] = merge( {}, isObject( object[ key ] ) ? object[ key ] : {}, value );
      } else {
        object[ key ] = value;
      }
    } );
  } );

  return object;
}
