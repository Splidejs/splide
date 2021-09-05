declare module '@splidejs/splide' {
  /**
   * The interface for the Style component.
   *
   * @since 3.0.0
   */
  interface StyleComponent extends BaseComponent {
    rule( selector: string, prop: string, value: string | number ): void;
    ruleBy( target: string | HTMLElement, prop: string, value: string | number ): void;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Style: StyleComponent,
  }
}
