import { setAttribute } from './setAttribute';


describe( 'setAttribute', () => {
  test( 'can set an attribute to an element.', () => {
    const div = document.createElement( 'div' );

    setAttribute( div, 'id', 'newId' );
    expect( div.id ).toBe( 'newId' );

    setAttribute( div, 'aria-hidden', true );
    expect( div.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    setAttribute( div, 'tabindex', -1 );
    expect( div.getAttribute( 'tabindex' ) ).toBe( '-1' );
  } );

  test( 'can set an attribute to elements.', () => {
    const div1     = document.createElement( 'div' );
    const div2     = document.createElement( 'div' );
    const div3     = document.createElement( 'div' );
    const divs     = [ div1, div2, div3 ];
    const callback = jest.fn();

    setAttribute( divs, 'aria-hidden', true );
    setAttribute( divs, 'tabindex', -1 );

    divs.forEach( div => {
      expect( div.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
      expect( div.getAttribute( 'tabindex' ) ).toBe( '-1' );
      callback();
    } );

    expect( callback ).toHaveBeenCalledTimes( divs.length );
  } );

  test( 'can set attributes by an object.', () => {
    const div = document.createElement( 'div' );

    setAttribute( div, {
      'aria-role'      : 'presentation',
      'contenteditable': true,
    } );

    expect( div.getAttribute( 'aria-role' ) ).toBe( 'presentation' );
    expect( div.getAttribute( 'contenteditable' ) ).toBe( 'true' );
  } );

  test( 'can remove an attribute by null or an empty string.', () => {
    const div = document.createElement( 'div' );

    div.setAttribute( 'aria-hidden', 'true' );
    div.setAttribute( 'tabindex', '-1' );

    setAttribute( div, 'aria-hidden', '' );
    setAttribute( div, 'tabindex', null );

    expect( div.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( div.getAttribute( 'tabindex' ) ).toBeNull();
  } );
} );
