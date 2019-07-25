/**
 * The component for initializing options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { each, merge } from '../../utils/object';
import { error } from '../../utils/error';


/**
 * The component for initializing options.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Store the root element.
	 */
	const root = Splide.root;

	/**
	 * Retrieve options from the data attribute.
	 * Note that IE10 doesn't support dataset property.
	 *
	 * @type {string}
	 */
	const options = root.getAttribute( 'data-splide' );

	if ( options ) {
		try {
			Splide.options = JSON.parse( options );
		} catch ( e ) {
			error( '"data-splide" must be a valid JSON.' );
		}
	}

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide.index = Splide.options.start;
		},

		/**
		 * Fix some options that must be never changed by breakpoints.
		 *
		 * @param {Object} fixedOptions - Options to be fixed.
		 */
		fix( fixedOptions ) {
			const options     = merge( Splide.options, fixedOptions );
			const breakpoints = options.breakpoints;

			if ( breakpoints ) {
				each( breakpoints, ( value, key ) => {
					options.breakpoints[ key ] = merge( breakpoints[ key ], fixedOptions );
				} );
			}

			Splide.options = options;
		},
	};
}