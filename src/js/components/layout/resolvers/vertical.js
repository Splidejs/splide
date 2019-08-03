/**
 * The resolver component for vertical layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */
import { applyStyle } from "../../../utils/dom";
import { unit } from "../../../utils/utils";
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

	/**
	 * Keep the temporary listHeight.
	 *
	 * @type {number}
	 */
	let listHeight;

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

			applyStyle( track, { paddingTop: unit( top ), paddingBottom: unit( bottom ) } );

			const firstSlide = Elements.slides[ 0 ];
			const position   = firstSlide.style.position;
			const { fixedWidth: fixedW, fixedHeight: fixedH, height } = options;

			applyStyle( firstSlide, { position: 'absolute' } );

			if ( fixedW ) {
				applyStyle( firstSlide, { width: unit( fixedW ) } );
				fixedWidth = parseFloat( getComputedStyle( firstSlide ).width );
			}

			if ( fixedH ) {
				applyStyle( firstSlide, { height: unit( fixedH ) } );
				fixedHeight = parseFloat( getComputedStyle( firstSlide ).height );
			}

			applyStyle( firstSlide, { position } );

			if ( height ) {
				const list = Elements.list;
				applyStyle( list, { height: unit( height ) } );
				listHeight = parseFloat( getComputedStyle( list ).height );
			}
		},

		/**
		 * Return the slide width with/without a gap space.
		 *
		 * @return {number} - Slide width in px.
		 */
		getSlideWidth() {
			return fixedWidth || this.width;
		},

		/**
		 * Return the slide height with/without a gap space.
		 *
		 * @param {boolean} includeGap - Whether to include a gap space or not.
		 *
		 * @return {number} - Slide height in px.
		 */
		getSlideHeight( includeGap ) {
			const height = fixedHeight || ( this.listHeight + this.gap ) / options.perPage;
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
			const height = listHeight || this.width * options.heightRatio;
			exist( height, '"height" or "heightRatio" must be given in TTB mode.' );
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