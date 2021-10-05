import { init } from '../../../test';


describe( 'Controller#go()', () => {
  test( 'can loop the slider.', () => {
    const splide = init( { type: 'loop', speed: 0 } );

    splide.go( '<' );
    expect( splide.index ).toBe( splide.length - 1 );

    splide.go( '>' );
    expect( splide.index ).toBe( 0 );

    splide.go( '-' );
    expect( splide.index ).toBe( splide.length - 1 );

    splide.go( '+' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can loop the slider, using the end index.', () => {
    // The end index is 1.
    const splide = init( { rewind: true, perPage: 3, speed: 0 }, { length: 4 } );

    splide.go( '<' );
    expect( splide.index ).toBe( 1 );

    splide.go( '>' );
    expect( splide.index ).toBe( 0 );
  } );
} );
