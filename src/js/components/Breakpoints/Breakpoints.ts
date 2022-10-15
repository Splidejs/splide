import { MEDIA_PREFERS_REDUCED_MOTION } from '../../constants/media';
import { CREATED, DESTROYED } from '../../constants/states';
import { EventBinder, EventInterface, merge, omit, ownKeys } from '@splidejs/utils';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { EVENT_OVERFLOW, EVENT_UPDATED } from '../../constants/events';


/**
 * The interface for the Media component.
 *
 * @since 4.0.0
 */
export interface BreakpointsComponent extends BaseComponent {
  /** @internal */
  reduce( reduced: boolean ): void;
  set( options: Options, base?: boolean, notify?: boolean ): void;
}

/**
 * The special breakpoints key when the number of slides are not enough for the list.
 *
 * @since 5.0.0
 */
const NOT_OVERFLOW_KEY = '!overflow';

/**
 * The component for observing media queries and updating options if necessary.
 * This used to be the Options component.
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Media component object.
 */
export function Breakpoints(
  Splide: Splide,
  Components: Components,
  options: Options,
  event: EventInterface
): BreakpointsComponent {
  const { state } = Splide;
  const breakpoints   = options.breakpoints || {};
  const reducedMotion = options.reducedMotion || {};
  const binder        = EventBinder();

  /**
   * Stores options and a predicate function.
   */
  const entries: Array<[ Options, () => boolean ]> = [];

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    ownKeys( breakpoints )
      .sort( ( n, m ) => isMin ? +n - +m : +m - +n )
      .forEach( key => {
        if ( key !== NOT_OVERFLOW_KEY ) {
          register( breakpoints[ key ], `(${ isMin ? 'min' : 'max' }-width:${ key }px)` );
        }
      } );

    if ( breakpoints[ NOT_OVERFLOW_KEY ] ) {
      entries.push( [ breakpoints[ NOT_OVERFLOW_KEY ], () => Components.Layout && ! Components.Layout.isOverflow() ] );
      event.on( EVENT_OVERFLOW, update );
    }

    register( reducedMotion, MEDIA_PREFERS_REDUCED_MOTION );
    update();
  }

  /**
   * Destroys the component.
   *
   * @param completely - Will be `true` for complete destruction.
   */
  function destroy( completely: boolean ): void {
    if ( completely ) {
      binder.destroy();
    }
  }

  /**
   * Registers entries as `[ Options, media query string ]`.
   *
   * @param options - Options merged to current options when the document matches the query.
   * @param query   - A query string.
   */
  function register( options: Options, query: string ): void {
    const queryList = matchMedia( query );
    binder.bind( queryList, 'change', update );
    entries.push( [ options,  () => queryList.matches ] );
  }

  /**
   * Checks all media queries in entries and updates options.
   */
  function update(): void {
    const destroyed = state.is( DESTROYED );
    const direction = options.direction;
    const merged = entries.reduce<Options>( ( merged, entry ) => {
      return merge( merged, entry[ 1 ]() ? entry[ 0 ] : {} );
    }, {} );

    omit( options );
    set( merged );

    if ( options.destroy ) {
      Splide.destroy( options.destroy === 'completely' );
    } else if ( destroyed ) {
      destroy( true );
      Splide.mount();
    } else {
      direction !== options.direction && Splide.refresh();
    }
  }

  /**
   * Disables or enables `reducedMotion` options.
   * This method does nothing when the document does not match the query.
   *
   * @internal
   *
   * @param enable - Determines whether to apply `reducedMotion` options or not.
   */
  function reduce( enable: boolean ): void {
    if ( matchMedia( MEDIA_PREFERS_REDUCED_MOTION ).matches ) {
      enable ? merge( options, reducedMotion ) : omit( options, ownKeys( reducedMotion ) );
    }
  }

  /**
   * Sets current options or base options (prototype).
   * If changing base options, always emits the `updated` event.
   *
   * @internal
   *
   * @param opts   - New options.
   * @param base   - Optional. Determines whether to also update base options or not.
   * @param notify - Optional. If `true`, always emits the `update` event.
   */
  function set( opts: Options, base?: boolean, notify?: boolean ): void {
    merge( options, opts );
    base && merge( Object.getPrototypeOf( options ), opts );

    if ( notify || ! state.is( CREATED ) ) {
      Splide.emit( EVENT_UPDATED, options );
    }
  }

  return {
    setup,
    destroy,
    reduce,
    set,
  };
}
