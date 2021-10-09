import { EVENT_DRAG, EVENT_DRAGGING } from '../../../constants/events';
import { fire, init } from '../../../test';
import { assign } from '../../../utils';


describe( 'Drag', () => {
  test( 'can move the slider by drag.', () => {
    const splide = init();
    const track  = splide.Components.Elements.track;

    fireWithCoord( track, 'mousedown', { x: 0, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: 1, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: -100, timeStamp: 2 } );

    expect( splide.Components.Move.getPosition() ).toBe( -100 );

    fireWithCoord( window, 'mousemove', { x: -200, timeStamp: 3 } );

    expect( splide.Components.Move.getPosition() ).toBe( -200 );
  } );

  test( 'should not move the slider after dragging.', () => {
    const splide = init();
    const track  = splide.Components.Elements.track;

    fireWithCoord( track, 'mousedown', { x: 0 } );
    fireWithCoord( window, 'mousemove', { x: 1 } );
    fireWithCoord( window, 'mouseup' );

    expect( splide.Components.Move.getPosition() ).toBe( 0 );

    fireWithCoord( window, 'mousemove', { x: -200 } );
    fireWithCoord( window, 'mousemove', { x: -400 } );

    expect( splide.Components.Move.getPosition() ).toBe( 0 );
  } );

  test( 'can change the slide index if the drag velocity is enough.', () => {
    const splide = init( { speed: 0, width: 600 } );
    const track  = splide.Components.Elements.track;

    fireWithCoord( track, 'mousedown', { x: 0, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: 1, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: -20, timeStamp: 21 } ); // v = -1
    fireWithCoord( window, 'mouseup',   { x: -20, timeStamp: 21 } );

    // The destination will be flickPower * v + (-20) = -620
    expect( splide.index ).toBe( 1 );
  } );

  test( 'should not change the slide index if the drag velocity is not enough.', () => {
    const splide = init( { speed: 0, width: 600 } );
    const track  = splide.Components.Elements.track;

    fireWithCoord( track, 'mousedown', { x: 0, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: 1, timeStamp: 1 } );
    fireWithCoord( window, 'mousemove', { x: -20, timeStamp: 100 } );
    fireWithCoord( window, 'mouseup',   { x: -20, timeStamp: 100 } );

    expect( splide.index ).toBe( 0 );
  } );

  test( 'should start moving the slider immediately if the pointing device is a mouse.', () => {
    const splide = init();
    const onDrag = jest.fn();
    const track  = splide.Components.Elements.track;

    splide.on( EVENT_DRAG, onDrag );

    fire( track, 'mousedown' );
    fireWithCoord( window, 'mousemove' );

    expect( onDrag ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'should start moving the slider only when the drag distance becomes greater than the threshold.', () => {
    const splide     = init( { dragMinThreshold: 20 } );
    const onDragging = jest.fn();
    const track      = splide.Components.Elements.track;

    splide.on( EVENT_DRAGGING, onDragging );

    fireWithCoord( track, 'touchstart', { x: 0 } );
    fireWithCoord( track, 'touchmove', { x: -10 } );

    expect( onDragging ).not.toHaveBeenCalled();

    fireWithCoord( track, 'touchmove', { x: -30 } ); // isDragging becomes true
    fireWithCoord( track, 'touchmove', { x: -31 } );

    expect( onDragging ).toHaveBeenCalled();
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
