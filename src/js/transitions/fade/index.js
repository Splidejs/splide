/**
 * The component for fade transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../utils/dom';


/**
 * The component for fade transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	Components.Options.fix( { perPage: 1, gap: 0, padding: 0 } );

	if ( Components.Drag ) {
		Components.Drag.required = false;
	}

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
		 * @param {Object}    coord     - Destination coordinates.
		 * @param {function}  onEnd     - Callback function must be invoked when transition is completed.
		 */
		start( destIndex, newIndex, coord, onEnd ) {
			apply( newIndex );
			onEnd();
		},
	};

	/**
	 * Apply transition style to the slide specified by the given index.
	 *
	 * @param {number} index - A slide index.
	 */
	function apply( index ) {
		const Slide   = Components.Slides.getSlide( index );
		const options = Splide.options;

		if ( Slide ) {
			applyStyle( Slide.slide, {
				transition: `opacity ${ options.speed }ms ${ options.easing }`,
			} );
		}
	}

	return Fade;
}