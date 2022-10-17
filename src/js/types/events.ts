import { PaginationData, PaginationItem } from '../components/Pagination/Pagination';
import { SlideComponent } from '../components/Slides/Slide';
import { Splide } from '../core/Splide/Splide';
import { Options } from './options';
import * as E from '../constants/events';
import { EventInterface as EventInterfaceInstance } from '@splidejs/utils';
import { AnyFunction } from './general';


/**
 * The interface for all internal E.
 *
 * @since 3.0.0
 */
export interface EventMap {
  [ E.EVENT_MOUNTED ]: () => void;
  [ E.EVENT_READY ]: () => void;
  [ E.EVENT_CLICK ]: ( Slide: SlideComponent, e: MouseEvent ) => void;
  [ E.EVENT_MOVE ]: ( index: number, prev: number, dest: number ) => void;
  [ E.EVENT_MOVED ]: ( index: number, prev: number, dest: number ) => void;
  [ E.EVENT_ACTIVE ]: ( Slide: SlideComponent ) => void;
  [ E.EVENT_INACTIVE ]: ( Slide: SlideComponent ) => void;
  [ E.EVENT_VISIBLE ]: ( Slide: SlideComponent ) => void;
  [ E.EVENT_HIDDEN ]: ( Slide: SlideComponent ) => void;
  [ E.EVENT_REFRESH ]: () => void;
  [ E.EVENT_UPDATED ]: ( options: Options ) => void;
  [ E.EVENT_RESIZE ]: () => void;
  [ E.EVENT_RESIZED ]: () => void;
  [ E.EVENT_DRAG ]: () => void;
  [ E.EVENT_DRAGGING ]: () => void;
  [ E.EVENT_DRAGGED ]: () => void;
  [ E.EVENT_SCROLL ]: () => void;
  [ E.EVENT_SCROLLING ]: () => void;
  [ E.EVENT_SCROLLED ]: () => void;
  [ E.EVENT_OVERFLOW ]: ( overflow: boolean ) => void;
  [ E.EVENT_DESTROY ]: () => void;
  [ E.EVENT_ARROWS_MOUNTED ]: ( prev: HTMLButtonElement, next: HTMLButtonElement ) => void;
  [ E.EVENT_ARROWS_UPDATED ]: ( prev: HTMLButtonElement, next: HTMLButtonElement, prevIndex: number, nextIndex: number ) => void;
  [ E.EVENT_PAGINATION_MOUNTED ]: ( data: PaginationData, item: PaginationItem ) => void;
  [ E.EVENT_PAGINATION_UPDATED ]: ( data: PaginationData, prev: PaginationItem, curr: PaginationItem ) => void;
  [ E.EVENT_NAVIGATION_MOUNTED ]: ( splides: Splide[] ) => void;
  [ E.EVENT_AUTOPLAY_PLAY ]: () => void;
  [ E.EVENT_AUTOPLAY_PLAYING ]: ( rate: number ) => void;
  [ E.EVENT_AUTOPLAY_PAUSE ]: () => void;
  [ E.EVENT_LAZYLOAD_LOADED ]: ( img: HTMLImageElement, Slide: SlideComponent ) => void;
  [ E.EVENT_LAZYLOAD_ERROR ]: ( img: HTMLImageElement, Slide: SlideComponent ) => void;
  
  /** @internal */
  [ E.EVENT_SLIDE_KEYDOWN ]: ( Slide: SlideComponent, e: KeyboardEvent ) => void;
  [ E.EVENT_SHIFTED ]: () => void;
  [ E.EVENT_END_INDEX_CHANGED ]: () => void;
}

/**
 * The EventInterface type with Splide `EventMap`.
 *
 * @since 5.0.0
 */
export type EventInterface = EventInterfaceInstance<EventMap & Record<string, AnyFunction>>;