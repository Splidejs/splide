import { AnyFunction, ShiftN } from '../../../types';
import { slice } from '../../arrayLike';


/**
 * Create a function where provided arguments are bound.
 * `this` parameter will be always null.
 *
 * @param func - A function.
 * @param args - Arguments to bind to the function.
 *
 * @return A function where arguments are bound.
 */
export function apply<F extends AnyFunction, A extends any[] = any[]>(
  func: F,
  ...args: A
): ( ...args: ShiftN<Parameters<F>, A["length"]> ) => ReturnType<F>;

/**
 * Create a function where provided arguments are bound.
 * `this` parameter will be always null.
 *
 * @param func - A function.
 */
export function apply( func: AnyFunction ): any {
  // eslint-disable-next-line prefer-rest-params, prefer-spread
  return func.bind( null, ...slice( arguments, 1 ) );
}
