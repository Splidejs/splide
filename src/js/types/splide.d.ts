declare module '@splidejs/splide' {
  import { Splide } from '../core/Splide/Splide';
  /**
   * The type for any function.
   *
   * @since 3.0.0
   */
  type AnyFunction = ( ...args: any[] ) => any;

  /**
   * The type for a component.
   *
   * @since 3.0.0
   */
  type Component = ( Splide: Splide, Components: Components, options: Options ) => BaseComponent;

  /**
   * The interface for any component.
   *
   * @since 3.0.0
   */
  interface BaseComponent {
    mount?(): void;
    mounted?(): void;
    destroy?( completely?: boolean ): void;
  }

  /**
   * The collection of all components.
   *
   * @since 3.0.0
   */
  interface Components {
    [ name: string ]: BaseComponent;
  }
}
