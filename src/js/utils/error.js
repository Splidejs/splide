/**
 * Utility functions for outputting logs.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Prefix of an error massage.
 *
 * @type {string}
 */
const MESSAGE_PREFIX = '[SPLIDE]';


/**
 * Display an error message on the browser console.
 *
 * @param {string} message - An error message.
 */
export function error( message ) {
	console.error( `${ MESSAGE_PREFIX } ${ message }` );
}

/**
 * Check existence of the given object and throw an error if it doesn't.
 *
 * @throws {Error}
 *
 * @param {*}      subject - A subject to be confirmed.
 * @param {string} message - An error message.
 */
export function exist( subject, message ) {
	if ( ! subject ) {
		throw new Error( message );
	}
}