import { AnyFunction, RequestIntervalInterface, ThrottleInstance } from '@splide/splide';
import { RequestInterval } from '../RequestInterval/RequestInterval';


/**
 * Returns the throttled function.
 *
 * @param func     - A function to throttle.
 * @param duration - Optional. Throttle duration in milliseconds.
 *
 * @return A throttled function.
 */
export function Throttle<F extends AnyFunction>(
  func: F,
  duration?: number
): ThrottleInstance<F> {
  let interval: RequestIntervalInterface;

  function throttled( this: ThisParameterType<F> ): void {
    if ( ! interval ) {
      interval = RequestInterval( duration || 0, () => {
        func.apply( this, arguments );
        interval = null;
      }, null, 1 );

      interval.start();
    }
  }

  return throttled;
}
