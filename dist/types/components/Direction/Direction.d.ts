import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Direction component.
 *
 * @since 3.0.0
 */
export interface DirectionComponent extends BaseComponent {
    resolve(prop: string, axisOnly?: boolean): string;
    orient(value: number): number;
}
/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */
export declare const ORIENTATION_MAP: {
    marginRight: string[];
    autoWidth: string[];
    fixedWidth: string[];
    paddingLeft: string[];
    paddingRight: string[];
    width: string[];
    left: string[];
    right: string[];
    x: string[];
    X: string[];
    Y: string[];
    ArrowLeft: string[];
    ArrowRight: string[];
};
/**
 * The component that absorbs the difference among directions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Direction component object.
 */
export declare function Direction(Splide: Splide, Components: Components, options: Options): DirectionComponent;
//# sourceMappingURL=../../../../src/js/components/Direction/Direction.d.ts.map