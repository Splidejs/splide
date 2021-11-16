import { init, wait } from '../../../test';


describe( 'Autoplay', () => {
  test( 'can start autoplay.', async () => {
    const interval          = 1000;
    const intervalAndBuffer = 1100;
    const splide            = init( { autoplay: true, interval, waitForTransition: false } );

    expect( splide.index ).toBe( 0 );

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 1 );

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 2 );
  } );

  test( 'can use the specified interval duration.', async () => {
    const interval          = 2000;
    const intervalAndBuffer = 2100;
    const splide            = init( { autoplay: true, interval, waitForTransition: false } );

    expect( splide.index ).toBe( 0 );

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 1 );

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 2 );
  } );

  test( 'can use the interval duration provided by the data attribute.', async () => {
    const interval = 1000;
    const splide   = init(
      { autoplay: true, interval, waitForTransition: false },
      { dataInterval: [ 0, 2000 ] }
    );

    expect( splide.index ).toBe( 0 );

    await wait( 1100 );
    expect( splide.index ).toBe( 1 );

    await wait( 1100 ); // Should be still 1 because using 2000
    expect( splide.index ).toBe( 1 );

    await wait( 1000 ); // 2100
    expect( splide.index ).toBe( 2 );

    await wait( 1100 ); // Should restore the interval to 1000
    expect( splide.index ).toBe( 3 );
  } );

  test( 'can play/pause autoplay manually.', async () => {
    const interval          = 1000;
    const intervalAndBuffer = 1100;
    const splide            = init( { autoplay: true, interval, waitForTransition: false } );
    const { Autoplay }      = splide.Components;

    expect( splide.index ).toBe( 0 );

    Autoplay.pause();

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 0 );

    Autoplay.play();

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 1 );

    Autoplay.pause();

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 1 );

    Autoplay.play();

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 2 );
  } );

  test( 'can check if autoplay is paused or not.', async () => {
    const splide       = init( { autoplay: true, interval: 1000, waitForTransition: false } );
    const { Autoplay } = splide.Components;

    expect( Autoplay.isPaused() ).toBe( false );

    Autoplay.pause();
    expect( Autoplay.isPaused() ).toBe( true );

    Autoplay.play();
    expect( Autoplay.isPaused() ).toBe( false );
  } );

  test( 'should not start autoplay if the option is `pause`.', async () => {
    const interval          = 1000;
    const intervalAndBuffer = 1100;
    const splide            = init( { autoplay: 'pause', interval, waitForTransition: false } );

    expect( splide.index ).toBe( 0 );

    await wait( intervalAndBuffer );
    expect( splide.index ).toBe( 0 );
  } );
} );
