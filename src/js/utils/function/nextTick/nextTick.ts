import { AnyFunction } from '@splide/splide';


/**
 * Invokes the callback on the next tick.
 *
 * @param callback - A callback function.
 */
export function nextTick( callback: AnyFunction ): void {
  setTimeout( callback );
}
