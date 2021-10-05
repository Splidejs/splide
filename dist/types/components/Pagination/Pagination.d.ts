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
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Arrows component object.
 */
export declare function Pagination(Splide: Splide, Components: Components, options: Options): PaginationComponent;
//# sourceMappingURL=../../../../src/js/components/Pagination/Pagination.d.ts.map