declare module '@splidejs/splide' {
  /**
   * The interface for the Transition component.
   *
   * @since 3.0.0
   */
  interface TransitionComponent extends BaseComponent {
    start( index: number, done: () => void ): void;
    cancel(): void;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Transition: TransitionComponent;
  }
}
