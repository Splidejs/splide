import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Clone component.
 *
 * @since 3.0.0
 */
export interface ClonesComponent extends BaseComponent {
}
/**
 * The multiplier to determine the number of clones.
 *
 * @since 4.0.0
 */
export declare const MULTIPLIER = 2;
/**
 * The component that generates clones for the loop slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Clones component object.
 */
export declare function Clones(Splide: Splide, Components: Components, options: Options): ClonesComponent;
