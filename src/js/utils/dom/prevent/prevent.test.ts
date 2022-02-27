import { fire } from '../../../test';
import { prevent } from './prevent';


describe( 'prevent', () => {
  test( 'can prevent the default browser action of an event.', done => {
    window.addEventListener( 'click', e => {
      prevent( e );
      expect( e.defaultPrevented ).toBe( true );
      done();
    } );

    fire( window, 'click', { timeStamp: 123 }, { cancelable: true } );
  } );
} );