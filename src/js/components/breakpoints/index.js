/**
 * The component for updating options according to a current window width.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { throttle } from "../../utils/time";
import { DESTROYED } from "../../constants/states";

/**
 * Interval time for throttle.
 *
 * @type {number}
 */
const THROTTLE = 50;

/**
 * The component for updating options according to a current window width.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Store breakpoints.
	 *
	 * @type {Object|boolean}
	 */
	const breakpoints = Splide.options.breakpoints;

	/**
	 * The check function whose frequency of call is reduced.
	 *
	 * @type {Function}
	 */
	const throttledCheck = throttle( check, THROTTLE );

	/**
	 * Keep initial options.
	 *
	 * @type {Object}
	 */
	let initialOptions;

	/**
	 * An array containing objects of point and MediaQueryList.
	 *
	 * @type {Object[]}
	 */
	let map = [];

	/**
	 * Hold the previous breakpoint.
	 *
	 * @type {number|undefined}
	 */
	let prevPoint;

	/**
	 * Breakpoints component object.
	 *
	 * @type {Object}
	 */
	const Breakpoints = {
		/**
		 * Required only when the breakpoints definition is provided and browser supports matchMedia.
		 *
		 * @type {boolean}
		 */
		required: breakpoints && matchMedia,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			map = Object.keys( breakpoints )
				.sort( ( n, m ) => +n - +m )
				.map( point => ( { point, mql: matchMedia( `(max-width:${ point }px)` ) } ) );

			/*
			 * To keep monitoring resize event after destruction without "completely",
			 * use native addEventListener instead of Splide.on.
			 */
			this.destroy( true );
			addEventListener( 'resize', throttledCheck );

			// Keep initial options to apply them when no breakpoint matches.
			initialOptions = Splide.options;

			check();
		},

		/**
		 * Destroy.
		 *
		 * @param {boolean} completely - Whether to destroy Splide completely.
		 */
		destroy( completely ) {
			if ( completely ) {
				removeEventListener( 'resize', throttledCheck );
			}
		},
	};

	/**
	 * Check the breakpoint.
	 */
	function check() {
		const point = getPoint();

		if ( point !== prevPoint ) {
			prevPoint = point;

			const State   = Splide.State;
			const options = breakpoints[ point ] || initialOptions;
			const destroy = options.destroy;

			if ( destroy ) {
				Splide.options = initialOptions;
				Splide.destroy( destroy === 'completely' );
			} else {
				if ( State.is( DESTROYED ) ) {
					Splide.mount();
				}

				Splide.options = options;
			}
		}
	}

	/**
	 * Return the breakpoint matching current window width.
	 * Note that Array.prototype.find is not supported by IE.
	 *
	 * @return {number|string} - A breakpoint as number or string. -1 if no point matches.
	 */
	function getPoint() {
		const item = map.filter( item => item.mql.matches )[0];
		return item ? item.point : -1;
	}

	return Breakpoints;
}