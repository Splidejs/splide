import { PROJECT_CODE } from './project';

/**
 * The prefix for classes.
 *
 * @since 4.1.0
 */
const CLASS_PREFIX = `${ PROJECT_CODE }__`;

/**
 * The prefix for status classes.
 *
 * @since 4.1.0
 */
const STATUS_CLASS_PREFIX = 'is-';

/**
 * All classes as constants.
 */
export const CLASS_ROOT            = PROJECT_CODE;
export const CLASS_TRACK           = `${ CLASS_PREFIX }track`;
export const CLASS_LIST            = `${ CLASS_PREFIX }list`;
export const CLASS_SLIDE           = `${ CLASS_PREFIX }slide`;
export const CLASS_CLONE           = `${ CLASS_SLIDE }--clone`;
export const CLASS_CONTAINER       = `${ CLASS_SLIDE }__container`;
export const CLASS_ARROWS          = `${ CLASS_PREFIX }arrows`;
export const CLASS_ARROW           = `${ CLASS_PREFIX }arrow`;
export const CLASS_ARROW_PREV      = `${ CLASS_ARROW }--prev`;
export const CLASS_ARROW_NEXT      = `${ CLASS_ARROW }--next`;
export const CLASS_PAGINATION      = `${ CLASS_PREFIX }pagination`;
export const CLASS_PAGINATION_PAGE = `${ CLASS_PAGINATION }__page`;
export const CLASS_PROGRESS        = `${ CLASS_PREFIX }progress`;
export const CLASS_PROGRESS_BAR    = `${ CLASS_PROGRESS }__bar`;
export const CLASS_TOGGLE          = `${ CLASS_PREFIX }toggle`;
export const CLASS_TOGGLE_PLAY     = `${ CLASS_TOGGLE }__play`;
export const CLASS_TOGGLE_PAUSE    = `${ CLASS_TOGGLE }__pause`;
export const CLASS_SPINNER         = `${ CLASS_PREFIX }spinner`;
export const CLASS_SR              = `${ CLASS_PREFIX }sr`;
export const CLASS_INITIALIZED     = `${ STATUS_CLASS_PREFIX }initialized`;
export const CLASS_ACTIVE          = `${ STATUS_CLASS_PREFIX }active`;
export const CLASS_PREV            = `${ STATUS_CLASS_PREFIX }prev`;
export const CLASS_NEXT            = `${ STATUS_CLASS_PREFIX }next`;
export const CLASS_VISIBLE         = `${ STATUS_CLASS_PREFIX }visible`;
export const CLASS_LOADING         = `${ STATUS_CLASS_PREFIX }loading`;
export const CLASS_FOCUS_IN        = `${ STATUS_CLASS_PREFIX }focus-in`;
export const CLASS_OVERFLOW        = `${ STATUS_CLASS_PREFIX }overflow`;

/**
 * The array with all status classes except for `is-initialized`.
 *
 * @since 3.0.0
 */
export const STATUS_CLASSES = [
  CLASS_ACTIVE,
  CLASS_VISIBLE,
  CLASS_PREV,
  CLASS_NEXT,
  CLASS_LOADING,
  CLASS_FOCUS_IN,
  CLASS_OVERFLOW,
];

/**
 * The collection of classes for elements that Splide dynamically creates.
 *
 * @since 3.0.0
 */
export const CLASSES = {
  slide     : CLASS_SLIDE,
  clone     : CLASS_CLONE,
  arrows    : CLASS_ARROWS,
  arrow     : CLASS_ARROW,
  prev      : CLASS_ARROW_PREV,
  next      : CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page      : CLASS_PAGINATION_PAGE,
  spinner   : CLASS_SPINNER,
};
