import { CLASS_ACTIVE } from '../../../constants/classes';
import { fire, init } from '../../../test';


describe( 'Autoplay toggle button.', () => {
  test( 'should be active if `autoplay` option is `true`.', () => {
    const splide = init( { autoplay: true }, { autoplay: true } );
    const { toggle } = splide.Components.Elements;

    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should be inactive if `autoplay` option is `false`.', () => {
    const splide = init( { autoplay: 'pause' }, { autoplay: true } );
    const { toggle } = splide.Components.Elements;

    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );

  test( 'can start/pause autoplay and update the button status.', () => {
    const splide = init( { autoplay: true }, { autoplay: true } );
    const { Autoplay } = splide.Components;
    const { toggle } = splide.Components.Elements;

    expect( Autoplay.isPaused() ).toBe( false );

    fire( toggle, 'click' );
    expect( Autoplay.isPaused() ).toBe( true );
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( false );

    fire( toggle, 'click' );
    expect( Autoplay.isPaused() ).toBe( false );
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( true );

    fire( toggle, 'click' );
    expect( Autoplay.isPaused() ).toBe( true );
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );

  test( 'should not be inactive("Play" button) when the autoplay is just paused.', () => {
    const splide = init( { autoplay: true }, { autoplay: true } );
    const { Autoplay } = splide.Components;
    const { toggle } = splide.Components.Elements;

    expect( Autoplay.isPaused() ).toBe( false );

    fire( splide.Components.Elements.root, 'focusin' );
    expect( Autoplay.isPaused() ).toBe( true ); // Paused but not stopped
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( true );

    // Clicks the "pause" button, which stops the autoplay
    fire( toggle, 'click' );
    expect( Autoplay.isPaused() ).toBe( true );
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( false );

    // Resumes autoplay but it still stops
    fire( splide.Components.Elements.root, 'focusout' );
    expect( Autoplay.isPaused() ).toBe( true );
    expect( toggle.classList.contains( CLASS_ACTIVE ) ).toBe( false );
  } );
} );
