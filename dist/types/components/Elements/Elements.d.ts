import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for elements which the slider consists of.
 *
 * @since 3.0.0
 */
export interface ElementCollection {
    root: HTMLElement;
    track: HTMLElement;
    list: HTMLElement;
    slides: HTMLElement[];
    arrows?: HTMLElement;
    pagination?: HTMLUListElement;
    prev?: HTMLButtonElement;
    next?: HTMLButtonElement;
    bar?: HTMLElement;
    toggle?: HTMLElement;
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
