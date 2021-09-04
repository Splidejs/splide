declare module '@splide/splide' {
  /**
   * The interface for elements which the slider consists of.
   *
   * @since 3.0.0
   */
  interface ElementCollection {
    root: HTMLElement;
    slider: HTMLElement;
    track: HTMLElement;
    list: HTMLElement;
    slides: HTMLElement[];
    arrows: HTMLElement;
    prev: HTMLButtonElement;
    next: HTMLButtonElement;
    bar: HTMLElement;
    play: HTMLElement;
    pause: HTMLElement;
  }

  /**
   * The interface for the Elements component.
   *
   * @since 3.0.0
   */
  interface ElementsComponent extends BaseComponent, ElementCollection {
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Elements: ElementsComponent,
  }
}
