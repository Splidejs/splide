import { max, min } from '../math/math';


/**
 * Checks if the subject number is between `minOrMax` and `maxOrMin`.
 *
 * @param number    - A subject number to check.
 * @param minOrMax  - A min or max number.
 * @param maxOrMin  - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */
export function between( number: number, minOrMax: number, maxOrMin: number, exclusive?: boolean ): boolean {
  const minimum = min( minOrMax, maxOrMin );
  const maximum = max( minOrMax, maxOrMin );
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
