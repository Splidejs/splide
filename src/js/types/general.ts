import { Splide } from '../core/Splide/Splide';
import { Components } from './components';
import { Options } from './options';


/**
 * The type for any function.
 *
 * @since 3.0.0
 */
export type AnyFunction = ( ...args: any[] ) => any;

/**
 * The type for a component.
 *
 * @since 3.0.0
 */
export type ComponentConstructor = ( Splide: Splide, Components: Components, options: Options ) => BaseComponent;

/**
 * The interface for any component.
 *
 * @since 3.0.0
 */
export interface BaseComponent {
  setup?(): void;
  mount?(): void;
  destroy?( completely?: boolean ): void;
}

/**
 * The interface for the Transition component.
 *
 * @since 3.0.0
 */
export interface TransitionComponent extends BaseComponent {
  start( index: number, done: () => void ): void;
  cancel(): void;
}

/**
 * The interface for info of a splide instance to sync with.
 *
 * @since 3.2.8
 */
export interface SyncTarget {
  splide: Splide;
  isParent?: boolean;
}
