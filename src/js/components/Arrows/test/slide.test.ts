import { fire, init } from '../../../test';


describe( 'Arrows', () => {
  const splide = init( { arrows: true, speed: 0 } );
  const { Arrows } = splide.Components;
  const { next, prev } = Arrows.arrows;
  const { i18n } = splide.options;

  test( 'can generate arrows.', () => {
    expect( prev instanceof HTMLButtonElement ).toBe( true );
    expect( next instanceof HTMLButtonElement ).toBe( true );
  } );

  test( 'can navigate the slider.', () => {
    fire( next, 'click' );
    expect( splide.index ).toBe( 1 );

    fire( next, 'click' );
    expect( splide.index ).toBe( 2 );

    fire( prev, 'click' );
    expect( splide.index ).toBe( 1 );

    fire( prev, 'click' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can disable arrows if there is no slide to go to.', () => {
    expect( prev.disabled ).toBe( true );
    expect( next.disabled ).toBe( false );

    // Go to the last slide.
    splide.go( splide.length - 1 );

    expect( prev.disabled ).toBe( false );
    expect( next.disabled ).toBe( true );
  } );

  test( 'can update aria attributes.', () => {
    expect( prev.getAttribute( 'aria-label' ) ).toBe( i18n.prev );
    expect( next.getAttribute( 'aria-label' ) ).toBe( i18n.next );
  } );
} );
