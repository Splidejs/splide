import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Media component.
 *
 * @since 4.0.0
 */
export interface MediaComponent extends BaseComponent {
    /** @internal */
    reduce(reduced: boolean): void;
    set(options: Options, base?: boolean, notify?: boolean): void;
}
/**
 * The component for observing media queries and updating options if necessary.
 * This used to be the Options component.
 *
 * @since 4.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Media component object.
 */
export declare function Media(Splide: Splide, Components: Components, options: Options): MediaComponent;
