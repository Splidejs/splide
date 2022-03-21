import { PROJECT_CODE } from './project';


export const CLASS_ROOT            = PROJECT_CODE;
export const CLASS_TRACK           = `${ PROJECT_CODE }__track`;
export const CLASS_LIST            = `${ PROJECT_CODE }__list`;
export const CLASS_SLIDE           = `${ PROJECT_CODE }__slide`;
export const CLASS_CLONE           = `${ CLASS_SLIDE }--clone`;
export const CLASS_CONTAINER       = `${ CLASS_SLIDE }__container`;
export const CLASS_ARROWS          = `${ PROJECT_CODE }__arrows`;
export const CLASS_ARROW           = `${ PROJECT_CODE }__arrow`;
export const CLASS_ARROW_PREV      = `${ CLASS_ARROW }--prev`;
export const CLASS_ARROW_NEXT      = `${ CLASS_ARROW }--next`;
export const CLASS_PAGINATION      = `${ PROJECT_CODE }__pagination`;
export const CLASS_PAGINATION_PAGE = `${ CLASS_PAGINATION }__page`;
export const CLASS_PROGRESS        = `${ PROJECT_CODE }__progress`;
export const CLASS_PROGRESS_BAR    = `${ CLASS_PROGRESS }__bar`;
export const CLASS_TOGGLE          = `${ PROJECT_CODE }__toggle`;
export const CLASS_TOGGLE_PLAY     = `${ CLASS_TOGGLE }__play`;
export const CLASS_TOGGLE_PAUSE    = `${ CLASS_TOGGLE }__pause`;
export const CLASS_SPINNER         = `${ PROJECT_CODE }__spinner`;
export const CLASS_SR              = `${ PROJECT_CODE }__sr`;
export const CLASS_INITIALIZED     = 'is-initialized';
export const CLASS_ACTIVE          = 'is-active';
export const CLASS_PREV            = 'is-prev';
export const CLASS_NEXT            = 'is-next';
export const CLASS_VISIBLE         = 'is-visible';
export const CLASS_LOADING         = 'is-loading';
export const CLASS_FOCUS_IN        = 'is-focus-in';


/**
 * The array with all status classes.
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
