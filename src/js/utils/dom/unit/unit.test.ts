import { unit } from './unit';


describe( 'unit', () => {
  test( 'can append `px` if the value is number.', () => {
    expect( unit( 1 ) ).toBe( '1px' );
    expect( unit( 1.8 ) ).toBe( '1.8px' );
  } );

  test( 'should return the value itself if it is string.', () => {
    expect( unit( '10vh' ) ).toBe( '10vh' );
    expect( unit( '10em' ) ).toBe( '10em' );
  } );
} );
