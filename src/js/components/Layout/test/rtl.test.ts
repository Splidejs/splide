import { RTL } from '../../../constants/directions';
import { findRuleBy, init } from '../../../test';


describe( 'Layout in the RTL mode', () => {
  test( 'can set margin as a gap.', () => {
    const splide = init( { direction: RTL, gap: '2rem' } );
    const rule1  = findRuleBy( splide.Components.Elements.slides[ 0 ] );
    const rule2  = findRuleBy( splide.Components.Elements.slides[ 1 ] );

    expect( rule1.style.marginLeft ).toBe( '2rem' );
    expect( rule2.style.marginLeft ).toBe( '2rem' );
    splide.destroy();
  } );
} );
