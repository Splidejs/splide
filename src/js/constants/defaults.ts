import { Options } from '../types';
import { CLASSES } from './classes';
import { I18N } from './i18n';


/**
 * The collection of default options.
 * Note that this collection does not contain all options.
 *
 * @since 3.0.0
 */
export const DEFAULTS: Options = {
  type              : 'slide',
  role              : 'region',
  speed             : 400,
  perPage           : 1,
  cloneStatus       : true,
  arrows            : true,
  pagination        : true,
  paginationKeyboard: true,
  interval          : 5000,
  pauseOnHover      : true,
  pauseOnFocus      : true,
  resetProgress     : true,
  easing            : 'cubic-bezier(0.25, 1, 0.5, 1)',
  drag              : true,
  direction         : 'ltr',
  trimSpace         : true,
  focusableNodes    : 'a, button, textarea, input, select, iframe',
  live              : true,
  classes           : CLASSES,
  i18n              : I18N,
  reducedMotion: {
    speed      : 0,
    rewindSpeed: 0,
    autoplay   : 'pause',
  },
};