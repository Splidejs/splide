/**
 * The resolver component for vertical move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { between } from '../../../utils/utils';


/**
 * The resolver component for vertical move.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The resolver object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold the Layout object.
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
		axis: 'Y',

		/**
		 * Sign for the direction.
		 *
		 * @return {number}
		 */
		sign: -1,

		/**
		 * Initialization.
		 */
		init() {
			Layout = Components.Layout;
		},

		/**
		 * Calculate position by index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			return - ( ( index + Components.Clones.length / 2 ) * ( Layout.slideHeight() + Layout.gap ) + this.offset() );
		},

		/**
		 * Calculate the closest slide index from the given position.
		 *
		 * @return {number} - The closest slide index.
		 */
		toIndex( position ) {
			const slideHeight = Layout.slideHeight();
			const cloneOffset = ( slideHeight + Layout.gap ) * Components.Clones.length / 2;
			return Math.round( - ( position + cloneOffset + this.offset() ) / ( slideHeight + Layout.gap ) );
		},

		/**
		 * Trim redundant spaces on the left or right edge if necessary.
		 *
		 * @param {number} position - Position value to be trimmed.
		 *
		 * @return {number} - Trimmed position.
		 */
		trim( position ) {
			const edge = -( Layout.listHeight - ( Layout.height + Layout.gap ) );
			return between( position, edge, 0 );
		},

		/**
		 * Return current offset value, considering direction.
		 *
		 * @return {number} - Offset amount.
		 */
		offset() {
			const { focus }   = Splide.options;
			const slideHeight = Layout.slideHeight();

			if ( focus === 'center' ) {
				return -( Layout.height - slideHeight ) / 2;
			}

			return -( parseInt( focus ) || 0 ) * ( slideHeight + Layout.gap );
		},
	};
}  