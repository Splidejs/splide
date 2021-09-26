import { findRuleBy, init } from '../../../test';
import { SLIDER_WIDTH } from '../../../test/fixtures/constants';


describe( 'Layout in the LTR mode', () => {
  test( 'can set paddings to the track element.', () => {
    const splide1 = init( { padding: '2rem' } );
    const rule1   = findRuleBy( splide1.Components.Elements.track );

    expect( rule1.style.paddingLeft ).toBe( '2rem' );
    expect( rule1.style.paddingRight ).toBe( '2rem' );
    splide1.destroy();

    const splide2 = init( { padding: { left: '4%', right: '5%' } } );
    const rule2   = findRuleBy( splide2.Components.Elements.track );

    expect( rule2.style.paddingLeft ).toBe( '4%' );
    expect( rule2.style.paddingRight ).toBe( '5%' );
    splide2.destroy();

    const splide3 = init( { padding: { left: '4%' } } );
    const rule3   = findRuleBy( splide3.Components.Elements.track );

    expect( rule3.style.paddingLeft ).toBe( '4%' );
    expect( rule3.style.paddingRight ).toBe( '0px' );
    splide3.destroy();
  } );

  test( 'can set margin as a gap.', () => {
    const splide = init( { gap: '2rem' } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.marginRight ).toBe( '2rem' );
    expect( rule2.style.marginRight ).toBe( '2rem' );
    splide.destroy();
  } );

  test( 'can set slide width.', () => {
    const splide1 = init( { perPage: 3 } );
    const rule1   = findRuleBy( splide1.Components.Elements.slides[ 0 ] );

    expect( rule1.style.width ).toBe( 'calc((100%)/3)' );
    splide1.destroy();

    const splide2 = init( { perPage: 3, gap: '2rem' } );
    const rule2   = findRuleBy( splide2.Components.Elements.slides[ 0 ] );

    expect( rule2.style.width ).toBe( 'calc((100% + 2rem)/3 - 2rem)' );
    splide2.destroy();
  } );

  test( 'can fix the slide width.', () => {
    const splide = init( { fixedWidth: 100 } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.width ).toBe( '100px' );
    expect( rule2.style.width ).toBe( '100px' );
    splide.destroy();
  } );

  test( 'can set the slide height.', () => {
    const splide = init( { height: '10rem' } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.height ).toBe( '10rem' );
    expect( rule2.style.height ).toBe( '10rem' );
    splide.destroy();
  } );

  test( 'can set the slide height by ratio against the slider width.', () => {
    const splide = init( { width: 500, heightRatio: 0.5 } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.height ).toBe( '250px' );
    expect( rule2.style.height ).toBe( '250px' );
    splide.destroy();
  } );

  test( 'can fix the slide height.', () => {
    const splide = init( { fixedHeight: 100 } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.height ).toBe( '100px' );
    expect( rule2.style.height ).toBe( '100px' );
    splide.destroy();
  } );

  test( 'should not set the slide width when the autoWidth is true.', () => {
    const splide = init( { autoWidth: true } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.width ).toBe( '' );
    expect( rule2.style.width ).toBe( '' );
    splide.destroy();
  } );

  test( 'can provide the list width.', () => {
    const splide = init( { width: 100 } );
    expect( splide.Components.Layout.listSize() ).toBe( 100 );
    splide.destroy();
  } );

  test( 'can provide the slide width.', () => {
    const splide1 = init();

    expect( splide1.Components.Layout.slideSize( 0 ) ).toBe( SLIDER_WIDTH );
    expect( splide1.Components.Layout.slideSize( 1 ) ).toBe( SLIDER_WIDTH );
    splide1.destroy();

    const splide2 = init( { perPage: 2 } );

    expect( splide2.Components.Layout.slideSize( 0 ) ).toBe( SLIDER_WIDTH / 2 );
    expect( splide2.Components.Layout.slideSize( 1 ) ).toBe( SLIDER_WIDTH / 2 );
    splide2.destroy();
  } );

  test( 'should not set the track width.', () => {
    const splide = init( { height: 100 } );
    const rule   = findRuleBy( splide.Components.Elements.track );

    expect( rule.style.height ).toBe( '' );
    splide.destroy();
  } );
} );
