/**
 * The resolver component for vertical move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle } from '../../../utils/dom';
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
	const Layout = Components.Layout;

	return {
		/**
		 * Set position with CSS transform.
		 *
		 * @param {Element} list    - A list element.
		 * @param {number} position - A new position value.
		 */
		translate( list, position ) {
			applyStyle( list, { transform: `translateY(${ position }px)` } );
		},

		/**
		 * Calculate position by index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			return - ( index * ( Layout.slideHeight + Layout.gap ) + this.offset )
		},

		/**
		 * Calculate the closest slide index from the given position.
		 *
		 * @return {number} - The closest slide index.
		 */
		toIndex( position ) {
			return Math.round( - ( position + this.offset ) / ( Layout.slideHeight + Layout.gap ) );
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
		 * Return current offset value, considering direction and a number of clones.
		 *
		 * @return {number} - Offset amount.
		 */
		get offset() {
			const { height, slideHeight, gap } = Layout;
			const { focus } = Splide.options;

			let focusOffset;

			if ( focus === 'center' ) {
				focusOffset = ( height - slideHeight ) / 2;
			} else {
				focusOffset = ( parseInt( focus ) || 0 ) * ( slideHeight + gap );
			}

			return ( slideHeight + gap ) * Components.Clones.length / 2 - focusOffset;
		},
	};
}  