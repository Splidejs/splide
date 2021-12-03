import { EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING, EVENT_MOUNTED, EVENT_UPDATED } from '../../constants/events';
import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { FADE, LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, isObject, matches, min, noop, prevent, sign } from '../../utils';
import { FRICTION, LOG_INTERVAL, POINTER_DOWN_EVENTS, POINTER_MOVE_EVENTS, POINTER_UP_EVENTS } from './constants';


/**
 * The interface for the Drag component.
 *
 * @since 3.0.0
 */
export interface DragComponent extends BaseComponent {
  disable( disabled: boolean ): void;
  isDragging(): boolean;
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
  const { on, emit, bind, unbind } = EventInterface( Splide );
  const { Move, Scroll, Controller } = Components;
  const { track } = Components.Elements;
  const { resolve, orient } = Components.Direction;
  const { getPosition, exceededLimit } = Move;

  /**
   * The base slider position to calculate the delta of coords.
   */
  let basePosition: number;

  /**
   * The base event object saved per specific sampling interval.
   */
  let baseEvent: TouchEvent | MouseEvent;

  /**
   * Holds the previous base event object.
   */
  let prevBaseEvent: TouchEvent | MouseEvent;

  /**
   * Keeps the last TouchEvent/MouseEvent object on pointermove.
   */
  let lastEvent: TouchEvent | MouseEvent;

  /**
   * Indicates whether the drag mode is `free` or not.
   */
  let isFree: boolean;

  /**
   * Indicates whether the user is dragging the slider or not.
   */
  let dragging: boolean;

  /**
   * Indicates whether the slider exceeds limits or not.
   * This must not be `undefined` for strict comparison.
   */
  let hasExceeded = false;

  /**
   * Turns into `true` when the user starts dragging the slider.
   */
  let clickPrevented: boolean;

  /**
   * Indicates whether the drag component is now disabled or not.
   */
  let disabled: boolean;

  /**
   * The target element to attach listeners.
   */
  let target: Window | HTMLElement;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    bind( track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS );
    bind( track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS );
    bind( track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS );
    bind( track, 'click', onClick, { capture: true } );
    bind( track, 'dragstart', prevent );

    on( [ EVENT_MOUNTED, EVENT_UPDATED ], init );
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const { drag } = options;
    disable( ! drag );
    isFree = drag === 'free';
  }

  /**
   * Called when the user clicks or touches the slider.
   * Needs to prevent the default behaviour when the slider is busy to deny any action, such as dragging images.
   * Note that IE does not support MouseEvent and TouchEvent constructors.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onPointerDown( e: TouchEvent | MouseEvent ): void {
    if ( ! disabled ) {
      const { noDrag } = options;
      const isTouch     = isTouchEvent( e );
      const isDraggable = ! noDrag || ! matches( e.target, noDrag );

      clickPrevented = false;

      if ( isDraggable && ( isTouch || ! e.button ) ) {
        if ( ! Move.isBusy() ) {
          target        = isTouch ? track : window;
          prevBaseEvent = null;
          lastEvent     = null;

          bind( target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS );
          bind( target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS );
          Move.cancel();
          Scroll.cancel();
          save( e );
        } else {
          prevent( e, true );
        }
      }
    }
  }

  /**
   * Called while the user moves the pointer on the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */
  function onPointerMove( e: TouchEvent | MouseEvent ): void {
    if ( ! lastEvent ) {
      emit( EVENT_DRAG );
    }

    lastEvent = e;

    if ( e.cancelable ) {
      const diff = coordOf( e ) - coordOf( baseEvent );

      if ( dragging ) {
        Move.translate( basePosition + constrain( diff ) );

        const expired  = timeOf( e ) - timeOf( baseEvent ) > LOG_INTERVAL;
        const exceeded = hasExceeded !== ( hasExceeded = exceededLimit() );

        if ( expired || exceeded ) {
          save( e );
        }

        emit( EVENT_DRAGGING );
        clickPrevented = true;
        prevent( e );
      } else {
        let { dragMinThreshold: thresholds } = options;
        thresholds = isObject( thresholds ) ? thresholds : { mouse: 0, touch: +thresholds || 10 };
        dragging   = abs( diff ) > ( isTouchEvent( e ) ? thresholds.touch : thresholds.mouse );

        if ( isSliderDirection() ) {
          prevent( e );
        }
      }
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
    unbind( target, POINTER_MOVE_EVENTS, onPointerMove );
    unbind( target, POINTER_UP_EVENTS, onPointerUp );

    const { index } = Splide;

    if ( lastEvent ) {
      if ( dragging || ( e.cancelable && isSliderDirection() ) ) {
        const velocity    = computeVelocity( e );
        const destination = computeDestination( velocity );

        if ( isFree ) {
          Controller.scroll( destination );
        } else if ( Splide.is( FADE ) ) {
          Controller.go( index + orient( sign( velocity ) ) );
        } else {
          Controller.go( Controller.toDest( destination ), true );
        }

        prevent( e );
      }

      emit( EVENT_DRAGGED );
    } else {
      if ( ! isFree && getPosition() !== Move.toPosition( index ) ) {
        Controller.go( index, true );
      }
    }

    dragging = false;
  }

  /**
   * Saves data at the specific moment.
   *
   * @param e  A TouchEvent or MouseEvent object
   */
  function save( e: TouchEvent | MouseEvent ): void {
    prevBaseEvent = baseEvent;
    baseEvent     = e;
    basePosition  = getPosition();
  }

  /**
   * Called when the track element is clicked.
   * Disables click any elements inside it while dragging.
   *
   * @param e - A MouseEvent object.
   */
  function onClick( e: MouseEvent ): void {
    if ( ! disabled && clickPrevented ) {
      prevent( e, true );
    }
  }

  /**
   * Checks whether dragging towards the slider or scroll direction.
   *
   * @return `true` if going towards the slider direction, or otherwise `false`.
   */
  function isSliderDirection(): boolean {
    const diffX = abs( coordOf( lastEvent ) - coordOf( baseEvent ) );
    const diffY = abs( coordOf( lastEvent, true ) - coordOf( baseEvent, true ) );
    return diffX > diffY;
  }

  /**
   * Computes the drag velocity.
   *
   * @param e - A TouchEvent or MouseEvent object
   *
   * @return The drag velocity.
   */
  function computeVelocity( e: TouchEvent | MouseEvent ): number {
    if ( Splide.is( LOOP ) || ! hasExceeded ) {
      const base      = baseEvent === lastEvent && prevBaseEvent || baseEvent;
      const diffCoord = coordOf( lastEvent ) - coordOf( base );
      const diffTime  = timeOf( e ) - timeOf( base );
      const isFlick   = timeOf( e ) - timeOf( lastEvent ) < LOG_INTERVAL;

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
    return getPosition() + sign( velocity ) * min(
      abs( velocity ) * ( options.flickPower || 600 ),
      isFree ? Infinity : Components.Layout.listSize() * ( options.flickMaxPages || 1 )
    );
  }

  /**
   * Returns the `pageX` and `pageY` coordinates provided by the event.
   * Be aware that IE does not support both TouchEvent and MouseEvent constructors.
   *
   * @param e          - A TouchEvent or MouseEvent object.
   * @param orthogonal - Optional. If `true`, returns the coord of the orthogonal axis against the drag one.
   *
   * @return A pageX or pageY coordinate.
   */
  function coordOf( e: TouchEvent | MouseEvent, orthogonal?: boolean ): number {
    return ( isTouchEvent( e ) ? e.touches[ 0 ] : e )[ `page${ resolve( orthogonal ? 'Y' : 'X' ) }` ];
  }

  /**
   * Returns the time stamp in the provided event object.
   *
   * @param e - A TouchEvent or MouseEvent object.
   *
   * @return A time stamp.
   */
  function timeOf( e: TouchEvent | MouseEvent ): number {
    return e.timeStamp;
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
    return diff / ( hasExceeded && Splide.is( SLIDE ) ? FRICTION : 1 );
  }

  /**
   * Checks if the provided event is TouchEvent or MouseEvent.
   *
   * @param e - An event to check.
   *
   * @return `true` if the `e` is TouchEvent.
   */
  function isTouchEvent( e: TouchEvent | MouseEvent ): e is TouchEvent {
    return typeof TouchEvent !== 'undefined' && e instanceof TouchEvent;
  }

  /**
   * Checks if now the user is dragging the slider or not.
   *
   * @return `true` if the user is dragging the slider or otherwise `false`.
   */
  function isDragging(): boolean {
    return dragging;
  }

  /**
   * Disables the component.
   *
   * @param value - Set `true` to disable the component.
   */
  function disable( value: boolean ): void {
    disabled = value;
  }

  return {
    mount,
    disable,
    isDragging,
  };
}
