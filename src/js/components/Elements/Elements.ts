import {
  CLASS_ACTIVE,
  CLASS_ARROW_NEXT,
  CLASS_ARROW_PREV,
  CLASS_ARROWS,
  CLASS_AUTOPLAY,
  CLASS_CLONE,
  CLASS_LIST,
  CLASS_PAUSE,
  CLASS_PLAY,
  CLASS_PROGRESS,
  CLASS_PROGRESS_BAR,
  CLASS_ROOT,
  CLASS_SLIDE,
  CLASS_SLIDER,
  CLASS_TRACK,
} from '../../constants/classes';
import { EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { DEFAULT_EVENT_PRIORITY } from '../../constants/priority';
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
  push,
  query,
  removeAttribute,
  removeClass,
  uniqueId,
} from '../../utils';


/**
 * The interface for elements which the slider consists of.
 *
 * @since 3.0.0
 */
export interface ElementCollection {
  root: HTMLElement;
  slider: HTMLElement;
  track: HTMLElement;
  list: HTMLElement;
  slides: HTMLElement[];
  arrows: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  bar: HTMLElement;
  autoplay: HTMLElement;
  play: HTMLButtonElement;
  pause: HTMLButtonElement;
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
   * The slider element that may be `undefined`.
   */
  let slider: HTMLElement;

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
    identify();
    addClass( root, ( classes = getClasses() ) );
  }

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( EVENT_REFRESH, refresh, DEFAULT_EVENT_PRIORITY - 2 );
    on( EVENT_UPDATED, update );
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    [ root, track, list ].forEach( elm => {
      removeAttribute( elm, 'style' );
    } );

    empty( slides );
    removeClass( root, classes );
  }

  /**
   * Recollects slide elements.
   */
  function refresh(): void {
    destroy();
    setup();
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
    slider = child( root, `.${ CLASS_SLIDER }` );
    track  = query( root, `.${ CLASS_TRACK }` );
    list   = child( track, `.${ CLASS_LIST }` );

    assert( track && list, 'A track/list element is missing.' );

    push( slides, children( list, `.${ CLASS_SLIDE }:not(.${ CLASS_CLONE })` ) );

    const autoplay = find( `.${ CLASS_AUTOPLAY }` );
    const arrows   = find( `.${ CLASS_ARROWS }` );

    assign( elements, {
      root,
      slider,
      track,
      list,
      slides,
      arrows,
      autoplay,
      prev : query( arrows, `.${ CLASS_ARROW_PREV }` ),
      next : query( arrows, `.${ CLASS_ARROW_NEXT }` ),
      bar  : query( find( `.${ CLASS_PROGRESS }` ), `.${ CLASS_PROGRESS_BAR }` ),
      play : query( autoplay, `.${ CLASS_PLAY }` ),
      pause: query( autoplay, `.${ CLASS_PAUSE }` ),
    } );
  }

  /**
   * Assigns unique IDs to essential elements.
   */
  function identify(): void {
    const id = root.id || uniqueId( PROJECT_CODE );
    root.id  = id;
    track.id = track.id || `${ id }-track`;
    list.id  = list.id || `${ id }-list`;
  }

  /**
   * Finds an element only in children of the root or slider element.
   *
   * @return {Element} - A found element or undefined.
   */
  function find( selector: string ): HTMLElement {
    return child( root, selector ) || child( slider, selector );
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
