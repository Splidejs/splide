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
			const { left = padding, right = padding } = padding;

			return {
				left : toPixel( root, left ),
				right: toPixel( root, right ),
			};
		} )(),

		/**
		 * Initialization.
		 */
		init() {
			applyStyle( track, {
				paddingLeft : unit( this.padding.left ),
				paddingRight: unit( this.padding.right ),
			} );
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
			const width = options.fixedWidth || ( ( this.width + this.gap ) / options.perPage ) - this.gap;
			return toPixel( root, width );
		},

		/**
		 * Return the slide height in px.
		 *
		 * @return {number} - The slide height.
		 */
		get slideHeight() {
			const height = options.height || options.fixedHeight || this.width * options.heightRatio;
			return toPixel( root, height );
		},

		/**
		 * Return the number of slides in the current view.
		 *
		 * @return {number} - The number of slides in view.
		 */
		get numInView() {
			if ( options.fixedWidth ) {
				return Math.floor( ( this.width + this.gap ) / ( this.slideWidth + this.gap ) ) || 1;
			}

			return options.perPage;
		},
	}
}