import { I18N } from '../constants/i18n';


/**
 * The interface for options.
 *
 * @since 3.0.0
 */
export interface Options extends ResponsiveOptions {
  /**
   * The type of the slider.
   * - 'slide': A slider with the slide transition
   * - 'loop' : A carousel slider
   * - 'fade' : A slider with the fade transition. This does not support the perPage option.
   */
  type?: string;

  /**
   * The `role` attribute for the root element.
   * If the tag is `<section>`, this value will not be used. The default value is `'region'`.
   */
  role?: string;

  /**
   * Determines whether to disable any actions while the slider is transitioning.
   * Even if `false`, the slider forcibly waits for transition on the loop points.
   */
  waitForTransition?: boolean;

  /**
   * If `true`, the width of slides are determined by their width.
   * The `perPage` and `perMove` options should be `1`.
   */
  autoWidth?: boolean;

  /**
   * If `true`, the height of slides are determined by their height.
   * The `perPage` and `perMove` options should be `1`.
   */
  autoHeight?: boolean;

  /**
   * The start index.
   */
  start?: number;

  /**
   * Changes the arrow SVG path, like 'm7.61 0.807-2.12...'.
   */
  arrowPath?: string;

  /**
   * Determines whether to activate autoplay or not.
   * If `paused`, it will not begin when the slider becomes active.
   * You need to provided play/pause buttons or manually start it by `Autoplay#play()`.
   */
  autoplay?: boolean | 'pause';

  /**
   * The autoplay interval in milliseconds.
   */
  interval?: number;

  /**
   * Determines whether to pause autoplay on mouseover.
   */
  pauseOnHover?: boolean;

  /**
   * Determines whether to pause autoplay when the slider contains the active element (focused element).
   * This should be `true` for accessibility.
   */
  pauseOnFocus?: boolean;

  /**
   * Determines whether to reset the autoplay progress when it is requested to start again.
   */
  resetProgress?: boolean;

  /**
   * Enables lazy loading.
   * Provide the `src` by the `data-splide-lazy` or the `srcset` by the `data-splide-lazy-srcset`.
   * You may also provide `src` for the placeholder, but the value must be different with the data.
   *
   * - `false`: Disables lazy loading
   * - `'nearby'`: Starts loading only images around the active slide (page)
   * - `'sequential'`: Loads images sequentially
   */
  lazyLoad?: boolean | 'nearby' | 'sequential';

  /**
   * Determine how many pages (not slides) around the active slide should be loaded beforehand.
   * This only works when the `lazyLoad` option is `'nearby'`.
   */
  preloadPages?: number;

  /**
   * Enables keyboard shortcuts for the slider control.
   * - `true` or `'global'`: Listens to the `keydown` event of the document.
   * - 'focused': Listens to the `keydown` event of the slider root element with adding `tabindex="0"` to it.
   * - `false`: Disables keyboard shortcuts (default).
   */
  keyboard?: boolean | 'global' | 'focused';

  /**
   * Enables navigation by the mouse wheel.
   * Set `waitForTransition` to `ture` or provide the `wheelSleep` duration.
   */
  wheel?: boolean;

  /**
   * The threshold to cut off the small delta produced by inertia scroll.
   */
  wheelMinThreshold?: number;

  /**
   * The sleep time in milliseconds until accepting next wheel.
   * The timer starts when the transition begins.
   */
  wheelSleep?: number;

  /**
   * Determines whether to release the wheel event when the slider reaches the first or last slide.
   */
  releaseWheel?: boolean;

  /**
   * The direction of the slider.
   * - 'ltr': Left to right
   * - 'rtl': Right to left
   * - 'ttb': Top to bottom
   */
  direction?: 'ltr' | 'rtl' | 'ttb';

  /**
   * Converts the image `src` to the css `background-image` URL of the parent element.
   * This requires `fixedHeight` or `heightRatio` option.
   */
  cover?: boolean;

  /**
   * Determines whether to add `tabindex="0"` to visible slides or not.
   */
  slideFocus?: boolean;

  /**
   * If `true`, the slider makes slides clickable to navigate another slider.
   * Use `Splide#sync()` to sync multiple sliders.
   */
  isNavigation?: boolean;

  /**
   * Determines whether to trim spaces before/after the slider if the `focus` option is available.
   * - `true`: Trims spaces. The slider may stay on the same location even when requested to move.
   * - `'move'`: Trims spaces and focuses to move the slider when requested.
   */
  trimSpace?: boolean | 'move';

  /**
   * Updates the `is-active` status of slides just before moving the slider.
   */
  updateOnMove?: boolean;

  /**
   * If `min`, the media query for breakpoints will be `min-width`, or otherwise, `max-width`.
   */
  mediaQuery?: 'min' | 'max';

  /**
   * The selector to find focusable elements
   * where `tabindex="-1"` will be assigned when their ascendant slide is hidden.
   */
  focusableNodes?: string;

  /**
   * The selector for nodes that cannot be dragged.
   */
  noDrag?: string;

  /**
   * Enables the live region by `aria-live`.
   * If `true`, screen readers will read a content of each slide whenever slide changes.
   */
  live?: boolean;

  /**
   * Determines whether to use the Transition component or not.
   */
  useScroll?: boolean;

  /**
   * Options for specific breakpoints.
   *
   * @example
   * ```ts
   * {
   *   1000: {
   *     perPage: 3,
   *     gap    : 20
   *   },
   *   600: {
   *     perPage: 1,
   *     gap    : 5,
   *   },
   * }
   * ```
   */
  breakpoints?: Record<string | number, ResponsiveOptions>,

  /**
   * Options used when the `(prefers-reduced-motion: reduce)` is detected.
   */
  reducedMotion?: Options;

  /**
   * The collection of class names.
   */
  classes?: Record<string, string>;

  /**
   * The collection of i18n strings.
   */
  i18n?: Record<keyof typeof I18N | string, string>;
}

/**
 * The interface for options that can correspond with breakpoints.
 *
 * @since 3.0.0
 */
export interface ResponsiveOptions {
  /**
   * Accepts arbitrary properties for extensions, although it's not ideal typing.
   */
  [ key: string ]: any;

  /**
   * The label for the root element.
   * Use `labelledby` instead if there is a visible label.
   */
  label?: string;

  /**
   * The ID for the element that used as the label of the carousel.
   */
  labelledby?: string;

  /**
   * The transition speed in milliseconds.
   */
  speed?: number;

  /**
   * Determines whether to rewind the carousel or not.
   * This is ignored when the `type` option is `'loop'`.
   */
  rewind?: boolean;

  /**
   * The transition speed on rewind in milliseconds.
   */
  rewindSpeed?: number;

  /**
   * Allows to rewind a carousel by drag if the `rewind` option is enabled.
   */
  rewindByDrag?: boolean;

  /**
   * Defines the slider max width, accepting the CSS format such as 10em, 80vw.
   */
  width?: number | string;

  /**
   * Defines the slider height, accepting the CSS format.
   */
  height?: number | string;

  /**
   * Fixes width of slides, accepting the CSS format.
   * The slider will ignore the `perPage` option if you provide this value.
   */
  fixedWidth?: number | string;

  /**
   * Fixes height of slides, accepting the CSS format.
   * The slider will ignore the `heightRatio` option if you provide this value.
   */
  fixedHeight?: number | string;

  /**
   * Determines height of slides by the ratio to the slider width.
   * For example, when the slider width is `1000` and the ratio is `0.5`, the height will be `500`.
   */
  heightRatio?: number;

  /**
   * Determines the number of slides to display in a page.
   */
  perPage?: number;

  /**
   * Determines the number of slides to move at once.
   */
  perMove?: number;

  /**
   * Determine the number of clones on each side of the slider.
   * In most cases, you don't need to provide this value.
   */
  clones?: number;

  /**
   * Determines whether to clone status classes for clones or not.
   */
  cloneStatus?: boolean;

  /**
   * Determines which slide should be active if there are multiple slides in a page.
   * Numbers and `'center'` are acceptable.
   */
  focus?: number | 'center';

  /**
   * The gap between slides. The CSS format is acceptable, such as `1em`.
   */
  gap?: number | string;

  /**
   * Sets padding left/right or top/bottom of the slider.
   * The CSS format is acceptable, such as `1em`.
   *
   * @example
   * ```ts
   * // By number
   * padding: 10,
   *
   * // By the CSS format
   * padding: '1rem',
   *
   * // Specifies each value for a horizontal slider
   * padding: { left: 10, right: 20 },
   * padding: { left: '1rem', right: '2rem' },
   *
   * // Specified each value for a vertical slider
   * padding: { top: 10, bottom: 20 },
   * ```
   */
  padding?:
    | number
    | string
    | { left?: number | string, right?: number | string }
    | { top?: number | string, bottom?: number | string };

  /**
   * Determines whether to create/find arrows or not.
   */
  arrows?: boolean;

  /**
   * Determines whether to create pagination (indicator dots) or not.
   */
  pagination?: boolean;

  /**
   * Determines whether to enable keyboard shortcuts for pagination when it contains focus.
   * The default value is `true`.
   */
  paginationKeyboard?: boolean;

  /**
   * Explicitly sets the pagination direction that does not only affect appearance but also shortcuts and ARIA attributes.
   * The default value is same with the carousel direction.
   */
  paginationDirection?: Options['direction'];

  /**
   * The timing function for the CSS transition. For example, `linear`, ease or `cubic-bezier()`.
   */
  easing?: string;

  /**
   * The easing function for the drag free mode.
   * The default function is the `easeOutQuart` interpolation.
   */
  easingFunc?: ( t: number ) => number;

  /**
   * Allows to drag the slider by a mouse or swipe.
   * If `free`, the slider does not snap to a slide after drag.
   */
  drag?: boolean | 'free';

  /**
   * Snaps the closest slide in the drag-free mode.
   */
  snap?: boolean;

  /**
   * The required distance to start moving the slider by the touch action.
   * If you want to define the threshold for the mouse, provide an object.
   */
  dragMinThreshold?: number | { mouse: number, touch: number };

  /**
   * Determine the power of "flick". The larger number this is, the farther the slider runs.
   * Around 500 is recommended.
   */
  flickPower?: number;

  /**
   * Limits the number of pages to move by "flick".
   */
  flickMaxPages?: number;

  /**
   * Destroys the slider.
   */
  destroy?: boolean | 'completely';
}
