import { DESTROYED } from '../../constants/states';
import { EventBinder } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { merge, noop, ownKeys } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface MediaComponent extends BaseComponent {
  matches( key: string ): void;
}

/**
 * The component for observing media queries and update options if necessary.
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Media component object.
 */
export function Media( Splide: Splide, Components: Components, options: Options ): MediaComponent {
  const binder      = EventBinder();
  const breakpoints = options.breakpoints || {};

  /**
   * Keeps the initial options to apply when no matched query exists.
   */
  const initialOptions = Splide._io;

  /**
   * Stores options and MediaQueryList object.
   */
  const queries: Record<string, [ Options, MediaQueryList ]> = {};

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    ownKeys( breakpoints )
      .sort( ( n, m ) => isMin ? +n - +m  : +m - +n )
      .forEach( key => {
        register( key, breakpoints[ key ], `(${ isMin ? 'min' : 'max' }-width:${ key }px)` );
      } );

    register( 'motion', options.reducedMotion || {}, '(prefers-reduced-motion: reduce)' );
    update();
  }

  /**
   * Remove all keys from current options that initial options do not include.
   */
  function reset(): void {
    ownKeys( options ).forEach( key => {
      ! ( key in initialOptions ) && delete options[ key ];
    } );
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
   * Registers entries as [ Options, media query string ].
   *
   * @param key     - An unique key.
   * @param options - Options merged to current options when the query matches the media.
   * @param query   - A query string.
   */
  function register( key: string, options: Options, query: string ): void {
    const queryList = matchMedia( query );
    binder.bind( queryList, 'change', update );
    queries[ key ] = [ options, queryList ];
  }

  /**
   * Checks all media queries in entries and updates options.
   */
  function update(): void {
    const options = accumulate();
    const { destroy: destruction } = options;

    reset();

    if ( destruction ) {
      Splide.destroy( destruction === 'completely' );
    } else if ( Splide.state.is( DESTROYED ) ) {
      destroy( true );
      Splide.mount();
    } else {
      const oriented = Splide.options.direction !== options.direction;
      Splide.options = options;
      oriented && Splide.refresh();
    }
  }

  /**
   * Accumulates all options assigned to predefined media queries,
   * and merges them into user options.
   *
   * @return Merged options.
   */
  function accumulate(): Options {
    return ownKeys( queries )
      .reduce( ( merged, key ) => merge( merged, matches( key ) || {} ), merge( {}, initialOptions ) );
  }

  /**
   * Finds the entry, `[ options, query ]` registered by the specified key,
   * and returns options if the query matches the current media.
   *
   * @param key - A key.
   *
   * @return An object with options if found, or otherwise `null`.
   */
  function matches( key: string ): Options | null {
    const entry = queries[ key ];
    return ( entry && entry[ 1 ].matches ) ? entry[ 0 ] : null;
  }

  return {
    setup,
    mount: noop,
    destroy,
    matches,
  };
}
