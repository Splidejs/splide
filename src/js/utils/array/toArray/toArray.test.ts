import { toArray } from './toArray';


describe( 'toArray', () => {
  test( 'can push a provided value into an array.', () => {
    expect( toArray( 1 ) ).toEqual( [ 1 ] );
    expect( toArray( true ) ).toEqual( [ true ] );
    expect( toArray( { a: 1 } ) ).toStrictEqual( [ { a: 1 } ] );
  } );

  test( 'should return a provided value itself if it is already an array.', () => {
    const array = [ 1 ];
    expect( toArray( array ) ).toBe( array );
  } );
} );
