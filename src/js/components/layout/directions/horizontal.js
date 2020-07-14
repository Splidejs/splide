/**
 * The resolver component for horizontal layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, getRect } from "../../../utils/dom";
import { unit, toPixel } from "../../../utils/utils";
import { RTL } from '../../../constants/directions';


/**
 * The resolver component for horizontal layout.
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
	let options = Splide.options;

	return {
		/**
		 * Margin property name.
		 *
		 * @type {string}
		 */
		margin: 'margin' + ( options.direction === RTL ? 'Left' : 'Right' ),

		/**
		 * Always 0 because the height will be determined by inner contents.
		 *
		 * @type {number}
		 */
		height: 0,

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
			const left    = toPixel( root, padding.left || padding );
			const right   = toPixel( root, padding.right || padding );

			this.padding = { left, right };
			applyStyle( track, { paddingLeft : unit( left ), paddingRight: unit( right ) } );
		},

		/**
		 * Return total width from the left of the list to the right of the slide specified by the provided index.
		 *
		 * @param {number} index - Optional. A slide index. If undefined, total width of the slider will be returned.
		 *
		 * @return {number} - Total width to the right side of the specified slide, or 0 for an invalid index.
		 */
		totalWidth( index = Splide.length - 1 ) {
			const Slide = Elements.getSlide( index );

			let width = 0;

			if ( Slide ) {
				const slideRect = getRect( Slide.slide );
				const listRect  = getRect( Elements.list );

				if ( options.direction === RTL ) {
					width = listRect.right - slideRect.left;
				} else {
					width = slideRect.right - listRect.left;
				}

				width += this.gap;
			}

			return width;
		},

		/**
		 * Return the slide width in px.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {number} - The slide width.
		 */
		slideWidth( index ) {
			if ( options.autoWidth ) {
				const Slide = Elements.getSlide( index );
				return Slide ? Slide.slide.offsetWidth : 0;
			}

			const width = options.fixedWidth || ( ( this.width + this.gap ) / options.perPage ) - this.gap;
			return toPixel( root, width );
		},

		/**
		 * Return the slide height in px.
		 *
		 * @return {number} - The slide height.
		 */
		slideHeight() {
			const height = options.height || options.fixedHeight || this.width * options.heightRatio;
			return toPixel( root, height );
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slider width.
		 */
		get width() {
			return track.clientWidth - this.padding.left - this.padding.right;
		},
	}
}