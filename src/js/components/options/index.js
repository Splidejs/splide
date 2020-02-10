/**
 * The component for initializing options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { error } from '../../utils/error';
import { getAttribute } from "../../utils/dom";
import { CREATED } from "../../constants/states";


/**
 * The component for initializing options.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Retrieve options from the data attribute.
	 * Note that IE10 doesn't support dataset property.
	 *
	 * @type {string}
	 */
	const options = getAttribute( Splide.root, 'data-splide' );

	if ( options ) {
		try {
			Splide.options = JSON.parse( options );
		} catch ( e ) {
			error( e.message );
		}
	}

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			if ( Splide.State.is( CREATED ) ) {
				Splide.index = Splide.options.start;
			}
		},
	};
}