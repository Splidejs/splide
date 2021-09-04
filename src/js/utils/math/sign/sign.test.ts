import { sign } from './sign';


describe( 'sign', () => {
  test( 'can return the sign of the number', () => {
    expect( sign( 0 ) ).toBe( 0 );
    expect( sign( 1 ) ).toBe( 1 );
    expect( sign( -1 ) ).toBe( -1 );

    expect( sign( 100 ) ).toBe( 1 );
    expect( sign( -100 ) ).toBe( -1 );

    expect( sign( 0.5 ) ).toBe( 1 );
    expect( sign( -0.5 ) ).toBe( -1 );

    expect( sign( Infinity ) ).toBe( 1 );
    expect( sign( -Infinity ) ).toBe( -1 );
  } );
} );
