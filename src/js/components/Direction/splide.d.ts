declare module '@splide/splide' {
  /**
   * The interface for the Direction component.
   *
   * @since 3.0.0
   */
  interface DirectionComponent extends BaseComponent {
    resolve( prop: string, axisOnly?: boolean ): string;
    orient( value: number ): number;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Direction: DirectionComponent,
  }
}
