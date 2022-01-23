import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { MOVING, IDLE } from '../../constants/states';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { prevent } from '../../utils';


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
   * Threshold for detecting new scroll on trackpads
   * @see https://github.com/Splidejs/splide/issues/618#issuecomment-1019341967
   */
  const wheelThrehold = 10;

  /**
   * The last wheel deltaY
   */
  let lastDeltaY = 0;

  /**
   * If the input device is a trackpad or not
   */
  let isTrackpad = false;

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

      const diff = Math.abs( deltaY ) - Math.abs( lastDeltaY );

      // additional check for trackpads
      if ( !isTrackpad ) {
        isTrackpad = diff !== 0;
      }

      const isNewScroll = isTrackpad ? diff > wheelThrehold : true;
      const isDifferentDirection = deltaY * lastDeltaY < 0;

      lastDeltaY = deltaY;

      if (
        deltaY &&
        Splide.state.is( IDLE ) &&
        ( isDifferentDirection || isNewScroll )
      ) {
        const backwards = deltaY < 0;
        Splide.go( backwards ? '<' : '>' );
        shouldPrevent( backwards ) && prevent( e );

        // reset the flag in case that the user changes devices
        isTrackpad = false;
      }
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
