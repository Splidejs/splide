/**
 * The main class for applying Splide to an element.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Event from './core/event';
import State from './core/state';
import { DEFAULTS } from './constants/defaults';

import compose from './core/composer';
import { applyStyle } from './utils/dom';
import { error, exist } from './utils/error';
import { find } from './utils/dom';
import { merge, each } from './utils/object';
import { CREATED, MOUNTED, IDLE, MOVING } from './constants/states';


/**
 * The main class for applying Splide to an element,
 * providing some APIs to control the behavior.
 */
export default class Splide {
	/**
	 * Splide constructor.
	 *
	 * @throws {Error} When the given root element or selector is invalid.
	 *
	 * @param {Element|string}  root        - A selector for a root element or an element itself.
	 * @param {Object}          options     - Optional. Options to change default behaviour.
	 * @param {Object}          Components  - Optional. Components.
	 */
	constructor( root, options = {}, Components = {} ) {
		this.root = root instanceof HTMLElement ? root : find( document, root );
		exist( this.root, 'An invalid root element or selector was given.' );

		this.Components = {};
		this.Event      = Event();
		this.State      = State( CREATED );

		this._options    = merge( DEFAULTS, options );
		this._index      = 0;
		this._components = Components;

		this
			.on( 'move drag', () => this.State.set( MOVING ) )
			.on( 'moved dragged', () => this.State.set( IDLE ) );
	}

	/**
	 * Compose and mount components.
	 *
	 * @param {Object}   Extensions - Optional. Additional components.
	 * @param {function} Transition - Optional. Set a custom transition component.
	 *
	 * @return {Splide|null} - This instance or null if an exception occurred.
	 */
	mount( Extensions = {}, Transition = null ) {
		this.Components = compose( this, merge( this._components, Extensions ), Transition );

		try {
			each( this.Components, ( component, key ) => {
				const required = component.required;

				if ( required === undefined || required ) {
					component.mount && component.mount();
				} else {
					delete this.Components[ key ];
				}
			} );
		} catch ( e ) {
			error( e.message );
			return null;
		}

		each( this.Components, component => {
			component.mounted && component.mounted();
		} );

		this.State.set( MOUNTED );
		this.emit( 'mounted' );

		this.State.set( IDLE );
		this.emit( 'ready' );

		applyStyle( this.root, { visibility: 'visible' } );

		return this;
	}

	/**
	 * Set sync target.
	 *
	 * @param {Splide} splide - A Splide instance.
	 *
	 * @return {Splide} - This instance.
	 */
	sync( splide ) {
		this.sibling = splide;
		return this;
	}

	/**
	 * Register callback fired on the given event(s).
	 *
	 * @param {string}    event   - An event name. Use space to separate multiple events.
	 *                              Also, namespace is accepted by dot, such as 'resize.{namespace}'.
	 * @param {function}  handler - A callback function.
	 *
	 * @return {Splide} - This instance.
	 */
	on( event, handler ) {
		this.Event.on( event, handler );
		return this;
	}

	/**
	 * Unsubscribe the given event.
	 *
	 * @param {string} event - A event name.
	 *
	 * @return {Splide} - This instance.
	 */
	off( event ) {
		this.Event.off( event );
		return this;
	}

	/**
	 * Emit an event.
	 *
	 * @param {string}  event - An event name.
	 * @param {*}       args  - Any number of arguments passed to handlers.
	 */
	emit( event, ...args ) {
		this.Event.emit( event, ...args );
		return this;
	}

	/**
	 * Go to the slide specified by the given control.
	 *
	 * @param {string|number} control - A control pattern.
	 * @param {boolean}       wait    - Optional. Whether to wait for transition.
	 */
	go( control, wait = true ) {
		if ( this.State.is( IDLE ) || ( this.State.is( MOVING ) && ! wait ) ) {
			this.Components.Controller.go( control, false );
		}
	}

	/**
	 * Verify whether the slider type is the given one or not.
	 *
	 * @param {string} type - A slider type.
	 *
	 * @return {boolean} - True if the slider type is the provided type or false if not.
	 */
	is( type ) {
		return type === this._options.type;
	}

	/**
	 * Return the current slide index.
	 *
	 * @return {number} - The current slide index.
	 */
	get index() {
		return this._index;
	}

	/**
	 * Set the current slide index.
	 *
	 * @param {number|string} index - A new index.
	 */
	set index( index ) {
		this._index = parseInt( index );
	}

	/**
	 * Return length of slides.
	 * This is an alias of Slides.length.
	 *
	 * @return {number} - A number of slides.
	 */
	get length() {
		return this.Components.Slides.length;
	}

	/**
	 * Return options.
	 *
	 * @return {Object} - Options object.
	 */
	get options() {
		return this._options;
	}

	/**
	 * Set options with merging the given object to the current one.
	 *
	 * @param {Object} options - New options.
	 */
	set options( options ) {
		this._options = merge( this._options, options );

		if ( ! this.State.is( CREATED ) ) {
			this.emit( 'updated', this._options );
		}
	}

	/**
	 * Return the class list.
	 * This is an alias of Splide.options.classList.
	 *
	 * @return {Object} - An object containing all class list.
	 */
	get classes() {
		return this._options.classes;
	}

	/**
	 * Return the i18n strings.
	 * This is an alias of Splide.options.i18n.
	 *
	 * @return {Object} - An object containing all i18n strings.
	 */
	get i18n() {
		return this._options.i18n;
	}
}