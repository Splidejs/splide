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
 * Max width of a slide.
 *
 * @type {number}
 */
const SLIDE_MAX_WIDTH = 5000;


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
		 * Always 0 because the height will be determined by inner contents.
		 *
		 * @type {number}
		 */
		listHeight: 0,

		/**
		 * Initialization.
		 */
		init() {
			options = Splide.options;
			track   = Elements.track;

			this.gap = toPixel( root, options.gap );

			const padding = options.padding;
			const { left = padding, right = padding } = padding;

			this.padding = {
				left : toPixel( root, left ),
				right: toPixel( root, right ),
			};

			applyStyle( track, {
				paddingLeft : unit( left ),
				paddingRight: unit( right ),
			} );
		},

		/**
		 * Accumulate slide width including the gap to the designated index.
		 *
		 * @param {number|undefined} index - If undefined, width of all slides will be accumulated.
		 *
		 * @return {number} - Accumulated width.
		 */
		totalWidth( index ) {
			return Elements.getSlides( true )
				.filter( Slide => Slide.index <= index )
				.reduce( ( accumulator, Slide ) => {
					return accumulator + this.slideWidth( Slide.index ) + this.gap;
				}, 0 );
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

		/**
		 * Return list width.
		 *
		 * @return {number} - Current list width.
		 */
		get listWidth() {
			const total = Elements.total;
			return options.autoWidth ? total * SLIDE_MAX_WIDTH : this.totalWidth( total );
		},
	}
}