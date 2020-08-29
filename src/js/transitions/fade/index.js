/**
 * The component for fade transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../utils/dom';
import { unit } from "../../utils/utils";


/**
 * The component for fade transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	const Fade = {
		/**
		 * Called when the component is mounted.
		 * Apply transition style to the first slide.
		 */
		mount() {
			apply( Splide.index );
		},

		/**
		 * Start transition.
		 *
		 * @param {number}    destIndex - Destination slide index that might be clone's.
		 * @param {number}    newIndex  - New index.
		 * @param {number}    prevIndex - Previous index.
		 * @param {Object}    coord     - Destination coordinates.
		 * @param {function}  done      - Callback function must be invoked when transition is completed.
		 */
		start( destIndex, newIndex, prevIndex, coord, done ) {
			const track = Components.Elements.track;

			applyStyle( track, { height: unit( track.clientHeight ) } );

			apply( newIndex );

			setTimeout( () => {
				done();
				applyStyle( track, { height: '' } );
			} );
		},
	};

	/**
	 * Apply transition style to the slide specified by the given index.
	 *
	 * @param {number} index - A slide index.
	 */
	function apply( index ) {
		const options = Splide.options;

		applyStyle( Components.Elements.slides[ index ], {
			transition: `opacity ${ options.speed }ms ${ options.easing }`,
		} );
	}

	return Fade;
}