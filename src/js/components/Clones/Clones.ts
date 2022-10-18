import { EVENT_REFRESH, EVENT_RESIZE, EVENT_UPDATED } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { BaseComponent, ComponentConstructor } from '../../types';
import { addClass, append, before, ceil, empty, isUndefined, pad, push, removeNode } from '@splidejs/utils';


/**
 * The interface for the Clone component.
 *
 * @since 3.0.0
 */
export interface ClonesComponent extends BaseComponent {
}

/**
 * The multiplier to determine the number of clones.
 *
 * @since 4.0.0
 */
export const MULTIPLIER = 2;

/**
 * The component that generates clones for the loop slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Clones component object.
 */
export const Clones: ComponentConstructor<ClonesComponent> = ( Splide, Components, options, event ) => {
  const { on } = event;
  const { Elements, Slides, Layout: { resize, trackSize } } = Components;
  const { resolve } = Components.Direction;

  /**
   * Stores all cloned elements.
   */
  const clones: HTMLElement[] = [];

  /**
   * Keeps the current number of clones.
   */
  let cloneCount: number;

  /**
   * Called when the component is mounted.
   * Needs to remount the component on refresh, otherwise `refresh` event will be triggered again while refreshing.
   */
  function mount(): void {
    on( EVENT_REFRESH, remount );
    on( [ EVENT_UPDATED, EVENT_RESIZE ], observe );

    if ( ( cloneCount = computeCloneCount() ) ) {
      generate( cloneCount );
      resize( true );
    }
  }

  /**
   * Remounts the component.
   */
  function remount(): void {
    destroy();
    mount();
    resize( true );
  }

  /**
   * Destroys clones.
   */
  function destroy(): void {
    removeNode( clones );
    empty( clones );
    event.destroy();
  }

  /**
   * Observes the required clone count and refreshes the slider if necessary.
   * If clones are disabled by `0`, moves the carousel to the first slide.
   */
  function observe(): void {
    const count = computeCloneCount();

    if ( cloneCount !== count ) {
      if ( cloneCount < count || ! count ) {
        ! count && Splide.go( 0 );
        event.emit( EVENT_REFRESH );
      }
    }
  }

  /**
   * Generates the specified number of clones.
   *
   * @param count - The number of clones to generate for each side.
   */
  function generate( count: number ): void {
    const slides = Slides.get().slice();
    const { length } = slides;

    if ( length ) {
      while ( slides.length < count ) {
        push( slides, slides );
      }

      push( slides.slice( -count ), slides.slice( 0, count ) ).forEach( ( Slide, index ) => {
        const isHead = index < count;
        const clone  = cloneDeep( Slide.slide, index );
        isHead ? before( slides[ 0 ].slide, clone ) : append( Elements.list, clone );
        push( clones, clone );
        Slides.register( clone, index - count + ( isHead ? 0 : length ), Slide.index );
      } );
    }
  }

  /**
   * Deeply clones the provided element with removing the ID attribute.
   *
   * @param elm   - An element to clone.
   * @param index - An index of the clone.
   *
   * @return A cloned element.
   */
  function cloneDeep( elm: HTMLElement, index: number ): HTMLElement {
    const clone = elm.cloneNode( true ) as HTMLElement;
    addClass( clone, options.classes.clone );
    clone.id = `${ Splide.root.id }-clone${ pad( index + 1 ) }`;
    return clone;
  }

  /**
   * Returns the number of elements to generate.
   * This always returns 0 if the slider type is not `'loop'`.
   *
   * @return The number of clones.
   */
  function computeCloneCount(): number {
    let { clones } = options;

    if ( ! Splide.is( LOOP ) ) {
      clones = 0;
    } else if ( isUndefined( clones ) ) {
      const fixedSize  = options[ resolve( 'fixedWidth' ) ] && Components.Layout.slideSize( 0 );
      const fixedCount = fixedSize && ceil( trackSize() / fixedSize );
      clones = fixedCount || ( options[ resolve( 'autoWidth' ) ] && Splide.length ) || options.perPage * MULTIPLIER;
    }

    return clones;
  }

  return {
    mount,
    destroy,
  };
};
