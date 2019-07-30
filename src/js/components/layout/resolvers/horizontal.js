/**
 * The resolver component for horizontal layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from "../../../utils/dom";
import { unit } from "../../../utils/utils";
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
		listHeight: 0,

		/**
		 * Initialization.
		 */
		init() {
			const { left = 0, right = 0 } = options.padding;

			applyStyle( track, {
				paddingLeft : unit( left ),
				paddingRight: unit( right ),
			} );
		},

		/**
		 * Return the slide width with/without a gap space.
		 *
		 * @param {boolean} includeGap - Whether to include a gap space or not.
		 *
		 * @return {number} - Slide width in px.
		 */
		getSlideWidth( includeGap ) {
			const fixedWidth = options.fixedWidth;

			if ( fixedWidth ) {
				return includeGap ? fixedWidth + this.gap : fixedWidth;
			}

			const width = ( this.width + this.gap ) / options.perPage;
			return includeGap ? width : width - this.gap;
		},

		/**
		 * Return the slide height.
		 *
		 * @return {number} - Slide height in px.
		 */
		getSlideHeight() {
			const heightRatio = options.heightRatio;
			return heightRatio > 0 ? this.width * heightRatio : options.fixedHeight;
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slide width.
		 */
		get width() {
			return track.clientWidth - this.padding.left - this.padding.right;
		},

		/**
		 * Return list width.
		 *
		 * @return {number} - Current list width.
		 */
		get listWidth() {
			return this.getSlideWidth( true ) * Components.Slides.total;
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