import { Splide } from '../../../core/Splide/Splide';
import { fire, init, wait } from '../../../test';
import { AutoplayComponent } from '../Autoplay';


describe( 'Autoplay', () => {
  describe.each( [
    [ 'mouseenter', 'mouseleave' ],
    [ 'focusin', 'focusout' ],
  ] )( 'autoToggle', ( pauseEvent, resumeEvent ) => {
    const interval          = 1000;
    const intervalAndBuffer = 1100;

    let splide: Splide;
    let Autoplay: AutoplayComponent;

    beforeEach( () => {
      splide   = init( { autoplay: true, interval } );
      Autoplay = splide.Components.Autoplay;
    } );

    test( `can pause autoplay when the slider detects ${ pauseEvent }.`, async () => {
      expect( splide.index ).toBe( 0 );

      fire( splide.root, pauseEvent );
      expect( Autoplay.isPaused() ).toBe( true );

      await wait( intervalAndBuffer );
      expect( splide.index ).toBe( 0 );

      await wait( intervalAndBuffer );
      expect( splide.index ).toBe( 0 );
    } );

    test( `can replay autoplay when the slider detects ${ resumeEvent } with resetting the progress.`, async () => {
      expect( splide.index ).toBe( 0 );

      // Wait for 500ms
      await wait( interval / 2 );
      fire( splide.root, pauseEvent );
      expect( Autoplay.isPaused() ).toBe( true );

      await wait( intervalAndBuffer );
      expect( splide.index ).toBe( 0 );

      fire( splide.root, resumeEvent );
      expect( Autoplay.isPaused() ).toBe( false );

      // Remaining around 500ms
      await wait( ( interval / 2 ) + 100 );

      // Still 0 because the progress has been reset
      expect( splide.index ).toBe( 0 );

      // Wait for rest 500ms
      await wait( ( interval / 2 ) );
      expect( splide.index ).toBe( 1 );
    } );

    test( `can resume autoplay when the slider detects ${ resumeEvent } without resetting the progress.`, async () => {
      splide   = init( { autoplay: true, interval, resetProgress: false } );
      Autoplay = splide.Components.Autoplay;

      expect( splide.index ).toBe( 0 );

      // Wait for 500ms
      await wait( interval / 2 );
      fire( splide.root, pauseEvent );
      expect( Autoplay.isPaused() ).toBe( true );

      await wait( intervalAndBuffer );
      expect( splide.index ).toBe( 0 );

      fire( splide.root, resumeEvent );
      expect( Autoplay.isPaused() ).toBe( false );

      // Remaining around 500ms
      await wait( ( interval / 2 ) + 100 );
      expect( splide.index ).toBe( 1 );
    } );
  } );

  test( 'should not pause autoplay if the `pauseOnHover` is false.', () => {
    const splide       = init( { autoplay: true, pauseOnHover: false } );
    const { root }     = splide;
    const { Autoplay } = splide.Components;

    expect( Autoplay.isPaused() ).toBe( false );

    fire( root, 'mouseenter' );

    expect( Autoplay.isPaused() ).toBe( false );
  } );

  test( 'should not pause autoplay if the `pauseOnFocus` is false.', () => {
    const splide       = init( { autoplay: true, pauseOnFocus: false } );
    const { root }     = splide;
    const { Autoplay } = splide.Components;

    expect( Autoplay.isPaused() ).toBe( false );

    fire( root, 'focusin' );

    expect( Autoplay.isPaused() ).toBe( false );
  } );

  test( 'should not start autoplay on `mouseleave` if the slider has focus.', () => {
    const splide       = init( { autoplay: true } );
    const { root }     = splide;
    const { Autoplay } = splide.Components;

    fire( root, 'mouseenter' );
    fire( root, 'focusin' );

    expect( Autoplay.isPaused() ).toBe( true );

    fire( root, 'mouseleave' );
    expect( Autoplay.isPaused() ).toBe( true );

    fire( root, 'focusout' );
    expect( Autoplay.isPaused() ).toBe( false );
  } );

  test( 'should not start autoplay on `focusout` if the mouse is on the slider.', () => {
    const splide       = init( { autoplay: true } );
    const { root }     = splide;
    const { Autoplay } = splide.Components;

    fire( root, 'mouseenter' );
    fire( root, 'focusin' );

    expect( Autoplay.isPaused() ).toBe( true );

    fire( root, 'focusout' );
    expect( Autoplay.isPaused() ).toBe( true );

    fire( root, 'mouseleave' );
    expect( Autoplay.isPaused() ).toBe( false );
  } );

  test( 'should not start autoplay on `focusout` and `mouseleave` if autoplay is manually paused.', () => {
    const splide       = init( { autoplay: true } );
    const { root }     = splide;
    const { Autoplay } = splide.Components;

    // Manually pause autoplay.
    Autoplay.pause();
    expect( Autoplay.isPaused() ).toBe( true );

    fire( root, 'mouseenter' );
    fire( root, 'focusin' );

    fire( root, 'mouseleave' );
    fire( root, 'focusout' );

    // These events should not start autoplay.
    expect( Autoplay.isPaused() ).toBe( true );
  } );
} );

