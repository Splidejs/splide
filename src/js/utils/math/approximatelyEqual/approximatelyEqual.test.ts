import { approximatelyEqual } from './approximatelyEqual';


describe( 'approximatelyEqual', () => {
  test( 'can tell if 2 numbers are approximately equal or not.', () => {
    expect( approximatelyEqual( 1, 1, 1 ) ).toBe( true );
    expect( approximatelyEqual( 1, 0.9, 1 ) ).toBe( true );
    expect( approximatelyEqual( 1, 1.9, 1 ) ).toBe( true );

    expect( approximatelyEqual( 1, 2, 1 ) ).toBe( false );
    expect( approximatelyEqual( 1, 0, 1 ) ).toBe( false );

    expect( approximatelyEqual( 1, 2, 2 ) ).toBe( true );
    expect( approximatelyEqual( 1, 0, 2 ) ).toBe( true );
  } );
} );
