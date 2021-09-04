declare module '@splide/splide' {
  /**
   * The interface for the Pagination component.
   *
   * @since 3.0.0
   */
  interface PaginationComponent extends BaseComponent {
    items: PaginationItem[];
    getAt( index: number ): PaginationItem;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Pagination: PaginationComponent,
  }

  /**
   * The interface for each pagination item.
   *
   * @since 3.0.0
   */
  interface PaginationItem {
    li: HTMLLIElement;
    button: HTMLButtonElement;
    page: number;
  }
}
