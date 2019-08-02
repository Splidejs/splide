/**
 * The component for change an img element to background image of its wrapper.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { find, applyStyle } from '../../utils/dom';


/**
 * The component for change an img element to background image of its wrapper.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold options.
	 *
	 * @type {Object}
	 */
	const options = Splide.options;

	/**
	 * Cover component object.
	 *
	 * @type {Object}
	 */
	const Cover = {
		/**
		 * To set an image as cover, the height option is required.
		 *
		 * @type {boolean}
		 */
		required: options.cover	&& ( options.height || options.heightRatio || options.fixedHeight ),

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Components.Slides.getSlides( true, false ).forEach( slide => {
				const img = find( slide, 'img' );

				if ( img && img.src ) {
					cover( img );
				}
			} );

			Splide.on( 'lazyload:loaded', img => { cover( img ) } );
		},
	};

	/**
	 * Set background image of the parent element, using source of the given image element.
	 *
	 * @param {Element} img - An image element.
	 */
	function cover( img ) {
		const parent = img.parentElement;

		if ( parent ) {
			applyStyle( parent, { background: `center/cover no-repeat url("${ img.src }")` } );
			applyStyle( img, { display: 'none' } );
		}
	}

	return Cover;
}