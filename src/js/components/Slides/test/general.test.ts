import { CLASS_CLONE, CLASS_SLIDE } from '../../../constants/classes';
import { init } from '../../../test';


describe( 'Slides', () => {
  test( 'can create a Slide component.', () => {
    const splide = init( {}, { length: 0 } );
    const { Slides } = splide.Components;

    expect( Slides.getLength( false ) ).toBe( 0 );

    const slide = document.createElement( 'div' );

    Slides.register( slide, 0, 0 );
    expect( Slides.getLength( false ) ).toBe( 1 );

    const Slide = Slides.getAt( 0 );
    expect( Slide.slide === slide ).toBe( true );
  } );

  test( 'can provide all Slide components with/without clones.', () => {
    const splide        = init( { type: 'loop' } );
    const { Slides }    = splide.Components;
    const slides        = document.getElementsByClassName( CLASS_SLIDE );
    const clones        = document.getElementsByClassName( CLASS_CLONE );
    const WithClones    = Slides.get();
    const WithoutClones = Slides.get( true );

    expect( WithClones.length ).toBe( slides.length );
    expect( WithoutClones.length ).toBe( slides.length - clones.length );
  } );

  test( 'can provide Slide components in the specified page.', () => {
    const splide     = init( { perPage: 3 } ); // end index: 7
    const { Slides } = splide.Components;

    const SlidesInPage0 = Slides.getIn( 0 );
    expect( SlidesInPage0.length ).toBe( 3 );
    expect( SlidesInPage0[ 0 ].index ).toBe( 0 );
    expect( SlidesInPage0[ 1 ].index ).toBe( 1 );
    expect( SlidesInPage0[ 2 ].index ).toBe( 2 );

    const SlidesInPage2 = Slides.getIn( 2 );
    expect( SlidesInPage2.length ).toBe( 3 );

    const SlidesInPage3 = Slides.getIn( 3 );
    expect( SlidesInPage3.length ).toBe( 3 );
  } );

  test( 'can provide a Slide component at the specified index.', () => {
    const splide     = init();
    const { Slides } = splide.Components;
    const slides     = document.getElementsByClassName( CLASS_SLIDE );

    const Slide0 = Slides.getAt( 0 );
    expect( Slide0.slide === slides[ 0 ] ).toBe( true );

    const Slide2 = Slides.getAt( 2 );
    expect( Slide2.slide === slides[ 2 ] ).toBe( true );

    const Slide100 = Slides.getAt( 100 );
    expect( Slide100 ).toBeUndefined();
  } );

  test( 'can iterate over Slide components.', () => {
    const splide     = init();
    const { Slides } = splide.Components;
    const slides     = document.getElementsByClassName( CLASS_SLIDE );
    const callback   = jest.fn();

    Slides.forEach( ( Slide, index ) => {
      expect( Slide.slide === slides[ index ] ).toBe( true );
      callback();
    } );

    expect( callback ).toHaveBeenCalledTimes( splide.length );
  } );

  test( 'can iterate over Slide components, including clones.', () => {
    const splide        = init( { type: 'loop' } );
    const { Slides }    = splide.Components;
    const slides        = document.getElementsByClassName( CLASS_SLIDE );
    const clones        = document.getElementsByClassName( CLASS_CLONE );
    const callback      = jest.fn();
    const callbackClone = jest.fn();

    Slides.forEach( ( Slide ) => {
      callback();

      if ( Slide.isClone ) {
        callbackClone();
      }
    } );

    expect( callback ).toHaveBeenCalledTimes( slides.length );
    expect( callbackClone ).toHaveBeenCalledTimes( clones.length );
  } );

  test( 'can provided the number of slides with/without clones.', () => {
    const splide     = init( { type: 'loop' } );
    const { Slides } = splide.Components;
    const slides     = document.getElementsByClassName( CLASS_SLIDE );
    const clones     = document.getElementsByClassName( CLASS_CLONE );

    expect( Slides.getLength() ).toBe( slides.length );
    expect( Slides.getLength( true ) ).toBe( slides.length - clones.length );
  } );

  test( 'can tell if there are enough slides to move or not.', () => {
    const splide = init( { perPage: 3 }, { length: 2 } );
    const { Slides } = splide.Components;

    expect( Slides.isEnough() ).toBe( false );

    splide.options = { perPage: 1 };

    expect( Slides.isEnough() ).toBe( true );
  } );
} );
