import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the LazyLoad component.
 *
 * @since 3.0.0
 */
export interface LazyLoadComponent extends BaseComponent {
    /** @internal */
    check(): void;
}
/**
 * The component for lazily loading images.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An LazyLoad component object.
 */
export declare function LazyLoad(Splide: Splide, Components: Components, options: Options): LazyLoadComponent;
