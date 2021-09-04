declare module '@splide/splide' {
  /**
   * The interface for the LazyLoad component.
   *
   * @since 3.0.0
   */
  interface LazyLoadComponent extends BaseComponent {
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    LazyLoad: LazyLoadComponent,
  }

  interface LazyLoadImagesData {
    img: HTMLImageElement;
    spinner: HTMLSpanElement;
    Slide: SlideComponent;
    src: string | null;
    srcset: string | null;
  }
}
