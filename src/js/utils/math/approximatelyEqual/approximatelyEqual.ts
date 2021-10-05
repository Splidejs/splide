import { abs } from '../math/math';


/**
 * Checks if the provided 2 numbers are approximately equal or not.
 *
 * @param x       - A number.
 * @param y       - Another number to compare.
 * @param epsilon - An accuracy that defines the approximation.
 *
 * @return `true` if 2 numbers are considered to be equal, or otherwise `false`.
 */
export function approximatelyEqual( x: number, y: number, epsilon: number ): boolean {
  return abs( x - y ) < epsilon;
}
