/**
 * The main class for applying Splide to an element.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Event from './core/event';
import State from './core/state';
import compose from './core/composer';
import { error, exist } from './utils/error';
import { applyStyle } from './utils/dom';
import { merge, each, values } from './utils/object';
import { DEFAULTS } from './constants/defaults';
import * as STATES from './constants/states';


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
	 * @param {Element|string}  root       - A selector for a root element or an element itself.
	 * @param {Object}          options    - Optional. Options to change default behaviour.
	 * @param {Object}          Components - Optional. Components.
	 */
	constructor( root, options = {}, Components = {} ) {
		this.root = root instanceof Element ? root : document.querySelector( root );
		exist( this.root, 'An invalid element/selector was given.' );

		this.Components = null;
		this.Event      = Event();
		this.State      = State( STATES.CREATED );
		this.STATES     = STATES;

		this._o = merge( DEFAULTS, options );
		this._i = 0;
		this._c = Components;
		this._e = {}; // Extensions
		this._t = null; // Transition
	}

	/**
	 * Compose and mount components.
	 *
	 * @param {Object}   Extensions - Optional. Additional components.
	 * @param {function} Transition - Optional. Set a custom transition component.
	 *
	 * @return {Splide|undefined} - This instance or undefined if an exception occurred.
	 */
	mount( Extensions = this._e, Transition = this._t ) {
		// Reset the state.
		this.State.set( STATES.CREATED );

		this._e = Extensions;
		this._t = Transition;

		this.Components = compose( this, merge( this._c, Extensions ), Transition );

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
			return;
		}

		const { State } = this;
		State.set( STATES.MOUNTED );

		each( this.Components, component => {
			component.mounted && component.mounted();
		} );

		this.emit( 'mounted' );
		State.set( STATES.IDLE );
		this.emit( 'ready' );

		applyStyle( this.root, { visibility: 'visible' } );

		this
			.on( 'move drag', () => State.set( STATES.MOVING ) )
			.on( 'moved dragged', () => State.set( STATES.IDLE ) );

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
	 * @param {string}   events  - An event name. Use space to separate multiple events.
	 *                             Also, namespace is accepted by dot, such as 'resize.{namespace}'.
	 * @param {function} handler - A callback function.
	 * @param {Element}  elm     - Optional. Native event will be listened to when this arg is provided.
	 * @param {Object}   options - Optional. Options for addEventListener.
	 *
	 * @return {Splide} - This instance.
	 */
	on( events, handler, elm = null, options = {} ) {
		this.Event.on( events, handler, elm, options );
		return this;
	}

	/**
	 * Unsubscribe the given event.
	 *
	 * @param {string}  events - A event name.
	 * @param {Element} elm    - Optional. removeEventListener() will be called when this arg is provided.
	 *
	 * @return {Splide} - This instance.
	 */
	off( events, elm = null ) {
		this.Event.off( events, elm );
		return this;
	}

	/**
	 * Emit an event.
	 *
	 * @param {string} event - An event name.
	 * @param {*}      args  - Any number of arguments passed to handlers.
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
	go( control, wait = this.options.waitForTransition ) {
		if ( this.State.is( STATES.IDLE ) || ( this.State.is( STATES.MOVING ) && ! wait ) ) {
			this.Components.Controller.go( control, false );
		}

		return this;
	}

	/**
	 * Verify whether the slider type is the given one or not.
	 *
	 * @param {string} type - A slider type.
	 *
	 * @return {boolean} - True if the slider type is the provided type or false if not.
	 */
	is( type ) {
		return type === this._o.type;
	}

	/**
	 * Insert a slide.
	 *
	 * @param {Element|string} slide - A slide element to be added.
	 * @param {number}         index - A slide will be added at the position.
	 */
	add( slide, index = -1 ) {
		this.Components.Elements.add( slide, index, this.refresh.bind( this ) );
		return this;
	}

	/**
	 * Remove the slide designated by the index.
	 *
	 * @param {number} index - A slide index.
	 */
	remove( index ) {
		this.Components.Elements.remove( index );
		this.refresh();
		return this;
	}

	/**
	 * Destroy all Slide objects and clones and recreate them again.
	 */
	refresh() {
		this.emit( 'refresh:before' ).emit( 'refresh' ).emit( 'resize' );
		return this;
	}

	/**
	 * Destroy the Splide.
	 * "Completely" boolean is mainly for breakpoints.
	 *
	 * @param {boolean} completely - Destroy completely.
	 */
	destroy( completely = true ) {
		// Postpone destroy because it should be done after mount.
		if ( this.State.is( STATES.CREATED ) ) {
			this.on( 'ready', () => this.destroy( completely ) );
			return;
		}

		values( this.Components ).reverse().forEach( component => {
			component.destroy && component.destroy( completely );
		} );

		this.emit( 'destroy', completely );

		// Destroy all event handlers, including ones for native events.
		this.Event.destroy();
		this.State.set( STATES.DESTROYED );

		return this;
	}

	/**
	 * Return the current slide index.
	 *
	 * @return {number} - The current slide index.
	 // */
	get index() {
		return this._i;
	}

	/**
	 * Set the current slide index.
	 *
	 * @param {number|string} index - A new index.
	 */
	set index( index ) {
		this._i = parseInt( index );
	}

	/**
	 * Return length of slides.
	 * This is an alias of Elements.length.
	 *
	 * @return {number} - A number of slides.
	 */
	get length() {
		return this.Components.Elements.length;
	}

	/**
	 * Return options.
	 *
	 * @return {Object} - Options object.
	 */
	get options() {
		return this._o;
	}

	/**
	 * Set options with merging the given object to the current one.
	 *
	 * @param {Object} options - New options.
	 */
	set options( options ) {
		const created = this.State.is( STATES.CREATED );

		if ( ! created ) {
			this.emit( 'update' );
		}

		this._o = merge( this._o, options );

		if ( ! created ) {
			this.emit( 'updated', this._o );
		}
	}

	/**
	 * Return the class list.
	 * This is an alias of Splide.options.classList.
	 *
	 * @return {Object} - An object containing all class list.
	 */
	get classes() {
		return this._o.classes;
	}

	/**
	 * Return the i18n strings.
	 * This is an alias of Splide.options.i18n.
	 *
	 * @return {Object} - An object containing all i18n strings.
	 */
	get i18n() {
		return this._o.i18n;
	}
}