import { CLASS_SR } from '../../../constants/classes';
import { init } from '../../../test';


describe( 'The SR field', () => {
  test( 'should be prepended to each slide when `live` option is `true`.', () => {
    const splide   = init();
    const Slides   = splide.Components.Slides;
    const callback = jest.fn();

    Slides.forEach( Slide => {
      expect( Slide.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( true );
      callback();
    } );

    expect( callback ).toHaveBeenCalled();
  } );

  test( 'should not be prepended when `live` option is `false`.', () => {
    const splide   = init( { live: false } );
    const Slides   = splide.Components.Slides;
    const callback = jest.fn();

    Slides.forEach( Slide => {
      expect( Slide.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( false );
      callback();
    } );

    expect( callback ).toHaveBeenCalled();
  } );

  test( 'should describe the current slide position.', () => {
    const splide = init( { speed: 0 } );
    const Slides = splide.Components.Slides;
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );

    expect( Slide0.slide.firstElementChild.textContent ).toBe( `1 of ${ splide.length }` );
    expect( Slide1.slide.firstElementChild.textContent ).toBe( '' );
    expect( Slide2.slide.firstElementChild.textContent ).toBe( '' );

    splide.go( 1 );
    expect( Slide0.slide.firstElementChild.textContent ).toBe( '' );
    expect( Slide1.slide.firstElementChild.textContent ).toBe( `2 of ${ splide.length }` );
    expect( Slide2.slide.firstElementChild.textContent ).toBe( '' );

    splide.go( 2 );
    expect( Slide0.slide.firstElementChild.textContent ).toBe( '' );
    expect( Slide1.slide.firstElementChild.textContent ).toBe( '' );
    expect( Slide2.slide.firstElementChild.textContent ).toBe( `3 of ${ splide.length }` );
  } );
} );
