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
		 * Required only when "cover" option is true.
		 *
		 * @type {boolean}
		 */
		required: options.cover,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			apply( false );
			Splide.on( 'lazyload:loaded', img => { cover( img ) } );
			Splide.on( 'updated', () => apply( false ) );
		},

		/**
		 * Destroy.
		 */
		destroy() {
			apply( true );
		},
	};

	/**
	 * Apply "cover" to all slides.
	 */
	function apply( uncover ) {
		Components.Slides.getSlides( true, false ).forEach( slide => {
			const img = find( slide, 'img' );

			if ( img && img.src ) {
				cover( img, uncover );
			}
		} );
	}

	/**
	 * Set background image of the parent element, using source of the given image element.
	 *
	 * @param {Element} img     - An image element.
	 * @param {boolean} uncover - Optional. Reset "cover".
	 */
	function cover( img, uncover = false ) {
		applyStyle( img.parentElement, { background: uncover ? '' : `center/cover no-repeat url("${ img.src }")` } );
		applyStyle( img, { display: uncover ? '' : 'none' } );
	}

	return Cover;
}