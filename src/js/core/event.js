/**
 * The function for providing an Event object simply managing events.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { each } from "../utils/object";


/**
 * The function for providing an Event object simply managing events.
 */
export default () => {
	/**
	 * Store all handlers.
	 *
	 * @type {Object}
	 */
	const handlers = {};

	return {
		/**
		 * Subscribe the given event(s).
		 *
		 * @param {string}    event   - An event name. Use space to separate multiple events.
		 *                              Also, namespace is accepted by dot, such as 'resize.{namespace}'.
		 * @param {function}  handler - A callback function.
		 */
		on( event, handler ) {
			event.split( ' ' ).forEach( name => {
				// Prevent an event with a namespace from being registered twice.
				if ( name.indexOf( '.' ) > -1 && handlers[ name ] ) {
					return;
				}

				if ( ! handlers[ name ] ) {
					handlers[ name ] = [];
				}

				handlers[ name ].push( handler );
			} );
		},

		/**
		 * Unsubscribe the given event.
		 *
		 * @param {string} event - A event name.
		 */
		off( event ) {
			event.split( ' ' ).forEach( name => delete handlers[ name ] );
		},

		/**
		 * Emit an event.
		 *
		 * @param {string}  event - An event name.
		 * @param {*}       args  - Any number of arguments passed to handlers.
		 */
		emit( event, ...args ) {
			each( handlers, ( callbacks, name ) => {
				if ( name.split( '.' )[ 0 ] === event ) {
					if ( callbacks ) {
						for ( const i in callbacks ) {
							callbacks[ i ]( ...args );
						}
					}
				}
			} );
		},
	};
}