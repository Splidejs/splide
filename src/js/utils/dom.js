/**
 * Some utility functions related with DOM.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { each, values } from './object';

/**
 * Find the first element matching the given selector.
 * Be aware that all selectors after a space are ignored.
 *
 * @param {Element|Node}  elm       - An ancestor element.
 * @param {string}        selector  - DOMString.
 *
 * @return {Element|null} - A found element or null.
 */
export function find( elm, selector ) {
	return elm && selector ? elm.querySelector( selector.split( ' ' )[ 0 ] ) : null;
}

/**
 * Find a first child having the given class.
 *
 * @param {Element} parent    - A parent element.
 * @param {string}  className - A class name.
 *
 * @return {Element|null} - A found element on success. Null on failure.
 */
export function child( parent, className ) {
	if ( parent ) {
		const children = values( parent.children );

		for ( let i in children ) {
			const child = children[ i ];

			if ( hasClass( child, className.split( ' ' )[ 0 ] ) ) {
				return child;
			}
		}
	}

	return null;
}

/**
 * Create an element with some optional attributes.
 *
 * @param {string} tag   - A tag name.
 * @param {Object} attrs - An object any attribute pairs of name and value.
 *
 * @return {Element} - A created element.
 */
export function create( tag, attrs ) {
	const elm = document.createElement( tag );
	each( attrs, ( value, key ) => setAttribute( elm, key, value ) );

	return elm;
}

/**
 * Apply styles to the given element.
 *
 * @param {Element} elm     - An element where styles are applied.
 * @param {Object}  styles  - Object containing styles.
 */
export function applyStyle( elm, styles ) {
	if ( elm ) {
		each( styles, ( value, prop ) => {
			elm.style[ prop ] = value || '';
		} );
	}
}

/**
 * Add classes to the element.
 *
 * @param {Element} elm     - An element where classes are added.
 * @param {string}  classes - Class names being added.
 */
export function addClass( elm, ...classes ) {
	if ( elm ) {
		classes.forEach( name => {
			if ( name ) {
				elm.classList.add( name )
			}
		} );
	}
}

/**
 * Remove a class from the element.
 *
 * @param {Element} elm       - An element where classes are removed.
 * @param {string}  className - A class name being removed.
 */
export function removeClass( elm, className ) {
	if ( elm ) {
		elm.classList.remove( className )
	}
}

/**
 * Verify if the provided element has the class or not.
 *
 * @param {Element} elm       - An element.
 * @param {string}  className - A class name.
 *
 * @return {boolean} - True if the element has the class or false if not.
 */
export function hasClass( elm, className ) {
	return !! elm && elm.classList.contains( className );
}

/**
 * Set attribute to the given element.
 *
 * @param {Element}                 elm   - An element where an attribute is assigned.
 * @param {string}                  name  - Attribute name.
 * @param {string|number|boolean}   value - Attribute value.
 */
export function setAttribute( elm, name, value ) {
	if ( elm ) {
		elm.setAttribute( name, value );
	}
}

/**
 * Remove attribute from the given element.
 *
 * @param {Element} elm   - An element where an attribute is removed.
 * @param {string}  name  - Attribute name.
 */
export function removeAttribute( elm, name ) {
	if ( elm ) {
		elm.removeAttribute( name );
	}
}

/**
 * Listen a native event.
 *
 * @param {Element|Window}  elm     - An element or window object.
 * @param {string}          event   - An event name or event names separated with space.
 * @param {function}        handler - Callback function.
 * @param {boolean}         passive - Optional. Set false if the event is not passive.
 *
 * @return {function[]} - Functions to stop subscription.
 */
export function subscribe( elm, event, handler, passive = true ) {
	if ( elm ) {
		return event.split( ' ' ).map( e => {
			elm.addEventListener( e, handler, { passive } );
			return () => elm.removeEventListener( e, handler );
		} );
	}

	return [];
}