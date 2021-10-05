import { init, wait } from '../../../test';
import { BASE_VELOCITY, BOUNCE_DURATION } from '../constants';


describe( 'Scroll', () => {
  test( 'can scroll the slider to the destination.', async () => {
    const splide   = init();
    const duration = 100;

    // Waiting for the initial reposition. It will cancel scrolling.
    await wait( 100 );

    splide.Components.Scroll.scroll( -100, duration );

    await wait( duration + 10 );

    expect( Math.round( splide.Components.Move.getPosition() ) ).toBe( -100 );

    splide.destroy();
  } );

  test( 'can scroll the slider to the destination in specified duration.', async () => {
    const splide   = init();
    const duration = 200;
    const { getPosition } = splide.Components.Move;

    await wait( 100 );

    splide.Components.Scroll.scroll( -100, duration );

    await wait( duration / 2 );

    expect( getPosition() ).toBeGreaterThan( -100 );

    await wait( duration / 2 + 10 );

    expect( Math.round( getPosition() ) ).toBe( -100 );

    splide.destroy();
  } );

  test( 'can constrain the position when the slider goes over the bounds.', async () => {
    const splide   = init();
    const duration = 100;

    // Trying to run over the bounds by providing the positive number as the distance.
    splide.Components.Scroll.scroll( 100, duration );

    await wait( duration + BOUNCE_DURATION + 100 );

    expect( Math.round( splide.Components.Move.getPosition() ) ).toBe( 0 );

    splide.destroy();
  } );

  test( 'can vary the duration according to the distance if the time is not provided.', async () => {
    const splide      = init();
    const destination = -1000;
    const { getPosition } = splide.Components.Move;

    // Velocity: px/ms, t[ms] = x/v
    const expectedDuration = Math.abs( destination / BASE_VELOCITY );

    splide.Components.Scroll.scroll( destination );

    await wait( expectedDuration / 2 );

    expect( getPosition() ).toBeGreaterThan( destination );

    await wait( expectedDuration / 2 + 100 );

    expect( Math.round( getPosition() ) ).toBe( destination );

    splide.destroy();
  } );
} );
