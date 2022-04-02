import { ALL_ATTRIBUTES, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_ROLEDESCRIPTION, ROLE } from '../../constants/attributes';
import {
  CLASS_ACTIVE,
  CLASS_ARROW_NEXT,
  CLASS_ARROW_PREV,
  CLASS_ARROWS,
  CLASS_CLONE,
  CLASS_FOCUS_IN,
  CLASS_LIST,
  CLASS_PAGINATION,
  CLASS_PROGRESS_BAR,
  CLASS_ROOT,
  CLASS_SLIDE,
  CLASS_TOGGLE,
  CLASS_TRACK,
} from '../../constants/classes';
import { EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { PROJECT_CODE } from '../../constants/project';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import {
  addClass,
  assert,
  assign,
  child,
  children,
  empty,
  forOwn,
  getAttribute,
  push,
  query,
  removeAttribute,
  removeClass,
  setAttribute,
  toggleClass,
  uniqueId,
} from '../../utils';
import { closest } from '../../utils/dom/closest/closest';
import { POINTER_DOWN_EVENTS } from '../Drag/constants';


/**
 * The interface for elements which the slider consists of.
 *
 * @since 3.0.0
 */
export interface ElementCollection {
  root: HTMLElement;
  track: HTMLElement;
  list: HTMLElement;
  slides: HTMLElement[];
  arrows?: HTMLElement;
  pagination?: HTMLUListElement;
  prev?: HTMLButtonElement;
  next?: HTMLButtonElement;
  bar?: HTMLElement;
  toggle?: HTMLElement;
}

/**
 * The interface for the Elements component.
 *
 * @since 3.0.0
 */
export interface ElementsComponent extends BaseComponent, ElementCollection {
}

/**
 * The component that collects and handles elements which the slider consists of.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Elements component object.
 */
export function Elements( Splide: Splide, Components: Components, options: Options ): ElementsComponent {
  const { on, bind } = EventInterface( Splide );
  const { root } = Splide;
  const { i18n } = options;
  const elements: ElementCollection = {} as ElementCollection;

  /**
   * Stores all slide elements.
   */
  const slides: HTMLElement[] = [];

  /**
   * Stores all root classes.
   */
  let rootClasses: string[] = [];

  /**
   * Stores all list classes.
   */
  let trackClasses: string[] = [];

  /**
   * The track element.
   */
  let track: HTMLElement;

  /**
   * The list element.
   */
  let list: HTMLElement;

  /**
   * Turns into `true` when detecting keydown, and `false` when detecting pointerdown.
   */
  let isUsingKey: boolean;

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    collect();
    init();
    update();
  }

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( EVENT_REFRESH, destroy );
    on( EVENT_REFRESH, setup );
    on( EVENT_UPDATED, update );

    bind( document, `${ POINTER_DOWN_EVENTS } keydown`, e => {
      isUsingKey = e.type === 'keydown';
    }, { capture: true } );

    bind( root, 'focusin', () => {
      toggleClass( root, CLASS_FOCUS_IN, !! isUsingKey );
    } );
  }

  /**
   * Destroys the component.
   *
   * @param completely - Whether to destroy the component completely or not.
   */
  function destroy( completely?: boolean ): void {
    const attrs = ALL_ATTRIBUTES.concat( 'style' );

    empty( slides );
    removeClass( root, rootClasses );
    removeClass( track, trackClasses );
    removeAttribute( [ track, list ], attrs );
    removeAttribute( root, completely ? attrs : [ 'style', ARIA_ROLEDESCRIPTION ] );
  }

  /**
   * Updates the status of elements.
   */
  function update(): void {
    removeClass( root, rootClasses );
    removeClass( track, trackClasses );

    rootClasses  = getClasses( CLASS_ROOT );
    trackClasses = getClasses( CLASS_TRACK );

    addClass( root, rootClasses );
    addClass( track, trackClasses );

    setAttribute( root, ARIA_LABEL, options.label );
    setAttribute( root, ARIA_LABELLEDBY, options.labelledby );
  }

  /**
   * Collects elements which the slider consists of.
   */
  function collect(): void {
    track = find( `.${ CLASS_TRACK }` );
    list  = child( track, `.${ CLASS_LIST }` );

    assert( track && list, 'A track/list element is missing.' );
    push( slides, children( list, `.${ CLASS_SLIDE }:not(.${ CLASS_CLONE })` ) );

    forOwn( {
      arrows    : CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev      : CLASS_ARROW_PREV,
      next      : CLASS_ARROW_NEXT,
      bar       : CLASS_PROGRESS_BAR,
      toggle    : CLASS_TOGGLE,
    }, ( className, key ) => {
      elements[ key ] = find( `.${ className }` );
    } );

    assign( elements, { root, track, list, slides } );
  }

  /**
   * Initializes essential elements.
   * Note that do not change the role of the root element,
   * which removes the region from the accessibility tree.
   */
  function init(): void {
    const id   = root.id || uniqueId( PROJECT_CODE );
    const role = options.role;

    root.id  = id;
    track.id = track.id || `${ id }-track`;
    list.id  = list.id || `${ id }-list`;

    if ( ! getAttribute( root, ROLE ) && root.tagName !== 'SECTION' && role ) {
      setAttribute( root, ROLE, role );
    }

    setAttribute( root, ARIA_ROLEDESCRIPTION, i18n.carousel );
    setAttribute( list, ROLE, 'presentation' );
  }

  /**
   * Finds an element only in this slider, ignoring elements in a nested slider.
   *
   * @return A found element or null.
   */
  function find( selector: string ): HTMLElement | undefined {
    const elm = query<HTMLElement>( root, selector );
    return elm && closest( elm, `.${ CLASS_ROOT }` ) === root ? elm : undefined;
  }

  /**
   * Return an array with modifier classes.
   *
   * @param base - A base class name.
   *
   * @return An array with classes.
   */
  function getClasses( base: string ): string[] {
    return [
      `${ base }--${ options.type }`,
      `${ base }--${ options.direction }`,
      options.drag && `${ base }--draggable`,
      options.isNavigation && `${ base }--nav`,
      base === CLASS_ROOT && CLASS_ACTIVE,
    ];
  }

  return assign( elements, {
    setup,
    mount,
    destroy,
  } );
}
