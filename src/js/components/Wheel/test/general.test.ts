import { fire, init } from '../../../test';


describe( 'Wheel', () => {
  test( 'can navigate the slider by the mouse wheel.', () => {
    const splide = init( { speed: 0, wheel: true } );
    const { track } = splide.Components.Elements;

    fire( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 1 );

    fire( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 2 );

    fire( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 3 );

    fire( track, 'wheel', { deltaY: -100 } );
    expect( splide.index ).toBe( 2 );

    fire( track, 'wheel', { deltaY: -100 } );
    expect( splide.index ).toBe( 1 );

    fire( track, 'wheel', { deltaY: -100 } );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'should be inactive if the `wheel` option is falsy.', () => {
    const splide = init( { speed: 0, wheel: false } );
    const { track } = splide.Components.Elements;

    fire( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 0 );

    fire( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 0 );
  } );
} );

