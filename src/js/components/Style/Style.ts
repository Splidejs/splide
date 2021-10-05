import { BaseComponent } from '../../types';
import { create, find, isHTMLElement, remove } from '../../utils';


/**
 * The interface for the Style component.
 *
 * @since 3.0.0
 */
export interface StyleComponent extends BaseComponent {
  rule( selector: string, prop: string, value: string | number ): void;
  ruleBy( target: string | HTMLElement, prop: string, value: string | number ): void;
}

/**
 * The component for managing styles of the slider.
 *
 * @since 3.0.0
 *
 * @return A Style component object.
 */
export function Style(): StyleComponent {
  /**
   * The style element for the slider.
   */
  let style: HTMLStyleElement;

  /**
   * The CSSStyleSheet object of the created style element.
   */
  let sheet: CSSStyleSheet;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    style = create( 'style', {}, document.head );
    sheet = style.sheet;
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    remove( style );
    sheet = null;
  }

  /**
   * Registers the style for the selector.
   *
   * @param selector - A selector string.
   * @param prop     - A CSS property, accepting the camel case.
   * @param value    - A CSS value.
   */
  function rule( selector: string, prop: string, value: string | number ): void {
    const { cssRules } = sheet;
    const cssRule = find( cssRules, cssRule => isCSSStyleRule( cssRule ) && cssRule.selectorText === selector )
      || cssRules[ sheet.insertRule( `${ selector }{}`, 0 ) ];

    if ( isCSSStyleRule( cssRule ) ) {
      const { style } = cssRule;
      value = `${ value }`;

      if ( style[ prop ] !== value ) {
        style[ prop ] = value;
      }
    }
  }

  /**
   * Registers the style by the element or the ID.
   *
   * @param target - A target element or ID.
   * @param prop   - A CSS property, accepting the camel case.
   * @param value  - A CSS value.
   */
  function ruleBy( target: string | HTMLElement, prop: string, value: string | number ): void {
    rule( `#${ isHTMLElement( target ) ? target.id : target }`, prop, value );
  }

  /**
   * Checks if the provided rule is a CSSStyleRule instance or not.
   *
   * @param cssRule - An instance to check.
   *
   * @return `true` if the cssRule is an instance of CSSStyleRule, or otherwise `false`.
   */
  function isCSSStyleRule( cssRule: CSSRule ): cssRule is CSSStyleRule {
    return cssRule instanceof CSSStyleRule;
  }

  return {
    mount,
    destroy,
    rule,
    ruleBy,
  };
}
