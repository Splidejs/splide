import { splice } from './splice';
import ArrayLike = jasmine.ArrayLike;


describe( 'splice', () => {
  let arrayLike: ArrayLike<string>;

  beforeEach( () => {
    arrayLike = { length: 3, 0: '1', 1: '2', 2: '3' };
  } );

  test( 'can delete an item from an array-like object.', () => {
    splice( arrayLike, 1, 1 );
    expect( arrayLike ).toStrictEqual( { length: 2, 0: '1', 1: '3' } );
  } );

  test( 'can add item at the specified position.', () => {
    splice( arrayLike, 1, 0, 'a' );
    expect( arrayLike ).toStrictEqual( { length: 4, 0: '1', 1: 'a', 2: '2', 3: '3' } );
  } );
} );
