/**
 * The resolver component for vertical layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from "../../../utils/dom";
import { toPixel, unit } from "../../../utils/utils";
import { exist } from "../../../utils/error";


/**
 * The resolver component for vertical layout.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {Object} options    - Current options.
 *
 * @return {Object} - The resolver object.
 */
export default ( Splide, Components, options ) => {
	/**
	 * Keep the Elements component.
	 *
	 * @type {string}
	 */
	const Elements = Components.Elements;

	/**
	 * Keep the track element.
	 *
	 * @type {Element}
	 */
	const track = Elements.track;

	return {
		/**
		 * Margin property name.
		 *
		 * @type {string}
		 */
		marginProp: 'marginBottom',

		/**
		 * Init slider styles according to options.
		 */
		init() {
			const { top = 0, bottom = 0 } = options.padding;
			applyStyle( track, { paddingTop: unit( top ), paddingBottom: unit( bottom ) } );
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slider width.
		 */
		get width() {
			return track.clientWidth;
		},

		/**
		 * Return slide height without padding.
		 *
		 * @return {number} - Slider height.
		 */
		get height() {
			const height = options.height || this.width * options.heightRatio;
			exist( height, '"height" or "heightRatio" must be given in TTB mode.' );
			return toPixel( Splide.root, height );
		},

		/**
		 * Return list width.
		 *
		 * @return {number} - Current list width.
		 */
		get listWidth() {
			return this.width;
		},

		/**
		 * Return list height.
		 *
		 * @return {number} - Current list height.
		 */
		get listHeight() {
			return ( this.slideHeight + this.gap ) * Components.Slides.total;
		},

		/**
		 * Return the slide width in px.
		 *
		 * @return {number} - The slide width.
		 */
		get slideWidth() {
			return toPixel( Splide.root, options.fixedWidth || this.width );
		},

		/**
		 * Return the slide height in px.
		 *
		 * @return {number} - The slide height.
		 */
		get slideHeight() {
			let height = options.fixedHeight;

			if ( ! height ) {
				height = ( this.height + this.gap ) / options.perPage - this.gap;
			}

			return toPixel( Splide.root, height );
		},

		/**
		 * Return gap in px.
		 *
		 * @return {Object} - Gap amount in px.
		 */
		get gap() {
			const style = getComputedStyle( Elements.slides[ 0 ] );
			return parseFloat( style[ this.marginProp ] ) || 0;
		},

		/**
		 * Return padding object.
		 *
		 * @return {Object} - An object containing padding top and bottom.
		 */
		get padding() {
			const style = getComputedStyle( track );

			return {
				top   : parseFloat( style.paddingTop ) || 0,
				bottom: parseFloat( style.paddingBottom ) || 0,
			};
		},
	}
}