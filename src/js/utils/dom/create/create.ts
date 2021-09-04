import { isArray, isString } from '../../type/type';
import { addClass } from '../addClass/addClass';
import { append } from '../append/append';
import { setAttribute } from '../setAttribute/setAttribute';


/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */
export function create<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string | number | boolean> | string | string[],
  parent?: HTMLElement
): HTMLElementTagNameMap[ K ] {
  const elm = document.createElement( tag );

  if ( attrs ) {
    if ( isString( attrs ) || isArray( attrs ) ) {
      addClass( elm, attrs );
    } else {
      setAttribute( elm, attrs );
    }
  }

  if ( parent ) {
    append( parent, elm );
  }

  return elm;
}
