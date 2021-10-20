import { forOwn } from './forOwn';


describe( 'forOwn', () => {
  test( 'can iterate an object by own enumerable properties.', () => {
    const object = { a: 1, b: 2, c: 3 };
    let counter = 0;

    forOwn( object, ( value, key ) => {
      counter++;
      expect( object[ key ] ).toBe( value );
    } );

    expect( counter ).toBe( Object.keys( object ).length );
  } );

  test( 'can iterate an object from the end.', () => {
    const object = { a: 1, b: 2, c: 3 };
    const values: number[] = [];

    forOwn( object, ( value ) => {
      values.push( value );
    }, true );

    expect( values ).toEqual( [ 3, 2, 1 ] );
  } );

  test( 'should not handle inherited properties.', () => {
    class Constructor {
      a = 1;
      b = 2;
    }

    Constructor.prototype[ 'c' ] = 3;

    const object = {};

    forOwn( new Constructor(), ( value, key ) => {
      object[ key ] = value;
    } );

    expect( object ).toStrictEqual( { a: 1, b: 2 } );
  } );
} );
