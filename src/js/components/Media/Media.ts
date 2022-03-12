import { DESTROYED } from '../../constants/states';
import { EventBinder } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { forOwn, merge, noop, ownKeys } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface MediaComponent extends BaseComponent {
  matches( key: string ): boolean;
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
  const queries: Array<[ string, Options, MediaQueryList ]> = [];

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    ownKeys( breakpoints )
      .sort( ( n, m ) => isMin ? +n - +m : +m - +n )
      .forEach( key => {
        register( key, breakpoints[ key ], `(${ isMin ? 'min' : 'max' }-width:${ key }px)` );
      } );

    register( 'motion', options.reducedMotion || {}, '(prefers-reduced-motion: reduce)' );
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
   * Registers entries as [ Options, media query string ].
   *
   * @param key     - An unique key.
   * @param options - Options merged to current options when the query matches the media.
   * @param query   - A query string.
   */
  function register( key: string, options: Options, query: string ): void {
    const queryList = matchMedia( query );
    binder.bind( queryList, 'change', update );
    queries.push( [ key, options, queryList ] );
  }

  /**
   * Checks all media queries in entries and updates options.
   */
  function update(): void {
    const merged    = accumulate();
    const direction = options.direction;
    const { destroy: destruction } = merged;

    forOwn( options, ( value, key ) => {
      ! ( key in initialOptions ) && delete options[ key ];
    } );

    if ( destruction ) {
      Splide.destroy( destruction === 'completely' );
    } else if ( Splide.state.is( DESTROYED ) ) {
      destroy( true );
      Splide.mount();
    } else {
      Splide.options = merged;
      direction !== merged.direction && Splide.refresh();
    }
  }

  /**
   * Accumulates all options assigned to predefined media queries,
   * and merges them into user options.
   *
   * @return Merged options.
   */
  function accumulate(): Options {
    return queries.reduce( ( merged, entry ) => {
      return merge( merged, entry[ 2 ].matches ? entry[ 1 ] : {} )
    }, merge( {}, initialOptions ) );
  }

  /**
   * Checks if the query registered by the specified key matches the current media or not.
   *
   * @param key - A key.
   *
   * @return `true` if the query matches the media, or otherwise `false`.
   */
  function matches( key: string ): boolean {
    return queries.some( entry => entry[ 0 ] === key && entry[ 2 ].matches );
  }

  return {
    setup,
    mount: noop,
    destroy,
    matches,
  };
}
