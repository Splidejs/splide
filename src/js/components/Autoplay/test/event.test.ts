import { EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY, EVENT_AUTOPLAY_PLAYING } from '../../../constants/events';
import { init, wait } from '../../../test';


describe( 'Autoplay', () => {
  test( 'can emit the event when autoplay begins.', () => {
    const interval     = 1000;
    const splide       = init( { autoplay: 'pause', interval } );
    const callback     = jest.fn();
    const { Autoplay } = splide.Components;

    splide.on( EVENT_AUTOPLAY_PLAY, callback );

    Autoplay.play();
    expect( callback ).toHaveBeenCalledTimes( 1 );

    // The callback won't be called because autoplay has already starts.
    Autoplay.play();
    expect( callback ).toHaveBeenCalledTimes( 1 );

    Autoplay.pause();
    Autoplay.play();
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can emit the event when autoplay is paused.', () => {
    const interval     = 1000;
    const splide       = init( { autoplay: true, interval } );
    const callback     = jest.fn();
    const { Autoplay } = splide.Components;

    splide.on( EVENT_AUTOPLAY_PAUSE, callback );

    Autoplay.pause();
    expect( callback ).toHaveBeenCalledTimes( 1 );

    // The callback won't be called because autoplay has been already paused.
    Autoplay.pause();
    expect( callback ).toHaveBeenCalledTimes( 1 );

    Autoplay.play();
    Autoplay.pause();
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can emit the playing event while the interval timer is ticking.', async () => {
    const splide = init( { autoplay: true, interval: 2000 } );

    let progressRate: number;

    splide.on( EVENT_AUTOPLAY_PLAYING, rate => {
      progressRate = rate;
    } );

    await wait( 1 );
    expect( progressRate ).toBeLessThan( 0.1 );

    // Around 1000ms
    await wait( 1000 );
    expect( progressRate ).toBeGreaterThanOrEqual( 0.5 );
    expect( progressRate ).toBeLessThan( 1 );

    // Around 1600ms
    await wait( 600 );
    expect( progressRate ).toBeGreaterThanOrEqual( 0.8 );
    expect( progressRate ).toBeLessThan( 1 );

    // Around 2000ms
    await wait( 400 );
    expect( progressRate ).toBeLessThan( 0.1 );
  } );
} );
