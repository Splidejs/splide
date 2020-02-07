/**
 * The component for supporting mouse drag and swipe.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { LOOP } from '../../constants/types';
import { TTB } from '../../constants/directions';
import { between } from '../../utils/utils';
import { IDLE } from '../../constants/states';
import { each } from "../../utils/object";

const { abs } = Math;


/**
 * Adjust how much the track can be pulled on the first or last page.
 * The larger number this is, the farther the track moves.
 * This should be around 5 - 9.
 *
 * @type {number}
 */
const FRICTION_REDUCER = 7;

/**
 * To start dragging the track, the drag angle must be less than this threshold.
 *
 * @type {number}
 */
const ANGLE_THRESHOLD = 30;

/**
 * When a drag distance is over this value, the action will be treated as "swipe", not "flick".
 *
 * @type {number}
 */
const SWIPE_THRESHOLD = 150;


/**
 * The component supporting mouse drag and swipe.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store the Move component.
	 *
	 * @type {Object}
	 */
	const Track = Components.Track;

	/**
	 * Store the Controller component.
	 *
	 * @type {Object}
	 */
	const Controller = Components.Controller;

	/**
	 * Coordinate of the track on starting drag.
	 *
	 * @type {Object}
	 */
	let startCoord;

	/**
	 * Analyzed info on starting drag.
	 * 
	 * @type {Object|null}
	 */
	let startInfo;

	/**
	 * Analyzed info being updated while dragging/swiping.
	 *
	 * @type {Object}
	 */
	let currentInfo;

	/**
	 * Determine whether slides are being dragged or not.
	 *
	 * @type {boolean}
	 */
	let isDragging;

	/**
	 * Whether the slider direction is vertical or not.
	 *
	 * @type {boolean}
	 */
	const isVertical = Splide.options.direction === TTB;

	/**
	 * Axis for the direction.
	 *
	 * @type {string}
	 */
	const axis = isVertical ? 'y' : 'x';

	/**
	 * Drag component object.
	 *
	 * @type {Object}
	 */
	const Drag = {
		/**
		 * Mount only when the drag option is true.
		 *
		 * @type {boolean}
		 */
		required: Splide.options.drag,

		/**
		 * Whether dragging is disabled or not.
		 *
		 * @type {boolean}
		 */
		disabled: false,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			const list = Components.Elements.list;

			Splide
				.on( 'touchstart mousedown', start, list )
				.on( 'touchmove mousemove', move, list, { passive: false } )
				.on( 'touchend touchcancel mouseleave mouseup dragend', end, list )
				.on( 'mounted refresh', () => {
					// Prevent dragging an image or anchor itself.
					each( list.querySelectorAll( 'img, a' ), elm => {
						Splide
							.off( 'dragstart', elm )
							.on( 'dragstart', e => { e.preventDefault() }, elm, { passive: false } );
					} );
				} );
		},
	};

	/**
	 * Called when the track starts to be dragged.
	 *
	 * @param {TouchEvent|MouseEvent} e - TouchEvent or MouseEvent object.
	 */
	function start( e ) {
		if ( ! Drag.disabled && ! isDragging && Splide.State.is( IDLE ) ) {
			startCoord  = Track.toCoord( Track.position );
			startInfo   = analyze( e, {} );
			currentInfo = startInfo;
		}
	}

	/**
	 * Called while the track being dragged.
	 *
	 * @param {TouchEvent|MouseEvent} e - TouchEvent or MouseEvent object.
	 */
	function move( e ) {
		if ( startInfo ) {
			currentInfo = analyze( e, startInfo );

			if ( isDragging ) {
				if ( e.cancelable ) {
					e.preventDefault();
				}

				const position = startCoord[ axis ] + currentInfo.offset[ axis ];
				Track.translate( resist( position ) );
			} else {
				if ( shouldMove( currentInfo ) ) {
					Splide.emit( 'drag', startInfo );
					isDragging = true;
				}
			}
		}
	}

	/**
	 * Determine whether to start moving the track or not by drag angle.
	 *
	 * @param {Object} info - An information object.
	 *
	 * @return {boolean} - True if the track should be moved or false if not.
	 */
	function shouldMove( { offset } ) {
		if ( Splide.State.is( IDLE ) ) {
			let angle = Math.atan( abs( offset.y ) / abs( offset.x ) ) * 180 / Math.PI;

			if ( isVertical ) {
				angle = 90 - angle;
			}

			return angle < ANGLE_THRESHOLD;
		}

		return false;
	}

	/**
	 * Resist dragging the track on the first/last page because there is no more.
	 *
	 * @param {number} position - A position being applied to the track.
	 *
	 * @return {Object} - Adjusted position.
	 */
	function resist( position ) {
		if ( ! Splide.is( LOOP ) ) {
			const sign  = Track.sign;
			const start = sign * Track.trim( Track.toPosition( 0 ) );
			const end   = sign * Track.trim( Track.toPosition( Controller.edgeIndex ) );

			position *= sign;

			if ( position < start ) {
				position = start - FRICTION_REDUCER * Math.log( start - position );
			}	else if ( position > end ) {
				position = end + FRICTION_REDUCER * Math.log( position - end );
			}

			position *= sign;
		}

		return position;
	}

	/**
	 * Called when dragging ends.
	 */
	function end() {
		startInfo = null;

		if ( isDragging ) {
			Splide.emit( 'dragged', currentInfo );
			go( currentInfo );
			isDragging = false;
		}
	}

	/**
	 * Go to the slide determined by the analyzed data.
	 *
	 * @param {Object} info - An info object.
	 */
	function go( info ) {
		const velocity = info.velocity[ axis ];
		const absV     = abs( velocity );

		if ( absV > 0 ) {
			const Layout  = Components.Layout;
			const options = Splide.options;
			const sign    = velocity < 0 ? -1 : 1;

			let destination = Track.position;

			if ( absV > options.flickThreshold && abs( info.offset[ axis ] ) < SWIPE_THRESHOLD ) {
				destination += sign * Math.min( absV * options.flickPower, Layout.width * ( options.flickMaxPages || 1 ) );
			}

			let index = Track.toIndex( destination );

			// Do not allow the track to go to a previous position.
			if ( index === Splide.index ) {
				index += sign * Track.sign;
			}

			if ( ! Splide.is( LOOP ) ) {
				index = between( index, 0, Controller.edgeIndex );
			}

			Controller.go( index, options.isNavigation );
		}
	}

	/**
	 * Analyze the given event object and return important information for handling swipe behavior.
	 *
	 * @param {Event}   e          - Touch or Mouse event object.
	 * @param {Object}  startInfo  - Information analyzed on start for calculating difference from the current one.
	 *
	 * @return {Object} - An object containing analyzed information, such as offset, velocity, etc.
	 */
	function analyze( e, startInfo ) {
		const { timeStamp, touches } = e;
		const { clientX, clientY } = touches ? touches[0] : e;
		const { x: fromX = clientX, y: fromY = clientY } = startInfo.to || {};

		const startTime = startInfo.time || 0;
		const offset    = { x: clientX - fromX, y: clientY - fromY };
		const duration  = timeStamp - startTime;
		const velocity  = { x: offset.x / duration, y: offset.y / duration };

		return {
			to: { x: clientX, y: clientY },
			offset,
			time: timeStamp,
			velocity,
		};
	}

	return Drag;
}