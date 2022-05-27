import { init, wait } from '../../../test';
import { BOUNCE_DURATION } from '../../Scroll/constants';


describe( 'Controller#scroll()', () => {
  test( 'can scroll the carousel.', done => {
    const splide = init();
    const { scroll } = splide.Components.Controller;

    scroll( -100, 100, false, () => {
      expect( splide.Components.Move.getPosition() ).toBe( -100 );
      done();
    } );
  } );

  test( 'can update the index after scroll.', async () => {
    const splide = init( { width: 100 } );
    const { scroll } = splide.Components.Controller;

    scroll( -100, 100 );
    await wait( 200 );
    expect( splide.index ).toBe( 1 );

    scroll( -200, 100 );
    await wait( 200 );
    expect( splide.index ).toBe( 2 );
  } );

  test( 'can update the index after the carousel exceeds bounds.', async () => {
    const splide = init( { width: 100 } );
    const { scroll } = splide.Components.Controller;

    scroll( -100, 100 );
    await wait( 200 );
    expect( splide.index ).toBe( 1 );

    // Make the carousel exceed the left limit.
    scroll( 100, 100 );
    await wait( 100 + BOUNCE_DURATION + 100 );
    expect( splide.index ).toBe( 0 );
  } );
} );
