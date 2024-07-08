import { AnyFunction, ShiftN } from '../../../types';
/**
 * Create a function where provided arguments are bound.
 * `this` parameter will be always null.
 *
 * @param func - A function.
 * @param args - Arguments to bind to the function.
 *
 * @return A function where arguments are bound.
 */
export declare function apply<F extends AnyFunction, A extends any[] = any[]>(func: F, ...args: A): (...args: ShiftN<Parameters<F>, A["length"]>) => ReturnType<F>;
