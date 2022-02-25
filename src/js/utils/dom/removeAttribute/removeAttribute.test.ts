import { removeAttribute } from './removeAttribute';


describe( 'removeAttribute', () => {
  test( 'can remove an attribute from an element.', () => {
    const div = document.createElement( 'div' );

    div.setAttribute( 'aria-hidden', 'true' );
    div.setAttribute( 'tabindex', '-1' );

    removeAttribute( div, 'aria-hidden' );
    expect( div.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( div.getAttribute( 'tabindex' ) ).not.toBeNull();

    removeAttribute( div, 'tabindex' );
    expect( div.getAttribute( 'tabindex' ) ).toBeNull();
  } );

  test( 'can remove attributes from an element.', () => {
    const div = document.createElement( 'div' );

    div.setAttribute( 'aria-hidden', 'true' );
    div.setAttribute( 'tabindex', '-1' );

    removeAttribute( div, [ 'aria-hidden', 'tabindex' ] );
    expect( div.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( div.getAttribute( 'tabindex' ) ).toBeNull();
  } );

  test( 'can remove attributes from elements.', () => {
    const div1     = document.createElement( 'div1' );
    const div2     = document.createElement( 'div2' );
    const div3     = document.createElement( 'div2' );
    const divs     = [ div1, div2, div3 ];
    const callback = jest.fn();

    divs.forEach( div => {
      div.setAttribute( 'aria-hidden', 'true' );
      div.setAttribute( 'tabindex', '-1' );
    } );

    removeAttribute( divs, [ 'aria-hidden', 'tabindex' ] );

    divs.forEach( div => {
      expect( div.getAttribute( 'aria-hidden' ) ).toBeNull();
      expect( div.getAttribute( 'tabindex' ) ).toBeNull();
      callback();
    } );

    expect( callback ).toHaveBeenCalledTimes( divs.length );
  } );
} );
