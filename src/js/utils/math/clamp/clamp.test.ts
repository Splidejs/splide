import { clamp } from './clamp';


describe( 'clamp', () => {
  test( 'can clamp a number', () => {
    expect( clamp( 0, 0, 1 ) ).toBe( 0 );
    expect( clamp( 1, 0, 1 ) ).toBe( 1 );

    expect( clamp( 1, 2, 3 ) ).toBe( 2 );
    expect( clamp( 1, 0, 0 ) ).toBe( 0 );

    expect( clamp( 3, 0, 1 ) ).toBe( 1 );
    expect( clamp( 3, 4, 5 ) ).toBe( 4 );
  } );
} );
