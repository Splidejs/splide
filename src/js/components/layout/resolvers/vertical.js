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
	const track = Elements.track;

	return {
		/**
		 * Margin property name.
		 *
		 * @type {string}
		 */
		marginProp: 'marginBottom',

		/**
		 * Gap in px.
		 *
		 * @type {number}
		 */
		gap: toPixel( root, options.gap ),

		/**
		 * An object containing padding left and right in px.
		 *
		 * @type {Object}
		 */
		padding: ( () => {
			const padding = options.padding;
			const { top = padding, bottom = padding } = padding;

			return {
				top   : toPixel( root, top ),
				bottom: toPixel( root, bottom ),
			};
		} )(),

		/**
		 * Init slider styles according to options.
		 */
		init() {
			applyStyle( track, {
				paddingTop   : unit( this.padding.top ),
				paddingBottom: unit( this.padding.bottom ),
			} );
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
			return toPixel( Splide.root, height ) - this.padding.top - this.padding.bottom;
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
			const height = options.fixedHeight || ( this.height + this.gap ) / options.perPage - this.gap;
			return toPixel( Splide.root, height );
		},

		/**
		 * Return the number of slides in the current view.
		 *
		 * @return {number} - The number of slides in view.
		 */
		get numInView() {
			if ( options.fixedHeight ) {
				return Math.floor( ( this.height + this.gap ) / ( this.slideHeight + this.gap ) ) || 1;
			}

			return options.perPage;
		},
	}
}