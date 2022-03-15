import { TTB } from '../../constants/directions';
import { EVENT_REFRESH, EVENT_RESIZE, EVENT_RESIZED, EVENT_UPDATED } from '../../constants/events';
import { EventInterface, Throttle } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, apply, assert, isObject, rect, style, unit } from '../../utils';


/**
 * The interface for the Layout component.
 *
 * @since 3.0.0
 */
export interface LayoutComponent extends BaseComponent {
  listSize(): number;
  slideSize( index: number, withoutGap?: boolean ): number;
  sliderSize(): number;
  totalSize( index?: number, withoutGap?: boolean ): number;
  getPadding( right: boolean ): number;
}

/**
 * The component that layouts slider components and provides methods for dimensions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Layout component object.
 */
export function Layout( Splide: Splide, Components: Components, options: Options ): LayoutComponent {
  const { on, bind, emit } = EventInterface( Splide );
  const { Slides } = Components;
  const { resolve } = Components.Direction;
  const { root, track, list } = Components.Elements;
  const { getAt, style: styleSlides } = Slides;

  /**
   * Indicates whether the slider direction is vertical or not.
   */
  let vertical: boolean;

  /**
   * Keeps the DOMRect object of the root element.
   */
  let rootRect: DOMRect;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();
    bind( window, 'resize load', Throttle( apply( emit, EVENT_RESIZE ) ) );
    on( [ EVENT_UPDATED, EVENT_REFRESH ], init );
    on( EVENT_RESIZE, resize );
  }

  /**
   * Initializes the component on `mount` or `updated`.
   * Uses `max-width` for the root to prevent the slider from exceeding the parent element.
   */
  function init(): void {
    rootRect = null;
    vertical = options.direction === TTB;

    style( root, 'maxWidth', unit( options.width ) );
    style( track, resolve( 'paddingLeft' ), cssPadding( false ) );
    style( track, resolve( 'paddingRight' ), cssPadding( true ) );

    resize();
  }

  /**
   * Updates dimensions of some elements when the slider is resized.
   */
  function resize(): void {
    const newRect = rect( root );

    if ( ! rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height ) {
      style( track, 'height', cssTrackHeight() );

      styleSlides( resolve( 'marginRight' ), unit( options.gap ) );
      styleSlides( 'width', cssSlideWidth() );
      styleSlides( 'height', cssSlideHeight(), true );

      rootRect = newRect;
      emit( EVENT_RESIZED );
    }
  }

  /**
   * Parses the padding option and returns the value for each side.
   * This method returns `paddingTop` or `paddingBottom` for the vertical slider.
   *
   * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
   *
   * @return The padding value as a CSS string.
   */
  function cssPadding( right: boolean ): string {
    const { padding } = options;
    const prop = resolve( right ? 'right' : 'left' );
    return padding && unit( padding[ prop ] || ( isObject( padding ) ? 0 : padding ) ) || '0px';
  }

  /**
   * Returns the height of the track element as a CSS string.
   *
   * @return The height of the track.
   */
  function cssTrackHeight(): string {
    let height = '';

    if ( vertical ) {
      height = cssHeight();
      assert( height, 'height or heightRatio is missing.' );
      height = `calc(${ height } - ${ cssPadding( false ) } - ${ cssPadding( true ) })`;
    }

    return height;
  }

  /**
   * Converts options related with height to a CSS string.
   *
   * @return The height as a CSS string if available, or otherwise an empty string.
   */
  function cssHeight(): string {
    return unit( options.height || rect( list ).width * options.heightRatio );
  }

  /**
   * Returns the width of the slide as a CSS string.
   *
   * @return The width of the slide.
   */
  function cssSlideWidth(): string | null {
    return options.autoWidth ? null : unit( options.fixedWidth ) || ( vertical ? '' : cssSlideSize() );
  }

  /**
   * Returns the height of the slide as a CSS string.
   *
   * @return The height of the slide.
   */
  function cssSlideHeight(): string | null {
    return unit( options.fixedHeight )
      || ( vertical ? ( options.autoHeight ? null : cssSlideSize() ) : cssHeight() );
  }

  /**
   * Returns the CSS string for slide width or height without gap.
   *
   * @return The CSS string for slide width or height.
   */
  function cssSlideSize(): string {
    const gap = unit( options.gap );
    return `calc((100%${ gap && ` + ${ gap }` })/${ options.perPage || 1 }${ gap && ` - ${ gap }` })`;
  }

  /**
   * Returns the list width for the horizontal slider, or the height for the vertical slider.
   *
   * @return The size of the track element in pixel.
   */
  function listSize(): number {
    return rect( list )[ resolve( 'width' ) ];
  }

  /**
   * Returns the slide width for the horizontal slider, or the height for the vertical slider.
   *
   * @param index      - Optional. A slide index.
   * @param withoutGap - Optional. Determines whether to exclude the gap amount or not.
   *
   * @return The size of the specified slide element in pixel.
   */
  function slideSize( index?: number, withoutGap?: boolean ): number {
    const Slide = getAt( index || 0 );
    return Slide
      ? rect( Slide.slide )[ resolve( 'width' ) ] + ( withoutGap ? 0 : getGap() )
      : 0;
  }

  /**
   * Returns the total width or height of slides from the head of the slider to the specified index.
   * This includes sizes of clones before the first slide.
   *
   * @param index      - A slide index. If omitted, uses the last index.
   * @param withoutGap - Optional. Determines whether to exclude the last gap or not.
   *
   * @return The total width of slides in the horizontal slider, or the height in the vertical one.
   */
  function totalSize( index: number, withoutGap?: boolean ): number {
    const Slide = getAt( index );

    if ( Slide ) {
      const right = rect( Slide.slide )[ resolve( 'right' ) ];
      const left  = rect( list )[ resolve( 'left' ) ];
      return abs( right - left ) + ( withoutGap ? 0 : getGap() );
    }

    return 0;
  }

  /**
   * Returns the slider size without clones before the first slide.
   *
   * @return The width or height of the slider without clones.
   */
  function sliderSize(): number {
    return totalSize( Splide.length - 1, true ) - totalSize( -1, true );
  }

  /**
   * Returns the gap value.
   *
   * @return The gap value in pixel.
   */
  function getGap(): number {
    const Slide = getAt( 0 );
    return Slide && parseFloat( style( Slide.slide, resolve( 'marginRight' ) ) ) || 0;
  }

  /**
   * Returns the padding value.
   * This method resolves the difference of the direction.
   *
   * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
   *
   * @return The padding value in pixel.
   */
  function getPadding( right: boolean ): number {
    return parseFloat( style( track, resolve( `padding${ right ? 'Right' : 'Left' }` ) ) ) || 0;
  }

  return {
    mount,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding,
  };
}
