export const ROLE      = 'role';
export const TAB_INDEX = 'tabindex';
export const DISABLED  = 'disabled';

export const ARIA_PREFIX          = 'aria-';
export const ARIA_CONTROLS        = `${ ARIA_PREFIX }controls`;
export const ARIA_CURRENT         = `${ ARIA_PREFIX }current`;
export const ARIA_SELECTED        = `${ ARIA_PREFIX }selected`;
export const ARIA_LABEL           = `${ ARIA_PREFIX }label`;
export const ARIA_LABELLEDBY      = `${ ARIA_PREFIX }labelledby`;
export const ARIA_HIDDEN          = `${ ARIA_PREFIX }hidden`;
export const ARIA_ORIENTATION     = `${ ARIA_PREFIX }orientation`;
export const ARIA_ROLEDESCRIPTION = `${ ARIA_PREFIX }roledescription`;
export const ARIA_LIVE            = `${ ARIA_PREFIX }live`;
export const ARIA_BUSY            = `${ ARIA_PREFIX }busy`;
export const ARIA_ATOMIC          = `${ ARIA_PREFIX }atomic`;

/**
 * The array with all attributes to remove later.
 * Need to manually remove attributes that are not in this.
 * Note that removing `aria-live` disables the live region until the page reload.
 *
 * @since 3.0.0
 */
export const ALL_ATTRIBUTES = [
  ROLE,
  TAB_INDEX,
  DISABLED,
  ARIA_CONTROLS,
  ARIA_CURRENT,
  ARIA_LABEL,
  ARIA_LABELLEDBY,
  ARIA_HIDDEN,
  ARIA_ORIENTATION,
  ARIA_ROLEDESCRIPTION,
];
