import { forOwn } from '../../object';
import { isNull, isObject } from '../../type/type';
import { removeAttribute } from '../removeAttribute/removeAttribute';


export function setAttribute( elm: Element, attr: string, value: string | number | boolean ): void;
export function setAttribute( elm: Element, attrs: Record<string, string | number | boolean> ): void;

export function setAttribute(
  elm: Element,
  attrs: string | Record<string, string | number | boolean>,
  value?: string | number | boolean
): void {
  if ( isObject( attrs ) ) {
    forOwn( attrs, ( value, name ) => {
      setAttribute( elm, name, value );
    } );
  } else {
    isNull( value ) ? removeAttribute( elm, attrs ) : elm.setAttribute( attrs, String( value ) );
  }
}
