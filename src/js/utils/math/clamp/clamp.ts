import { max, min } from '../math/math';


/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 */
export function clamp( number: number, x: number, y: number ): number {
  const minimum = min( x, y );
  const maximum = max( x, y );
  return min( max( minimum, number ), maximum );
}
