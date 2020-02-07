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
 *
 * @return {Object} - The resolver object.
 */
export default ( Splide, Components ) => {
	/**
	 * Keep the Elements component.
	 *
	 * @type {string}
	 */
	const Elements = Components.Elements;

	/**
	 * Keep the root element.
	 *
	 * @type {Element}
	 */
	const root = Splide.root;

	/**
	 * Keep the track element.
	 *
	 * @type {Element}
	 */
	let track;

	/**
	 * Keep the latest options.
	 *
	 * @type {Element}
	 */
	let options;

	return {
		/**
		 * Margin property name.
		 *
		 * @type {string}
		 */
		margin: 'marginBottom',

		/**
		 * Init slider styles according to options.
		 */
		init() {
			options = Splide.options;
			track   = Elements.track;

			this.gap = toPixel( root, options.gap );

			const padding = options.padding;
			const { top = padding, bottom = padding } = padding;

			this.padding = {
				top   : toPixel( root, top ),
				bottom: toPixel( root, bottom ),
			};

			applyStyle( track, {
				paddingTop   : unit( top ),
				paddingBottom: unit( bottom ),
			} );
		},

		/**
		 * Return the slide width in px.
		 *
		 * @return {number} - The slide width.
		 */
		slideWidth() {
			return toPixel( root, options.fixedWidth || this.width );
		},

		/**
		 * Return the slide height in px.
		 *
		 * @return {number} - The slide height.
		 */
		slideHeight() {
			const height = options.fixedHeight || ( this.height + this.gap ) / options.perPage - this.gap;
			return toPixel( root, height );
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
			exist( height, '"height" or "heightRatio" is missing.' );
			return toPixel( root, height ) - this.padding.top - this.padding.bottom;
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
			return ( this.slideHeight() + this.gap ) * Elements.total;
		},
	}
}