import { CLASS_CLONE } from '../../../constants/classes';
import { init } from '../../../test';
import { SLIDER_WIDTH } from '../../../test/fixtures/constants';


describe( 'Clones', () => {
  // This test must be the first because of uniqueId().
  test( 'can generate clones with unique IDs.', () => {
    const splide = init( { type: 'loop' } );
    const clones = splide.root.getElementsByClassName( CLASS_CLONE );

    expect( clones[ 0 ].id ).toBe( 'splide01-clone01' );
    expect( clones[ 1 ].id ).toBe( 'splide01-clone02' );
    expect( clones[ 2 ].id ).toBe( 'splide01-clone03' );
  } );

  test( 'can generate clones according to the flickMaxPages option.', () => {
    const splide = init( { type: 'loop', flickMaxPages: 2 } );
    const clones = splide.root.getElementsByClassName( CLASS_CLONE );
    const Slides = splide.Components.Slides.get( true );

    expect( clones.length ).toBe( ( splide.options.flickMaxPages + 1 ) * 2 );
    expect( clones[ 2 ].nextElementSibling ).toBe( Slides[ 0 ].slide );
    expect( clones[ 3 ].previousElementSibling ).toBe( Slides[ Slides.length - 1 ].slide );
  } );

  test( 'can generate clones according to the flickMaxPages and perPage options.', () => {
    const splide = init( { type: 'loop', flickMaxPages: 1, perPage: 3 } );
    const clones = splide.root.getElementsByClassName( CLASS_CLONE );
    const { flickMaxPages, perPage } = splide.options;

    expect( clones.length ).toBe( perPage * ( flickMaxPages + 1 ) * 2 );
  } );

  test( 'can generate clones according to the fixedWidth option.', () => {
    const splide = init( { type: 'loop', flickMaxPages: 1, fixedWidth: 100 } );
    const clones = splide.root.getElementsByClassName( CLASS_CLONE );

    expect( clones.length ).toBe( Math.ceil( SLIDER_WIDTH / 100 ) * ( splide.options.flickMaxPages + 1 ) * 2 );
  } );

  test( 'should register clones to Slides component.', () => {
    const splide      = init( { type: 'loop' } );
    const clones      = splide.root.getElementsByClassName( CLASS_CLONE );
    const Slides      = splide.Components.Slides.get();
    const cloneSlides = Slides.filter( Slide => Slide.isClone );

    expect( clones.length ).toBe( cloneSlides.length );
  } );

  test( 'should assign indices.', () => {
    const splide       = init( { type: 'loop' } );
    const Slides       = splide.Components.Slides.get();
    const cloneSlides  = Slides.filter( Slide => Slide.isClone );
    const clonesBefore = cloneSlides.filter( ( Slide, index ) => index < cloneSlides.length / 2 );
    const clonesAfter  = cloneSlides.filter( ( Slide, index ) => index >= cloneSlides.length / 2 );

    clonesBefore.forEach( ( Slide, index ) => {
      expect( Slide.index ).toBe( index - clonesBefore.length );
    } );

    clonesAfter.forEach( ( Slide, index ) => {
      expect( Slide.index ).toBe( splide.length + index );
    } );
  } );
} );
