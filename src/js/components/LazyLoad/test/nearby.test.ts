import { CLASS_LOADING, CLASS_SPINNER } from '../../../constants/classes';
import { EVENT_LAZYLOAD_LOADED } from '../../../constants/events';
import { fire, init } from '../../../test';
import { URL } from '../../../test/fixtures/constants';
import { SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from '../constants';


describe( 'LazyLoad in the `nearby` mode', () => {
  test( 'does nothing if the lazyLoad option is falsy.', () => {
    init( {}, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].src ).toBe( '' );
    expect( images[ 0 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).not.toBeFalsy();
  } );

  test( 'can find the src data attribute and set the value to the src.', () => {
    init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].src ).toBe( `${ URL }/0.jpg` );
    expect( images[ 0 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();

    expect( images[ 1 ].src ).toBe( `${ URL }/1.jpg` );
    expect( images[ 1 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();
  } );

  test( 'can find the srcset data attribute and set the value to the src.', () => {
    init( { lazyLoad: true }, { src: false, dataSrcset: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].srcset ).toBe( `${ URL }/0.jpg 320w` );
    expect( images[ 0 ].getAttribute( SRCSET_DATA_ATTRIBUTE ) ).toBeNull();

    expect( images[ 1 ].srcset ).toBe( `${ URL }/1.jpg 320w` );
    expect( images[ 1 ].getAttribute( SRCSET_DATA_ATTRIBUTE ) ).toBeNull();
  } );

  test( 'should set the src if the value is not same with the one provided by the data attribute.', () => {
    init( { lazyLoad: true }, { src: 'placeholder', dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].src ).toBe( `${ URL }/0.jpg` );
    expect( images[ 0 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();

    expect( images[ 1 ].src ).toBe( `${ URL }/1.jpg` );
    expect( images[ 1 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();
  } );

  test( 'can append a loading spinner and add a loading class to slides.', () => {
    const splide   = init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const slide1   = splide.Components.Slides.getAt( 0 ).slide;
    const slide2   = splide.Components.Slides.getAt( 1 ).slide;
    const spinner1 = slide1.querySelector( `.${ CLASS_SPINNER }` );
    const spinner2 = slide2.querySelector( `.${ CLASS_SPINNER }` );

    expect( spinner1 instanceof HTMLSpanElement ).toBe( true );
    expect( spinner2 instanceof HTMLSpanElement ).toBe( true );

    expect( slide1.classList.contains( CLASS_LOADING ) ).toBe( true );
    expect( slide2.classList.contains( CLASS_LOADING ) ).toBe( true );
  } );

  test( 'can remove a loading spinner and a loading class on load.', () => {
    const splide   = init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const images   = document.getElementsByTagName( 'img' );
    const slide1   = splide.Components.Slides.getAt( 0 ).slide;
    const slide2   = splide.Components.Slides.getAt( 1 ).slide;

    fire( images[ 0 ], 'load' );

    expect( slide1.querySelector( `.${ CLASS_SPINNER }` ) ).toBeNull();
    expect( slide1.classList.contains( CLASS_LOADING ) ).toBe( false );

    // The slide2 is still loading.
    expect( slide2.querySelector( `.${ CLASS_SPINNER }` ) ).not.toBeNull();
    expect( slide2.classList.contains( CLASS_LOADING ) ).toBe( true );

    fire( images[ 1 ], 'load' );

    expect( slide2.querySelector( `.${ CLASS_SPINNER }` ) ).toBeNull();
    expect( slide2.classList.contains( CLASS_LOADING ) ).toBe( false );
  } );

  test( 'can remove a loading class on error.', () => {
    const splide   = init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const images   = document.getElementsByTagName( 'img' );
    const slide1   = splide.Components.Slides.getAt( 0 ).slide;
    const slide2   = splide.Components.Slides.getAt( 1 ).slide;

    fire( images[ 0 ], 'error' );

    // The spinner will not be removed on error.
    expect( slide1.querySelector( `.${ CLASS_SPINNER }` ) ).not.toBeNull();
    expect( slide1.classList.contains( CLASS_LOADING ) ).toBe( false );

    fire( images[ 1 ], 'error' );

    expect( slide2.querySelector( `.${ CLASS_SPINNER }` ) ).not.toBeNull();
    expect( slide2.classList.contains( CLASS_LOADING ) ).toBe( false );
  } );

  test( 'can start loading an image if the slide is close to the current location.', () => {
    const splide = init( { lazyLoad: true, speed: 0 }, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 3 ].src ).toBe( '' );
    expect( images[ 3 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).not.toBeNull();

    splide.go( 2 );

    expect( images[ 3 ].src ).toBe( `${ URL }/3.jpg` );
    expect( images[ 3 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();

    expect( images[ 4 ].src ).toBe( '' );
    expect( images[ 4 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).not.toBeNull();

    splide.go( 3 );

    expect( images[ 4 ].src ).toBe( `${ URL }/4.jpg` );
    expect( images[ 4 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).toBeNull();
  } );

  test( 'can start loading images of previous slides in the loop mode.', () => {
    const splide = init( { type: 'loop', lazyLoad: true, perPage: 3 }, { src: false, dataSrc: true } );
    const prev1  = splide.Components.Slides.getAt( -1 );
    const prev2  = splide.Components.Slides.getAt( -2 );
    const last1  = splide.Components.Slides.getAt( splide.length - 1 );
    const last2  = splide.Components.Slides.getAt( splide.length - 2 );

    expect( prev1.slide.querySelector( 'img' ).src ).toBe( `${ URL }/${ splide.length - 1 }.jpg` );
    expect( prev2.slide.querySelector( 'img' ).src ).toBe( `${ URL }/${ splide.length - 2 }.jpg` );

    expect( last1.slide.querySelector( 'img' ).src ).toBe( `${ URL }/${ splide.length - 1 }.jpg` );
    expect( last2.slide.querySelector( 'img' ).src ).toBe( `${ URL }/${ splide.length - 2 }.jpg` );
  } );

  test( 'should not start loading an image if the slide is not close to the current location.', () => {
    init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 3 ].src ).toBe( '' );
    expect( images[ 3 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).not.toBeNull();

    expect( images[ 4 ].src ).toBe( '' );
    expect( images[ 4 ].getAttribute( SRC_DATA_ATTRIBUTE ) ).not.toBeNull();
  } );

  test( 'should emit an event after load.', done => {
    const splide = init( { lazyLoad: true }, { src: false, dataSrc: true } );
    const Slide1 = splide.Components.Slides.getAt( 0 );
    const Slide2 = splide.Components.Slides.getAt( 1 );

    let count = 0;

    splide.on( EVENT_LAZYLOAD_LOADED, ( img, Slide ) => {
      if ( count === 0 ) {
        expect( Slide ).toBe( Slide1 );
      }

      if ( count === 1 ) {
        expect( Slide ).toBe( Slide2 );
        done();
      }

      count++;
    } );

    fire( Slide1.slide.querySelector( 'img' ), 'load' );
    fire( Slide2.slide.querySelector( 'img' ), 'load' );
  } );
} );
