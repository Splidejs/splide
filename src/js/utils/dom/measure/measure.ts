import { isString } from '../../type/type';
import { create } from '../create/create';
import { rect } from '../rect/rect';
import { remove } from '../remove/remove';


/**
 * Attempts to convert the provided value to pixel as the relative value to the parent element.
 *
 * @param parent - A parent element.
 * @param value  - A value to convert.
 *
 * @return A converted value in pixel. Unhandled values will become 0.
 */
export function measure( parent: HTMLElement, value: number | string ): number {
  if ( isString( value ) ) {
    const div = create( 'div', { style: `width: ${ value }; position: absolute;` }, parent );
    value = rect( div ).width;
    remove( div );
  }

  return value;
}
