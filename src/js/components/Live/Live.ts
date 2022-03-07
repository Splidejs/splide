import { ARIA_ATOMIC, ARIA_LIVE } from '../../constants/attributes';
import { EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { apply, setAttribute } from '../../utils';


/**
 * The interface for the Live component.
 *
 * @since 4.0.0
 */
export interface LiveComponent extends BaseComponent {
  disable( disabled: boolean ): void;
}

/**
 * The component for implementing Live Region to the slider.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Live component object.
 */
export function Live( Splide: Splide, Components: Components, options: Options ): LiveComponent {
  const { on } = EventInterface( Splide );
  const { list } = Components.Elements;
  const { live } = options;

  /**
   * Indicates whether the live region is enabled or not.
   */
  const enabled = live && ! options.isNavigation;

  /**
   * Called when the component is mounted.
   * Explicitly sets `aria-atomic` to avoid SR from reading the content twice.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic
   */
  function mount(): void {
    if ( enabled ) {
      setAttribute( list, ARIA_ATOMIC, false );
      disable( ! Components.Autoplay.isPaused() );
      on( EVENT_AUTOPLAY_PLAY, apply( disable, true ) );
      on( EVENT_AUTOPLAY_PAUSE, apply( disable, false ) );
    }
  }

  /**
   * Disables/enables the live region.
   * Does nothing when the `live` option is not enabled.
   *
   * @param disabled - `true` to disable the live region or `false` to enable it again.
   */
  function disable( disabled: boolean ): void {
    if ( enabled ) {
      setAttribute( list, ARIA_LIVE, disabled ? 'off' : 'polite' );
    }
  }

  return {
    mount,
    disable,
  };
}