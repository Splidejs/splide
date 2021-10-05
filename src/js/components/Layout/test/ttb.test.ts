import { TTB } from '../../../constants/directions';
import { findRuleBy, init } from '../../../test';


describe( 'Layout in the TTB mode', () => {
  test( 'can set paddings to the track element.', () => {
    const splide1 = init( { height: 100, direction: TTB, padding: '2rem' } );
    const rule1   = findRuleBy( splide1.Components.Elements.track );

    expect( rule1.style.paddingTop ).toBe( '2rem' );
    expect( rule1.style.paddingBottom ).toBe( '2rem' );
    splide1.destroy();

    const splide2 = init( { height: 100, direction: TTB, padding: { top: '4%', bottom: '5%' } } );
    const rule2   = findRuleBy( splide2.Components.Elements.track );

    expect( rule2.style.paddingTop ).toBe( '4%' );
    expect( rule2.style.paddingBottom ).toBe( '5%' );
    splide2.destroy();

    const splide3 = init( { height: 100, direction: TTB, padding: { top: '4%' } } );
    const rule3   = findRuleBy( splide3.Components.Elements.track );

    expect( rule3.style.paddingTop ).toBe( '4%' );
    expect( rule3.style.paddingBottom ).toBe( '0px' );
    splide3.destroy();
  } );

  test( 'can set margin as a gap.', () => {
    const splide = init( { height: 100, direction: TTB, gap: '2rem' } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.marginBottom ).toBe( '2rem' );
    expect( rule2.style.marginBottom ).toBe( '2rem' );
    splide.destroy();
  } );

  test( 'can set height of the track element.', () => {
    const splide = init( { height: 100, direction: TTB } );
    const rule   = findRuleBy( splide.Components.Elements.track );

    expect( rule.style.height ).toBe( 'calc(100px - 0px - 0px)' );
    splide.destroy();
  } );

  test( 'can set height of the track element with subtracting paddings.', () => {
    const splide = init( { height: 100, direction: TTB, padding: { top: '1rem', bottom: '2rem' } } );
    const rule   = findRuleBy( splide.Components.Elements.track );

    expect( rule.style.height ).toBe( 'calc(100px - 1rem - 2rem)' );
    splide.destroy();
  } );

  test( 'can set height of the track element by heightRatio.', () => {
    const splide = init( { width: 500, heightRatio: 0.5, direction: TTB } );
    const rule   = findRuleBy( splide.Components.Elements.track );

    expect( rule.style.height ).toBe( 'calc(250px - 0px - 0px)' );
    splide.destroy();
  } );

  test( 'can set height of the track element by heightRatio with subtracting paddings.', () => {
    const splide = init( { width: 500, heightRatio: 0.5, direction: TTB, padding: { top: '1rem', bottom: '2rem' } } );
    const rule   = findRuleBy( splide.Components.Elements.track );

    expect( rule.style.height ).toBe( 'calc(250px - 1rem - 2rem)' );
    splide.destroy();
  } );

  test( 'should not set the slide width.', () => {
    const splide = init( { height: 100, direction: TTB } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.width ).toBe( '' );
    expect( rule2.style.width ).toBe( '' );
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
