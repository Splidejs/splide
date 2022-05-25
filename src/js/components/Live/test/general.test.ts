import { ARIA_ATOMIC, ARIA_LIVE, ARIA_BUSY } from '../../../constants/attributes';
import { CLASS_SR } from '../../../constants/classes';
import { init, wait } from '../../../test';


describe( 'Live', () => {
  test( 'can append a SR text and add aria-busy="true" to the track element after move.', () => {
    const splide = init( { live: true, speed: 0 } );
    const { track } = splide.Components.Elements;

    splide.go( 1 );
    expect( track.getElementsByClassName( CLASS_SR ).length ).toBe( 1 );
    expect( track.getAttribute( ARIA_BUSY ) ).toBe( 'true' );
  } );

  test( 'can remove a SR text and aria-busy from the track element.', async () => {
    const splide = init( { live: true, speed: 0 } );
    const { track } = splide.Components.Elements;

    splide.go( 1 );

    await wait( 200 );
    expect( track.getElementsByClassName( CLASS_SR ).length ).toBe( 0 );
    expect( track.getAttribute( ARIA_BUSY ) ).toBe( 'false' );
  } );

  test( 'can assign aria-live="polite" and aria-atomic="true" to the list element.', () => {
    const splide = init( { live: true } );
    const { track } = splide.Components.Elements;

    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );
    expect( track.getAttribute( ARIA_ATOMIC ) ).toBe( 'true' );
  } );

  test( 'can remove aria attributes on destroy.', () => {
    const splide = init( { live: true } );
    const { track } = splide.Components.Elements;

    splide.destroy();

    expect( track.getAttribute( ARIA_LIVE ) ).toBeNull();
    expect( track.getAttribute( ARIA_ATOMIC ) ).toBeNull();
    expect( track.getAttribute( ARIA_BUSY ) ).toBeNull();
  } );

  test( 'should assign aria attribute again on refresh.', () => {
    const splide = init( { live: true } );
    const { track } = splide.Components.Elements;

    splide.refresh();

    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );
    expect( track.getAttribute( ARIA_ATOMIC ) ).toBe( 'true' );
  } );

  test( 'can assign aria-live="off" to the list element when the autoplay is `true`.', () => {
    const splide = init( { live: true, autoplay: true } );
    expect( splide.Components.Elements.track.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'can assign aria-live="polite" to the list element when the autoplay is `"pause".`', () => {
    const splide = init( { live: true, autoplay: 'pause' } );
    expect( splide.Components.Elements.track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );
  } );

  test( 'can change aria-live to "off" when autoplay starts, or to "polite" when autoplay stops.', () => {
    const splide = init( { live: true, autoplay: 'pause' } );
    const { track } = splide.Components.Elements;
    const { play, pause } = splide.Components.Autoplay;

    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    play();
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'off' );

    pause();
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    play();
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'can toggle aria-live by `disable()`', () => {
    const splide = init( { live: true } );
    const { track } = splide.Components.Elements;
    const { disable } = splide.Components.Live;

    disable( true );
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'off' );

    disable( false );
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    disable( true );
    expect( track.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'should do nothing when the `live` option is false.', () => {
    const splide = init( { live: false } );
    const { track } = splide.Components.Elements;
    const { disable } = splide.Components.Live;

    expect( track.getAttribute( ARIA_LIVE ) ).toBeNull();

    disable( true );
    expect( track.getAttribute( ARIA_LIVE ) ).toBeNull();

    disable( false );
    expect( track.getAttribute( ARIA_LIVE ) ).toBeNull();
  } );
} );