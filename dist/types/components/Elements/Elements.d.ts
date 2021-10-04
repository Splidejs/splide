import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
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
export declare function Elements(Splide: Splide, Components: Components, options: Options): ElementsComponent;
//# sourceMappingURL=../../../../src/js/components/Elements/Elements.d.ts.map