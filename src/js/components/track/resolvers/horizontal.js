/**
 * The resolver component for horizontal move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../../utils/dom';
import { between } from '../../../utils/utils';


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
	 * Hold the Layout object.
	 *
	 * @type {Object}
	 */
	const Layout = Components.Layout;

	return {
		/**
		 * Set position with CSS transform.
		 *
		 * @param {Element} list     - A list element.
		 * @param {number}  position - A new position value.
		 */
		translate( list, position ) {
			applyStyle( list, { transform: `translateX(${ position }px)` } );
		},

		/**
		 * Calculate position by index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			return this.sign * ( index * ( Layout.slideWidth + Layout.gap ) + this.offset )
		},

		/**
		 * Calculate the closest slide index from the given position.
		 *
		 * @return {number} - The closest slide position.
		 */
		toIndex( position ) {
			return Math.round( ( this.sign * position - this.offset ) / ( Layout.slideWidth + Layout.gap ) );
		},

		/**
		 * Trim redundant spaces on the left or right edge if necessary.
		 *
		 * @param {number} position - Position value to be trimmed.
		 *
		 * @return {number} - Trimmed position.
		 */
		trim( position ) {
			const edge = this.sign * ( Layout.listWidth - ( Layout.width + Layout.gap ) );
			return between( position, edge, 0 );
		},

		/**
		 * Return sign according to the direction.
		 *
		 * @return {number} - -1 for LTR or 1 or RTL.
		 */
		get sign() {
			return Components.Controller.isRtl() ? 1 : -1;
		},

		/**
		 * Return current offset value, considering direction and a number of clones.
		 *
		 * @return {number} - Offset amount.
		 */
		get offset() {
			const { width, slideWidth, gap } = Layout;
			const { focus } = Splide.options;

			let focusOffset;

			if ( focus === 'center' ) {
				focusOffset = ( width - slideWidth ) / 2;
			} else {
				focusOffset = ( parseInt( focus ) || 0 ) * ( slideWidth + gap );
			}

			return ( slideWidth + gap ) * Components.Clones.length / 2 - focusOffset;
		},
	};
}