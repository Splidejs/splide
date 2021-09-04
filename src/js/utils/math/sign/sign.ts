/**
 * Returns the sign of the provided number.
 *
 * @param x - A number.
 *
 * @return `1` for positive numbers, `-1` for negative numbers, or `0` for `0`.
 */
export function sign( x: number ): number {
  return +( x > 0 ) - +( x < 0 );
}
