/**
 * The component for change an img element to background image of its wrapper.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, child } from '../../utils/dom';


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
			Splide.on( 'lazyload:loaded', img => { cover( img, false ) } );
			Splide.on( 'mounted updated refresh', () => apply( false ) );
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
	 *
	 * @param {boolean} uncover - If true, "cover" will be clear.
	 */
	function apply( uncover ) {
		Components.Elements.each( Slide => {
			const img = child( Slide.slide, 'IMG' ) || child( Slide.container, 'IMG' );

			if ( img && img.src ) {
				cover( img, uncover );
			}
		} );
	}

	/**
	 * Set background image of the parent element, using source of the given image element.
	 *
	 * @param {Element} img     - An image element.
	 * @param {boolean} uncover - Reset "cover".
	 */
	function cover( img, uncover ) {
		applyStyle( img.parentElement, { background: uncover ? '' : `center/cover no-repeat url("${ img.src }")` } );
		applyStyle( img, { display: uncover ? '' : 'none' } );
	}

	return Cover;
}