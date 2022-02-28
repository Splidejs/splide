import { EventBinder } from '../EventBinder';


describe( 'EventBinder#dispatch()', () => {
  const div = document.createElement( 'div' );

  test( 'can dispatch a custom event.', () => {
    const { dispatch } = EventBinder();
    const callback = jest.fn();

    div.addEventListener( 'myEvent', callback );
    dispatch( div, 'myEvent' );
    expect( callback ).toHaveBeenCalled();
  } );

  test( 'can dispatch a custom event with a detail property.', done => {
    const { dispatch } = EventBinder();
    const array = [ 1, 2 ];

    div.addEventListener( 'myEvent', e => {
      if ( e instanceof CustomEvent ) {
        expect( e.detail.a ).toBe( 1 );
        expect( e.detail.b ).toBe( 'b' );
        expect( e.detail.c ).toBe( array ); // Reference
        done();
      } else {
        fail();
      }
    } );

    dispatch( div, 'myEvent', { a: 1, b: 'b', c: array } );
  } );
} );
