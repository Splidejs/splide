/**
 * The component for controlling the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { LOOP } from "../../constants/types";
import { RTL } from '../../constants/directions';
import { between } from '../../utils/utils';

const { floor } = Math;


/**
 * The component for controlling the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store current options.
	 *
	 * @type {Object}
	 */
	let options;

	/**
	 * True if the slide is LOOP mode.
	 *
	 * @type {boolean}
	 */
	let isLoop;

	/**
	 * Controller component object.
	 *
	 * @type {Object}
	 */
	const Controller = {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			options = Splide.options;
			isLoop  = Splide.is( LOOP );
			bind();
		},

		/**
		 * Make track run by the given control.
		 * - "+{i}" : Increment the slide index by i.
		 * - "-{i}" : Decrement the slide index by i.
		 * - "{i}"  : Go to the slide whose index is i.
		 * - ">"    : Go to next page.
		 * - "<"    : Go to prev page.
		 * - ">{i}" : Go to page i.
		 *
		 * @param {string|number} control  - A control pattern.
		 * @param {boolean}       silently - Go to the destination without event emission.
		 */
		go( control, silently ) {
			const destIndex = this.trim( this.parse( control ) );
			Components.Track.go( destIndex, this.rewind( destIndex ), silently );
		},

		/**
		 * Parse the given control and return the destination index for the track.
		 *
		 * @param {string} control - A control target pattern.
		 *
		 * @return {number} - A parsed target.
		 */
		parse( control ) {
			let index = Splide.index;

			const matches   = String( control ).match( /([+\-<>]+)(\d+)?/ );
			const indicator = matches ? matches[1] : '';
			const number    = matches ? parseInt( matches[2] ) : 0;

			switch ( indicator ) {
				case '+':
					index += number || 1;
					break;

				case '-':
					index -= number || 1;
					break;

				case '>':
				case '<':
					index = parsePage( number, index, indicator === '<' );
					break;

				default:
					index = parseInt( control );
			}

			return index;
		},

		/**
		 * Compute index from the given page number.
		 *
		 * @param {number} page - Page number.
		 *
		 * @return {number} - A computed page number.
		 */
		toIndex( page ) {
			if ( hasFocus() ) {
				return page;
			}

			const length  = Splide.length;
			const perPage = options.perPage;

			let index = page * perPage;
			index = index - ( this.pageLength * perPage - length ) * floor( index / length );

			// Adjustment for the last page.
			if ( length - perPage <= index && index < length ) {
				index = length - perPage;
			}

			return index;
		},

		/**
		 * Compute page number from the given slide index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {number} - A computed page number.
		 */
		toPage( index ) {
			if ( hasFocus() ) {
				return index;
			}

			const length  = Splide.length;
			const perPage = options.perPage;

			// Make the last "perPage" number of slides belong to the last page.
			if ( length - perPage <= index && index < length ) {
				return floor( ( length - 1 ) / perPage );
			}

			return floor( index / perPage );
		},

		/**
		 * Trim the given index according to the current mode.
		 * Index being returned could be less than 0 or greater than the length in Loop mode.
		 *
		 * @param {number} index - An index being trimmed.
		 *
		 * @return {number} - A trimmed index.
		 */
		trim( index ) {
			if ( ! isLoop ) {
				index = options.rewind ? this.rewind( index ) : between( index, 0, this.edgeIndex );
			}

			return index;
		},

		/**
		 * Rewind the given index if it's out of range.
		 *
		 * @param {number} index - An index.
		 *
		 * @return {number} - A rewound index.
		 */
		rewind( index ) {
			const edge = this.edgeIndex;

			if ( isLoop ) {
				while( index > edge ) {
					index -= edge + 1;
				}

				while( index < 0 ) {
					index += edge + 1;
				}
			} else {
				if ( index > edge ) {
					index = 0;
				} else if ( index < 0 ) {
					index = edge;
				}
			}

			return index;
		},

		/**
		 * Check if the direction is "rtl" or not.
		 *
		 * @return {boolean} - True if "rtl" or false if not.
		 */
		isRtl() {
			return options.direction === RTL;
		},

		/**
		 * Return the page length.
		 *
		 * @return {number} - Max page number.
		 */
		get pageLength() {
			const length = Splide.length;
			return hasFocus() ? length : Math.ceil( length / options.perPage );
		},

		/**
		 * Return the edge index.
		 *
		 * @return {number} - Edge index.
		 */
		get edgeIndex() {
			const length = Splide.length;

			if ( ! length ) {
				return 0;
			}

			if ( hasFocus() || options.isNavigation || isLoop ) {
				return length - 1;
			}

			return length - options.perPage;
		},

		/**
		 * Return the index of the previous slide.
		 *
		 * @return {number} - The index of the previous slide if available. -1 otherwise.
		 */
		get prevIndex() {
			let prev = Splide.index - 1;

			if ( isLoop || options.rewind ) {
				prev = this.rewind( prev );
			}

			return prev > -1 ? prev : -1;
		},

		/**
		 * Return the index of the next slide.
		 *
		 * @return {number} - The index of the next slide if available. -1 otherwise.
		 */
		get nextIndex() {
			let next = Splide.index + 1;

			if ( isLoop || options.rewind ) {
				next = this.rewind( next );
			}

			return ( Splide.index < next && next <= this.edgeIndex ) || next === 0 ? next : -1;
		},
	};

	/**
	 * Listen to some events.
	 */
	function bind() {
		Splide
			.on( 'move', newIndex => { Splide.index = newIndex } )
			.on( 'updated refresh', newOptions => {
				options = newOptions || options;
				Splide.index = between( Splide.index, 0, Controller.edgeIndex );
			} );
	}

	/**
	 * Verify if the focus option is available or not.
	 *
	 * @return {boolean} - True if a slider has the focus option.
	 */
	function hasFocus() {
		return options.focus !== false;
	}

	/**
	 * Return the next or previous page index computed by the page number and current index.
	 *
	 * @param {number}  number - Specify the page number.
	 * @param {number}  index  - Current index.
	 * @param {boolean} prev   - Prev or next.
	 *
	 * @return {number} - Slide index.
	 */
	function parsePage( number, index, prev ) {
		if ( number > -1 ) {
			return Controller.toIndex( number );
		}

		const perMove = options.perMove;
		const sign    = prev ? -1 : 1;

		if ( perMove ) {
			return index + perMove * sign;
		}

		return Controller.toIndex( Controller.toPage( index ) + sign );
	}

	return Controller;
}