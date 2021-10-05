import { display } from './display';


describe( 'display', () => {
  test( 'can set a new display value.', () => {
    const div = document.createElement( 'div' );

    display( div, 'none' );
    expect( div.style.display ).toBe( 'none' );

    display( div, 'flex' );
    expect( div.style.display ).toBe( 'flex' );

    display( div, '' );
    expect( div.style.display ).toBe( '' );
  } );
} );
