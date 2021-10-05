import { AnyFunction } from '../../types';
import { RequestInterval, RequestIntervalInterface } from '../RequestInterval/RequestInterval';


/**
 * The interface for the returning value of the RequestInterval.
 *
 * @since 3.0.0
 */
export interface ThrottleInstance<F extends AnyFunction> extends Function {
  ( ...args: Parameters<F> ): void;
}

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
        // eslint-disable-next-line prefer-rest-params
        func.apply( this, arguments );
        interval = null;
      }, null, 1 );

      interval.start();
    }
  }

  return throttled;
}
