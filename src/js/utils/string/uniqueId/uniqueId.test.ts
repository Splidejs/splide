import { uniqueId } from './uniqueId';


describe( 'uniqueId', () => {
  test( 'can generate a sequential unique ID.', () => {
    expect( uniqueId( 'container-' ) ).toBe( 'container-01' );
    expect( uniqueId( 'container-' ) ).toBe( 'container-02' );

    expect( uniqueId( 'button-' ) ).toBe( 'button-01' );
    expect( uniqueId( 'button-' ) ).toBe( 'button-02' );

    expect( uniqueId( 'container-' ) ).toBe( 'container-03' );
    expect( uniqueId( 'container-' ) ).toBe( 'container-04' );

    expect( uniqueId( 'button-' ) ).toBe( 'button-03' );
    expect( uniqueId( 'button-' ) ).toBe( 'button-04' );
  } );
} );
