import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { MOVING } from '../../constants/states';
import { BaseComponent, ComponentConstructor } from '../../types';
import { abs, includes, prevent, timeOf } from '@splidejs/utils';
import { EVENT_UPDATED } from '../../constants/events';


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
 * @param event      - An EventInterface instance.
 *
 * @return A Wheel component object.
 */
export const Wheel: ComponentConstructor<WheelComponent> = ( Splide, Components, options, event ) => {
  /**
   * Holds the last time when the wheel moves the slider.
   */
  let lastTime = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    event.destroy();

    if ( options.wheel ) {
      event.bind( Components.Elements.track, 'wheel', onWheel, SCROLL_LISTENER_OPTIONS );
    }

    event.on( EVENT_UPDATED, mount );
  }

  /**
   * Called when the user rotates the mouse wheel on the slider.
   *
   * @param e - A WheelEvent object.
   */
  function onWheel( e: WheelEvent ): void {
    if ( e.cancelable ) {
      const delta     = parse( e );
      const backwards = delta < 0;
      const timeStamp = timeOf( e );
      const min       = options.wheelMinThreshold || 0;
      const sleep     = options.wheelSleep || 0;

      if ( abs( delta ) > min && timeStamp - lastTime > sleep ) {
        Splide.go( delta < 0 ? '<' : '>' );
        lastTime = timeStamp;
      }

      shouldPrevent( backwards ) && prevent( e );
    }
  }

  /**
   * Parses the wheel event and returns delta.
   *
   * @param e - A WheelEvent object.
   */
  function parse( e: WheelEvent ): number {
    const { wheelAxis = 'y' } = options;
    const { deltaX, deltaY } = e;
    const x = includes( wheelAxis, 'x' ) ? Components.Direction.orient( -deltaX ) : 0;
    const y = includes( wheelAxis, 'y' ) ? deltaY : 0;

    return x || y;
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
};
