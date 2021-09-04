import { Components, KeyboardComponent, Options } from '@splide/splide';
import { TAB_INDEX } from '../../constants/attributes';
import { EVENT_UPDATED } from '../../constants/events';
import { Splide } from '../../core/Splide/Splide';
import { EventInterface } from '../../constructors';
import { includes, isHTMLElement, removeAttribute, setAttribute } from '../../utils';


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
   * Called when the component is mounted.
   */
  function mount(): void {
    init();

    on( EVENT_UPDATED, () => {
      destroy();
      init();
    } );
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

      bind( target, 'keydown', e => {
        const key = normalize( e.key );

        if ( key === resolve( 'ArrowLeft' ) ) {
          Splide.go( '<' );
        } else if ( key === resolve( 'ArrowRight' ) ) {
          Splide.go( '>' );
        }
      } );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy() {
    if ( target ) {
      unbind( target, 'keydown' );

      if ( isHTMLElement( target ) ) {
        removeAttribute( target, TAB_INDEX );
      }
    }
  }

  /**
   * Absorbs the difference of key names among browsers.
   *
   * @param key - A key to normalize.
   *
   * @return A normalized key.
   */
  function normalize( key: string ): string {
    return includes( IE_ARROW_KEYS, key ) ? `Arrow${ key }` : key;
  }

  return {
    mount,
    destroy,
  };
}
