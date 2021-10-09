import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { SlideComponent } from './Slide';
/**
 * The interface for the Slides component.
 *
 * @since 3.0.0
 */
export interface SlidesComponent extends BaseComponent {
    register(slide: HTMLElement, index: number, slideIndex: number): void;
    get(excludeClones?: boolean): SlideComponent[];
    getIn(page: number): SlideComponent[];
    getAt(index: number): SlideComponent | undefined;
    add(slide: string | Element | Array<string | Element>, index?: number): void;
    remove(selector: SlideMatcher): void;
    forEach(iteratee: SlidesIteratee, excludeClones?: boolean): void;
    filter(matcher: SlideMatcher): SlideComponent[];
    style(prop: string, value: string | number, useContainer?: boolean): void;
    getLength(excludeClones?: boolean): number;
    isEnough(): boolean;
}
/**
 * The iteratee function for Slides.
 *
 * @since 3.0.0
 */
export declare type SlidesIteratee = (Slide: SlideComponent, index: number, Slides: SlideComponent[]) => void;
/**
 * The predicate function for Slides.
 *
 * @since 3.0.0
 */
export declare type SlidesPredicate = (Slide: SlideComponent, index: number, Slides: SlideComponent[]) => any;
/**
 * The type for filtering SlideComponent objects.
 *
 * @since 3.0.0
 */
export declare type SlideMatcher = number | number[] | string | SlidesPredicate;
/**
 * The component for managing all slides include clones.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Slides component object.
 */
export declare function Slides(Splide: Splide, Components: Components, options: Options): SlidesComponent;
//# sourceMappingURL=../../../../src/js/components/Slides/Slides.d.ts.map