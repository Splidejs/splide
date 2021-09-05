declare module '@splidejs/splide' {
  /**
   * The interface for the State object.
   *
   * @since 3.0.0
   */
  interface StateObject {
    set( state: number ): void;
    is( states: number | number[] ): boolean;
  }
}
