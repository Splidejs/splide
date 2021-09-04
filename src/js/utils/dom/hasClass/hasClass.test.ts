import { hasClass } from './hasClass';


describe( 'hasClass', () => {
  test( 'can return true if the element contains the specified class.', () => {
    const container = document.createElement( 'div' );
    container.classList.add( 'active' );
    container.classList.add( 'visible' );

    expect( hasClass( container, 'active' ) ).toBe( true );
    expect( hasClass( container, 'visible' ) ).toBe( true );
  } );

  test( 'can return false if the element does not contain the specified class.', () => {
    const container = document.createElement( 'div' );

    expect( hasClass( container, 'active' ) ).toBe( false );
    expect( hasClass( container, 'visible' ) ).toBe( false );
  } );
} );
