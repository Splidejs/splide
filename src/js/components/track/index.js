/**
 * The component for moving list in the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Vertical from './resolvers/vertical';
import Horizontal from './resolvers/horizontal';
import { applyStyle } from '../../utils/dom';
import { LOOP, FADE } from '../../constants/types';
import { TTB } from '../../constants/directions';


/**
 * The component for moving list in the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store the list element.
	 *
	 * @type {Element}
	 */
	let list;

	/**
	 * Store the Resolver for direction.
	 *
	 * @type {Object}
	 */
	let Resolver;

	/**
	 * Store the current position.
	 *
	 * @type {number}
	 */
	let currPosition = 0;

	/**
	 * Whether the current direction is vertical or not.
	 *
	 * @type {boolean}
	 */
	const isVertical = Splide.options.direction === TTB;

	/**
	 * Whether the slider type is FADE or not.
	 *
	 * @type {boolean}
	 */
	const isFade = Splide.is( FADE );

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			list     = Components.Elements.list;
			Resolver = isVertical ? Vertical( Splide, Components ) : Horizontal( Splide, Components );
		},

		/**
		 * Called after the component is mounted.
		 * The resize event must be registered after the Layout's one is done.
		 */
		mounted() {
			if ( ! isFade ) {
				Splide.on( 'mounted resize updated', () => { this.jump( Splide.index ) } );
			}
		},

		/**
		 * Go to the given destination index.
		 * After arriving there, the track is jump to the new index without animation, mainly for loop mode.
		 *
		 * @param {number}  destIndex - A destination index.
		 *                              This can be negative or greater than slides length for reaching clones.
		 * @param {number}  newIndex  - An actual new index. They are always same in Slide and Rewind mode.
		 * @param {boolean} silently  - If true, suppress emitting events.
		 */
		go( destIndex, newIndex, silently ) {
			const newPosition = this.trim( this.toPosition( destIndex ) );
			const prevIndex   = Splide.index;

			if ( ! silently ) {
				Splide.emit( 'move', newIndex, prevIndex, destIndex );
			}

			if ( Math.abs( newPosition - currPosition ) >= 1 || isFade ) {
				Components.Transition.start( destIndex, newIndex, this.toCoord( newPosition ), () => {
					this.end( destIndex, newIndex, prevIndex, silently );
				} );
			} else {
				this.end( destIndex, newIndex, prevIndex, silently );
			}
		},

		/**
		 * Called whenever slides arrive at a destination.
		 *
		 * @param {number}  destIndex - A destination index.
		 * @param {number}  newIndex  - A new index.
		 * @param {number}  prevIndex - A previous index.
		 * @param {boolean} silently  - If true, suppress emitting events.
		 */
		end( destIndex, newIndex, prevIndex, silently ) {
			applyStyle( list, { transition: '' } );

			if ( ! isFade ) {
				this.jump( newIndex );
			}

			if ( ! silently ) {
				Splide.emit( 'moved', newIndex, prevIndex, destIndex );
			}
		},

		/**
		 * Move the track to the specified index.
		 *
		 * @param {number} index - A destination index where the track jumps.
		 */
		jump( index ) {
			const position = this.trim( this.toPosition( index ) );
			this.translate( position );
		},

		/**
		 * Set position.
		 *
		 * @param {number} position - A new position value.
		 */
		translate( position ) {
			currPosition = position;
			Resolver.translate( list, position );
		},

		/**
		 * Calculate position by index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			return Resolver.toPosition( index );
		},

		/**
		 * Calculate the closest slide index by the given position.
		 *
		 * @return {number} - The closest slide index.
		 */
		toIndex( position ) {
			return Resolver.toIndex( position );
		},

		/**
		 * Trim redundant spaces on the left or right edge if necessary.
		 *
		 * @param {number} position - Position value to be trimmed.
		 *
		 * @return {number} - Trimmed position.
		 */
		trim( position ) {
			if ( ! Splide.options.trimSpace || Splide.is( LOOP ) ) {
				return position;
			}

			return Resolver.trim( position );
		},

		/**
		 * Return coordinates object by the given position.
		 *
		 * @param {number} position - A position value.
		 *
		 * @return {Object} - A coordinates object.
		 */
		toCoord( position ) {
			return {
				x: isVertical ? 0 : position,
				y: isVertical ? position : 0,
			};
		},

		/**
		 * Return current position.
		 *
		 * @return {number} - Current position.
		 */
		get position() {
			return currPosition;
		},

		/**
		 * Return current offset value including focus offset.
		 *
		 * @return {number} - Offset amount.
		 */
		get offset() {
			return Resolver.offset;
		},
	};
}