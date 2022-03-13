export const ROLE      = 'role';
export const TAB_INDEX = 'tabindex';
export const DISABLED  = 'disabled';

export const ARIA_PREFIX          = 'aria-';
export const ARIA_CONTROLS        = `${ ARIA_PREFIX }controls`;
export const ARIA_CURRENT         = `${ ARIA_PREFIX }current`;
export const ARIA_SELECTED        = `${ ARIA_PREFIX }selected`;
export const ARIA_LABEL           = `${ ARIA_PREFIX }label`;
export const ARIA_HIDDEN          = `${ ARIA_PREFIX }hidden`;
export const ARIA_ORIENTATION     = `${ ARIA_PREFIX }orientation`;
export const ARIA_ROLEDESCRIPTION = `${ ARIA_PREFIX }roledescription`;
export const ARIA_ATOMIC          = `${ ARIA_PREFIX }atomic`;
export const ARIA_LIVE            = `${ ARIA_PREFIX }live`;
export const ARIA_PRESSED         = `${ ARIA_PREFIX }pressed`;

/**
 * The array with all attributes.
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
  ARIA_HIDDEN,
  ARIA_ORIENTATION,
  ARIA_ROLEDESCRIPTION,
  ARIA_ATOMIC,
  ARIA_LIVE,
];
