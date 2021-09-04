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
} );
