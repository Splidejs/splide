import { setAttribute } from './setAttribute';


describe( 'setAttribute', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="container"></div>';
  } );

  test( 'can set an attribute to an element.', () => {
    const container = document.getElementById( 'container' );

    setAttribute( container, 'id', 'newId' );
    expect( container.id ).toBe( 'newId' );

    setAttribute( container, 'aria-hidden', true );
    expect( container.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    setAttribute( container, 'tabindex', -1 );
    expect( container.getAttribute( 'tabindex' ) ).toBe( '-1' );
  } );

  test( 'can set attributes by an object.', () => {
    const container = document.getElementById( 'container' );

    setAttribute( container, {
      'aria-role'      : 'presentation',
      'contenteditable': true,
    } );

    expect( container.getAttribute( 'aria-role' ) ).toBe( 'presentation' );
    expect( container.getAttribute( 'contenteditable' ) ).toBe( 'true' );
  } );
} );
