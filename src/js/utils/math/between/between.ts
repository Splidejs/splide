/**
 * Checks if the subject number is between `minOrMax` and `maxOrMin`.
 *
 * @param number    - A subject number to check.
 * @param minOrMax  - A min or max number.
 * @param maxOrMin  - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */
export function between( number: number, minOrMax: number, maxOrMin: number, exclusive?: boolean ): boolean {
  const min = Math.min( minOrMax, maxOrMin );
  const max = Math.max( minOrMax, maxOrMin );
  return exclusive ? min < number && number < max : min <= number && number <= max;
}
