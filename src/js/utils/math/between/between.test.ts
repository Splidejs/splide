import { between } from './between';


describe( 'between', () => {
  test( 'can check a number is between 2 numbers inclusively.', () => {
    expect( between( 0, 0, 1 ) ).toBe( true );
    expect( between( 1, 0, 1 ) ).toBe( true );

    expect( between( 1, 2, 3 ) ).toBe( false );

    expect( between( 1, 0, 2 ) ).toBe( true );
    expect( between( 1, 2, 0 ) ).toBe( true );
  } );

  test( 'can check a number is between 2 numbers exclusively.', () => {
    expect( between( 0, 0, 1, true ) ).toBe( false );
    expect( between( 1, 0, 1, true ) ).toBe( false );

    expect( between( 1, 2, 3, true ) ).toBe( false );

    expect( between( 1, 0, 2, true ) ).toBe( true );
    expect( between( 1, 2, 0, true ) ).toBe( true );
  } );
} );
