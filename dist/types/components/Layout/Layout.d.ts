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
    sliderSize(): number;
    totalSize(index?: number, withoutGap?: boolean): number;
    getPadding(right: boolean): number;
}
/**
 * The component that layouts slider components and provides methods for dimensions.
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
//# sourceMappingURL=../../../../src/js/components/Layout/Layout.d.ts.map