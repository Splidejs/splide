import { DATA_ATTRIBUTE } from '../../constants/project';
import { DESTROYED } from '../../constants/states';
import { Throttle } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { assert, find, getAttribute, merge } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface OptionsComponent extends BaseComponent {
}

/**
 * The component for managing options.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Options component object.
 */
export function Options( Splide: Splide, Components: Components, options: Options ): OptionsComponent {
  /**
   * The throttled `observe` function.
   */
  const throttledObserve = Throttle( observe );

  /**
   * Keeps the initial options to apply when no matched query exists.
   */
  let initialOptions: Options;

  /**
   * Stores breakpoints with the MediaQueryList object.
   */
  let points: [ string, MediaQueryList ][];

  /**
   * Holds the current breakpoint.
   */
  let currPoint: string | undefined;

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    try {
      merge( options, JSON.parse( getAttribute( Splide.root, DATA_ATTRIBUTE ) ) );
    } catch ( e ) {
      assert( false, e.message );
    }

    initialOptions = merge( {}, options );

    const { breakpoints } = options;

    if ( breakpoints ) {
      const isMin = options.mediaQuery === 'min';

      points = Object.keys( breakpoints )
        .sort( ( n, m ) => isMin ? +m - +n : +n - +m )
        .map( point => [
          point,
          matchMedia( `(${ isMin ? 'min' : 'max' }-width:${ point }px)` ),
        ] );

      observe();
    }
  }

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( points ) {
      addEventListener( 'resize', throttledObserve );
    }
  }

  /**
   * Destroys the component.
   *
   * @param completely - Will be `true` for complete destruction.
   */
  function destroy( completely: boolean ): void {
    if ( completely ) {
      removeEventListener( 'resize', throttledObserve );
    }
  }

  /**
   * Observes breakpoints.
   * The `currPoint` may be `undefined`.
   */
  function observe(): void {
    const item = find( points, item => item[ 1 ].matches ) || [];

    if ( item[ 0 ] !== currPoint ) {
      onMatch( ( currPoint = item[ 0 ] ) );
    }
  }

  /**
   * Called when the media query matches breakpoints.
   *
   * @param point - A matched point, or `undefined` that means no breakpoint matches a media query.
   */
  function onMatch( point: string | undefined ): void {
    const newOptions = options.breakpoints[ point ] || initialOptions;

    if ( newOptions.destroy ) {
      Splide.options = initialOptions;
      Splide.destroy( newOptions.destroy === 'completely' );
    } else {
      if ( Splide.state.is( DESTROYED ) ) {
        destroy( true );
        Splide.mount();
      }

      Splide.options = newOptions;
    }
  }

  return {
    setup,
    mount,
    destroy,
  };
}
