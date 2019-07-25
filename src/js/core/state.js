/**
 * The function providing a super simple state system.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The function providing a super simple state system.
 *
 * @param {string|number} initialState - Provide the initial state value.
 */
export default initialState => {
	/**
	 * Store the current state.
	 *
	 * @type {string|number}
	 */
	let curr = initialState;

	return {
		/**
		 * Change state.
		 *
		 * @param {string|number} state - A new state.
		 */
		set( state ) {
			curr = state;
		},

		/**
		 * Verify if the current state is given one or not.
		 *
		 * @param {string|number} state - A state name to be verified.
		 *
		 * @return {boolean} - True if the current state is the given one.
		 */
		is( state ) {
			return state === curr;
		},
	}
}