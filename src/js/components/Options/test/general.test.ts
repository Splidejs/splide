import { DESTROYED } from '../../../constants/states';
import { init } from '../../../test';


describe( 'Options', () => {
  window.matchMedia = () => ( {
    matches: true,
  } as MediaQueryList );

  test( 'can merge options provided by the data attribute.', () => {
    const data   = { width: 100, height: 100, type: 'loop', waitForTransition: false };
    const splide = init( { width: 200, height: 200 }, { json: JSON.stringify( data ) } );
    const { options } = splide;

    expect( options.width ).toBe( 100 );
    expect( options.height ).toBe( 100 );
    expect( options.type ).toBe( 'loop' );
    expect( options.waitForTransition ).toBe( false );
  } );

  test( 'can merge options when a breakpoint matches the media query.', () => {
    const splide = init( { perPage: 2, breakpoints: { 640: { perPage: 4 } } } );
    expect( splide.options.perPage ).toBe( 4 );
  } );

  test( 'can destroy Splide.', () => {
    const splide = init( { breakpoints: { 640: { destroy: true } } } );
    expect( splide.state.is( DESTROYED ) ).toBe( true );
  } );
} );
