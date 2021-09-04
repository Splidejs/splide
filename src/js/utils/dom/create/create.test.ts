import { create } from './create';


describe( 'create', () => {
  test( 'can create an element by a tag name.', () => {
    const div = create( 'div' );
    const iframe = create( 'iframe' );

    expect( div instanceof HTMLDivElement ).toBe( true );
    expect( iframe instanceof HTMLIFrameElement ).toBe( true );
  } );

  test( 'can create an element with setting attributes.', () => {
    const iframe = create( 'iframe', { width: 100, height: 200 } );

    expect( iframe.getAttribute( 'width' ) ).toBe( '100' );
    expect( iframe.getAttribute( 'height' ) ).toBe( '200' );
  } );
} );
