/**
 * The component for general slide effect transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { subscribe, applyStyle } from '../../utils/dom';


/**
 * The component for general slide effect transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	return {
		/**
		 * Start transition.
		 *
		 * @param {number}    destIndex - Destination slide index that might be clone's.
		 * @param {number}    newIndex  - New index.
		 * @param {Object}    coord     - Destination coordinates.
		 * @param {function}  onEnd     - Callback function must be invoked when transition is completed.
		 */
		start( destIndex, newIndex, coord, onEnd ) {
			const list    = Components.Elements.list;
			const options = Splide.options;

			const removers = subscribe( list, 'transitionend', () => {
				onEnd();
				removers[0]();
			} );

			applyStyle( list, {
				transition: `transform ${ options.speed }ms ${ options.easing }`,
				transform : `translate(${ coord.x }px,${ coord.y }px)`,
			} );
		},
	};
}