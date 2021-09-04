import { rect } from './rect';


describe( 'rect', () => {
  test( 'can return a DOMRect object.', () => {
    const div = document.createElement( 'div' );

    expect( rect( div ).width ).toBe( 0 );
    expect( rect( div ).left ).toBe( 0 );
  } );
} );
