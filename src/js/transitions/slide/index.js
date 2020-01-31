/**
 * The component for general slide effect transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../utils/dom';


/**
 * The component for general slide effect transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold the list element.
	 *
	 * @type {Element}
	 */
	let list;

	/**
	 * Hold the onEnd callback function.
	 *
	 * @type {function}
	 */
	let endCallback;

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			list = Components.Elements.list;

			Splide.on( 'transitionend', e => {
				if ( e.target === list && endCallback ) {
					endCallback();
				}
			}, list );
		},

		/**
		 * Start transition.
		 *
		 * @param {number}   destIndex - Destination slide index that might be clone's.
		 * @param {number}   newIndex  - New index.
		 * @param {Object}   coord     - Destination coordinates.
		 * @param {function} onEnd     - Callback function must be invoked when transition is completed.
		 */
		start( destIndex, newIndex, coord, onEnd ) {
			endCallback = onEnd;

			applyStyle( list, {
				transition: `transform ${ Splide.options.speed }ms ${ Splide.options.easing }`,
				transform : `translate(${ coord.x }px,${ coord.y }px)`,
			} );
		},
	};
}