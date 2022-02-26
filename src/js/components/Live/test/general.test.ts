import { ARIA_ATOMIC, ARIA_LIVE } from '../../../constants/attributes';
import { init } from '../../../test';


describe( 'Live', () => {
  test( 'can assign aria-atomic="false" to the list element.', () => {
    const splide = init( { live: true } );
    expect( splide.Components.Elements.list.getAttribute( ARIA_ATOMIC ) ).toBe( 'false' );
  } );

  test( 'can assign aria-live="polite" to the list element.', () => {
    const splide = init( { live: true } );
    expect( splide.Components.Elements.list.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );
  } );

  test( 'can assign aria-live="off" to the list element when the autoplay is `true`.', () => {
    const splide = init( { live: true, autoplay: true } );
    expect( splide.Components.Elements.list.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'can assign aria-live="polite" to the list element when the autoplay is `"pause".`', () => {
    const splide = init( { live: true, autoplay: 'pause' } );
    expect( splide.Components.Elements.list.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );
  } );

  test( 'can change aria-live to "off" when autoplay starts, or to "polite" when autoplay stops.', () => {
    const splide = init( { live: true, autoplay: 'pause' } );
    const { list } = splide.Components.Elements;
    const { play, pause } = splide.Components.Autoplay;

    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    play();
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'off' );

    pause();
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    play();
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'can toggle aria-live by `disable()`', () => {
    const splide = init( { live: true } );
    const { list } = splide.Components.Elements;
    const { disable } = splide.Components.Live;

    disable( true );
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'off' );

    disable( false );
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'polite' );

    disable( true );
    expect( list.getAttribute( ARIA_LIVE ) ).toBe( 'off' );
  } );

  test( 'should do nothing when the `live` option is false.', () => {
    const splide = init( { live: false } );
    const { list } = splide.Components.Elements;
    const { disable } = splide.Components.Live;

    expect( list.getAttribute( ARIA_ATOMIC ) ).toBeNull();
    expect( list.getAttribute( ARIA_LIVE ) ).toBeNull();

    disable( true );
    expect( list.getAttribute( ARIA_LIVE ) ).toBeNull();

    disable( false );
    expect( list.getAttribute( ARIA_LIVE ) ).toBeNull();
  } );
} );