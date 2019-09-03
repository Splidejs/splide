/**
 * Export "splide" function for frontend with full components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { default as Core } from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


/**
 * Export Splide with all components.
 */
export class Splide extends Core {
	constructor( root, options ) {
		super( root, options, COMPLETE );
	}
}

// Register the class as a global variable for non-ES6 environment.
window.Splide = Splide;