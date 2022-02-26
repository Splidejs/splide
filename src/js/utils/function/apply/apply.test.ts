import { apply } from './apply';


describe( 'apply', () => {
  test( 'can bind arguments to the function.', () => {
    function sum( a: number, b: number, c = 0, d = 0 ): number {
      return a + b + c + d;
    }

    // The type should be ( b: number, c?: number, d?: number ) => number.
    const sum1 = apply( sum, 1 );
    const sum2 = apply( sum, 1, 1 );
    const sum3 = apply( sum, 1, 1, 1 );
    const sum4 = apply( sum, 1, 1, 1, 1 );

    expect( sum1( 1, 1, 1 ) ).toBe( 4 );
    expect( sum2( 1, 1 ) ).toBe( 4 );
    expect( sum3( 1 ) ).toBe( 4 );
    expect( sum4() ).toBe( 4 );

    expect( sum1( 2 ) ).toBe( 3 ); // 1, 2, 0, 0
    expect( sum1( 2, 2 ) ).toBe( 5 ); // 1, 2, 2, 0
    expect( sum1( 2, 2, 2 ) ).toBe( 7 ); // 1, 2, 2, 2
  } );
} );