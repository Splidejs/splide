import { EVENT_CLICK, EVENT_MOVE, EVENT_NAVIGATION_MOUNTED, EVENT_SLIDE_KEYDOWN } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { empty, includes, prevent } from '../../utils';


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
   * Syncs the current index among all slides.
   * The `processed` array prevents recursive call of handlers.
   */
  function sync(): void {
    const processed: Splide[] = [];

    splides.concat( Splide ).forEach( ( splide, index, instances ) => {
      EventInterface( splide ).on( EVENT_MOVE, ( index, prev, dest ) => {
        instances.forEach( instance => {
          if ( instance !== splide && ! includes( processed, splide ) ) {
            processed.push( instance );
            instance.go( instance.is( LOOP ) ? dest : index );
          }
        } );

        empty( processed );
      } );
    } );
  }

  /**
   * Makes slides clickable and moves the slider to the index of clicked slide.
   */
  function navigate(): void {
    const { on, emit } = EventInterface( Splide );

    on( EVENT_CLICK, Slide => {
      Splide.go( Slide.index );
    } );

    on( EVENT_SLIDE_KEYDOWN, ( Slide, e: KeyboardEvent ) => {
      if ( includes( TRIGGER_KEYS, e.key ) ) {
        Splide.go( Slide.index );
        prevent( e );
      }
    } );

    emit( EVENT_NAVIGATION_MOUNTED, Splide.splides );
  }

  return {
    mount,
  };
}
