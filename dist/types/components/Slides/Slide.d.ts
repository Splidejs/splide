import { Splide } from '../../core/Splide/Splide';
import { BaseComponent } from '../../types';
/**
 * The interface for the Slide sub component.
 *
 * @since 3.0.0
 */
export interface SlideComponent extends BaseComponent {
    index: number;
    slideIndex: number;
    slide: HTMLElement;
    container: HTMLElement;
    isClone: boolean;
    style(prop: string, value: string | number, useContainer?: boolean): void;
    isWithin(from: number, distance: number): boolean;
}
/**
 * The sub component for managing each slide.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param index      - A slide index.
 * @param slideIndex - A slide index for clones. This must be `-1` if the slide is not a clone.
 * @param slide      - A slide element.
 *
 * @return A Slide sub component.
 */
export declare function Slide(Splide: Splide, index: number, slideIndex: number, slide: HTMLElement): SlideComponent;
//# sourceMappingURL=../../../../src/js/components/Slides/Slide.d.ts.map