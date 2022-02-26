import { DESTROYED } from '../../constants/states';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { find, isUndefined, merge, noop } from '../../utils';


/**
 * The interface for the Options component.
 *
 * @since 3.0.0
 */
export interface OptionsComponent extends BaseComponent {
  fix<K extends keyof Options>( key: K, value?: Options[ K ] ): void;
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
  const event = EventInterface( Splide, true );
  const breakpoints = options.breakpoints || {};

  /**
   * Keeps the initial options to apply when no matched query exists.
   */
  const userOptions: Options = merge( {}, options );

  /**
   * Stores fixed options.
   */
  const fixedOptions: Options = {};

  /**
   * Stores breakpoints with the MediaQueryList object.
   */
  let points: [ string, MediaQueryList ][];

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    const isMin = options.mediaQuery === 'min';

    points = Object.keys( breakpoints )
      .sort( ( n, m ) => isMin ? +m - +n : +n - +m )
      .map( point => {
        const queryList = matchMedia( `(${ isMin ? 'min' : 'max' }-width:${ point }px)` );
        event.bind( queryList, 'change', check );
        return [ point, queryList ];
      } );

    check();
  }

  /**
   * Destroys the component.
   *
   * @param completely - Will be `true` for complete destruction.
   */
  function destroy( completely: boolean ): void {
    if ( completely ) {
      event.destroy();
    }
  }

  /**
   * Observes breakpoints.
   */
  function check(): void {
    const point      = ( find( points, item => item[ 1 ].matches ) || [] )[ 0 ];
    const newOptions = merge( {}, breakpoints[ point ] || userOptions, fixedOptions );

    if ( newOptions.destroy ) {
      Splide.options = userOptions;
      Splide.destroy( newOptions.destroy === 'completely' );
    } else {
      if ( Splide.state.is( DESTROYED ) ) {
        destroy( true );
        Splide.mount();
      } else {
        Splide.options = newOptions;
      }
    }
  }

  /**
   * Fixes options to prevent breakpoints from overwriting them.
   *
   * @param key   - A key.
   * @param value - Optional. A value to fix. If omitted, the value will be restored.
   */
  function fix<K extends keyof Options>( key: K, value?: Options[ K ] ): void {
    if ( fixedOptions[ key ] !== value ) {
      if ( isUndefined( value ) ) {
        delete fixedOptions[ key ];
      } else {
        fixedOptions[ key ] = value;
      }

      check();
    }
  }

  return {
    setup,
    mount: noop,
    destroy,
    fix,
  };
}
