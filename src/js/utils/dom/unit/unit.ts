import { isString } from '../../type/type';


/**
 * Appends `px` to the provided number.
 * If the value is already string, just returns it.
 *
 * @param value - A value to append `px` to.
 *
 * @return A string with the CSS unit.
 */
export function unit( value: number | string ): string {
  return isString( value ) ? value : value ? `${ value }px` : '';
}
