declare module '@splide/splide' {
  /**
   * The interface for the Autoplay component.
   *
   * @since 3.0.0
   */
  interface AutoplayComponent extends BaseComponent {
    play(): void;
    pause(): void;
    isPaused(): boolean;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Autoplay: AutoplayComponent,
  }
}
