declare module '@splidejs/splide' {
  /**
   * The interface for the Slides component.
   *
   * @since 3.0.0
   */
  interface SlidesComponent extends BaseComponent {
    register( slide: HTMLElement, index: number, slideIndex: number ): void;
    get( excludeClones?: boolean ): SlideComponent[];
    getIn( page: number ): SlideComponent[];
    getAt( index: number ): SlideComponent | undefined;
    add( slide: string | Element | Array<string | Element>, index?: number, callback?: AnyFunction ): void;
    remove( selector: SlideMatcher ): void;
    forEach( iteratee: SlidesIteratee, excludeClones?: boolean );
    filter( matcher: SlideMatcher ): SlideComponent[];
    rule( prop: string, value: string | number, useContainer?: boolean ): void
    getLength( excludeClones?: boolean ): number;
    isEnough(): boolean;
  }

  /**
   * The interface for the Slide sub component.
   *
   * @since 3.0.0
   */
  interface SlideComponent extends BaseComponent {
    index: number;
    slideIndex: number;
    slide: HTMLElement;
    container: HTMLElement;
    isClone: boolean;
    rule( prop: string, value: string | number, useContainer?: boolean ): void
    isWithin( from: number, distance: number ): boolean;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Slides: SlidesComponent;
  }

  /**
   * The iteratee function for Slides.
   *
   * @since 3.0.0
   */
  type SlidesIteratee = ( Slide: SlideComponent, index: number, Slides: SlideComponent[] ) => void

  /**
   * The predicate function for Slides.
   *
   * @since 3.0.0
   */
  type SlidesPredicate = ( Slide: SlideComponent, index: number, Slides: SlideComponent[] ) => any

  /**
   * The type for filtering SlideComponent objects.
   *
   * @since 3.0.0
   */
  type SlideMatcher = number | number[] | string | SlidesPredicate;
}
