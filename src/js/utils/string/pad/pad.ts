/**
 * Pads the number with 0.
 *
 * @param number - A number to pad.
 *
 * @return string - Padded number.
 */
export function pad( number: number ): string {
  return number < 10 ? `0${ number }` : `${ number }`;
}
