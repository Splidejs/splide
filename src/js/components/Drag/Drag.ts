import { EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING } from '../../constants/events';
import { FADE, LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, clamp, min, prevent, sign } from '../../utils';
import { FRICTION, POINTER_DOWN_EVENTS, POINTER_MOVE_EVENTS, POINTER_UP_EVENTS, SAMPLING_INTERVAL } from './constants';


/**
 * The interface for the Drag component.
 *
 * @since 3.0.0
 */
export interface DragComponent extends BaseComponent {
}

/**
 * The component for dragging the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Drag component object.
 */
export function Drag( Splide: Splide, Components: Components, options: Options ): DragComponent {
  const { emit, bind, unbind } = EventInterface( Splide );
  const { track } = Components.Elements;
  const { resolve, orient } = Components.Direction;
  const { listSize } = Components.Layout;
  const { go, getEnd } = Components.Controller;
  const { Move, Scroll } = Components;
  const { translate, toIndex, getPosition, isExceeded } = Move;
  const isSlide = Splide.is( SLIDE );
  const isFade  = Splide.is( FADE );
  const isFree  = options.drag === 'free';

  /**
   * The coord where a pointer becomes active.
   */
  let startCoord: number;

  /**
   * Keeps the last time when the component detects dragging.
   */
  let lastTime: number;

  /**
   * The base slider position where the diff of coords is applied.
   */
  let basePosition: number;

  /**
   * The base coord to calculate the diff of coords.
   */
  let baseCoord: number;

  /**
   * The base time when the base position and the base coord are saved.
   */
  let baseTime: number;

  /**
   * Keeps the last TouchEvent/MouseEvent object.
   */
  let lastEvent: TouchEvent | MouseEvent;

  /**
   * Indicates whether the user is dragging the slider or not.
   */
  let moving: boolean;

  /**
   * Indicates whether the user drags the slider by the mouse or not.
   */
  let isMouse: boolean;

  let target: Window | HTMLElement;

  /**
   * Indicates whether the slider exceeds borders or not.
   */
  let exceeded: boolean;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.drag ) {
      bind( track, POINTER_DOWN_EVENTS, onPointerDown );
    }
  }

  /**
   * Called when the user clicks or touches the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onPointerDown( e: TouchEvent | MouseEvent ): void {
    isMouse = e.type === 'mousedown';
    target  = isMouse ? window : track;

    if ( ! ( isMouse && ( e as MouseEvent ).button ) ) {
      if ( ! Move.isBusy() ) {
        bind( target, POINTER_MOVE_EVENTS, onPointerMove );
        bind( target, POINTER_UP_EVENTS, onPointerUp );
        Move.cancel();
        Scroll.cancel();
        startCoord = getCoord( e );
      } else {
        prevent( e );
      }
    }
  }

  /**
   * Called while the user moves the pointer on the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onPointerMove( e: TouchEvent | MouseEvent ): void {
    if ( e.cancelable ) {
      const min = options.dragMinThreshold || 15;

      if ( isMouse || abs( getCoord( e ) - startCoord ) > min ) {
        moving = true;
        onDrag();
      }

      if ( moving ) {
        onDragging( e );
        prevent( e, true );
      }
    } else {
      onPointerUp( e );
    }
  }

  /**
   * Called when the user releases pointing devices.
   * Be aware that the TouchEvent object provided by the `touchend` does not contain `Touch` objects,
   * which means the last touch position is not available.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onPointerUp( e: TouchEvent | MouseEvent ): void {
    unbind( target, `${ POINTER_MOVE_EVENTS } ${ POINTER_UP_EVENTS }` );
    moving = false;

    if ( lastEvent ) {
      onDragged( e );
      lastEvent = null;
    }
  }

  /**
   * Called when the user starts dragging the slider.
   */
  function onDrag(): void {
    bind( track, 'click', e => {
      unbind( track, 'click' );
      prevent( e, true );
    }, { capture: true } );

    emit( EVENT_DRAG );
  }

  /**
   * Called while the user is dragging the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onDragging( e: TouchEvent | MouseEvent ): void {
    const { timeStamp } = e;
    const expired = ! lastTime || ( timeStamp - lastTime > SAMPLING_INTERVAL );

    if ( expired || isExceeded() !== exceeded ) {
      basePosition = getPosition();
      baseCoord    = getCoord( e );
      baseTime     = timeStamp;
    }

    exceeded  = isExceeded();
    lastTime  = timeStamp;
    lastEvent = e;

    if ( ! isFade ) {
      translate( basePosition + constrain( getCoord( e ) - baseCoord ) );
    }

    emit( EVENT_DRAGGING );
  }

  /**
   * Called when the user finishes dragging.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onDragged( e: TouchEvent | MouseEvent ): void {
    const velocity = computeVelocity( e );

    if ( isFade ) {
      go( Splide.index + orient( sign( velocity ) ) );
    } else {
      const destination = computeDestination( velocity );

      if ( isFree ) {
        Scroll.scroll( destination );
      } else {
        go( computeIndex( destination ), true );
      }
    }

    lastTime = 0;
    emit( EVENT_DRAGGED );
  }

  /**
   * Computes the drag velocity.
   *
   * @param e - A TouchEvent or MouseEvent object
   *
   * @return The drag velocity.
   */
  function computeVelocity( e: TouchEvent | MouseEvent ): number {
    if ( Splide.is( LOOP ) || ! isExceeded() ) {
      const diffCoord = getCoord( lastEvent ) - baseCoord;
      const diffTime  = lastEvent.timeStamp - baseTime;
      const isFlick   = e.timeStamp - lastTime < SAMPLING_INTERVAL;

      if ( diffTime && isFlick ) {
        return diffCoord / diffTime;
      }
    }

    return 0;
  }

  /**
   * Computes the destination by the velocity and the `flickPower` option.
   *
   * @param velocity - The drag velocity.
   *
   * @return The destination.
   */
  function computeDestination( velocity: number ): number {
    const flickPower = options.flickPower || 600;

    return getPosition() + sign( velocity ) * min(
      abs( velocity ) * flickPower,
      isFree ? Infinity : listSize() * ( options.flickMaxPages || 1 )
    );
  }

  /**
   * Converts the destination to the slide index.
   *
   * @param destination - The target destination.
   *
   * @return The destination index.
   */
  function computeIndex( destination: number ): number {
    const dest = toIndex( destination );
    return isSlide ? clamp( dest, 0, getEnd() ) : dest;
  }

  /**
   * Returns the `pageX` and `pageY` coordinates provided by the event.
   * Be aware that IE does not support both TouchEvent and MouseEvent constructors.
   *
   * @param e - A TouchEvent or MouseEvent object.
   *
   * @return A pageX or pageY coordinate.
   */
  function getCoord( e: TouchEvent | MouseEvent ): number {
    return ( isMouse ? e : ( e as TouchEvent ).touches[ 0 ] )[ resolve( 'pageX' ) ];
  }

  /**
   * Reduces the distance to move by the predefined friction.
   * This does nothing when the slider type is not `slide`, or the position is inside borders.
   *
   * @param diff - Diff to constrain.
   *
   * @return The constrained diff.
   */
  function constrain( diff: number ): number {
    return diff / ( exceeded && isSlide ? FRICTION : 1 );
  }

  return {
    mount,
  };
}
