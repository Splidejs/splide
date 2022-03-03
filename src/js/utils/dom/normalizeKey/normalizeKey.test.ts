import { fire } from '../../../test';
import { NORMALIZATION_MAP, normalizeKey } from './normalizeKey';


describe( 'normalizeKey', () => {
  test( 'can normalize a key into a standard name.', () => {
    const keys     = Object.keys( NORMALIZATION_MAP );
    const callback = jest.fn();

    keys.forEach( key => {
      expect( normalizeKey( key ) ).toBe( NORMALIZATION_MAP[ key ] );
      callback();
    } );

    expect( callback ).toHaveBeenCalled();
  } );

  test( 'can return a normalized key from a Keyboard event object.', done => {
    window.addEventListener( 'keydown', e => {
      expect( normalizeKey( e ) ).toBe( 'ArrowUp' );
      done();
    } );

    fire( window, 'keydown', { key: 'Up' } );
  } );

  test( 'should do the provided key as is if the normalization map does not include the passed key.', () => {
    expect( normalizeKey( 'a' ) ).toBe( 'a' );
    expect( normalizeKey( 'F1' ) ).toBe( 'F1' );
  } );
} );