import { EVENT_MOUNTED, EVENT_REFRESH } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { Components, Options, TransitionComponent } from '../../types';
import { nextTick, noop, rect, unit, style } from '../../utils';


/**
 * The component for the fade transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */
export function Fade( Splide: Splide, Components: Components, options: Options ): TransitionComponent {
  const { on } = EventInterface( Splide );

  /**
   * Called when the component is mounted.
   * The nextTick disables the initial fade transition of the first slide.
   */
  function mount(): void {
    on( [ EVENT_MOUNTED, EVENT_REFRESH ], () => {
      nextTick( () => {
        Components.Slides.style( 'transition', `opacity ${ options.speed }ms ${ options.easing }` );
      } );
    } );
  }

  /**
   * Starts the transition.
   * Explicitly sets the track height to avoid it will collapse in Safari.
   *
   * @param index - A destination index.
   * @param done  - The callback function that must be called after the transition ends.
   */
  function start( index: number, done: () => void ): void {
    const { track } = Components.Elements;
    style( track, 'height', unit( rect( track ).height ) );

    nextTick( () => {
      done();
      style( track, 'height', '' );
    } );
  }

  return {
    mount,
    start,
    cancel: noop,
  };
}
