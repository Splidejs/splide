/**
 * The component for controlling slides via keyboard.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { removeAttribute, setAttribute } from "../../utils/dom";
import { TAB_INDEX } from "../../constants/a11y";

/**
 * Map a key to a slide control.
 *
 * @type {Object}
 */
const KEY_MAP = {
	ltr: {
		ArrowLeft : '<',
		ArrowRight: '>',
		// For IE.
		Left : '<',
		Right: '>',
	},
	rtl: {
		ArrowLeft : '>',
		ArrowRight: '<',
		// For IE.
		Left : '>',
		Right: '<',
	},
	ttb: {
		ArrowUp  : '<',
		ArrowDown: '>',
		// For IE.
		Up  : '<',
		Down: '>',
	},
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
	 * Hold the target element.
	 *
	 * @type {Element|Document|undefined}
	 */
	let target;

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide.on( 'mounted updated', () => {
				const options  = Splide.options;
				const root     = Splide.root;
				const map      = KEY_MAP[ options.direction ];
				const keyboard = options.keyboard;

				if ( target ) {
					Splide.off( 'keydown', target );
					removeAttribute( root, TAB_INDEX );
				}

				if ( keyboard ) {
					if ( keyboard === 'focused' ) {
						target = root;
						setAttribute( root, TAB_INDEX, 0 );
					} else {
						target = document;
					}

					Splide.on( 'keydown', e => {
						if ( map[ e.key ] ) {
							Splide.go( map[ e.key ] );
						}
					}, target );
				}
			} );
		},
	};
}