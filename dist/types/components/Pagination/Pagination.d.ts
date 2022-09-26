import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Pagination component.
 *
 * @since 3.0.0
 */
export interface PaginationComponent extends BaseComponent {
    items: PaginationItem[];
    getAt(index: number): PaginationItem;
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
export declare function Pagination(Splide: Splide, Components: Components, options: Options): PaginationComponent;
