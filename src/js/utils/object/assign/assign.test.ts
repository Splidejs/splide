import { assign } from './assign';


describe( 'assign', () => {
  test( 'can assign own enumerable properties of the source object to the target.', () => {
    const object = { a: 1, b: '2' };
    const source = { a: 2, c: true };

    expect( assign( object, source ) ).toStrictEqual( { a: 2, b: '2', c: true } );
  } );

  test( 'should assign a nested object as a reference.', () => {
    const object = { a: { b: 1 } };
    const source = { a: { b: 2 } };
    const assigned = assign( object, source );

    expect( assigned ).toStrictEqual( { a: { b: 2 } } );
    expect( source.a ).toBe( assigned.a );
  } );
} );
