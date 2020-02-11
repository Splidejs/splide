/**
 * The function for providing an Event object simply managing events.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The function for providing an Event object simply managing events.
 */
export default () => {
	/**
	 * Store all event data.
	 *
	 * @type {Array}
	 */
	let data = [];

	const Event = {
		/**
		 * Subscribe the given event(s).
		 *
		 * @param {string}   events  - An event name. Use space to separate multiple events.
		 *                             Also, namespace is accepted by dot, such as 'resize.{namespace}'.
		 * @param {function} handler - A callback function.
		 * @param {Element}  elm     - Optional. Native event will be listened to when this arg is provided.
		 * @param {Object}   options - Optional. Options for addEventListener.
		 */
		on( events, handler, elm = null, options = {} ) {
			events.split( ' ' ).forEach( event => {
				if ( elm ) {
					elm.addEventListener( event, handler, options );
				}

				data.push( { event, handler, elm, options } );
			} );
		},

		/**
		 * Unsubscribe the given event(s).
		 *
		 * @param {string}  events - A event name or names split by space.
		 * @param {Element} elm    - Optional. removeEventListener() will be called when this arg is provided.
		 */
		off( events, elm = null ) {
			events.split( ' ' ).forEach( event => {
				data = data.filter( item => {
					if ( item && item.event === event && item.elm === elm ) {
						unsubscribe( item );
						return false;
					}

					return true;
				} );
			} );
		},

		/**
		 * Emit an event.
		 * This method is only for custom events.
		 *
		 * @param {string}  event - An event name.
		 * @param {*}       args  - Any number of arguments passed to handlers.
		 */
		emit( event, ...args ) {
			data.forEach( item => {
				if ( ! item.elm && item.event.split( '.' )[0] === event ) {
					item.handler( ...args );
				}
			} );
		},

		/**
		 * Clear event data.
		 */
		destroy() {
			data.forEach( unsubscribe );
			data = [];
		},
	};

	/**
	 * Remove the registered event listener.
	 *
	 * @param {Object} item - An object containing event data.
	 */
	function unsubscribe( item ) {
		if ( item.elm ) {
			item.elm.removeEventListener( item.event, item.handler, item.options );
		}
	}

	return Event;
}