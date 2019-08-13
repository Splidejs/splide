/**
 * The resolver component for horizontal layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from "../../../utils/dom";
import { unit, toPixel } from "../../../utils/utils";
import { RTL } from '../../../constants/directions';


/**
 * The resolver component for horizontal layout.
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
		marginProp: options.direction === RTL ? 'marginLeft' : 'marginRight',

		/**
		 * Always 0 because the height will be determined by inner contents.
		 *
		 * @type {number}
		 */
		height: 0,

		/**
		 * Always 0 because the height will be determined by inner contents.
		 *
		 * @type {number}
		 */
		listHeight: 0,

		/**
		 * Initialization.
		 */
		init() {
			const { left = 0, right = 0 } = options.padding;
			applyStyle( track, { paddingLeft : unit( left ), paddingRight: unit( right ) } );
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slider width.
		 */
		get width() {
			return track.clientWidth - this.padding.left - this.padding.right;
		},

		/**
		 * Return slide height without padding.
		 *
		 * @return {number} - Slider height.
		 */
		// get height() {
		// 	const height = options.height || options.fixedHeight || this.width * options.heightRatio;
		// 	return toPixel( Splide.root, height );
		// },

		/**
		 * Return list width.
		 *
		 * @return {number} - Current list width.
		 */
		get listWidth() {
			return ( this.slideWidth + this.gap ) * Components.Slides.total;
		},

		/**
		 * Return the slide width in px.
		 *
		 * @return {number} - The slide width.
		 */
		get slideWidth() {
			let width = options.fixedWidth;

			if ( ! width ) {
				width = ( ( this.width + this.gap ) / options.perPage ) - this.gap;
			}

			return toPixel( Splide.root, width );
		},

		/**
		 * Return the slide height in px.
		 *
		 * @return {number} - The slide height.
		 */
		get slideHeight() {
			const height = options.height || options.fixedHeight || this.width * options.heightRatio;
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
		 * @return {Object} - An object containing padding left and right.
		 */
		get padding() {
			const style = getComputedStyle( track );

			return {
				left  : parseFloat( style.paddingLeft ) || 0,
				right : parseFloat( style.paddingRight ) || 0,
			};
		},
	}
}