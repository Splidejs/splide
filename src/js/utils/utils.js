/**
 * A package of some miscellaneous utility functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { create, applyStyle } from "./dom";


/**
 * Check if the given value is between min and max.
 * Min will be returned when the value is less than min or max will do when greater than max.
 *
 * @param {number} value - A number to be checked.
 * @param {number} m1    - Minimum or maximum number.
 * @param {number} m2    - Maximum or minimum number.
 *
 * @return {number} - A value itself, min or max.
 */
export function between( value, m1, m2 ) {
	return Math.min( Math.max( value, m1 > m2 ? m2 : m1 ), m1 > m2 ? m1 : m2 );
}

/**
 * The sprintf method with minimum functionality.
 *
 * @param {string} format       - The string format.
 * @param {string} replacements - Replacements accepting multiple arguments.
 *
 * @returns {string} - Converted string.
 */
export function sprintf( format, ...replacements ) {
	let i = 0;
	return format.replace( /%s/g, () => replacements[ i++ ] );
}

/**
 * Append px unit to the given subject if necessary.
 *
 * @param {number|string} value - A value that may not include an unit.
 *
 * @return {string} - If the value is string, return itself.
 *                    If number, do value + "px". An empty string, otherwise.
 */
export function unit( value ) {
	const type = typeof value;

	if ( type === 'string' ) {
		return value;
	} else if ( type === 'number' && value > 0 ) {
		return parseFloat( value ) + 'px';
	}

	return '';
}

/**
 * Convert the given value to pixel.
 *
 * @param {Element}       root  - Root element where a dummy div is appended.
 * @param {string|number} value - CSS value to be converted, such as 10rem.
 *
 * @return {number} - Pixel.
 */
export function toPixel( root, value ) {
	if ( typeof value === 'number' ) {
		return value;
	}

	const div = create( 'div', {} );

	applyStyle( div, {
		position: 'absolute',
		width: value,
	} );

	root.appendChild( div );

	const px = div.clientWidth;

	root.removeChild( div );

	return px;
}