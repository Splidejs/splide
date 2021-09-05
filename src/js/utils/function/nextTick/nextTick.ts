import { AnyFunction } from '@splidejs/splide';


/**
 * Invokes the callback on the next tick.
 *
 * @param callback - A callback function.
 */
export function nextTick( callback: AnyFunction ): void {
  setTimeout( callback );
}
