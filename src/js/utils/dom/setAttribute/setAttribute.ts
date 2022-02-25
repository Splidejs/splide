import { forEach } from '../../array';
import { forOwn } from '../../object';
import { isNull, isObject } from '../../type/type';
import { removeAttribute } from '../removeAttribute/removeAttribute';


export function setAttribute( elms: Element | Element[], attr: string, value: string | number | boolean ): void;
export function setAttribute( elms: Element | Element[], attrs: Record<string, string | number | boolean> ): void;

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
      isNull( value ) ? removeAttribute( elm, attrs ) : elm.setAttribute( attrs, String( value ) );
    } );
  }
}
