import { assign } from './assign';


describe( 'assign', () => {
  test( 'can assign own enumerable properties of the source object to the target.', () => {
    const object = { a: 1, b: '2' };
    const source = { a: 2, c: true };
    const assigned = assign( object, source );

    expect( assigned ).toStrictEqual( { a: 2, b: '2', c: true } );
  } );

  test( 'can assign properties of multiple sources to the target.', () => {
    const object  = { a: 1, b: '2' };
    const source1 = { a: 2, c: true };
    const source2 = { d: 3, e: '3' };
    const source3 = { e: Infinity };
    const assigned = assign( object, source1, source2, source3 );

    expect( assigned ).toStrictEqual( { a: 2, b: '2', c: true, d: 3, e: Infinity } );
  } );

  test( 'should assign a nested object as a reference.', () => {
    const object = { a: { b: 1 } };
    const source = { a: { b: 2 } };
    const assigned = assign( object, source );

    expect( assigned ).toStrictEqual( { a: { b: 2 } } );
    expect( source.a ).toBe( assigned.a );
  } );
} );
