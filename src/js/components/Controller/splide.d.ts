declare module '@splide/splide' {
  /**
   * The interface for the Controller component.
   *
   * @since 3.0.0
   */
  interface ControllerComponent extends BaseComponent {
    go( control: number | string, allowSameIndex?: boolean ): void;
    getNext( destination?: boolean ): number;
    getPrev( destination?: boolean ): number;
    getEnd(): number;
    getIndex( prev?: boolean ): number;
    toIndex( page: number ): number;
    toPage( index: number ): number;
    hasFocus(): boolean;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Controller: ControllerComponent,
  }
}
