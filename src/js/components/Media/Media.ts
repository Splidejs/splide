import { EVENT_MEDIA } from '../../constants/events';
import { DESTROYED } from '../../constants/states';
import { EventBinder } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { find, merge, noop } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface MediaComponent extends BaseComponent {
}

/**
 * The component for observing media queries and update options if necessary.
 *
 * @since 3.0.0
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
  const userOptions: Options = merge( {}, options );

  /**
   * Stores options and MediaQueryList object.
   */
  const queries: Array<[ Options, MediaQueryList? ][]> = [];

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    register( Object.keys( breakpoints )
      .sort( ( n, m ) => isMin ? +m - +n : +n - +m )
      .map<[ Options, string? ]>( key => [ breakpoints[ key ], `(${ isMin ? 'min' : 'max' }-width:${ key }px)` ] )
      .concat( [ [ userOptions ] ] ) );

    register( [ [ {
      speed   : 0,
      autoplay: 'pause',
    }, '(prefers-reduced-motion: reduce)' ] ] );

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
   * @param entries - An array with entries.
   */
  function register( entries: [ Options, string? ][] ): void {
    queries.push( entries.map<[ Options, MediaQueryList? ]>( entry => {
      const query = entry[ 1 ] && matchMedia( entry[ 1 ] );
      query && binder.bind( query, 'change', update );
      return [ entry[ 0 ], query ];
    } ) );
  }

  /**
   * Checks all media queries in entries and updates options.
   */
  function update(): void {
    const options = accumulate();
    const { destroy: _destroy } = options;

    if ( _destroy ) {
      Splide.options = userOptions;
      Splide.destroy( _destroy === 'completely' );
    } else if ( Splide.state.is( DESTROYED ) ) {
      destroy( true );
      Splide.mount();
    } else {
      Splide.options = options;
    }
  }

  /**
   * Accumulates all options assigned to predefined media queries,
   * and merges them into user options.
   *
   * @return Merged options.
   */
  function accumulate(): Options {
    return queries.reduce<Options>( ( merged, entries ) => {
      const entry = ( find( entries, entry => ! entry[ 1 ] || entry[ 1 ].matches ) || [] );
      entry[ 1 ] && Splide.emit( EVENT_MEDIA, entry[ 1 ] );
      return merge( merged, entry[ 0 ] || {} );
    }, merge( {}, userOptions ) );
  }

  return {
    setup,
    mount: noop,
    destroy,
  };
}
