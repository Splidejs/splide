import { forEach } from '../../array';
import { forOwn } from '../../object';
import { isNull, isObject } from '../../type/type';
import { removeAttribute } from '../removeAttribute/removeAttribute';


export function setAttribute( elms: Element | Element[], attr: string, value: string | number | boolean ): void;
export function setAttribute( elms: Element | Element[], attrs: Record<string, string | number | boolean> ): void;

/**
 * Sets attribute/attributes to the element or elements.
 * If the value is `null` or an empty string, the attribute will be removed.
 *
 * @param elms  - An element or an array with elements.
 * @param attrs - An attribute name of an object with pairs of a name and a value.
 * @param value - A value to set.
 */
export function setAttribute(
  elms: Element | Element[],
  attrs: string | Record<string, string | number | boolean>,
  value?: string | number | boolean
): void {
  if ( isObject( attrs ) ) {
    forOwn( attrs, ( value, name ) => {
      setAttribute( elms, name, value );
    } );
  } else {
    forEach( elms, elm => {
      isNull( value ) || value === '' ? removeAttribute( elm, attrs ) : elm.setAttribute( attrs, String( value ) );
    } );
  }
}
