import { EVENT_MOVE, EVENT_REFRESH, EVENT_SCROLL, EVENT_SCROLLED, EVENT_UPDATED } from '../../constants/events';
import { SLIDE } from '../../constants/types';
import { EventInterface, RequestInterval, RequestIntervalInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, max } from '../../utils';
import { BASE_VELOCITY, BOUNCE_DIFF_THRESHOLD, BOUNCE_DURATION, FRICTION_FACTOR, MIN_DURATION } from './constants';


/**
 * The interface for the Scroll component.
 *
 * @since 3.0.0
 */
export interface ScrollComponent extends BaseComponent {
  scroll( position: number, duration?: number ): void;
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
 *
 * @return A Scroll component object.
 */
export function Scroll( Splide: Splide, Components: Components, options: Options ): ScrollComponent {
  const { on, emit } = EventInterface( Splide );
  const { Move } = Components;
  const { getPosition, getLimit, exceededLimit } = Move;

  /**
   * Retains the active RequestInterval object.
   */
  let interval: RequestIntervalInterface;

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
   * @param destination        - The destination to scroll to.
   * @param duration           - Optional. The scroll duration. If omitted, calculates it by the distance.
   * @param suppressConstraint - Optional. Whether to suppress constraint process when the slider exceeds bounds.
   */
  function scroll( destination: number, duration?: number, suppressConstraint?: boolean ): void {
    const start = getPosition();
    let friction = 1;

    duration = duration || computeDuration( abs( destination - start ) );
    clear();

    interval = RequestInterval( duration, onScrolled, rate => {
      const position = getPosition();
      const target   = start + ( destination - start ) * easing( rate );
      const diff     = ( target - getPosition() ) * friction;

      Move.translate( position + diff );

      if ( Splide.is( SLIDE ) && ! suppressConstraint && exceededLimit() ) {
        friction *= FRICTION_FACTOR;

        if ( abs( diff ) < BOUNCE_DIFF_THRESHOLD ) {
          bounce( exceededLimit( false ) );
        }
      }
    }, 1 );

    emit( EVENT_SCROLL );
    interval.start();
  }

  /**
   * Triggers the bounce effect when the slider reaches bounds.
   *
   * @param backwards - The direction the slider is going towards.
   */
  function bounce( backwards: boolean ): void {
    scroll( getLimit( ! backwards ), BOUNCE_DURATION, true );
  }

  /**
   * Called when scroll ends or is canceled.
   */
  function onScrolled(): void {
    emit( EVENT_SCROLLED );
  }

  /**
   * Computes the scroll duration by the distance and the base velocity.
   *
   * @param distance - Distance in pixel.
   *
   * @return The duration for scroll.
   */
  function computeDuration( distance: number ): number {
    return max( distance / BASE_VELOCITY, MIN_DURATION );
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
      onScrolled();
    }
  }

  /**
   * The easing function.
   *
   * @param t - A value to ease.
   *
   * @return An eased value.
   */
  function easing( t: number ): number {
    const { easingFunc } = options;
    return easingFunc ? easingFunc( t ) : 1 - Math.pow( 1 - t, 4 );
  }

  return {
    mount,
    destroy: clear,
    scroll,
    cancel,
  };
}
