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

  test( 'can loop the slider, using the index of the last page.', () => {
    // The length is 10 and the last page only contains the slide 9.
    const splide = init( { type: 'loop', perPage: 3, speed: 0 } );

    splide.go( '<' );
    expect( splide.index ).toBe( 9 ); // 9, 0, 1

    splide.go( '<' );
    expect( splide.index ).toBe( 6 ); // 6, 7, 8

    splide.go( '>' );
    expect( splide.index ).toBe( 7 ); // 7, 8, 9

    splide.go( '>' );
    expect( splide.index ).toBe( 0 );
  } );
} );
