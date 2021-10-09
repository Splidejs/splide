import { isNull, isUndefined } from '../../type/type';


export function style<K extends keyof CSSStyleDeclaration>(
  elm: HTMLElement,
  prop: K,
): CSSStyleDeclaration[ K ];

export function style(
  elm: HTMLElement,
  prop: string,
): string;

export function style(
  elm: HTMLElement,
  prop: string,
  value: string | number
): void;


/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm   - An element to apply styles to.
 * @param prop  - An object literal with styles or a property name.
 * @param value - A value to set.
 */
export function style(
  elm: HTMLElement,
  prop: string,
  value?: string | number
): string | void {
  if ( isUndefined( value ) ) {
    return getComputedStyle( elm )[ prop ];
  }

  if ( ! isNull( value ) ) {
    const { style } = elm;
    value = `${ value }`;

    if ( style[ prop ] !== value ) {
      style[ prop ] = value;
    }
  }
}
