/**
 * The component for updating options according to a current window width.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

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
				.sort( ( n, m ) => parseInt( n ) - parseInt( m ) )
				.map( point => ( { point, mql: matchMedia( `(max-width:${ point }px)` ) } ) );

			bind();
		},

		/**
		 * Called after all components are mounted.
		 * Keep initial options to apply them when no breakpoint matches.
		 */
		mounted() {
			initialOptions = Splide.options;
		},
	};

	/**
	 * Listen some events to update options when media query is changed.
	 */
	function bind() {
		Splide.on( 'mounted resize', () => {
			const point = getPoint();

			if ( point !== prevPoint ) {
				Splide.options = breakpoints[ point ] || initialOptions;
				prevPoint = point;
			}
		} );
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