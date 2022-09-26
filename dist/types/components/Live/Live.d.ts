import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Live component.
 *
 * @since 4.0.0
 */
export interface LiveComponent extends BaseComponent {
    disable(disabled: boolean): void;
}
/**
 * The component for implementing Live Region to the slider.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Live component object.
 */
export declare function Live(Splide: Splide, Components: Components, options: Options): LiveComponent;
