import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Arrows component.
 *
 * @since 3.0.0
 */
export interface ArrowsComponent extends BaseComponent {
    arrows: {
        prev?: HTMLButtonElement;
        next?: HTMLButtonElement;
    };
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
 * @return An Arrows component object.
 */
export declare function Arrows(Splide: Splide, Components: Components, options: Options): ArrowsComponent;
//# sourceMappingURL=../../../../src/js/components/Arrows/Arrows.d.ts.map