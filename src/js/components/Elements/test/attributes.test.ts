import { ALL_ATTRIBUTES } from '../../../constants/attributes';
import { buildHtml, init } from '../../../test';


describe( 'Elements', () => {
  test( 'can assign aria attributes.', () => {
    const splide = init();
    expect( splide.root.getAttribute( 'role' ) ).toBe( 'region' );
    expect( splide.root.getAttribute( 'aria-roledescription' ) ).toBe( 'carousel' );
  } );

  test( 'can set a role.', () => {
    const splide = init( { role: 'navigation' } );
    expect( splide.root.getAttribute( 'role' ) ).toBe( 'navigation' );
  } );

  test( 'can set aria-label.', () => {
    const splide = init( { label: 'Splide carousel' } );
    expect( splide.root.getAttribute( 'aria-label' ) ).toBe( 'Splide carousel' );
  } );

  test( 'can set aria-labelledby.', () => {
    const splide = init( { labelledby: 'heading' } );
    expect( splide.root.getAttribute( 'aria-labelledby' ) ).toBe( 'heading' );
  } );

  test( 'can remove assigned attributes.', () => {
    const splide = init( { keyboard: 'focused' } );
    const { root, track, list } = splide.Components.Elements;

    splide.destroy();

    const attributes = ALL_ATTRIBUTES.concat( 'style' );
    const callback   = jest.fn();

    [ root, track, list ].forEach( elm => {
      attributes.forEach( attr => {
        expect( elm.getAttribute( attr ) ).toBeNull();
        callback();
      } );
    } );

    expect( callback ).toHaveBeenCalledTimes( attributes.length * 3 );
  } );

  test( 'should not assign the role if the root element is section.', () => {
    const splide = init( {}, { html: buildHtml( { tag: 'section' } ) } );
    expect( splide.root.getAttribute( 'role' ) ).toBeNull();
  } );

  test( 'should not remove the role attribute by soft destruction.', () => {
    const splide = init();
    expect( splide.root.getAttribute( 'role' ) ).toBe( 'region' );

    splide.destroy( false );
    expect( splide.root.getAttribute( 'role' ) ).toBe( 'region' );
  } );
} );
