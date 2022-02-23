import { fire, init, wait } from '../../../test';
import { assign } from '../../../utils';


describe( 'Drag', () => {
  test( 'can rewind the slider if `rewind` and `rewindByDrag` are enabled.', () => {
    const splide = init( { speed: 0, rewind: true, rewindByDrag: true } );
    const track  = splide.Components.Elements.track;

    expect( splide.index ).toBe( 0 );

    // On the first slide, drags backwards a bit.
    drag( track, true );
    expect( splide.index ).toBe( splide.length - 1 );

    // On the last slide, drags forwards a bit.
    drag( track, false ); // Forwards
    expect( splide.index ).toBe( 0 );
  } );

  test( 'should not rewind the slider if `rewindByDrag` is disabled.', () => {
    const splide = init( { speed: 0, rewind: true, rewindByDrag: false } );
    const track  = splide.Components.Elements.track;

    expect( splide.index ).toBe( 0 );

    drag( track, true );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'should not rewind the slider if `rewind` is disabled.', () => {
    const splide = init( { speed: 0, rewind: false, rewindByDrag: true } );
    const track  = splide.Components.Elements.track;

    expect( splide.index ).toBe( 0 );

    drag( track, true );
    expect( splide.index ).toBe( 0 );
  } );

  test( 'can rewind the fade slider if `rewind` and `rewindByDrag` are enabled.', async () => {
    const splide = init( { type: 'fade', speed: 0, rewind: true, rewindByDrag: true } );
    const track  = splide.Components.Elements.track;

    expect( splide.index ).toBe( 0 );

    drag( track, true );
    expect( splide.index ).toBe( splide.length - 1 );

    await wait(); // Wait `nextTick`.

    drag( track, false );
    expect( splide.index ).toBe( 0 );
  } );
} );

function fireCancelable( elm: Element | Window, event: string, data: any = {} ): void {
  fire( elm, event, data, { cancelable: true } );
}

function fireWithCoord( elm: Element | Window, event: string, data: any = {} ): void {
  const { x: pageX = 0, y: pageY = 0 } = data;

  fireCancelable( elm, event, assign( data, {
    pageX,
    pageY,
    touches: [
      { pageX, pageY },
    ],
  } ) );
}

function drag( track: HTMLElement, backwards?: boolean ): void {
  const to = backwards ? 10 : -10;

  fireWithCoord( track, 'mousedown', { x: 0, timeStamp: 1 } );
  fireWithCoord( window, 'mousemove', { x: 1, timeStamp: 1 } );
  fireWithCoord( window, 'mousemove', { x: to, timeStamp: 20 } );
  fireWithCoord( window, 'mouseup', { x: to, timeStamp: 20 } );
}
