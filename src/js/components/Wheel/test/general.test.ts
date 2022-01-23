import { fire, init } from '../../../test';
import { Splide } from '../../../index';


describe( 'Wheel', () => {
  test( 'can navigate the slider by the mouse wheel.', async () => {
    const splide = init( { speed: 0, wheel: true } );
    const { track } = splide.Components.Elements;

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    await moved( splide );
    expect( splide.index ).toBe( 1 );

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    await moved( splide );
    expect( splide.index ).toBe( 2 );

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    await moved( splide );
    expect( splide.index ).toBe( 3 );

    fireCancelable( track, 'wheel', { deltaY: -100 } );
    await moved( splide );
    expect( splide.index ).toBe( 2 );

    fireCancelable( track, 'wheel', { deltaY: -100 } );
    await moved( splide );
    expect( splide.index ).toBe( 1 );

    fireCancelable( track, 'wheel', { deltaY: -100 } );
    await moved( splide );
    expect( splide.index ).toBe( 0 );
  } );

  test ( 'only navigated once when using trackpads.', async () => {
    const splide = init( { speed: 0, wheel: true } );
    const { track } = splide.Components.Elements;

    for ( let deltaY = 100; deltaY > 0; deltaY -= 10 ) {
      fireCancelable( track, 'wheel', { deltaY } );
    }

    await moved( splide );
    expect( splide.index ).toBe( 1 );
  } );

  test ( 'should be able to navigate if the user switches between trackpads and mouses', async () => {
    const splide = init( { speed: 0, wheel: true } );
    const { track } = splide.Components.Elements;

    // trackpad
    for ( let deltaY = 100; deltaY > 0; deltaY -= 10 ) {
      fireCancelable( track, 'wheel', { deltaY } );
    }

    await moved( splide );
    expect( splide.index ).toBe( 1 );

    // switch back to mouse
    fireCancelable( track, 'wheel', { deltaY: 100 } );
    await moved( splide );
    expect( splide.index ).toBe( 2 );

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    await moved( splide );
    expect( splide.index ).toBe( 3 );

    // trackpad again
    for ( let deltaY = -100; deltaY < 0; deltaY += 10 ) {
      fireCancelable( track, 'wheel', { deltaY } );
    }

    await moved( splide );
    expect( splide.index ).toBe( 2 );
  } );

  test( 'should be inactive if the `wheel` option is falsy.', () => {
    const splide = init( { speed: 0, wheel: false } );
    const { track } = splide.Components.Elements;

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 0 );

    fireCancelable( track, 'wheel', { deltaY: 100 } );
    expect( splide.index ).toBe( 0 );
  } );
} );

function fireCancelable( elm: Element | Window, event: string, data: any = {} ): void {
  fire( elm, event, data, { cancelable: true } );
}

async function moved( splide: Splide ): Promise<void> {
  if ( splide.state.is( Splide.STATES.IDLE ) ) {
    return;
  }

  await new Promise<void>( resolve => {
    splide.on( 'moved', () => {
      resolve();
    } );
  } );
}
