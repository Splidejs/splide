import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Autoplay component.
 *
 * @since 3.0.0
 */
export interface AutoplayComponent extends BaseComponent {
    play(): void;
    pause(): void;
    isPaused(): boolean;
}
/**
 * The component for autoplay, handling a progress bar and a toggle button.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Autoplay component object.
 */
export declare function Autoplay(Splide: Splide, Components: Components, options: Options): AutoplayComponent;
