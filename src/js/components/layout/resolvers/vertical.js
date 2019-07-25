/**
 * The resolver component for vertical layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */
import { applyStyle } from "../../../utils/dom";
import { unit } from "../../../utils/utils";


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

			applyStyle( track, {
				paddingTop   : unit( top ),
				paddingBottom: unit( bottom ),
			} );
		},

		/**
		 * Return the slide width with/without a gap space.
		 *
		 * @return {number} - Slide width in px.
		 */
		getSlideWidth() {
			return this.width;
		},

		/**
		 * Return the slide height with/without a gap space.
		 *
		 * @param {boolean} includeGap - Whether to include a gap space or not.
		 *
		 * @return {number} - Slide height in px.
		 */
		getSlideHeight( includeGap ) {
			const height = ( this.listHeight + this.gap ) / options.perView;
			return includeGap ? height : height - this.gap;
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slide width.
		 */
		get width() {
			return track.clientWidth;
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
			const heightRatio = options.heightRatio;
			let height = options.height;

			if ( heightRatio > 0 ) {
				height = this.width * heightRatio;
			}

			return height - this.padding.top - this.padding.bottom;
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