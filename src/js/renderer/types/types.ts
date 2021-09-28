export interface SlideContent {
  /**
   * The HTML or text for each slide.
   */
  html?: string;

  /**
   * The collection of styles.
   */
  styles?: Record<string, string | number>;

  /**
   * The collection of attributes.
   */
  attrs?: Record<string, string | number | boolean>;
}

/**
 * The interface for rendering options.
 *
 * @since 3.0.0
 */
export interface RenderingOptions {
  /**
   * The additional class for the root element.
   */
  rootClass?: string;

  /**
   * The tag used for the list element.
   */
  listTag?: string;

  /**
   * The tag used for each slide.
   */
  slideTag?: string;

  /**
   * Determines whether to render arrows or not.
   */
  arrows?: string;

  /**
   * The additional HTML rendered before the track element.
   */
  beforeTrack?: string;

  /**
   * The additional HTML rendered after the track element.
   */
  afterTrack?: string;
}
