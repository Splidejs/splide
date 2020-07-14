/**
 * The resolver component for vertical layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, getRect } from "../../../utils/dom";
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
		 * Initialization.
		 */
		init() {
			this.resize();
		},

		/**
		 * Resize gap and padding.
		 * This must be called on init.
		 */
		resize() {
			options = Splide.options;
			track   = Elements.track;

			this.gap = toPixel( root, options.gap );

			const padding = options.padding;
			const top     = toPixel( root, padding.top || padding );
			const bottom  = toPixel( root, padding.bottom || padding );

			this.padding = { top, bottom };
			applyStyle( track, { paddingTop : unit( top ), paddingBottom: unit( bottom ) } );
		},

		/**
		 * Return total height from the top of the list to the bottom of the slide specified by the provided index.
		 *
		 * @param {number} index - Optional. A slide index. If undefined, total height of the slider will be returned.
		 *
		 * @return {number} - Total height to the bottom of the specified slide, or 0 for an invalid index.
		 */
		totalHeight( index = Splide.length - 1 ) {
			const Slide = Elements.getSlide( index );

			if ( Slide ) {
				return getRect( Slide.slide ).bottom - getRect( Elements.list ).top + this.gap;
			}

			return 0;
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
		 * @param {number} index - Slide index.
		 *
		 * @return {number} - The slide height.
		 */
		slideHeight( index ) {
			if ( options.autoHeight ) {
				const Slide = Elements.getSlide( index );
				return Slide ? Slide.slide.offsetHeight : 0;
			}

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
	}
}