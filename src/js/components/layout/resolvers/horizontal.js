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

	/**
	 * Keep the fixed width if available.
	 *
	 * @type {number}
	 */
	let fixedWidth;

	/**
	 * Keep the fixed height if available.
	 *
	 * @type {number}
	 */
	let fixedHeight;

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

			applyStyle( track, { paddingLeft : unit( left ), paddingRight: unit( right ) } );

			const firstSlide = Elements.slides[ 0 ];
			const width      = options.fixedWidth;
			const height     = options.height || options.fixedHeight;
			const position   = firstSlide.style.position || 'static';

			applyStyle( firstSlide, { position: 'absolute' } );

			if ( width ) {
				applyStyle( firstSlide, { width: unit( width ) } );
				fixedWidth = parseFloat( getComputedStyle( firstSlide ).width );
			}

			if ( height ) {
				applyStyle( firstSlide, { height: unit( height ) } );
				fixedHeight = parseFloat( getComputedStyle( firstSlide ).height );
			}

			// Restore the position.
			applyStyle( firstSlide, { position } );
		},

		/**
		 * Return the slide width with/without a gap space.
		 *
		 * @param {boolean} includeGap - Whether to include a gap space or not.
		 *
		 * @return {number} - Slide width in px.
		 */
		getSlideWidth( includeGap ) {
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
			return fixedHeight || this.width * options.heightRatio || 0;
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