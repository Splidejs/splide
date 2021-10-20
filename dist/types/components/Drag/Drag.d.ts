import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Drag component.
 *
 * @since 3.0.0
 */
export interface DragComponent extends BaseComponent {
    disable(disabled: boolean): void;
    isDragging(): boolean;
}
/**
 * The component for dragging the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Drag component object.
 */
export declare function Drag(Splide: Splide, Components: Components, options: Options): DragComponent;
//# sourceMappingURL=../../../../src/js/components/Drag/Drag.d.ts.map