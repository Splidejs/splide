import { style } from './style';


describe( 'styles', () => {
  test( 'can set an inline style', () => {
    const div = document.createElement( 'div' );
    style( div, 'color', 'red' );
    style( div, 'backgroundColor', 'white' );
    style( div, 'fontSize', '1rem' );

    expect( div.style.color ).toBe( 'red' );
    expect( div.style.backgroundColor ).toBe( 'white' );
    expect( div.style.fontSize ).toBe( '1rem' );
  } );

  test( 'can return a computed style', () => {
    const div = document.createElement( 'div' );
    div.style.color = 'red';
    expect( style( div, 'color' ) ).toBe( 'red' );
  } );
} );
