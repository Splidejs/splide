import { RTL, TTB } from '../../../constants/directions';
import { init, keydown } from '../../../test';


describe( 'Keyboard', () => {
  test( 'can control the slider by keyboards.', () => {
    const splide = init( { speed: 0 } );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 2 );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards in TTB mode.', () => {
    const splide = init( { direction: TTB, height: 1, speed: 0 } );

    keydown( 'ArrowDown' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowDown' );
    expect( splide.index ).toBe( 2 );

    keydown( 'ArrowUp' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowUp' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards in RTL mode.', () => {
    const splide = init( { direction: RTL, speed: 0 } );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 2 );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards only when the slider has focus in the `focused` mode.', () => {
    const splide = init( { keyboard: 'focused', speed: 0 } );
    const { root } = splide;

    expect( root.tabIndex ).toBe( 0 );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 0 );

    splide.root.focus();

    keydown( 'ArrowRight', root );
    expect( splide.index ).toBe( 1 );
  } );
} );
