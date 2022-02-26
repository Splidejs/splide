import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';


/**
 * The interface for the Motion component.
 *
 * @since 3.7.0
 */
export interface MotionComponent extends BaseComponent {
  isReduced(): boolean;
}

/**
 * The component to reduce non-essential motion if the user requests it.
 * This component does not work in IE since it does not support `prefers-reduced-motion`.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 *
 * @since 3.7.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Motion component object.
 */
export function Motion( Splide: Splide, Components: Components, options: Options ): MotionComponent {
  const { bind } = EventInterface( Splide );
  const query = matchMedia( '(prefers-reduced-motion:reduce)' );

  /**
   * Called when the component is mounted.
   * The event handler will never be fired on IE since it does not support `prefers-reduced-motion`.
   */
  function mount(): void {
    bind( query, 'change', check );
    check();
  }

  /**
   * Checks the query and updates the slider if necessary.
   */
  function check(): void {
    const reduced = isReduced();
    Components.Options.fix( 'speed', reduced ? 0 : undefined );
    reduced && Components.Autoplay.pause();
  }

  /**
   * Checks if the motion should be reduced or not.
   */
  function isReduced(): boolean {
    return query.matches;
  }

  return {
    mount,
    isReduced,
  };
}