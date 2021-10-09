import { TTB } from '../../../constants/directions';
import { init } from '../../../test';


describe( 'Layout in the TTB mode', () => {
  test( 'can set paddings to the track element.', () => {
    const splide1 = init( { height: 100, direction: TTB, padding: '2rem' } );
    const track1  = splide1.Components.Elements.track;

    expect( track1.style.paddingTop ).toBe( '2rem' );
    expect( track1.style.paddingBottom ).toBe( '2rem' );
    splide1.destroy();

    const splide2 = init( { height: 100, direction: TTB, padding: { top: '4%', bottom: '5%' } } );
    const track2  = splide2.Components.Elements.track;

    expect( track2.style.paddingTop ).toBe( '4%' );
    expect( track2.style.paddingBottom ).toBe( '5%' );
    splide2.destroy();

    const splide3 = init( { height: 100, direction: TTB, padding: { top: '4%' } } );
    const track3  = splide3.Components.Elements.track;

    expect( track3.style.paddingTop ).toBe( '4%' );
    expect( track3.style.paddingBottom ).toBe( '0px' );
    splide3.destroy();
  } );

  test( 'can set margin as a gap.', () => {
    const splide = init( { height: 100, direction: TTB, gap: '2rem' } );
    const slides = splide.Components.Elements.slides;

    expect( slides[ 0 ].style.marginBottom ).toBe( '2rem' );
    expect( slides[ 1 ].style.marginBottom ).toBe( '2rem' );
    splide.destroy();
  } );

  test( 'can set height of the track element.', () => {
    const splide = init( { height: 100, direction: TTB } );
    expect( splide.Components.Elements.track.style.height ).toBe( 'calc(100px - 0px - 0px)' );
    splide.destroy();
  } );

  test( 'can set height of the track element with subtracting paddings.', () => {
    const splide = init( { height: 100, direction: TTB, padding: { top: '1rem', bottom: '2rem' } } );
    expect( splide.Components.Elements.track.style.height ).toBe( 'calc(100px - 1rem - 2rem)' );
    splide.destroy();
  } );

  test( 'can set height of the track element by heightRatio.', () => {
    const splide = init( { width: 500, heightRatio: 0.5, direction: TTB } );

    expect( splide.Components.Elements.track.style.height ).toBe( 'calc(250px - 0px - 0px)' );
    splide.destroy();
  } );

  test( 'can set height of the track element by heightRatio with subtracting paddings.', () => {
    const splide = init( { width: 500, heightRatio: 0.5, direction: TTB, padding: { top: '1rem', bottom: '2rem' } } );
    expect( splide.Components.Elements.track.style.height ).toBe( 'calc(250px - 1rem - 2rem)' );
    splide.destroy();
  } );

  test( 'should not set the slide width.', () => {
    const splide = init( { height: 100, direction: TTB } );
    const slides = splide.Components.Elements.slides;

    expect( slides[ 0 ].style.width ).toBe( '' );
    expect( slides[ 1 ].style.width ).toBe( '' );
    splide.destroy();
  } );

  test( 'can provide the slide height.', () => {
    const splide1 = init( { height: 500, direction: TTB } );

    expect( splide1.Components.Layout.slideSize( 0 ) ).toBe( 500 );
    expect( splide1.Components.Layout.slideSize( 1 ) ).toBe( 500 );
    splide1.destroy();

    const splide2 = init( { height: 500, perPage: 2, direction: TTB } );

    expect( splide2.Components.Layout.slideSize( 0 ) ).toBe( 250 );
    expect( splide2.Components.Layout.slideSize( 1 ) ).toBe( 250 );
    splide2.destroy();
  } );

  // This test must be the last.
  test( 'should assert if both height and heightRatio are not available.', () => {
    expect( () => {
      init( { direction: TTB } );
    } ).toThrowError();
  } );
} );
