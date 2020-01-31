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
	horizontal: {
		ArrowLeft : '<',
		ArrowRight: '>',
		// For IE.
		Left : '<',
		Right: '>',
	},
	vertical: {
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
	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			const map = KEY_MAP[ Splide.options.direction === 'ttb' ? 'vertical' : 'horizontal' ];

			Splide.on( 'mounted updated', () => {
				Splide.off( 'keydown', Splide.root );

				if ( Splide.options.keyboard ) {
					Splide.on( 'keydown', e => {
						if ( map[ e.key ] ) {
							Splide.go( map[ e.key ] );
						}
					}, Splide.root );
				}
			} );
		},
	}
}