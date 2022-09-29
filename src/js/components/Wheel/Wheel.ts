import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { MOVING } from '../../constants/states';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, prevent, timeOf } from '../../utils';


/**
 * The interface for the Wheel component.
 *
 * @since 3.0.0
 */
export interface WheelComponent extends BaseComponent {
}

/**
 * The component for observing the mouse wheel and moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Wheel component object.
 */
export function Wheel( Splide: Splide, Components: Components, options: Options ): WheelComponent {
  const { bind } = EventInterface( Splide );

  /**
   * Holds the last time when the wheel moves the slider.
   */
  let lastTime = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.wheel ) {
      bind( Components.Elements.track, 'wheel', onWheel, SCROLL_LISTENER_OPTIONS );
    }
  }

  /**
   * Called when the user rotates the mouse wheel on the slider.
   *
   * @param e - A WheelEvent object.
   */
  function onWheel( e: WheelEvent ): void {
    if ( e.cancelable ) {
      const { deltaY } = e;
      const backwards = deltaY < 0;
      const timeStamp = timeOf( e );
      const min       = options.wheelMinThreshold || 0;
      const sleep     = options.wheelSleep || 0;

      if ( abs( deltaY ) > min && timeStamp - lastTime > sleep ) {
        Splide.go( backwards ? '<' : '>' );
        lastTime = timeStamp;
      }

      shouldPrevent( backwards ) && prevent( e );
    }
  }

  /**
   * Checks whether the component should prevent the default action of the wheel event or not.
   *
   * @param backwards - Set this to `true` for backwards direction.
   *
   * @return `true` if the action should be prevented.
   */
  function shouldPrevent( backwards: boolean ): boolean {
    return ! options.releaseWheel
      || Splide.state.is( MOVING )
      || Components.Controller.getAdjacent( backwards ) !== -1;
  }

  return {
    mount,
  };
}
