/**
 * A package of some miscellaneous utility functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { create, append, remove, applyStyle } from "./dom";

/**
 * Convert the given value to array.
 *
 * @param {*} value - Any value.
 *
 * @return {*[]} - Array containing the given value.
 */
export function toArray( value ) {
	return Array.isArray( value ) ? value : [ value ];
}

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
 * @param {string}       format       - The string format.
 * @param {string|Array} replacements - Replacements accepting multiple arguments.
 *
 * @returns {string} - Converted string.
 */
export function sprintf( format, replacements ) {
	let i = 0;
	return format.replace( /%s/g, () => toArray( replacements )[ i++ ] );
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

	if ( type === 'number' && value > 0 ) {
		return parseFloat( value ) + 'px';
	}

	return type === 'string' ? value : '';
}

/**
 * Pad start with 0.
 *
 * @param {number} number - A number to be filled with 0.
 *
 * @return {string|number} - Padded number.
 */
export function pad( number ) {
	return number < 10 ? '0' + number : number
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
	if ( typeof value === 'string' ) {
		const div = create( 'div', {} );

		applyStyle( div, {
			position: 'absolute',
			width: value,
		} );

		append( root, div );

		value = div.clientWidth;

		remove( div );
	}

	return +value || 0;
}