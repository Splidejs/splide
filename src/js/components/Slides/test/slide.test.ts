import { CLASS_ACTIVE, CLASS_NEXT, CLASS_PREV, CLASS_VISIBLE } from '../../../constants/classes';
import { EVENT_CLICK, EVENT_SLIDE_KEYDOWN } from '../../../constants/events';
import { fire, init, keydown } from '../../../test';
import { format } from '../../../utils/string';


describe( 'Slide', () => {
  test( 'can assign the unique ID to the slide element.', () => {
    const splide = init( { speed: 0 } );
    const { Slides } = splide.Components;
    const Slide = Slides.getAt( 0 );
    expect( Slide.slide.id.indexOf( splide.root.id ) ).toBe( 0 );
  } );

  test( 'can toggle the `is-active` class.', () => {
    const splide = init( { speed: 0 } );
    const { Slides } = splide.Components;
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );

    expect( Slide0.slide.classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( Slide1.slide.classList.contains( CLASS_ACTIVE ) ).toBe( false );

    splide.go( 1 );

    expect( Slide0.slide.classList.contains( CLASS_ACTIVE ) ).toBe( false );
    expect( Slide1.slide.classList.contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'can toggle the `is-visible` class and the aria-hidden attribute.', () => {
    const splide = init( { speed: 0, perPage: 2 } );
    const { Slides } = splide.Components;

    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );

    expect( Slide0.slide.classList.contains( CLASS_VISIBLE ) ).toBe( true );
    expect( Slide1.slide.classList.contains( CLASS_VISIBLE ) ).toBe( true );
    expect( Slide2.slide.classList.contains( CLASS_VISIBLE ) ).toBe( false );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    splide.go( 1 );

    expect( Slide0.slide.classList.contains( CLASS_VISIBLE ) ).toBe( false );
    expect( Slide1.slide.classList.contains( CLASS_VISIBLE ) ).toBe( true );
    expect( Slide2.slide.classList.contains( CLASS_VISIBLE ) ).toBe( true );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
  } );

  test( 'can toggle the `is-prev` and `is-next` classes.', () => {
    const splide = init( { type: 'loop', speed: 0 } );
    const { Slides } = splide.Components;

    const Clone1 = Slides.getAt( -1 );
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );

    expect( Clone1.slide.classList.contains( CLASS_PREV ) ).toBe( true );
    expect( Slide0.slide.classList.contains( CLASS_PREV ) ).toBe( false );
    expect( Slide0.slide.classList.contains( CLASS_NEXT ) ).toBe( false );
    expect( Slide1.slide.classList.contains( CLASS_NEXT ) ).toBe( true );

    splide.go( 1 );

    expect( Clone1.slide.classList.contains( CLASS_PREV ) ).toBe( false );
    expect( Slide0.slide.classList.contains( CLASS_PREV ) ).toBe( true );
    expect( Slide1.slide.classList.contains( CLASS_PREV ) ).toBe( false );
    expect( Slide1.slide.classList.contains( CLASS_NEXT ) ).toBe( false );
    expect( Slide2.slide.classList.contains( CLASS_NEXT ) ).toBe( true );
  } );

  test( 'can tell if the slide is within the specified range.', () => {
    const splide = init( { type: 'loop', speed: 0 } );
    const { Slides } = splide.Components;

    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );
    const Clone  = Slides.getAt( -1 );

    expect( Slide0.isWithin( 0, 1 ) ).toBe( true );
    expect( Slide1.isWithin( 0, 1 ) ).toBe( true );
    expect( Slide2.isWithin( 0, 1 ) ).toBe( false );

    expect( Clone.isWithin( 0, 1 ) ).toBe( true );
  } );

  test( 'can assign the role and aria attributes.', () => {
    const splide = init( { speed: 0, isNavigation: true } );
    const { Slides } = splide.Components;
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );

    expect( Slide0.slide.getAttribute( 'role' ) ).toBe( 'button' );
    expect( Slide0.slide.getAttribute( 'aria-label' ) ).toBe( format( splide.options.i18n.slideX, 1 ) );

    expect( Slide1.slide.getAttribute( 'role' ) ).toBe( 'button' );
    expect( Slide1.slide.getAttribute( 'aria-label' ) ).toBe( format( splide.options.i18n.slideX, 2 ) );
  } );

  test( 'can emit the `click` event on click.', done => {
    const splide = init( { speed: 0 } );
    const { Slides } = splide.Components;
    const { slide } = Slides.getAt( 2 );

    splide.on( EVENT_CLICK, Slide => {
      expect( Slide.slide ).toBe( slide );
      done();
    } );

    fire( slide, 'click' );
  } );

  test( 'can emit the `slide:keydown` event on keydown.', done => {
    const splide = init( { speed: 0, isNavigation: true } );
    const { Slides } = splide.Components;
    const { slide } = Slides.getAt( 2 );

    splide.on( EVENT_SLIDE_KEYDOWN, ( Slide, e ) => {
      expect( Slide.slide ).toBe( slide );
      expect( e.key ).toBe( 'Enter' );
      done();
    } );

    keydown( 'Enter', slide );
  } );

  test( 'should remove status classes and added attributes.', () => {
    const splide = init( { speed: 0, isNavigation: true } );
    const { Slides } = splide.Components;
    const { slide } = Slides.getAt( 0 );

    splide.destroy();

    expect( slide.classList.contains( CLASS_ACTIVE ) ).toBe( false );
    expect( slide.classList.contains( CLASS_VISIBLE ) ).toBe( false );
    expect( slide.getAttribute( 'role' ) ).toBe( null );
    expect( slide.getAttribute( 'aria-label' ) ).toBe( null );
  } );
} );
