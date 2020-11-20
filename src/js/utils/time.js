/**
 * A package of utility functions related with time.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Simple throttle function that controls how often the given function is executed.
 *
 * @param {function} func - A function to be throttled.
 * @param {number}   wait - Time in millisecond for interval of execution.
 *
 * @return {Function} - A debounced function.
 */
export function throttle( func, wait ) {
	let timeout;

	// Declare function by the "function" keyword to prevent "this" from being inherited.
	return function () {
		if ( ! timeout ) {
			timeout = setTimeout( () => {
				func();
				timeout = null;
			}, wait );
		}
	}
}

/**
 * Custom setInterval function that provides progress rate as callback.
 *
 * @param {function} callback - A callback function fired every time the interval time passes.
 * @param {number}   interval - Interval duration in milliseconds.
 * @param {function} progress - A callback function fired whenever the progress goes.
 *
 * @return {Object} - An object containing play() and pause() functions.
 */
export function createInterval( callback, interval, progress ) {
	const { requestAnimationFrame } = window;
	let start, elapse, rate, pause = true;

	const step = timestamp => {
		if ( ! pause ) {
			if ( ! start ) {
				start = timestamp;

				if ( rate && rate < 1 ) {
					start -= rate * interval;
				}
			}

			elapse = timestamp - start;
			rate   = elapse / interval;

			if ( elapse >= interval ) {
				start = 0;
				rate  = 1;
				callback();
			}

			if ( progress ) {
				progress( rate );
			}

			requestAnimationFrame( step );
		}
	};

	return {
		pause() {
			pause = true;
			start = 0;
		},

		play( reset ) {
			start = 0;

			if ( reset ) {
				rate = 0;
			}

			if ( pause ) {
				pause = false;
				requestAnimationFrame( step );
			}
		},
	};
}