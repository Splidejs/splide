import { ARROW_LEFT, ARROW_RIGHT } from '../../constants/arrows';
import { EVENT_MOVE, EVENT_UPDATED } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { nextTick } from '../../utils';
import { normalizeKey } from '../../utils/dom/normalizeKey/normalizeKey';


/**
 * The interface for the Keyboard component.
 *
 * @since 3.0.0
 */
export interface KeyboardComponent extends BaseComponent {
  disable( disabled: boolean ): void;
}

/**
 * The keyboard event name.
 *
 * @since 3.6.0
 */
const KEYBOARD_EVENT = 'keydown';

/**
 * The component for controlling the slider by keyboards.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Keyboard component object.
 */
export function Keyboard( Splide: Splide, Components: Components, options: Options ): KeyboardComponent {
  const { on, bind, unbind } = EventInterface( Splide );
  const { root } = Splide;
  const { resolve } = Components.Direction;

  /**
   * The target element of the keyboard event.
   */
  let target: Window | HTMLElement;

  /**
   * Indicates whether the component is currently disabled or not.
   */
  let disabled: boolean;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();
    on( EVENT_UPDATED, destroy );
    on( EVENT_UPDATED, init );
    on( EVENT_MOVE, onMove );
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const { keyboard } = options;

    if ( keyboard ) {
      target = keyboard === 'global' ? window : root;
      bind( target, KEYBOARD_EVENT, onKeydown );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    unbind( target, KEYBOARD_EVENT );
  }

  /**
   * Disables the keyboard input.
   *
   * @param value - Toggles disabling/enabling the keyboard input.
   */
  function disable( value: boolean ): void {
    disabled = value;
  }

  /**
   * Called when the slider moves.
   * To avoid the slider from moving twice, wait for a tick.
   */
  function onMove(): void {
    const _disabled = disabled;
    disabled = true;
    nextTick( () => { disabled = _disabled } );
  }

  /**
   * Called when any key is pressed on the target.
   *
   * @param e - A KeyboardEvent object.
   */
  function onKeydown( e: KeyboardEvent ): void {
    if ( ! disabled ) {
      const key = normalizeKey( e );

      if ( key === resolve( ARROW_LEFT ) ) {
        Splide.go( '<' );
      } else if ( key === resolve( ARROW_RIGHT ) ) {
        Splide.go( '>' );
      }
    }
  }

  return {
    mount,
    destroy,
    disable,
  };
}
