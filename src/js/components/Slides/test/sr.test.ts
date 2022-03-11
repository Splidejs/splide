import { CLASS_ACTIVE, CLASS_NEXT, CLASS_PREV, CLASS_SLIDE, CLASS_SR, CLASS_VISIBLE } from '../../../constants/classes';
import {
  EVENT_ACTIVE,
  EVENT_CLICK,
  EVENT_HIDDEN,
  EVENT_INACTIVE,
  EVENT_SLIDE_KEYDOWN,
  EVENT_VISIBLE,
} from '../../../constants/events';
import { Splide } from '../../../core/Splide/Splide';
import { fire, init, keydown } from '../../../test';
import { format } from '../../../utils';
import { SlideComponent } from '../Slide';


describe( 'The SR field', () => {
  test( 'should be prepended to each when `live` option is `true`.', () => {
    // const splide = init();
    // const Slides = splide.Components.Slides;
    // const Slide0 = Slides.getAt( 0 );
    // const Slide1 = Slides.getAt( 1 );
    // const Slide2 = Slides.getAt( 2 );
    //
    // expect( Slide0.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( true );
    // expect( Slide1.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( false );
    // expect( Slide2.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( false );
  } );

  test( 'should be prepended to the active slide when `live` option is `true`.', () => {
    const splide   = init();
    const Slides   = splide.Components.Slides;
    const callback = jest.fn();

    Slides.forEach( Slide => {
      expect( Slide.slide.firstElementChild.classList.contains( CLASS_SR ) ).toBe( Slide.index === 0 );
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

    splide.go( 1 );

    expect( Slide1.slide.firstElementChild.textContent ).toBe( `2 of ${ splide.length }` );

    splide.go( 2 );

    expect( Slide2.slide.firstElementChild.textContent ).toBe( `3 of ${ splide.length }` );
  } );
} );
