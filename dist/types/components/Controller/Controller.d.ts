import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Controller component.
 *
 * @since 3.0.0
 */
export interface ControllerComponent extends BaseComponent {
    go(control: number | string, allowSameIndex?: boolean, callback?: AnyFunction): void;
    scroll(destination: number, useIndex?: boolean, snap?: boolean, duration?: number, callback?: AnyFunction): void;
    getNext(destination?: boolean): number;
    getPrev(destination?: boolean): number;
    getEnd(): number;
    setIndex(index: number): void;
    getIndex(prev?: boolean): number;
    toIndex(page: number): number;
    toPage(index: number): number;
    toDest(position: number): number;
    hasFocus(): boolean;
}
/**
 * The component for controlling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Controller component object.
 */
export declare function Controller(Splide: Splide, Components: Components, options: Options): ControllerComponent;
//# sourceMappingURL=../../../../src/js/components/Controller/Controller.d.ts.map