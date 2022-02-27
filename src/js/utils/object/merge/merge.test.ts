import { merge } from './merge';


describe( 'merge', () => {
  test( 'can merge 2 objects.', () => {
    const object = { a: 1, b: '2' };
    const source = { a: 2, c: true };

    expect( merge( object, source ) ).toStrictEqual( { a: 2, b: '2', c: true } );

    // Should not change the source
    expect( source ).toStrictEqual( { a: 2, c: true } );
  } );

  test( 'can merge 2 objects recursively.', () => {
    const object = { a: 1, b: { c: 2, d: 3 } };
    const source = { b: { d: 4, e: 5 }, f: true };

    expect( merge( object, source ) ).toStrictEqual( {
      a: 1,
      b: { c: 2, d: 4, e: 5 },
      f: true,
    } );
  } );

  test( 'can merge multiple objects recursively.', () => {
    const object  = { a: 1, b: { c: 2, d: 3 } };
    const source1 = { b: { d: 4, e: 5 }, f: true };
    const source2 = { b: { d: '4', g: 6 }, h: [ 1, 2, 3 ] };
    const source3 = { h: [ 4, 5, 6 ], i: Infinity };
    const source4 = { a: '1' };
    const merged  = merge( object, source1, source2, source3, source4 );

    expect( merged ).toStrictEqual( {
      a: '1',
      b: { c: 2, d: '4', e: 5, g: 6 },
      f: true,
      h: [ 4, 5, 6 ],
      i: Infinity,
    } );
  } );
} );
