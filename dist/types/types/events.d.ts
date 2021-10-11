import { PaginationData, PaginationItem } from '../components/Pagination/Pagination';
import { SlideComponent } from '../components/Slides/Slide';
import { Splide } from '../core/Splide/Splide';
import { Options } from './options';
export interface EventMap {
    'mounted': () => void;
    'ready': () => void;
    'click': (Slide: SlideComponent, e: MouseEvent) => void;
    'move': (index: number, prev: number, dest: number) => void;
    'moved': (index: number, prev: number, dest: number) => void;
    'active': (Slide: SlideComponent) => void;
    'inactive': (Slide: SlideComponent) => void;
    'visible': (Slide: SlideComponent) => void;
    'hidden': (Slide: SlideComponent) => void;
    'slide:keydown': (Slide: SlideComponent, e: KeyboardEvent) => void;
    'refresh': () => void;
    'updated': (options: Options) => void;
    'resize': () => void;
    'resized': () => void;
    'drag': () => void;
    'dragging': () => void;
    'dragged': () => void;
    'scroll': () => void;
    'scrolled': () => void;
    'destroy': () => void;
    'arrows:mounted': (prev: HTMLButtonElement, next: HTMLButtonElement) => void;
    'arrows:updated': (prev: HTMLButtonElement, next: HTMLButtonElement, prevIndex: number, nextIndex: number) => void;
    'pagination:mounted': (data: PaginationData, item: PaginationItem) => void;
    'pagination:updated': (data: PaginationData, prev: PaginationItem, curr: PaginationItem) => void;
    'navigation:mounted': (splides: Splide[]) => void;
    'autoplay:play': () => void;
    'autoplay:playing': (rate: number) => void;
    'autoplay:pause': () => void;
    'lazyload:loaded': (img: HTMLImageElement, Slide: SlideComponent) => void;
}
//# sourceMappingURL=../../../src/js/types/events.d.ts.map