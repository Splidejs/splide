/**
 * The component for controlling slides via keyboard.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

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
	 * Hold the root element.
	 *
	 * @type {Element}
	 */
	const root = Splide.root;

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			const map = KEY_MAP[ Splide.options.direction ];

			Splide.on( 'mounted updated', () => {
				Splide.off( 'keydown', root );

				if ( Splide.options.keyboard ) {
					Splide.on( 'keydown', e => {
						if ( map[ e.key ] ) {
							Splide.go( map[ e.key ] );
						}
					}, root );
				}
			} );
		},
	};
}