import { includes } from './includes';


describe( 'includes', () => {
  const array = [ 1, 2, 3 ];

  test( 'can check if the array includes a certain value or not.', () => {
    expect( includes( array, 1 ) ).toBe( true );
    expect( includes( array, 2 ) ).toBe( true );
    expect( includes( array, 3 ) ).toBe( true );

    expect( includes( array, 5 ) ).toBe( false );
    expect( includes( array, 'a' as any ) ).toBe( false );
    expect( includes( array, true as any ) ).toBe( false );
  } );
} );
