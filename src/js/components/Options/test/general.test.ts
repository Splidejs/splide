import { DESTROYED } from '../../../constants/states';
import { init } from '../../../test';


describe( 'Options', () => {
  window.matchMedia = () => ( {
    matches: true,
  } as MediaQueryList );

  test( 'can merge options when a breakpoint matches the media query.', () => {
    const splide = init( { perPage: 2, breakpoints: { 640: { perPage: 4 } } } );
    expect( splide.options.perPage ).toBe( 4 );
  } );

  test( 'can destroy Splide.', () => {
    const splide = init( { breakpoints: { 640: { destroy: true } } } );
    expect( splide.state.is( DESTROYED ) ).toBe( true );
  } );
} );
