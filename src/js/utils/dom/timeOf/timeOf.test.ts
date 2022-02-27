import { fire } from '../../../test';
import { timeOf } from './timeOf';


describe( 'timeOf', () => {
  test( 'can extract a timestamp from an event object.', done => {
    window.addEventListener( 'click', e => {
      expect( timeOf( e ) ).toBe( 123 );
      done();
    } );

    fire( window, 'click', { timeStamp: 123 } );
  } );
} );