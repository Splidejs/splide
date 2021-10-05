import { pad } from './pad';


describe( 'pad', () => {
  test( 'can pad a number with 0.', () => {
    expect( pad( 1 ) ).toBe( '01' );
    expect( pad( 5 ) ).toBe( '05' );
  } );

  test( 'should not pad if the number is greater than 9.', () => {
    expect( pad( 10 ) ).toBe( '10' );
    expect( pad( 11 ) ).toBe( '11' );
  } );
} );
