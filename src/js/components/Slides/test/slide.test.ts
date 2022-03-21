import { CLASS_ACTIVE, CLASS_NEXT, CLASS_PREV, CLASS_SLIDE, CLASS_VISIBLE } from '../../../constants/classes';
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

  test( 'can emit an event when the slide becomes active.', () => {
    const splide = init( { speed: 0 } );
    const { Slides } = splide.Components;
    const Slide1    = Slides.getAt( 1 );
    const Slide2    = Slides.getAt( 2 );
    const callback  = jest.fn();

    splide.on( EVENT_ACTIVE, callback );

    splide.go( 1 );
    expect( callback ).toHaveBeenCalledWith( Slide1 );

    splide.go( 2 );
    expect( callback ).toHaveBeenCalledWith( Slide2 );
  } );

  test( 'can emit an event when the slide becomes inactive.', () => {
    const splide = init( { speed: 0 } );
    const { Slides } = splide.Components;
    const Slide0    = Slides.getAt( 0 );
    const Slide1    = Slides.getAt( 1 );
    const Slide2    = Slides.getAt( 2 );
    const callback  = jest.fn();

    splide.on( EVENT_INACTIVE, callback );
    splide.on( EVENT_INACTIVE, callback );

    splide.go( 1 );
    expect( callback ).toHaveBeenCalledWith( Slide0 );

    splide.go( 2 );
    expect( callback ).toHaveBeenCalledWith( Slide1 );

    splide.go( 1 );
    expect( callback ).toHaveBeenCalledWith( Slide2 );
  } );

  test( 'can toggle the `is-visible` class and the `aria-hidden` attribute.', () => {
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

  test( 'should not update aria-hidden on move even if `updateOnMove` is enabled.', () => {
    const splide = init( { speed: 100, updateOnMove: true } );
    const { Slides } = splide.Components;
    const { list } = splide.Components.Elements;

    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );

    splide.go( 1 );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    fire( list, 'transitionend' );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    splide.go( 2 );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );

    fire( list, 'transitionend' );

    expect( Slide0.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide1.slide.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
    expect( Slide2.slide.getAttribute( 'aria-hidden' ) ).toBeNull();
  } );

  test( 'can emit an event when the slide becomes visible.', () => {
    const splide = init( { speed: 0, perPage: 2 } );
    const { Slides } = splide.Components;
    const Slide0        = Slides.getAt( 0 );
    const Slide1        = Slides.getAt( 1 );
    const Slide2        = Slides.getAt( 2 );
    const Slide3        = Slides.getAt( 3 );
    const callback      = jest.fn();
    const visibleSlides = [] as SlideComponent[];

    splide.on( EVENT_VISIBLE, Slide => {
      callback();
      visibleSlides.push( Slide );
    } );

    splide.go( '>' );
    expect( visibleSlides ).toEqual( [ Slide2, Slide3 ] );
    visibleSlides.length = 0;

    splide.go( '<' );
    expect( visibleSlides ).toEqual( [ Slide0, Slide1 ] );
  } );

  test( 'can toggle `tabindex` by visibility if `slideFocus` is enabled.', () => {
    const splide = init( { speed: 0, slideFocus: true } );
    const { Slides } = splide.Components;

    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );

    expect( Slide0.slide.tabIndex ).toBe( 0 );
    expect( Slide1.slide.tabIndex ).toBe( -1 );

    splide.go( 1 );

    expect( Slide0.slide.tabIndex ).toBe( -1 );
    expect( Slide1.slide.tabIndex ).toBe( 0 );
  } );

  test( 'can disable focus of focusable descendants when the slide gets hidden.', () => {
    const splide = init( { speed: 0 }, { mount: false } );
    const slide0 = document.querySelector( `.${ CLASS_SLIDE }` );
    const a      = document.createElement( 'a' );
    const button = document.createElement( 'button' );

    slide0.appendChild( a );
    slide0.appendChild( button );

    splide.mount();

    splide.go( 1 );
    expect( a.tabIndex ).toBe( -1 );
    expect( button.tabIndex ).toBe( -1 );

    splide.go( 0 );
    expect( a.tabIndex ).toBe( 0 );
    expect( button.tabIndex ).toBe( 0 );
  } );

  test( 'can emit an event when the slide gets hidden.', () => {
    const splide = init( { speed: 0, perPage: 2 } );
    const { Slides } = splide.Components;
    const Slide0       = Slides.getAt( 0 );
    const Slide1       = Slides.getAt( 1 );
    const Slide2       = Slides.getAt( 2 );
    const Slide3       = Slides.getAt( 3 );
    const callback     = jest.fn();
    const hiddenSlides = [] as SlideComponent[];

    splide.on( EVENT_HIDDEN, Slide => {
      callback();
      hiddenSlides.push( Slide );
    } );

    splide.go( '>' );
    expect( hiddenSlides ).toEqual( [ Slide0, Slide1 ] );
    hiddenSlides.length = 0;

    splide.go( '<' );
    expect( hiddenSlides ).toEqual( [ Slide2, Slide3 ] );
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


  test( 'should assign the tabpanel role if the pagination option is enabled.', () => {
    const splide = init( { pagination: true } );

    splide.Components.Slides.forEach( ( { slide } ) => {
      expect( slide.getAttribute( 'role' ) ).toBe( 'tabpanel' );
    } );
  } );

  test( 'should assign group tab role with `aria-roledescription` if the pagination option is disabled.', () => {
    const splide = init( { pagination: false } );

    splide.Components.Slides.forEach( ( { slide } ) => {
      expect( slide.getAttribute( 'role' ) ).toBe( 'group' );
      expect( slide.getAttribute( 'aria-roledescription' ) ).toBe( splide.options.i18n.slide );
    } );
  } );

  test( 'can assign and update role/aria attributes for navigation.', () => {
    const splide = init( { speed: 0, isNavigation: true, pagination: false } );
    const { Slides } = splide.Components;
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );

    expect( Slide0.slide.getAttribute( 'aria-current' ) ).toBe( 'true' );
    expect( Slide0.slide.getAttribute( 'aria-label' ) ).toBe( format( splide.options.i18n.slideX, 1 ) );

    expect( Slide1.slide.getAttribute( 'aria-current' ) ).toBeNull();
    expect( Slide1.slide.getAttribute( 'aria-label' ) ).toBe( format( splide.options.i18n.slideX, 2 ) );

    splide.go( 1 );

    expect( Slide0.slide.getAttribute( 'aria-current' ) ).toBeNull();
    expect( Slide1.slide.getAttribute( 'aria-current' ) ).toBe( 'true' );
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

  test( 'can notify the active slide of other components on initialization.', () => {
    const splide   = init( { start: 1 }, { mount: false } );
    const callback = jest.fn();

    const component = ( Splide: Splide ) => {
      return {
        setup() {
          Splide.on( EVENT_ACTIVE, Slide => {
            expect( Slide.index ).toBe( 1 );
            callback();
          } );
        },
      };
    };

    splide.mount( { component } );
    expect( callback ).toHaveBeenCalled();
  } );

  test( 'can check some slide is within the specified distance.', () => {
    const splide = init( { perPage: 2, type: 'loop' } );
    const { Slides } = splide.Components;
    const Slide0 = Slides.getAt( 0 );
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );
    const Clone  = Slides.getAt( -1 );

    expect( Slide0.isWithin( 0, 0 ) ).toBe( true );
    expect( Slide0.isWithin( 0, 1 ) ).toBe( true );

    expect( Slide1.isWithin( 0, 0 ) ).toBe( false );
    expect( Slide1.isWithin( 0, 1 ) ).toBe( true );
    expect( Slide1.isWithin( 0, 2 ) ).toBe( true );

    expect( Slide2.isWithin( 0, 0 ) ).toBe( false );
    expect( Slide2.isWithin( 0, 1 ) ).toBe( false );
    expect( Slide2.isWithin( 0, 2 ) ).toBe( true );
    expect( Slide2.isWithin( 0, 3 ) ).toBe( true );

    expect( Slide0.isWithin( 2, 0 ) ).toBe( false );
    expect( Slide0.isWithin( 2, 1 ) ).toBe( false );
    expect( Slide0.isWithin( 2, 2 ) ).toBe( true );

    expect( Slide1.isWithin( 2, 0 ) ).toBe( false );
    expect( Slide1.isWithin( 2, 1 ) ).toBe( true );
    expect( Slide1.isWithin( 2, 2 ) ).toBe( true );

    expect( Clone.isWithin( 0, 0 ) ).toBe( false );
    expect( Clone.isWithin( 0, 1 ) ).toBe( true );
    expect( Clone.isWithin( 0, 2 ) ).toBe( true );
  } );
} );
