import { ARROW_LEFT, ARROW_RIGHT } from '../../constants/arrows';
import { EVENT_UPDATED } from '../../constants/events';
import { BaseComponent, ComponentConstructor } from '../../types';
import { prevent } from '@splidejs/utils';


/**
 * The interface for the Keyboard component.
 *
 * @since 3.0.0
 */
export interface KeyboardComponent extends BaseComponent {
  disable(disabled: boolean): void;
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
 * @param event      - An EventInterface instance.
 *
 * @return A Keyboard component object.
 */
export const Keyboard: ComponentConstructor<KeyboardComponent> = (Splide, Components, options, event) => {
  const { destroy } = event;
  const { resolve } = Components.Direction;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    const { keyboard } = options;

    destroy();
    keyboard && event.bind(keyboard === 'global' ? window : Splide.root, KEYBOARD_EVENT, onKeydown);
    event.on(EVENT_UPDATED, mount);
  }

  /**
   * Disables the keyboard input.
   *
   * @param value - Toggles disabling/enabling the keyboard input.
   */
  function disable(value: boolean): void {
    value ? destroy() : mount();
  }

  /**
   * Called when any key is pressed on the target.
   *
   * @param e - A KeyboardEvent object.
   */
  function onKeydown(e: KeyboardEvent): void {
    if (e.key === resolve(ARROW_LEFT)) {
      Splide.go('<');
      prevent(e, true);
    } else if (e.key === resolve(ARROW_RIGHT)) {
      Splide.go('>');
      prevent(e, true);
    }
  }

  return {
    mount,
    destroy,
    disable,
  };
};
