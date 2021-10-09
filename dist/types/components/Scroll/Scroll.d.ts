import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Scroll component.
 *
 * @since 3.0.0
 */
export interface ScrollComponent extends BaseComponent {
    scroll(position: number, duration?: number, callback?: AnyFunction): void;
    cancel(): void;
}
/**
 * The component for scrolling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Scroll component object.
 */
export declare function Scroll(Splide: Splide, Components: Components, options: Options): ScrollComponent;
//# sourceMappingURL=../../../../src/js/components/Scroll/Scroll.d.ts.map