/**
 * The resolver component for horizontal move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { between } from '../../../utils/utils';
import { RTL } from "../../../constants/directions";


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
			Layout = Components.Layout;
		},

		/**
		 * Calculate the track position by a slide index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			const slidePosition = Layout.totalWidth( index ) - Layout.slideWidth( index ) - Layout.gap;
			return this.sign * ( slidePosition + this.offset( index ) );
		},

		/**
		 * Trim redundant spaces on the left or right edge if necessary.
		 *
		 * @param {number} position - Position value to be trimmed.
		 *
		 * @return {number} - Trimmed position.
		 */
		trim( position ) {
			const edge = this.sign * ( Layout.totalWidth() - ( Layout.width + Layout.gap ) );
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