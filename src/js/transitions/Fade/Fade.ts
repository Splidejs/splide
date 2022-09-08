import { EVENT_MOUNTED, EVENT_REFRESH } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { Components, Options, TransitionComponent } from '../../types';
import { nextTick, noop } from '../../utils';


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
  const { Slides } = Components;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    EventInterface( Splide ).on( [ EVENT_MOUNTED, EVENT_REFRESH ], init );
  }

  /**
   * Initializes the component.
   * Offsets all slides for stacking them onto the head of the list.
   * The `nextTick` disables the initial fade transition of the first slide.
   */
  function init(): void {
    Slides.forEach( Slide => {
      Slide.style( 'transform', `translateX(-${ 100 * Slide.index }%)` );
    } );
  }

  /**
   * Starts the transition.
   *
   * @param index - A slide index to be active.
   * @param done  - The callback function that must be called after the transition ends.
   */
  function start( index: number, done: () => void ): void {
    Slides.style( 'transition', `opacity ${ options.speed }ms ${ options.easing }` );
    nextTick( done );
  }

  return {
    mount,
    start,
    cancel: noop,
  };
}
