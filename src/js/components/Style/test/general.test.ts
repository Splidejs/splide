import { findRuleBy, init } from '../../../test';


describe( 'Style', () => {
  test( 'can create a style element and append it to the head element.', () => {
    const splide = init( { width: 100 } );
    const style  = document.head.lastElementChild;

    expect( style instanceof HTMLStyleElement ).toBe( true );

    if ( style instanceof HTMLStyleElement ) {
      const { cssRules } = style.sheet;

      const rootRule = Array.prototype.find.call( cssRules, ( cssRule: CSSStyleRule ) => {
        return cssRule.selectorText === `#${ splide.root.id }`;
      } );

      expect( rootRule ).not.toBeUndefined();
      expect( rootRule.style.maxWidth ).toBe( '100px' );
    }

    splide.destroy();
  } );

  test( 'can add a style by a selector.', () => {
    const splide = init();
    const { rule } = splide.Components.Style;

    rule( `#${ splide.root.id }`, 'opacity', 0.5 );

    const rules = findRuleBy( splide.root );

    expect( rules.style.opacity ).toBe( '0.5' );

    splide.destroy();
  } );

  test( 'can add a style by an element.', () => {
    const splide = init();
    const { ruleBy } = splide.Components.Style;

    ruleBy( splide.root, 'opacity', 0.4 );

    const rules = findRuleBy( splide.root );

    expect( rules.style.opacity ).toBe( '0.4' );

    splide.destroy();
  } );

  test( 'can remove the style element on destroy.', () => {
    const splide = init();

    expect( document.head.lastElementChild instanceof HTMLStyleElement ).toBe( true );

    splide.destroy();
    expect( document.head.lastElementChild ).toBeNull();
  } );
} );
