/**
 * Export "splide" function for frontend with full components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


/**
 * Create and return a new Splide instance.
 *
 * @param {Element|string} root    - A root element or a selector for it.
 * @param {Object}         options - Optional. Options overwriting defaults.
 *
 * @return {Splide} - A Splide instance.
 */
export default function splide( root, options = {} ) {
	return new Splide( root, options, COMPLETE );
}

// Register the function above as global for non-ES6 environment.
window.splide = splide;