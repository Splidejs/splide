/**
 * Some utility functions related with Object, supporting IE.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

const { keys } = Object;

/**
 * Iterate an object like Array.forEach.
 * IE doesn't support forEach of HTMLCollection.
 *
 * @param {Object}    obj       - An object.
 * @param {function}  callback  - A function handling each value. Arguments are value, property and index.
 */
export function each( obj, callback ) {
	keys( obj ).some( ( key, index ) => {
		return callback( obj[ key ], key, index );
	} );
}

/**
 * Return values of the given object as an array.
 * IE doesn't support Object.values.
 *
 * @param {Object} obj - An object.
 *
 * @return {Array} - An array containing all values of the given object.
 */
export function values( obj ) {
	return keys( obj ).map( key => obj[ key ] );
}

/**
 * Check if the given subject is object or not.
 *
 * @param {*} subject - A subject to be verified.
 *
 * @return {boolean} - True if object, false otherwise.
 */
export function isObject( subject ) {
	return typeof subject === 'object';
}

/**
 * Merge two objects deeply.
 *
 * @param {Object} to   - An object where "from" is merged.
 * @param {Object} from - An object merged to "to".
 *
 * @return {Object} - A merged object.
 */
export function merge( { ...to }, from ) {
	each( from, ( value, key ) => {
		if ( isObject( value ) ) {
			if ( ! isObject( to[ key ] ) ) {
				to[ key ] = {};
			}

			to[ key ] = merge( to[ key ], value );
		} else {
			to[ key ] = value;
		}
	} );

	return to;
}

/**
 * Assign all properties "from" to "to" object.
 *
 * @param {Object} to   - An object where properties are assigned.
 * @param {Object} from - An object whose properties are assigned to "to".
 *
 * @return {Object} - An assigned object.
 */
export function assign( to, from ) {
	keys( from ).forEach( key => {
		if ( ! to[ key ] ) {
			Object.defineProperty( to, key, Object.getOwnPropertyDescriptor( from, key ) );
		}
	} );

	return to;
}