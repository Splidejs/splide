import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Layout component.
 *
 * @since 3.0.0
 */
export interface LayoutComponent extends BaseComponent {
    listSize(): number;
    slideSize(index: number, withoutGap?: boolean): number;
    sliderSize(withoutGap?: boolean): number;
    totalSize(index?: number, withoutGap?: boolean): number;
    getPadding(right: boolean): number;
    isOverflow(): boolean;
    /** @internal */
    resize(force?: boolean): void;
}
/**
 * The component that adjusts slider styles and provides methods for dimensions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Layout component object.
 */
export declare function Layout(Splide: Splide, Components: Components, options: Options): LayoutComponent;
