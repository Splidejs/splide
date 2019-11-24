/**
 * Export Splide class for import.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { default as Core } from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


/**
 * Export Splide class for import from other projects.
 */
export default class Splide extends Core {
	constructor( root, options ) {
		super( root, options, COMPLETE );
	}
}