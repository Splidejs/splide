import { Components, Options, WheelComponent } from '@splide/splide';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { prevent } from '../../utils';


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
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.wheel ) {
      bind( Components.Elements.track, 'wheel', onWheel );
    }
  }

  /**
   * Called when the user rotates the mouse wheel.
   *
   * @param e - A WheelEvent object.
   */
  function onWheel( e: WheelEvent ): void {
    const { deltaY } = e;

    if ( deltaY ) {
      Splide.go( deltaY < 0 ? '<' : '>' );
      prevent( e );
    }
  }

  return {
    mount,
  };
}
