import { TAB_INDEX } from '../../constants/attributes';
import { EVENT_UPDATED, EVENT_MOVE } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { includes, isHTMLElement, nextTick, removeAttribute, setAttribute } from '../../utils';


/**
 * The interface for the Keyboard component.
 *
 * @since 3.0.0
 */
export interface KeyboardComponent extends BaseComponent {
}

/**
 * The collection of arrow keys of IE.
 *
 * @since 3.0.0
 */
const IE_ARROW_KEYS = [ 'Left', 'Right', 'Up', 'Down' ];

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
  const { root } = Components.Elements;
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
    on( EVENT_UPDATED, onUpdated );
    on( EVENT_MOVE, onMove );
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const { keyboard = 'global' } = options;

    if ( keyboard ) {
      if ( keyboard === 'focused' ) {
        target = root;
        setAttribute( root, TAB_INDEX, 0 );
      } else {
        target = window;
      }

      bind( target, 'keydown', onKeydown );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    unbind( target, 'keydown' );

    if ( isHTMLElement( target ) ) {
      removeAttribute( target, TAB_INDEX );
    }
  }

  /**
   * Called when the slider moves.
   * To avoid the slider from moving twice, wait for a tick.
   */
  function onMove(): void {
    disabled = true;
    nextTick( () => { disabled = false } );
  }

  /**
   * Called when options are update.
   */
  function onUpdated(): void {
    destroy();
    init();
  }

  /**
   * Called when any key is pressed on the target.
   *
   * @param e - A KeyboardEvent object.
   */
  function onKeydown( e: KeyboardEvent ): void {
    if ( ! disabled ) {
      const { key } = e;
      const normalizedKey = includes( IE_ARROW_KEYS, key ) ? `Arrow${ key }` : key;

      if ( normalizedKey === resolve( 'ArrowLeft' ) ) {
        Splide.go( '<' );
      } else if ( normalizedKey === resolve( 'ArrowRight' ) ) {
        Splide.go( '>' );
      }
    }
  }

  return {
    mount,
    destroy,
  };
}
