import { getAttribute } from './getAttribute';


describe( 'getAttribute', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="container"></div>';
  } );

  test( 'can set an attribute to an element.', () => {
    const container = document.getElementById( 'container' );

    container.setAttribute( 'aria-hidden', 'true' );
    container.setAttribute( 'tabindex', '-1' );

    expect( getAttribute( container, 'id' ) ).toBe( 'container' );
    expect( getAttribute( container, 'aria-hidden' ) ).toBe( 'true' );
    expect( getAttribute( container, 'tabindex' ) ).toBe( '-1' );
  } );
} );
