import { Options } from '../../types';
import { forOwn } from '../../utils';


interface Styles {
  [ breakpoint: string ]: {
    [ selector: string ]: Record<string, string | number>
  };
}

/**
 * The class for generating styles as a string.
 *
 * @since 3.0.0
 */
export class Style {
  /**
   * The collection of registered styles categorized by each breakpoint.
   */
  private readonly styles: Styles = {};

  /**
   * The ID of the slider.
   */
  private readonly id: string;

  /**
   * Holds options.
   */
  private readonly options: Options;

  /**
   * The Style constructor.
   *
   * @param id      - A slider ID.
   * @param options - Options.
   */
  constructor( id: string, options: Options ) {
    this.id      = id;
    this.options = options;
  }

  /**
   * Registers a CSS rule.
   *
   * @param selector - A selector.
   * @param prop
   * @param value
   * @param breakpoint
   */
  rule( selector: string, prop: string, value: string | number, breakpoint?: string ): void {
    breakpoint = breakpoint || 'default';
    const selectors = ( this.styles[ breakpoint ] = this.styles[ breakpoint ] || {} );
    const styles    = ( selectors[ selector ] = selectors[ selector ] || {} );
    styles[ prop ] = value;
  }

  /**
   * Builds styles as a single string.
   *
   * @return Built styles.
   */
  build(): string {
    let css = '';

    if ( this.styles.default ) {
      css += this.buildSelectors( this.styles.default );
    }

    Object.keys( this.styles )
      .sort( ( n, m ) => this.options.mediaQuery === 'min' ? +n - +m : +m - +n )
      .forEach( breakpoint => {
        if ( breakpoint !== 'default' ) {
          css += `@media screen and (max-width: ${ breakpoint }px) {`;
          css += this.buildSelectors( this.styles[ breakpoint ] );
          css += `}`;
        }
      } );

    return css;
  }

  /**
   * Builds styles for each breakpoint.
   *
   * @param selectors - An object with styles.
   *
   * @return Built styles.
   */
  private buildSelectors( selectors: Record<string, Record<string, string | number>> ): string {
    let css = '';

    forOwn( selectors, ( styles, selector ) => {
      selector = `#${ this.id } ${ selector }`.trim();
      css += `${ selector } {`;

      forOwn( styles, ( value, prop ) => {
        if ( value || value === 0 ) {
          css += `${ prop }: ${ value };`;
        }
      } );

      css += '}';
    } );

    return css;
  }
}
