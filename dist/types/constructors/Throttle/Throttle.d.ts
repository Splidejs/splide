import { AnyFunction, ThrottleInstance } from '@splidejs/splide';
/**
 * Returns the throttled function.
 *
 * @param func     - A function to throttle.
 * @param duration - Optional. Throttle duration in milliseconds.
 *
 * @return A throttled function.
 */
export declare function Throttle<F extends AnyFunction>(func: F, duration?: number): ThrottleInstance<F>;
//# sourceMappingURL=../../../../src/js/constructors/Throttle/Throttle.d.ts.map