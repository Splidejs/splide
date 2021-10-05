import { toArray } from '../toArray/toArray';


/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */
export function forEach<T>( values: T | T[], iteratee: ( value: T, index: number, array: T[] ) => void ): void {
  toArray( values ).forEach( iteratee );
}
