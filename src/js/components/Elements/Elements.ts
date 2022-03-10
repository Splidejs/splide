import { ALL_ATTRIBUTES, ARIA_ROLEDESCRIPTION, ROLE } from '../../constants/attributes';
import {
  CLASS_ACTIVE,
  CLASS_ARROW_NEXT,
  CLASS_ARROW_PREV,
  CLASS_ARROWS,
  CLASS_AUTOPLAY,
  CLASS_CLONE,
  CLASS_LIST,
  CLASS_PAGINATION,
  CLASS_PAUSE,
  CLASS_PLAY,
  CLASS_PROGRESS_BAR,
  CLASS_ROOT,
  CLASS_SLIDE,
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
  push,
  query,
  removeAttribute,
  removeClass,
  setAttribute,
  uniqueId,
} from '../../utils';
import { closest } from '../../utils/dom/closest/closest';


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
  arrows: HTMLElement | null;
  pagination: HTMLUListElement | null;
  prev: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  bar: HTMLElement | null;
  autoplay: HTMLElement | null;
  play: HTMLButtonElement | null;
  pause: HTMLButtonElement | null;
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
  const { on } = EventInterface( Splide );
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
  let classes: string[];

  /**
   * The track element.
   */
  let track: HTMLElement;

  /**
   * The list element.
   */
  let list: HTMLElement;

  /**
   * Called when the component is constructed.
   */
  function setup(): void {
    collect();
    init();
    addClass( root, ( classes = getClasses() ) );
  }

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( EVENT_REFRESH, destroy );
    on( EVENT_REFRESH, setup );
    on( EVENT_UPDATED, update );
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    empty( slides );
    removeClass( root, classes );
    removeAttribute( [ root, track, list ], ALL_ATTRIBUTES.concat( 'style' ) );
  }

  /**
   * Updates the status of elements.
   */
  function update(): void {
    removeClass( root, classes );
    addClass( root, ( classes = getClasses() ) );
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
      autoplay  : CLASS_AUTOPLAY,
      prev      : CLASS_ARROW_PREV,
      next      : CLASS_ARROW_NEXT,
      bar       : CLASS_PROGRESS_BAR,
      play      : CLASS_PLAY,
      pause     : CLASS_PAUSE,
    }, ( className, key ) => {
      elements[ key ] = find( `.${ className }` );
    } );

    assign( elements, { root, track, list, slides } );
  }

  /**
   * Initializes essential elements.
   */
  function init(): void {
    const id = root.id || uniqueId( PROJECT_CODE );
    root.id  = id;
    track.id = track.id || `${ id }-track`;
    list.id  = list.id || `${ id }-list`;

    setAttribute( root, ARIA_ROLEDESCRIPTION, i18n.carousel );
    setAttribute( root, ROLE, root.tagName !== 'SECTION' && options.role || '' );
    setAttribute( list, ROLE, 'none' );
  }

  /**
   * Finds an element only in this slider, ignoring elements in a nested slider.
   *
   * @return A found element or null.
   */
  function find( selector: string ): HTMLElement | null {
    const elm = query<HTMLElement>( root, selector );
    return elm && closest( elm, `.${ CLASS_ROOT }` ) === root ? elm : null;
  }

  /**
   * Return an array with classes for the root element.
   *
   * @return An array with classes.
   */
  function getClasses(): string[] {
    return [
      `${ CLASS_ROOT }--${ options.type }`,
      `${ CLASS_ROOT }--${ options.direction }`,
      options.drag && `${ CLASS_ROOT }--draggable`,
      options.isNavigation && `${ CLASS_ROOT }--nav`,
      CLASS_ACTIVE,
    ];
  }

  return assign( elements, {
    setup,
    mount,
    destroy,
  } );
}
