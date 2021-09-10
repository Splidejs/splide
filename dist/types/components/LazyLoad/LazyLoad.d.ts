import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { SlideComponent } from '../Slides/Slide';
/**
 * The interface for the LazyLoad component.
 *
 * @since 3.0.0
 */
export interface LazyLoadComponent extends BaseComponent {
}
/**
 * The interface for all components.
 *
 * @since 3.0.0
 */
export interface LazyLoadImagesData {
    _img: HTMLImageElement;
    _spinner: HTMLSpanElement;
    _Slide: SlideComponent;
    src: string | null;
    srcset: string | null;
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
//# sourceMappingURL=../../../../src/js/components/LazyLoad/LazyLoad.d.ts.map