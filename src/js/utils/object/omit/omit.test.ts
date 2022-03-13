import { omit } from './omit';


describe( 'omit', () => {
  function hasOwn( object: object, key: string ): boolean {
    return Object.prototype.hasOwnProperty.call( object, key );
  }
  
  test( 'can delete specified key.', () => {
    const object = { a: 1, b: 2, c: 3 };

    expect( hasOwn( object, 'a' ) ).toBe( true );
    expect( hasOwn( object, 'b' ) ).toBe( true );

    omit( object, 'a' );
    expect( hasOwn( object, 'a' ) ).toBe( false );

    omit( object, 'b' );
    expect( hasOwn( object, 'b' ) ).toBe( false );
  } );

  test( 'can delete specified keys.', () => {
    const object = { a: 1, b: 2, c: 3 };

    omit( object, [ 'a', 'b' ] );
    expect( hasOwn( object, 'a' ) ).toBe( false );
    expect( hasOwn( object, 'b' ) ).toBe( false );
  } );

  test( 'can delete all own enumerable keys.', () => {
    const object = { a: 1, b: 2, c: 3 };

    omit( object );
    expect( hasOwn( object, 'a' ) ).toBe( false );
    expect( hasOwn( object, 'b' ) ).toBe( false );
    expect( hasOwn( object, 'c' ) ).toBe( false );
    expect( Object.keys( object ).length ).toBe( 0 );
  } );

  test( 'should not delete inherited keys.', () => {
    const parent = { a: 1, b: 2, c: 3 };
    const object = Object.create( parent );

    omit( object );

    expect( hasOwn( parent, 'a' ) ).toBe( true );
    expect( hasOwn( parent, 'b' ) ).toBe( true );
    expect( hasOwn( parent, 'c' ) ).toBe( true );

    expect( object.a ).toBe( 1 );
    expect( object.b ).toBe( 2 );
    expect( object.c ).toBe( 3 );
  } );
} );
