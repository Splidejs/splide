import { EVENT_MOVE } from '../../../constants/events';
import { Splide } from '../../../core/Splide/Splide';
import { init } from '../../../test';


describe( 'Sync#sync()', () => {
  test( 'can sync Splide sliders.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init( { speed: 0 }, { id: 'secondary', insertHtml: true, mount: false } );

    primary.sync( secondary ).mount();
    secondary.mount();

    expect( primary.index ).toBe( 0 );
    expect( secondary.index ).toBe( 0 );

    primary.go( 1 );
    expect( primary.index ).toBe( 1 );
    expect( secondary.index ).toBe( 1 );

    primary.go( 4 );
    expect( primary.index ).toBe( 4 );
    expect( secondary.index ).toBe( 4 );

    secondary.go( 0 );
    expect( primary.index ).toBe( 0 );
    expect( secondary.index ).toBe( 0 );

    secondary.go( 5 );
    expect( primary.index ).toBe( 5 );
    expect( secondary.index ).toBe( 5 );
  } );

  test( 'can sync Splide sliders after mount.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init( { speed: 0 }, { id: 'secondary', insertHtml: true, mount: false } );

    primary.mount();
    secondary.mount();
    primary.sync( secondary );

    primary.go( 1 );
    expect( primary.index ).toBe( 1 );
    expect( secondary.index ).toBe( 1 );

    primary.go( 4 );
    expect( primary.index ).toBe( 4 );
    expect( secondary.index ).toBe( 4 );
  } );

  test( 'can sync multiple Splide sliders.', () => {
    const primary = init( { speed: 0 }, { id: 'primary', mount: false } );
    const splides: Splide[] = [];

    Array.from( { length: 5 } ).forEach( ( item, index ) => {
      const secondary = init( { speed: 0 }, { id: `secondary-${ index }`, insertHtml: true, mount: false } );
      splides.push( secondary );
      primary.sync( secondary );
    } );

    primary.mount();
    splides.forEach( splide => splide.mount() );

    primary.go( 1 );
    splides.forEach( splide => {
      expect( splide.index ).toBe( 1 );
    } );

    primary.go( 5 );
    splides.forEach( splide => {
      expect( splide.index ).toBe( 5 );
    } );

    splides[ 3 ].go( 3 );
    expect( primary.index ).toBe( 3 );
    splides.forEach( splide => {
      expect( splide.index ).toBe( 3 );
    } );
  } );

  test( 'should prevent recursive calls of `move` event handlers.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init( { speed: 0 }, { id: 'secondary', insertHtml: true, mount: false } );
    const callback  = jest.fn();

    primary.sync( secondary ).mount();
    secondary.mount();

    primary.on( EVENT_MOVE, callback );

    primary.go( 1 );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    secondary.go( 2 );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );
} );

