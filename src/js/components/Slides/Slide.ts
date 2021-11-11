import {
  ALL_ATTRIBUTES,
  ARIA_CONTROLS,
  ARIA_CURRENT,
  ARIA_HIDDEN,
  ARIA_LABEL,
  ROLE,
  TAB_INDEX,
} from '../../constants/attributes';
import {
  CLASS_ACTIVE,
  CLASS_CONTAINER,
  CLASS_NEXT,
  CLASS_PREV,
  CLASS_VISIBLE,
  STATUS_CLASSES,
} from '../../constants/classes';
import {
  EVENT_ACTIVE,
  EVENT_CLICK,
  EVENT_HIDDEN,
  EVENT_INACTIVE,
  EVENT_MOVE,
  EVENT_MOVED, EVENT_NAVIGATION_MOUNTED,
  EVENT_REFRESH,
  EVENT_REPOSITIONED,
  EVENT_SCROLLED,
  EVENT_SLIDE_KEYDOWN,
  EVENT_VISIBLE,
} from '../../constants/events';
import { FADE, LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent } from '../../types';
import {
  abs,
  ceil,
  child,
  floor,
  format,
  getAttribute,
  hasClass,
  min,
  pad,
  queryAll,
  rect,
  removeAttribute,
  removeClass,
  setAttribute,
  style as _style,
  toggleClass,
} from '../../utils';


/**
 * The interface for the Slide sub component.
 *
 * @since 3.0.0
 */
export interface  SlideComponent extends BaseComponent {
  index: number;
  slideIndex: number;
  slide: HTMLElement;
  container: HTMLElement;
  isClone: boolean;
  style( prop: string, value: string | number, useContainer?: boolean ): void
  isWithin( from: number, distance: number ): boolean;
}

/**
 * The sub component for managing each slide.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param index      - A slide index.
 * @param slideIndex - A slide index for clones. This must be `-1` if the slide is not a clone.
 * @param slide      - A slide element.
 *
 * @return A Slide sub component.
 */
export function Slide( Splide: Splide, index: number, slideIndex: number, slide: HTMLElement ): SlideComponent {
  const { on, emit, bind, destroy: destroyEvents } = EventInterface( Splide );
  const { Components, root, options } = Splide;
  const { isNavigation, updateOnMove } = options;
  const { resolve } = Components.Direction;
  const styles         = getAttribute( slide, 'style' );
  const isClone        = slideIndex > -1;
  const container      = child( slide, `.${ CLASS_CONTAINER }` );
  const focusableNodes = options.focusableNodes && queryAll( slide, options.focusableNodes );

  /**
   * Turns into `true` when the component is destroyed.
   */
  let destroyed: boolean;

  /**
   * Called when the component is mounted.
   */
  function mount( this: SlideComponent ): void {
    if ( ! isClone ) {
      slide.id = `${ root.id }-slide${ pad( index + 1 ) }`;
    }

    bind( slide, 'click keydown', e => {
      emit( e.type === 'click' ? EVENT_CLICK : EVENT_SLIDE_KEYDOWN, this, e );
    } );

    on( [ EVENT_REFRESH, EVENT_REPOSITIONED, EVENT_MOVED, EVENT_SCROLLED ], update.bind( this ) );
    on( EVENT_NAVIGATION_MOUNTED, initNavigation.bind( this ) );

    if ( updateOnMove ) {
      on( EVENT_MOVE, onMove.bind( this ) );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    destroyed = true;
    destroyEvents();
    removeClass( slide, STATUS_CLASSES );
    removeAttribute( slide, ALL_ATTRIBUTES );
    setAttribute( slide, 'style', styles );
  }

  /**
   * Initializes slides as navigation.
   */
  function initNavigation( this: SlideComponent ): void {
    const idx      = isClone ? slideIndex : index;
    const label    = format( options.i18n.slideX, idx + 1 );
    const controls = Splide.splides.map( target => target.splide.root.id ).join( ' ' );

    setAttribute( slide, ARIA_LABEL, label );
    setAttribute( slide, ARIA_CONTROLS, controls );
    setAttribute( slide, ROLE, 'menuitem' );

    updateActivity.call( this, isActive() );
  }

  /**
   * If the `updateOnMove` option is `true`, called when the slider starts moving.
   *
   * @param next - A next index.
   * @param prev - A previous index.
   * @param dest - A destination index.
   */
  function onMove( this: SlideComponent, next: number, prev: number, dest: number ): void {
    if ( ! destroyed ) {
      update.call( this );

      if ( dest === index ) {
        updateActivity.call( this, true );
      }
    }
  }

  /**
   * Updates attribute and classes of the slide.
   */
  function update( this: SlideComponent ): void {
    if ( ! destroyed ) {
      const { index: currIndex } = Splide;

      updateActivity.call( this, isActive() );
      updateVisibility.call( this, isVisible() );

      toggleClass( slide, CLASS_PREV, index === currIndex - 1 );
      toggleClass( slide, CLASS_NEXT, index === currIndex + 1 );
    }
  }

  /**
   * Updates the status related with activity.
   *
   * @param active - Set `true` if the slide is active.
   */
  function updateActivity( this: SlideComponent, active: boolean ): void {
    if ( active !== hasClass( slide, CLASS_ACTIVE ) ) {
      toggleClass( slide, CLASS_ACTIVE, active );

      if ( isNavigation ) {
        setAttribute( slide, ARIA_CURRENT, active || null );
      }

      emit( active ? EVENT_ACTIVE : EVENT_INACTIVE, this );
    }
  }

  /**
   * Updates classes and attributes related with visibility.
   *
   * @param visible - Set `true` if the slide is visible.
   */
  function updateVisibility( this: SlideComponent, visible: boolean ): void {
    const ariaHidden = ! visible && ! isActive();

    setAttribute( slide, ARIA_HIDDEN, ariaHidden || null );
    setAttribute( slide, TAB_INDEX, ! ariaHidden && options.slideFocus ? 0 : null );

    if ( focusableNodes ) {
      focusableNodes.forEach( node => {
        setAttribute( node, TAB_INDEX, ariaHidden ? -1 : null );
      } );
    }

    if ( visible !== hasClass( slide, CLASS_VISIBLE ) ) {
      toggleClass( slide, CLASS_VISIBLE, visible );
      emit( visible ? EVENT_VISIBLE : EVENT_HIDDEN, this );
    }
  }

  /**
   * Adds a CSS rule to the slider or the container.
   *
   * @param prop         - A property name.
   * @param value        - A CSS value to add.
   * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
   */
  function style( prop: string, value: string | number, useContainer?: boolean ): void {
    _style( ( useContainer && container ) || slide, prop, value );
  }

  /**
   * Checks if the slide is active or not.
   *
   * @return `true` if the slide is active.
   */
  function isActive(): boolean {
    return Splide.index === index;
  }

  /**
   * Checks if the slide is visible or not.
   */
  function isVisible(): boolean {
    if ( Splide.is( FADE ) ) {
      return isActive();
    }

    const trackRect = rect( Components.Elements.track );
    const slideRect = rect( slide );
    const left      = resolve( 'left' );
    const right     = resolve( 'right' );

    return floor( trackRect[ left ] ) <= ceil( slideRect[ left ] )
      && floor( slideRect[ right ] ) <= ceil( trackRect[ right ] );
  }

  /**
   * Calculates how far this slide is from another slide and
   * returns `true` if the distance is within the given number.
   *
   * @param from     - An index of a base slide.
   * @param distance - `true` if the slide is within this number.
   *
   * @return `true` if the slide is within the `distance` from the base slide, or otherwise `false`.
   */
  function isWithin( from: number, distance: number ): boolean {
    let diff = abs( from - index );

    if ( ! isClone && ( options.rewind || Splide.is( LOOP ) ) ) {
      diff = min( diff, Splide.length - diff );
    }

    return diff <= distance;
  }

  return {
    index,
    slideIndex,
    slide,
    container,
    isClone,
    mount,
    destroy,
    style,
    isWithin,
  };
}
