import { RTL } from '../../../constants/directions';
import { init } from '../../../test';


describe( 'Layout in the RTL mode', () => {
  test( 'can set margin as a gap.', () => {
    const splide = init( { direction: RTL, gap: '2rem' } );

    expect( splide.Components.Elements.slides[ 0 ].style.marginLeft ).toBe( '2rem' );
    expect( splide.Components.Elements.slides[ 1 ].style.marginLeft ).toBe( '2rem' );
    splide.destroy();
  } );
} );
