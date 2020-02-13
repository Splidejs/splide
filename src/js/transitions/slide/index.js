/**
 * The component for general slide effect transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../utils/dom';
import { SLIDE } from "../../constants/types";


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
		 * @param {number}   prevIndex - Previous index.
		 * @param {Object}   coord     - Destination coordinates.
		 * @param {function} done      - Callback function must be invoked when transition is completed.
		 */
		start( destIndex, newIndex, prevIndex, coord, done ) {
			const options   = Splide.options;
			const edgeIndex = Components.Controller.edgeIndex;
			let speed       = options.speed;
			endCallback = done;

			if ( Splide.is( SLIDE ) ) {
				if ( ( prevIndex === 0 && newIndex >= edgeIndex ) || ( prevIndex >= edgeIndex && newIndex === 0 ) ) {
					speed = options.rewindSpeed || speed;
				}
			}

			applyStyle( list, {
				transition: `transform ${ speed }ms ${ options.easing }`,
				transform : `translate(${ coord.x }px,${ coord.y }px)`,
			} );
		},
	};
}