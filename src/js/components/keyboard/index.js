/**
 * The component for controlling slides via keyboard.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { subscribe } from "../../utils/dom";

/**
 * Map a key to a slide control.
 *
 * @type {Object}
 */
const KEY_MAP = {
	ArrowLeft : '<',
	ArrowRight: '>',
	// For IE.
	Left : '<',
	Right: '>',
};


/**
 * The component for controlling slides via keyboard.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Hold functions to remove event listener.
	 *
	 * @type {Array|undefined}
	 */
	let removers;

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide.on( 'mounted updated', () => {
				if ( removers ) {
					removers[ 0 ]();
					removers = undefined;
				}

				if ( Splide.options.keyboard ) {
					removers = subscribe( Splide.root, 'keydown', e => {
						if ( KEY_MAP[ e.key ] ) {
							Splide.go( KEY_MAP[ e.key ] );
						}
					} );
				}
			} );
		},
	}
}