import { RTL, TTB } from '../../../constants/directions';
import { init, keydown, wait } from '../../../test';


describe( 'Keyboard', () => {
  test( 'can control the slider by keyboards.', async () => {
    const splide = init( { speed: 0, keyboard: 'global' } );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 2 );

    await wait();

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards in TTB mode.', async () => {
    const splide = init( { direction: TTB, height: 1, speed: 0, keyboard: 'global' } );

    keydown( 'ArrowDown' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowDown' );
    expect( splide.index ).toBe( 2 );

    await wait();

    keydown( 'ArrowUp' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowUp' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards in RTL mode.', async () => {
    const splide = init( { direction: RTL, speed: 0, keyboard: 'global' } );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 2 );

    await wait();

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can control the slider by keyboards only when the slider has focus in the `focused` mode.', async () => {
    const splide = init( { keyboard: 'focused', speed: 0 } );
    const { root } = splide;

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 0 );

    await wait();

    splide.Components.Arrows.arrows.prev.focus();

    await wait();

    keydown( 'ArrowRight', root );
    expect( splide.index ).toBe( 1 );
  } );

  test( 'can disable the keyboard input.', async () => {
    const splide = init( { speed: 0, keyboard: 'global' } );
    const { disable } = splide.Components.Keyboard;

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    await wait();

    disable( true );

    keydown( 'ArrowRight' );
    expect( splide.index ).toBe( 1 );

    await wait();

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 1 );

    await wait();

    disable( false );

    keydown( 'ArrowLeft' );
    expect( splide.index ).toBe( 0 );
  } );
} );
