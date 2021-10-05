import { removeAttribute } from './removeAttribute';


describe( 'removeAttribute', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="container"></div>';
  } );

  test( 'can remove an attribute from an element.', () => {
    const container = document.getElementById( 'container' );

    container.setAttribute( 'aria-hidden', 'true' );
    container.setAttribute( 'tabindex', '-1' );

    removeAttribute( container, 'aria-hidden' );
    expect( container.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( container.getAttribute( 'tabindex' ) ).not.toBeNull();

    removeAttribute( container, 'tabindex' );
    expect( container.getAttribute( 'tabindex' ) ).toBeNull();
  } );

  test( 'can remove attributes from an element.', () => {
    const container = document.getElementById( 'container' );

    container.setAttribute( 'aria-hidden', 'true' );
    container.setAttribute( 'tabindex', '-1' );

    removeAttribute( container, [ 'aria-hidden', 'tabindex' ] );
    expect( container.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( container.getAttribute( 'tabindex' ) ).toBeNull();
  } );
} );
