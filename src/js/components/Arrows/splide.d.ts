declare module '@splide/splide' {
  /**
   * The interface for the Arrows component.
   *
   * @since 3.0.0
   */
  interface ArrowsComponent extends BaseComponent {
    arrows: { prev?: HTMLButtonElement, next?: HTMLButtonElement };
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Arrows: ArrowsComponent,
  }
}
