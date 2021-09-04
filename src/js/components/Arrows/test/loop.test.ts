import { init } from '../../../test';


describe.each( [ [ 'loop' ], [ 'rewind' ] ] )( 'Arrows in "%s" mode', ( mode: string ) => {
  const type   = mode === 'loop' ? 'loop' : 'slide';
  const rewind = mode === 'rewind';
  const splide = init( { arrows: true, type, rewind, speed: 0 } );
  const { Arrows } = splide.Components;
  const { next, prev } = Arrows.arrows;
  const { i18n } = splide.options;

  test( 'should not disable arrows.', () => {
    splide.go( 0 );

    expect( prev.disabled ).toBe( false );
    expect( next.disabled ).toBe( false );

    splide.go( splide.length - 1 );

    expect( prev.disabled ).toBe( false );
    expect( next.disabled ).toBe( false );
  } );

  test( 'should change the aria-label on the first or last slide.', () => {
    splide.go( 0 );

    expect( prev.getAttribute( 'aria-label' ) ).toBe( i18n.last );
    expect( next.getAttribute( 'aria-label' ) ).toBe( i18n.next );

    splide.go( splide.length - 1 );

    expect( prev.getAttribute( 'aria-label' ) ).toBe( i18n.prev );
    expect( next.getAttribute( 'aria-label' ) ).toBe( i18n.first );
  } );
} );
