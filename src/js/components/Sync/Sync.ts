import { ARIA_ORIENTATION } from '../../constants/attributes';
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
import { EventInterface, EventInterfaceObject } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { apply, empty, includes, isUndefined, prevent, setAttribute } from '../../utils';
import { normalizeKey } from '../../utils/dom/normalizeKey/normalizeKey';
import { SlideComponent } from '../Slides/Slide';


/**
 * The interface for the Sync component.
 *
 * @since 3.0.0
 */
export interface SyncComponent extends BaseComponent {
  remount(): void;
}

/**
 * The keys for triggering the navigation slide.
 *
 * @since 3.0.0
 */
const TRIGGER_KEYS = [ ' ', 'Enter' ];

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
  const { isNavigation, slideFocus } = options;

  /**
   * Stores event objects.
   */
  const events: EventInterfaceObject[] = [];

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    Splide.splides.forEach( target => {
      if ( ! target.isParent ) {
        sync( Splide, target.splide );
        sync( target.splide, Splide );
      }
    } );

    if ( isNavigation ) {
      navigate();
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    events.forEach( event => { event.destroy() } );
    empty( events );
  }

  /**
   * Remounts the component.
   *
   * @internal
   */
  function remount(): void {
    destroy();
    mount();
  }

  /**
   * Syncs the current index with a provided child splide instance.
   *
   * @param splide - A splide instance to sync with.
   * @param target - A target splide instance.
   */
  function sync( splide: Splide, target: Splide ): void {
    const event = EventInterface( splide );

    event.on( EVENT_MOVE, ( index, prev, dest ) => {
      target.go( target.is( LOOP ) ? dest : index );
    } );

    events.push( event );
  }

  /**
   * Makes slides clickable and moves the slider to the index of clicked slide.
   * Note that the direction of `menu` is implicitly `vertical` as default.
   */
  function navigate(): void {
    const event = EventInterface( Splide );
    const { on } = event;

    on( EVENT_CLICK, onClick );
    on( EVENT_SLIDE_KEYDOWN, onKeydown );
    on( [ EVENT_MOUNTED, EVENT_UPDATED ], update );

    events.push( event );
    event.emit( EVENT_NAVIGATION_MOUNTED, Splide.splides );
  }

  /**
   * Update attributes.
   */
  function update(): void {
    setAttribute( Components.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? 'vertical' : '' );
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
    if ( includes( TRIGGER_KEYS, normalizeKey( e ) ) ) {
      onClick( Slide );
      prevent( e );
    }
  }

  return {
    setup: apply(
      Components.Media.set,
      { slideFocus: isUndefined( slideFocus ) ? isNavigation : slideFocus },
      true
    ),
    mount,
    destroy,
    remount,
  };
}
