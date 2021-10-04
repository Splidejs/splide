import { PaginationData, PaginationItem } from '../components/Pagination/Pagination';
import { SlideComponent } from '../components/Slides/Slide';
import { Splide } from '../core/Splide/Splide';
import { Options } from './options';
export interface EventMap {
    'mounted': [];
    'ready': [];
    'click': [SlideComponent, MouseEvent];
    'move': [number, number, number];
    'moved': [number, number, number];
    'active': [SlideComponent];
    'inactive': [SlideComponent];
    'visible': [SlideComponent];
    'hidden': [SlideComponent];
    'slide:keydown': [SlideComponent, KeyboardEvent];
    'refresh': [];
    'undated': [Options];
    'resize': [];
    'resized': [];
    'drag': [];
    'dragging': [];
    'dragged': [];
    'scroll': [];
    'scrolled': [];
    'destroy': [];
    'arrows:mounted': [HTMLButtonElement, HTMLButtonElement];
    'arrows:updated': [HTMLButtonElement, HTMLButtonElement, number, number];
    'pagination:mounted': [PaginationData, PaginationItem];
    'pagination:updated': [PaginationData, PaginationItem, PaginationItem];
    'navigation:mounted': [Splide[]];
    'autoplay:play': [];
    'autoplay:playing': [number];
    'autoplay:pause': [];
    'lazyload:loaded': [HTMLImageElement, SlideComponent];
}
//# sourceMappingURL=../../../src/js/types/events.d.ts.map