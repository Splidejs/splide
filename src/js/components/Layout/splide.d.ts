declare module '@splidejs/splide' {
  /**
   * The interface for the Layout component.
   *
   * @since 3.0.0
   */
  interface LayoutComponent extends BaseComponent {
    listSize(): number;
    slideSize( index: number, withoutGap?: boolean ): number;
    sliderSize(): number;
    totalSize( index?: number, withoutGap?: boolean ): number;
    getPadding( right: boolean ): number;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Layout: LayoutComponent,
  }
}
