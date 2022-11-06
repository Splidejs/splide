import { EVENT_MOUNTED, EVENT_REFRESH } from '../../constants/events';
import { ComponentConstructor, TransitionComponent } from '../../types';
import { nextTick, noop } from '@splidejs/utils';


/**
 * The component for the fade transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Transition component object.
 */
export const Fade: ComponentConstructor<TransitionComponent> = (Splide, Components, options, event) => {
  const { Slides, Direction } = Components;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    event.on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }

  /**
   * Initializes the component.
   * Offsets all slides for stacking them onto the head of the list.
   * The `nextTick` disables the initial fade transition of the first slide.
   */
  function init(): void {
    Slides.forEach(Slide => {
      Slide.style('transform', `translateX(${ Direction.orient(100 * Slide.index) }%)`);
    });
  }

  /**
   * Starts the transition.
   *
   * @param index - A slide index to be active.
   * @param done  - The callback function that must be called after the transition ends.
   */
  function start(index: number, done: () => void): void {
    Slides.style('transition', `opacity ${ options.speed }ms ${ options.easing }`);
    nextTick(done);
  }

  return {
    mount,
    start,
    cancel: noop,
  };
};
