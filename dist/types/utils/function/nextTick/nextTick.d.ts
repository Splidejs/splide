import { AnyFunction } from '../../../types';
/**
 * Invokes the callback on the next tick.
 *
 * @param callback - A callback function.
 */
export declare const nextTick: (callback: AnyFunction) => ReturnType<typeof setTimeout>;
