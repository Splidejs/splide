import {
  EVENT_MOVE,
  EVENT_REFRESH,
  EVENT_SCROLL,
  EVENT_SCROLLED,
  EVENT_SCROLLING,
  EVENT_UPDATED,
} from '../../constants/events';
import { IDLE, SCROLLING } from '../../constants/states';
import { SLIDE } from '../../constants/types';
import { AnyFunction, BaseComponent, ComponentConstructor } from '../../types';
import { abs, apply, approximatelyEqual, max, RequestInterval } from '@splidejs/utils';
import { BASE_VELOCITY, BOUNCE_DIFF_THRESHOLD, BOUNCE_DURATION, FRICTION_FACTOR, MIN_DURATION } from './constants';


/**
 * The interface for the Scroll component.
 *
 * @since 3.0.0
 */
export interface ScrollComponent extends BaseComponent {
  scroll( position: number, duration?: number, snap?: boolean, callback?: AnyFunction ): void;
  cancel(): void;
}

/**
 * The component for scrolling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Scroll component object.
 */
export const Scroll: ComponentConstructor<ScrollComponent> = ( Splide, Components, options, event ) => {
  const { on, emit } = event;
  const { state: { set } } = Splide;
  const { Move } = Components;
  const { getPosition, getLimit, exceededLimit, translate } = Move;
  const isSlide = Splide.is( SLIDE );

  /**
   * Retains the active RequestInterval object.
   */
  let interval: RequestInterval;

  /**
   * Holds the callback function.
   */
  let callback: AnyFunction;

  /**
   * The current friction (<= 1).
   */
  let friction = 1;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( EVENT_MOVE, clear );
    on( [ EVENT_UPDATED, EVENT_REFRESH ], cancel );
  }

  /**
   * Scrolls the slider to the provided destination.
   *
   * @param destination - The destination to scroll the slider to.
   * @param duration    - Optional. The scroll duration. If omitted, calculates it by the distance.
   * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
   * @param onScrolled  - Optional. A callback invoked after scroll ends.
   * @param noConstrain - Optional. Whether to suppress constraint process when the slider exceeds bounds.
   */
  function scroll(
    destination: number,
    duration?: number,
    snap?: boolean,
    onScrolled?: AnyFunction,
    noConstrain?: boolean
  ): void {
    clear();

    const dest        = computeDestination( destination, snap );
    const from        = getPosition();
    const immediately = approximatelyEqual( from, dest, 1 ) || duration === 0;

    friction = 1;
    duration = immediately ? 0 : duration || max( abs( dest - from ) / BASE_VELOCITY, MIN_DURATION );
    callback = onScrolled;
    interval = RequestInterval( duration, onEnd, apply( update, from, dest, noConstrain ), 1 );

    set( SCROLLING );
    emit( EVENT_SCROLL );
    interval.start();
  }

  /**
   * Computes destination.
   *
   * @param destination - A desired destination.
   * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
   *
   * @return A computed destination.
   */
  function computeDestination( destination: number, snap?: boolean ): number {
    if ( snap ) {
      if ( ! isSlide || ! exceededLimit() ) {
        const position = destination % Components.Layout.sliderSize();
        const snapped  = Move.toPosition( Components.Controller.toDest( position ) );
        destination -= position - snapped;
      }
    }

    return destination;
  }

  /**
   * Called when scroll ends or has been just canceled.
   */
  function onEnd(): void {
    set( IDLE );
    callback && callback();
    emit( EVENT_SCROLLED );
  }

  /**
   * Called whenever the interval timer is updated.
   *
   * @param from        - A position where scroll starts.
   * @param to          - A destination where the slider goes.
   * @param noConstrain - Whether to suppress constraint process when the slider exceeds bounds.
   * @param rate        - A current rate.
   */
  function update( from: number, to: number, noConstrain: boolean | undefined, rate: number ): void {
    const { easingFunc = t => 1 - Math.pow( 1 - t, 4 ) } = options;
    const position = getPosition();
    const target   = from + ( to - from ) * easingFunc( rate );
    const diff     = ( target - position ) * friction;

    translate( position + diff );
    emit( EVENT_SCROLLING );

    if ( isSlide && ! noConstrain && exceededLimit() ) {
      friction *= FRICTION_FACTOR;

      if ( abs( diff ) < BOUNCE_DIFF_THRESHOLD ) {
        scroll( getLimit( exceededLimit( true ) ), BOUNCE_DURATION, false, callback, true );
      }
    }
  }

  /**
   * Clears the active interval.
   */
  function clear(): void {
    if ( interval ) {
      interval.cancel();
    }
  }

  /**
   * Cancels the active interval and emits the `scrolled` event.
   */
  function cancel(): void {
    if ( interval && ! interval.isPaused() ) {
      clear();
      onEnd();
    }
  }

  return {
    mount,
    destroy: clear,
    scroll,
    cancel,
  };
};
