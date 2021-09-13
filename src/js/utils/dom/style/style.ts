import { forEach } from '../../array';
import { forOwn } from '../../object';
import { isArray, isNull, isString } from '../../type/type';


/**
 * The union for CSS style properties, such as "padding", "fontSize", etc.
 *
 * @since 0.1.0
 */
export type CSSStyleProperties = Exclude<keyof CSSStyleDeclaration, number>;

export function style(
  elms: HTMLElement | HTMLElement[],
  styles: Record<string, string | number>
): void;

export function style<K extends CSSStyleProperties>(
  elms: HTMLElement,
  styles: K
): CSSStyleDeclaration[ K ];

export function style(
  elms: HTMLElement,
  styles: string
): string;


/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elms   - An element or elements to apply styles to.
 * @param styles - An object literal with styles.
 */
export function style<K extends CSSStyleProperties>(
  elms: HTMLElement | HTMLElement[],
  styles: Record<string, string | number> | K
): CSSStyleDeclaration[ K ] | string | void {
  if ( isString( styles ) ) {
    return isArray( elms ) ? null : getComputedStyle( elms )[ styles ];
  }

  forOwn( styles, ( value, key ) => {
    if ( ! isNull( value ) ) {
      forEach( elms, elm => {
        if ( elm ) {
          elm.style[ key ] = `${ value }`;
        }
      } );
    }
  } );
}
