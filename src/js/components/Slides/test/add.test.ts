import { init } from '../../../test';


describe( 'Slides#add()', () => {
  test( 'can append a new element to the slider.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const slide = document.createElement( 'div' );

    Slides.add( slide );

    expect( Slides.getAt( Slides.getLength() - 1 ).slide ).toBe( slide );
  } );

  test( 'can append elements to the slider.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const slide1 = document.createElement( 'div' );
    const slide2 = document.createElement( 'div' );

    Slides.add( [ slide1, slide2 ] );

    expect( Slides.getAt( Slides.getLength() - 2 ).slide ).toBe( slide1 );
    expect( Slides.getAt( Slides.getLength() - 1 ).slide ).toBe( slide2 );
  } );

  test( 'can append a new slide by HTML.', () => {
    const splide = init();
    const { add, getAt, getLength } = splide.Components.Slides;

    add( [ '<div class="slide1">' ] );

    expect( getAt( getLength() - 1 ).slide.classList.contains( 'slide1' ) ).toBe( true );
  } );

  test( 'can append new slides by HTML.', () => {
    const splide = init();
    const { add, getAt, getLength } = splide.Components.Slides;

    add( [ '<div class="slide1">', '<div class="slide2">' ] );

    expect( getAt( getLength() - 2 ).slide.classList.contains( 'slide1' ) ).toBe( true );
    expect( getAt( getLength() - 1 ).slide.classList.contains( 'slide2' ) ).toBe( true );
  } );

  test( 'can insert a new element at the specific index.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const slide = document.createElement( 'div' );

    Slides.add( slide, 1 );

    expect( Slides.getAt( 1 ).slide ).toBe( slide );
  } );

  test( 'can insert new elements at the specific index.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const slide1 = document.createElement( 'div' );
    const slide2 = document.createElement( 'div' );

    Slides.add( [ slide1, slide2 ], 1 );

    expect( Slides.getAt( 1 ).slide ).toBe( slide1 );
    expect( Slides.getAt( 2 ).slide ).toBe( slide2 );
  } );

  test( 'should not break the order of Slides.', () => {
    const splide = init( { type: 'loop' } );
    const { Slides } = splide.Components;
    const slide  = document.createElement( 'div' );
    const slides = Slides.get();

    expect( slides[ 0 ].index ).toBeLessThan( 0 ); // negative index for clones
    expect( slides[ slides.length - 1 ].index ).toBeGreaterThanOrEqual( splide.length );

    Slides.add( slide, 1 ); // This emits refresh.

    expect( slides[ 0 ].index ).toBeLessThan( 0 ); // negative index for clones
    expect( slides[ slides.length - 1 ].index ).toBeGreaterThanOrEqual( splide.length );
  } );
} );
