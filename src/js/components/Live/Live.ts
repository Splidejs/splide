import { ARIA_ATOMIC, ARIA_BUSY, ARIA_LIVE } from '../../constants/attributes';
import { CLASS_SR } from '../../constants/classes';
import { EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY, EVENT_MOVED, EVENT_SCROLLED } from '../../constants/events';
import { EventInterface, RequestInterval } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { append, apply, create, remove, removeAttribute, setAttribute } from '../../utils';


/**
 * The interface for the Live component.
 *
 * @since 4.0.0
 */
export interface LiveComponent extends BaseComponent {
  disable( disabled: boolean ): void;
}

/**
 * Delay in milliseconds before removing the SR field for Windows Narrator.
 */
const SR_REMOVAL_DELAY = 90;

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
  const { track } = Components.Elements;

  /**
   * Indicates whether the live region is enabled or not.
   */
  const enabled = options.live && ! options.isNavigation;

  /**
   * The span element for the SR only text.
   */
  const sr = create( 'span', CLASS_SR );

  /**
   * Holds the RequestInterval instance.
   */
  const interval = RequestInterval( SR_REMOVAL_DELAY, apply( toggle, false ) );

  /**
   * Called when the component is mounted.
   * - JAWS needs `aria-atomic` to make the `aria-busy` work.
   * - Immediately removing the SR makes Windows Narrator silent, hence requires the delay around 50ms.
   */
  function mount(): void {
    if ( enabled ) {
      disable( ! Components.Autoplay.isPaused() );
      setAttribute( track, ARIA_ATOMIC, true );
      sr.textContent = '…';

      on( EVENT_AUTOPLAY_PLAY, apply( disable, true ) );
      on( EVENT_AUTOPLAY_PAUSE, apply( disable, false ) );
      on( [ EVENT_MOVED, EVENT_SCROLLED ], apply( toggle, true ) );
    }
  }

  /**
   * Toggles the SR field and `aria-busy`.
   *
   * @param active - Determines whether to activate the field or not.
   */
  function toggle( active: boolean ): void {
    setAttribute( track, ARIA_BUSY, active );

    if ( active ) {
      append( track, sr );
      interval.start();
    } else {
      remove( sr );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    removeAttribute( track, [ ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY ] );
    remove( sr );
  }

  /**
   * Disables/enables the live region.
   * Does nothing when the `live` option is not enabled.
   *
   * @param disabled - `true` to disable the live region or `false` to enable it again.
   */
  function disable( disabled: boolean ): void {
    if ( enabled ) {
      setAttribute( track, ARIA_LIVE, disabled ? 'off' : 'polite' );
    }
  }

  return {
    mount,
    disable,
    destroy,
  };
}