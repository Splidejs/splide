import { style } from './style';


describe( 'styles', () => {
  test( 'can set inline styles by an object literal.', () => {
    const div = document.createElement( 'div' );
    style( div, { color: 'red', backgroundColor: 'white', fontSize: '1rem' } );

    expect( div.style.color ).toBe( 'red' );
    expect( div.style.backgroundColor ).toBe( 'white' );
    expect( div.style.fontSize ).toBe( '1rem' );
  } );
} );
