import { AnyFunction } from '../../../types';


/**
 * Invokes the callback on the next tick.
 *
 * @param callback - A callback function.
 */
export const nextTick: ( callback: AnyFunction ) => ReturnType<typeof setTimeout> = setTimeout;
