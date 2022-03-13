import { MEDIA_PREFERS_REDUCED_MOTION } from '../../constants/media';
import { DESTROYED } from '../../constants/states';
import { EventBinder } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { merge, omit, ownKeys } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface MediaComponent extends BaseComponent {
  reduce( reduced: boolean ): void;
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
  const reducedMotion = options.reducedMotion || {};
  const binder        = EventBinder();
  const breakpoints   = options.breakpoints || {};

  /**
   * Stores options and MediaQueryList object.
   */
  const queries: Array<[ Options, MediaQueryList ]> = [];

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    ownKeys( breakpoints )
      .sort( ( n, m ) => isMin ? +n - +m : +m - +n )
      .forEach( key => {
        register( breakpoints[ key ], `(${ isMin ? 'min' : 'max' }-width:${ key }px)` );
      } );

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
   * Registers entries as [ Options, media query string ].
   *
   * @param options - Options merged to current options when the document matches the query.
   * @param query   - A query string.
   */
  function register( options: Options, query: string ): void {
    const queryList = matchMedia( query );
    binder.bind( queryList, 'change', update );
    queries.push( [ options, queryList ] );
  }

  /**
   * Checks all media queries in entries and updates options.
   */
  function update(): void {
    const direction = options.direction;
    const merged = queries.reduce<Options>( ( merged, entry ) => {
      return merge( merged, entry[ 1 ].matches ? entry[ 0 ] : {} );
    }, {} );

    omit( options );
    merge( options, merged );

    if ( options.destroy ) {
      Splide.destroy( options.destroy === 'completely' );
    } else if ( Splide.state.is( DESTROYED ) ) {
      destroy( true );
      Splide.mount();
    } else {
      Splide.options = merged;
      direction !== options.direction && Splide.refresh();
    }
  }

  /**
   * Disables or enables `reducedMotion` options.
   * This method does nothing when the document does not match the query.
   *
   * @param enable - Determines whether to apply `reducedMotion` options or not.
   */
  function reduce( enable: boolean ): void {
    if ( matchMedia( MEDIA_PREFERS_REDUCED_MOTION ).matches ) {
      enable ? merge( options, reducedMotion ) : omit( options, ownKeys( reducedMotion ) );
    }
  }

  return {
    setup,
    destroy,
    reduce,
  };
}
