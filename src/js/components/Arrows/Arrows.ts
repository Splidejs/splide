import { ALL_ATTRIBUTES, ARIA_CONTROLS, ARIA_LABEL } from '../../constants/attributes';
import { CLASS_ARROWS } from '../../constants/classes';
import {
  EVENT_ARROWS_MOUNTED,
  EVENT_ARROWS_UPDATED,
  EVENT_MOVED,
  EVENT_REFRESH,
  EVENT_SCROLLED,
  EVENT_UPDATED,
} from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import {
  addClass,
  append,
  apply,
  assign,
  before,
  create,
  display,
  parseHtml,
  remove,
  removeAttribute,
  removeClass,
  setAttribute,
} from '../../utils';
import { PATH, SIZE, XML_NAME_SPACE } from './path';


/**
 * The interface for the Arrows component.
 *
 * @since 3.0.0
 */
export interface ArrowsComponent extends BaseComponent {
  arrows: { prev?: HTMLButtonElement, next?: HTMLButtonElement };
}

/**
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Arrows component object.
 */
export function Arrows( Splide: Splide, Components: Components, options: Options ): ArrowsComponent {
  const event = EventInterface( Splide );
  const { on, bind, emit } = event;
  const { classes, i18n } = options;
  const { Elements, Controller } = Components;
  const { arrows: userArrows, track } = Elements;

  /**
   * The wrapper element.
   */
  let wrapper = userArrows;

  /**
   * The previous arrow element.
   */
  let prev = Elements.prev;

  /**
   * The next arrow element.
   */
  let next = Elements.next;

  /**
   * Indicates whether the component creates arrows or retrieved from the DOM.
   */
  let created: boolean;

  /**
   * Holds modifier classes.
   */
  let wrapperClasses: string;

  /**
   * An object with previous and next arrows.
   */
  const arrows: ArrowsComponent[ 'arrows' ] = {};

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();
    on( EVENT_UPDATED, remount );
  }

  /**
   * Remounts the component.
   */
  function remount(): void {
    destroy();
    mount();
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const enabled = options.arrows;

    if ( enabled && ! ( prev && next ) ) {
      createArrows();
    }

    if ( prev && next ) {
      assign( arrows, { prev, next } );
      display( wrapper, enabled ? '' : 'none' );
      addClass( wrapper, ( wrapperClasses = `${ CLASS_ARROWS }--${ options.direction }` ) );

      if ( enabled ) {
        listen();
        update();
        setAttribute( [ prev, next ], ARIA_CONTROLS, track.id );
        emit( EVENT_ARROWS_MOUNTED, prev, next );
      }
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    event.destroy();
    removeClass( wrapper, wrapperClasses );

    if ( created ) {
      remove( userArrows ? [ prev, next ] : wrapper );
      prev = next = null;
    } else {
      removeAttribute( [ prev, next ], ALL_ATTRIBUTES );
    }
  }

  /**
   * Listens to some events.
   */
  function listen(): void {
    on( [ EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED ], update );
    bind( next, 'click', apply( go, '>' ) );
    bind( prev, 'click', apply( go, '<' ) );
  }

  /**
   * The wrapper function of Controller#go().
   *
   * @param control - The control pattern.
   */
  function go( control: string ): void {
    Controller.go( control, true );
  }

  /**
   * Create arrows and append them to the slider.
   */
  function createArrows(): void {
    wrapper = userArrows || create( 'div', classes.arrows );
    prev    = createArrow( true );
    next    = createArrow( false );
    created = true;

    append( wrapper, [ prev, next ] );
    ! userArrows && before( wrapper, track );
  }

  /**
   * Creates an arrow button.
   * In IE, A SVG element is focusable.
   *
   * @param prev - Determines whether to create a previous or next arrow.
   *
   * @return A created button element.
   */
  function createArrow( prev: boolean ): HTMLButtonElement {
    const arrow = `<button class="${ classes.arrow } ${ prev ? classes.prev : classes.next }" type="button">`
      +	`<svg xmlns="${ XML_NAME_SPACE }" viewBox="0 0 ${ SIZE } ${ SIZE }" width="${ SIZE }" height="${ SIZE }" focusable="false">`
      + `<path d="${ options.arrowPath || PATH }" />`;

    return parseHtml<HTMLButtonElement>( arrow );
  }

  /**
   * Updates status of arrows, such as `disabled` and `aria-label`.
   */
  function update(): void {
    const index     = Splide.index;
    const prevIndex = Controller.getPrev();
    const nextIndex = Controller.getNext();
    const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
    const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;

    prev.disabled = prevIndex < 0;
    next.disabled = nextIndex < 0;

    setAttribute( prev, ARIA_LABEL, prevLabel );
    setAttribute( next, ARIA_LABEL, nextLabel );

    emit( EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex );
  }

  return {
    arrows,
    mount,
    destroy,
  };
}
