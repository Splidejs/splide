import { init } from '../../../test';
import { DEFAULTS } from '../../../constants/defaults';


describe( 'Splide', () => {
  test( 'can merge options to defaults.', () => {
    const splide = init( { width: 200, height: 200 } );
    const { options } = splide;

    expect( options.width ).toBe( 200 );
    expect( options.height ).toBe( 200 );
    expect( options.type ).toBe( DEFAULTS.type );
    expect( options.speed ).toBe( DEFAULTS.speed );
  } );

  test( 'can merge options provided by the data attribute.', () => {
    const data   = { width: 100, height: 100, type: 'loop', waitForTransition: false };
    const splide = init( { width: 200, height: 200 }, { json: JSON.stringify( data ) } );
    const { options } = splide;

    expect( options.width ).toBe( 100 );
    expect( options.height ).toBe( 100 );
    expect( options.type ).toBe( 'loop' );
    expect( options.waitForTransition ).toBe( false );
  } );
} );
