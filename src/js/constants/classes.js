/**
 * Export class names.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * A root class name.
 *
 * @type {string}
 */
const ROOT = 'splide';

/**
 * The definition table of all classes for elements.
 * They might be modified by options.
 *
 * @type {Object}
 */
export const ELEMENT_CLASSES = {
	root      : ROOT,
	slider    : `${ ROOT }__slider`,
	track     : `${ ROOT }__track`,
	list      : `${ ROOT }__list`,
	slide     : `${ ROOT }__slide`,
	container : `${ ROOT }__slide__container`,
	arrows    : `${ ROOT }__arrows`,
	arrow     : `${ ROOT }__arrow`,
	prev      : `${ ROOT }__arrow--prev`,
	next      : `${ ROOT }__arrow--next`,
	pagination: `${ ROOT }__pagination`,
	page      : `${ ROOT }__pagination__page`,
	clone     : `${ ROOT }__slide--clone`,
	progress  : `${ ROOT }__progress`,
	bar       : `${ ROOT }__progress__bar`,
	autoplay  : `${ ROOT }__autoplay`,
	play      : `${ ROOT }__play`,
	pause     : `${ ROOT }__pause`,
	spinner   : `${ ROOT }__spinner`,
	sr        : `${ ROOT }__sr`,
};

/**
 * Definitions of status classes.
 *
 * @type {Object}
 */
export const STATUS_CLASSES = {
	active : 'is-active',
	visible: 'is-visible',
	loading: 'is-loading',
};