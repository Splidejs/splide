import { ARIA_ROLEDESCRIPTION, TAB_INDEX } from '../../../constants/attributes';
import { init } from '../../../test';


describe( 'Elements', () => {
  test( 'can assign aria attributes.', () => {
    const splide = init();

    expect( splide.root.getAttribute( ARIA_ROLEDESCRIPTION ) ).toBe( 'carousel' );
  } );

  test( 'can remove assigned attributes.', () => {
    const splide = init( { keyboard: 'focused' } );
    const { root, track, list } = splide.Components.Elements;

    expect( root.getAttribute( TAB_INDEX ) ).not.toBeNull();

    splide.destroy();

    expect( root.getAttribute( ARIA_ROLEDESCRIPTION ) ).toBeNull();
    expect( root.getAttribute( TAB_INDEX ) ).toBeNull();

    expect( track.getAttribute( 'style' ) ).toBeNull();
    expect( list.getAttribute( 'style' ) ).toBeNull();
  } );
} );
