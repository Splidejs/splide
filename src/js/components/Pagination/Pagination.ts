import { ARROW_LEFT, ARROW_RIGHT } from '../../constants/arrows';
import {
  ARIA_CONTROLS,
  ARIA_LABEL,
  ARIA_ORIENTATION,
  ARIA_SELECTED,
  ROLE,
  TAB_INDEX,
} from '../../constants/attributes';
import { CLASS_ACTIVE, CLASS_PAGINATION } from '../../constants/classes';
import { TTB } from '../../constants/directions';
import {
  EVENT_MOVE,
  EVENT_PAGINATION_MOUNTED,
  EVENT_PAGINATION_UPDATED,
  EVENT_REFRESH,
  EVENT_SCROLL,
  EVENT_SCROLLED,
  EVENT_UPDATED,
} from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import {
  addClass,
  apply,
  ceil,
  create,
  empty,
  focus,
  format,
  prevent,
  remove,
  removeAttribute,
  removeClass,
  setAttribute,
  slice,
} from '../../utils';
import { normalizeKey } from '../../utils/dom/normalizeKey/normalizeKey';


/**
 * The interface for the Pagination component.
 *
 * @since 3.0.0
 */
export interface PaginationComponent extends BaseComponent {
  items: PaginationItem[];
  getAt( index: number ): PaginationItem;
  update(): void;
}

/**
 * The interface for data of the pagination.
 *
 * @since 3.0.0
 */
export interface PaginationData {
  list: HTMLUListElement;
  items: PaginationItem[];
}

/**
 * The interface for each pagination item.
 *
 * @since 3.0.0
 */
export interface PaginationItem {
  li: HTMLLIElement;
  button: HTMLButtonElement;
  page: number;
}

/**
 * The component for the pagination UI (a slide picker).
 *
 * @link https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#grouped-carousel-elements
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Pagination component object.
 */
export function Pagination( Splide: Splide, Components: Components, options: Options ): PaginationComponent {
  const event = EventInterface( Splide );
  const { on, emit, bind } = event;
  const { Slides, Elements, Controller } = Components;
  const { hasFocus, getIndex, go } = Controller;
  const { resolve } = Components.Direction;

  /**
   * Stores all pagination items.
   */
  const items: PaginationItem[] = [];

  /**
   * The pagination element.
   */
  let list: HTMLUListElement | null;

  /**
   * Holds modifier classes.
   */
  let paginationClasses: string;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    destroy();

    on( [ EVENT_UPDATED, EVENT_REFRESH ], mount );

    if ( options.pagination && Slides.isEnough() ) {
      on( [ EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED ], update );
      createPagination();
      update();
      emit( EVENT_PAGINATION_MOUNTED, { list, items }, getAt( Splide.index ) );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    if ( list ) {
      remove( Elements.pagination ? slice( list.children ) : list );
      removeClass( list, paginationClasses );
      empty( items );
      list = null;
    }

    event.destroy();
  }

  /**
   * Creates the pagination element and appends it to the slider.
   */
  function createPagination(): void {
    const { length } = Splide;
    const { classes, i18n, perPage } = options;
    const max = hasFocus() ? length : ceil( length / perPage );

    list = Elements.pagination || create( 'ul', classes.pagination, Elements.track.parentElement );

    addClass( list, ( paginationClasses = `${ CLASS_PAGINATION }--${ getDirection() }` ) );
    setAttribute( list, ROLE, 'tablist' );
    setAttribute( list, ARIA_LABEL, i18n.select );
    setAttribute( list, ARIA_ORIENTATION, getDirection() === TTB ? 'vertical' : '' );

    for ( let i = 0; i < max; i++ ) {
      const li       = create( 'li', null, list );
      const button   = create( 'button', { class: classes.page, type: 'button' }, li );
      const controls = Slides.getIn( i ).map( Slide => Slide.slide.id );
      const text     = ! hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;

      bind( button, 'click', apply( onClick, i ) );

      if ( options.paginationKeyboard ) {
        bind( button, 'keydown', apply( onKeydown, i ) );
      }

      setAttribute( li, ROLE, 'presentation' );
      setAttribute( button, ROLE, 'tab' );
      setAttribute( button, ARIA_CONTROLS, controls.join( ' ' ) );
      setAttribute( button, ARIA_LABEL, format( text, i + 1 ) );
      setAttribute( button, TAB_INDEX, -1 );

      items.push( { li, button, page: i } );
    }
  }

  /**
   * Called when the user clicks each pagination dot.
   * Moves the focus to the active slide for accessibility.
   *
   * @link https://www.w3.org/WAI/tutorials/carousels/functionality/
   *
   * @param page - A clicked page index.
   */
  function onClick( page: number ): void {
    go( `>${ page }`, true );
  }

  /**
   * Called when any key is pressed on the pagination.
   *
   * @link https://www.w3.org/TR/2021/NOTE-wai-aria-practices-1.2-20211129/#keyboard-interaction-21
   *
   * @param page - A page index.
   * @param e    - A KeyboardEvent object.
   */
  function onKeydown( page: number, e: KeyboardEvent ): void {
    const { length } = items;
    const key = normalizeKey( e );
    const dir = getDirection();

    let nextPage = -1;

    if ( key === resolve( ARROW_RIGHT, false, dir ) ) {
      nextPage = ++page % length;
    } else if ( key === resolve( ARROW_LEFT, false, dir ) ) {
      nextPage = ( --page + length ) % length;
    } else if ( key === 'Home' ) {
      nextPage = 0;
    } else if ( key === 'End' ) {
      nextPage = length - 1;
    }

    const item = items[ nextPage ];

    if ( item ) {
      focus( item.button );
      go( `>${ nextPage }` );
      prevent( e, true );
    }
  }

  /**
   * Returns the latest direction for pagination.
   */
  function getDirection(): Options['direction'] {
    return options.paginationDirection || options.direction;
  }

  /**
   * Returns the pagination item at the specified index.
   *
   * @param index - An index.
   *
   * @return A pagination item object if available, or otherwise `undefined`.
   */
  function getAt( index: number ): PaginationItem | undefined {
    return items[ Controller.toPage( index ) ];
  }

  /**
   * Updates the pagination status.
   */
  function update(): void {
    const prev = getAt( getIndex( true ) );
    const curr = getAt( getIndex() );

    if ( prev ) {
      const { button } = prev;
      removeClass( button, CLASS_ACTIVE );
      removeAttribute( button, ARIA_SELECTED );
      setAttribute( button, TAB_INDEX, -1 );
    }

    if ( curr ) {
      const { button } = curr;
      addClass( button, CLASS_ACTIVE );
      setAttribute( button, ARIA_SELECTED, true );
      setAttribute( button, TAB_INDEX, '' );
    }

    emit( EVENT_PAGINATION_UPDATED, { list, items }, prev, curr );
  }

  return {
    items,
    mount,
    destroy,
    getAt,
    update,
  };
}
