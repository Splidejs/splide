import { empty } from './empty';


describe( 'empty', () => {
  test( 'can empty an array.', () => {
    const array = [ 1, 2, 3 ];
    empty( array );

    expect( array[ 0 ] ).toBeUndefined();
    expect( array.length ).toBe( 0 );
  } );
} );
