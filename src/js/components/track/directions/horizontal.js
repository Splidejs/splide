/**
 * The resolver component for horizontal move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { between } from '../../../utils/utils';
import { RTL } from "../../../constants/directions";
import { SLIDE } from "../../../constants/types";


/**
 * The resolver component for horizontal move.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The resolver object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold the Layout component.
	 *
	 * @type {Object}
	 */
	let Layout;

	/**
	 * Hold the Elements component.
	 *
	 * @type {Object}
	 */
	let Elements;

	return {
		/**
		 * Axis of translate.
		 *
		 * @type {string}
		 */
		axis: 'X',

		/**
		 * Sign for the direction.
		 *
		 * @type {number}
		 */
		sign: Splide.options.direction === RTL ? 1 : -1,

		/**
		 * Initialization.
		 */
		init() {
			Layout   = Components.Layout;
			Elements = Components.Elements;
		},

		/**
		 * Calculate position by index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			return this.sign * ( Layout.totalWidth( index - 1 ) + this.offset( index ) );
		},

		/**
		 * Calculate the closest slide index from the given position.
		 *
		 * @return {number} - The closest slide position.
		 */
		toIndex( position ) {
			position *= this.sign;

			if ( Splide.is( SLIDE ) ) {
				position = between( position, Layout.totalWidth( Elements.total ), 0 );
			}

			const Slides = Elements.getSlides( true );

			for ( const i in Slides ) {
				const Slide = Slides[ i ];

				const slideIndex    = Slide.index;
				const slidePosition = this.sign * this.toPosition( slideIndex );

				if ( slidePosition < position && position <= slidePosition + Layout.slideWidth( slideIndex ) + Layout.gap ) {
					return slideIndex;
				}
			}

			return 0;
		},

		/**
		 * Trim redundant spaces on the left or right edge if necessary.
		 *
		 * @param {number} position - Position value to be trimmed.
		 *
		 * @return {number} - Trimmed position.
		 */
		trim( position ) {
			const edge = this.sign * ( Layout.totalWidth( Elements.total ) - ( Layout.width + Layout.gap ) );
			return between( position, edge, 0 );
		},

		/**
		 * Return current offset value, considering direction.
		 *
		 * @return {number} - Offset amount.
		 */
		offset( index ) {
			const { focus }  = Splide.options;
			const slideWidth = Layout.slideWidth( index );

			if ( focus === 'center' ) {
				return - ( Layout.width - slideWidth ) / 2;
			}

			return - ( parseInt( focus ) || 0 ) * ( slideWidth + Layout.gap );
		},
	};
}