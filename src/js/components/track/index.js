/**
 * The component for moving list in the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, getRect } from '../../utils/dom';
import { LOOP, FADE } from '../../constants/types';
import { RTL, TTB } from '../../constants/directions';
import { between } from "../../utils/utils";


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
	 * Hold the Layout component.
	 *
	 * @type {Object}
	 */
	let Layout;

	/**
	 * Hold the Layout component.
	 *
	 * @type {Object}
	 */
	let Elements;

	/**
	 * Store the list element.
	 *
	 * @type {Element}
	 */
	let list;

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

	/**
	 * Track component object.
	 *
	 * @type {Object}
	 */
	const Track = {
		/**
		 * Sign for the direction. Only RTL mode uses the positive sign.
		 *
		 * @type {number}
		 */
		sign: Splide.options.direction === RTL ? 1 : -1,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Elements = Components.Elements;
			Layout   = Components.Layout;
			list     = Elements.list;
		},

		/**
		 * Called after the component is mounted.
		 * The resize event must be registered after the Layout's one is done.
		 */
		mounted() {
			if ( ! isFade ) {
				this.jump( 0 );
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
			const newPosition = getTrimmedPosition( destIndex );
			const prevIndex   = Splide.index;

			if ( ! silently ) {
				Splide.emit( 'move', newIndex, prevIndex, destIndex );
			}

			if ( Math.abs( newPosition - this.position ) >= 1 || isFade ) {
				Components.Transition.start( destIndex, newIndex, prevIndex, this.toCoord( newPosition ), () => {
					onTransitionEnd( destIndex, newIndex, prevIndex, silently );
				} );
			} else {
				if ( destIndex !== prevIndex && Splide.options.trimSpace === 'move' ) {
					Components.Controller.go( destIndex + destIndex - prevIndex, silently );
				} else {
					onTransitionEnd( destIndex, newIndex, prevIndex, silently );
				}
			}
		},

		/**
		 * Move the track to the specified index.
		 *
		 * @param {number} index - A destination index where the track jumps.
		 */
		jump( index ) {
			this.translate( getTrimmedPosition( index ) );
		},

		/**
		 * Set position.
		 *
		 * @param {number} position - A new position value.
		 */
		translate( position ) {
			applyStyle( list, { transform: `translate${ isVertical ? 'Y' : 'X' }(${ position }px)` } );
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

			const edge = this.sign * ( Layout.totalSize() - Layout.size - Layout.gap );
			return between( position, edge, 0 );
		},

		/**
		 * Calculate the closest slide index from the given position.
		 *
		 * @param {number} position - A position converted to an slide index.
		 *
		 * @return {number} - The closest slide index.
		 */
		toIndex( position ) {
			let index = 0;
			let minDistance = Infinity;

			Elements.getSlides( true ).forEach( Slide => {
				const slideIndex = Slide.index;
				const distance   = Math.abs( this.toPosition( slideIndex ) - position );

				if ( distance < minDistance ) {
					minDistance = distance;
					index = slideIndex;
				}
			} );

			return index;
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
		 * Calculate the track position by a slide index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - Calculated position.
		 */
		toPosition( index ) {
			const position = Layout.totalSize( index ) - Layout.slideSize( index ) - Layout.gap;
			return this.sign * ( position + this.offset( index ) );
		},

		/**
		 * Return current offset value, considering direction.
		 *
		 * @return {number} - Offset amount.
		 */
		offset( index ) {
			const { focus } = Splide.options;
			const slideSize = Layout.slideSize( index );

			if ( focus === 'center' ) {
				return -( Layout.size - slideSize ) / 2;
			}

			return -( parseInt( focus ) || 0 ) * ( slideSize + Layout.gap );
		},

		/**
		 * Return the current position.
		 * This returns the correct position even while transitioning by CSS.
		 *
		 * @return {number} - Current position.
		 */
		get position() {
			const prop = isVertical ? 'top' : 'left';
			return getRect( list )[ prop ] - getRect( Elements.track )[ prop ] - Layout.padding[ prop ];
		},
	};

	/**
	 * Called whenever slides arrive at a destination.
	 *
	 * @param {number}  destIndex - A destination index.
	 * @param {number}  newIndex  - A new index.
	 * @param {number}  prevIndex - A previous index.
	 * @param {boolean} silently  - If true, suppress emitting events.
	 */
	function onTransitionEnd( destIndex, newIndex, prevIndex, silently ) {
		applyStyle( list, { transition: '' } );

		if ( ! isFade ) {
			Track.jump( newIndex );
		}

		if ( ! silently ) {
			Splide.emit( 'moved', newIndex, prevIndex, destIndex );
		}
	}

	/**
	 * Convert index to the trimmed position.
	 *
	 * @return {number} - Trimmed position.
	 */
	function getTrimmedPosition( index ) {
		return Track.trim( Track.toPosition( index ) );
	}

	return Track;
}