declare module '@splidejs/splide' {
  /**
   * The interface for the Scroll component.
   *
   * @since 3.0.0
   */
  interface ScrollComponent extends BaseComponent {
    scroll( position: number, duration?: number ): void;
    cancel(): void;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Scroll: ScrollComponent,
  }
}
