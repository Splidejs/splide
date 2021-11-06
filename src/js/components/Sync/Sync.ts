import { ALL_ATTRIBUTES, ARIA_ORIENTATION, ROLE } from '../../constants/attributes';
import { TTB } from '../../constants/directions';
import {
  EVENT_CLICK,
  EVENT_MOUNTED,
  EVENT_MOVE,
  EVENT_NAVIGATION_MOUNTED,
  EVENT_SLIDE_KEYDOWN,
  EVENT_UPDATED,
} from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { empty, includes, prevent, removeAttribute, setAttribute } from '../../utils';
import { SlideComponent } from '../Slides/Slide';


/**
 * The interface for the Sync component.
 *
 * @since 3.0.0
 */
export interface SyncComponent extends BaseComponent {
}

/**
 * The keys for triggering the navigation slide.
 *
 * @since 3.0.0
 */
const TRIGGER_KEYS = [ ' ', 'Enter', 'Spacebar' ];

/**
 * The component for syncing multiple sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Sync component object.
 */
export function Sync( Splide: Splide, Components: Components, options: Options ): SyncComponent {
  const { splides } = Splide;
  const { list } = Components.Elements;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.isNavigation ) {
      navigate();
    } else {
      sync();
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    removeAttribute( list, ALL_ATTRIBUTES );
  }

  /**
   * Syncs the current index among all slides.
   * The `processed` array prevents recursive call of handlers.
   */
  function sync(): void {
    const processed: Splide[] = [];

    splides.concat( Splide ).forEach( ( splide, index, instances ) => {
      const { on } = EventInterface( splide );

      on( EVENT_MOVE, ( index, prev, dest ) => {
        instances.forEach( instance => {
          if ( instance !== splide && ! includes( processed, splide ) ) {
            processed.push( instance );
            instance.Components.Move.cancel();
            instance.go( instance.is( LOOP ) ? dest : index );
          }
        } );

        empty( processed );
      } );
    } );
  }

  /**
   * Makes slides clickable and moves the slider to the index of clicked slide.
   * Note that the direction of `menu` is implicitly `vertical` as default.
   */
  function navigate(): void {
    const { on, emit } = EventInterface( Splide );

    on( EVENT_CLICK, onClick );
    on( EVENT_SLIDE_KEYDOWN, onKeydown );
    on( [ EVENT_MOUNTED, EVENT_UPDATED ], update );

    setAttribute( list, ROLE, 'menu' );

    emit( EVENT_NAVIGATION_MOUNTED, Splide.splides );
  }

  /**
   * Update attributes.
   */
  function update(): void {
    setAttribute( list, ARIA_ORIENTATION, options.direction !== TTB ? 'horizontal' : null );
  }

  /**
   * Called when the navigation slide is clicked.
   *
   * @param Slide - A clicked Slide component.
   */
  function onClick( Slide: SlideComponent ): void {
    Splide.go( Slide.index );
  }

  /**
   * Called when any key is pressed on the navigation slide.
   *
   * @param Slide - A Slide component.
   * @param e     - A KeyboardEvent object.
   */
  function onKeydown( Slide: SlideComponent, e: KeyboardEvent ): void {
    if ( includes( TRIGGER_KEYS, e.key ) ) {
      onClick( Slide );
      prevent( e );
    }
  }

  return {
    mount,
    destroy,
  };
}
