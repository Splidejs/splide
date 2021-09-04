import { push } from './push';


describe( 'push', () => {
  test( 'can push an item to an array.', () => {
    expect( push( [], 1 ) ).toEqual( [ 1 ] );
    expect( push( [ 1 ], 2 ) ).toEqual( [ 1, 2 ] );
  } );

  test( 'can push items to an array.', () => {
    expect( push( [], [ 1, 2, 3 ] ) ).toEqual( [ 1, 2, 3 ] );
    expect( push( [ 1, 2, 3 ], [ 4, 5, 6 ] ) ).toEqual( [ 1, 2, 3, 4, 5, 6 ] );
  } );

  test( 'should return the provided array itself.', () => {
    const array: number[] = [];
    expect( push( array, 1 ) ).toBe( array );
  } );
} );
