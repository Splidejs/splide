/**
 * The component for synchronizing a slider with another.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { LOOP } from '../../constants/types';
import { IDLE } from "../../constants/states";

/**
 * The event name for sync.
 *
 * @type {string}
 */
const SYNC_EVENT = 'move.sync';

/**
 * The event names for click navigation.
 * @type {string}
 */
const CLICK_EVENTS = 'mouseup touchend';

/**
 * The keys for triggering the navigation button.
 *
 * @type {String[]}
 */
const TRIGGER_KEYS = [ ' ', 'Enter', 'Spacebar' ];


/**
 * The component for synchronizing a slider with another.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Keep the sibling Splide instance.
	 *
	 * @type {Splide}
	 */
	let sibling = Splide.sibling;

	/**
	 * Whether the sibling slider is navigation or not.
	 *
	 * @type {Splide|boolean}
	 */
	const isNavigation = sibling && sibling.options.isNavigation;

	/**
	 * Layout component object.
	 *
	 * @type {Object}
	 */
	const Sync = {
		/**
		 * Required only when the sub slider is available.
		 *
		 * @type {boolean}
		 */
		required: !! sibling,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			syncMain();
			syncSibling();

			if ( isNavigation ) {
				bind();

				Splide.on( 'refresh', () => {
					setTimeout( () => {
						bind();
						sibling.emit( 'navigation:updated', Splide );
					} );
				} );
			}
		},

		/**
		 * Called after all components are mounted.
		 */
		mounted() {
			if ( isNavigation ) {
				sibling.emit( 'navigation:mounted', Splide );
			}
		},
	};

	/**
	 * Listen the primary slider event to move secondary one.
	 * Must unbind a handler at first to avoid infinite loop.
	 */
	function syncMain() {
		Splide.on( SYNC_EVENT, ( newIndex, prevIndex, destIndex ) => {
			sibling
				.off( SYNC_EVENT )
				.go( sibling.is( LOOP ) ? destIndex : newIndex, false );

			syncSibling();
		} );
	}

	/**
	 * Listen the secondary slider event to move primary one.
	 * Must unbind a handler at first to avoid infinite loop.
	 */
	function syncSibling() {
		sibling.on( SYNC_EVENT, ( newIndex, prevIndex, destIndex ) => {
			Splide
				.off( SYNC_EVENT )
				.go( Splide.is( LOOP ) ? destIndex : newIndex, false );

			syncMain();
		} );
	}

	/**
	 * Listen some events on each slide.
	 */
	function bind() {
		sibling.Components.Elements.each( ( { slide, index } ) => {
			/*
			 * Listen mouseup and touchend events to handle click.
			 */
			Splide
				.off( CLICK_EVENTS, slide )
				.on( CLICK_EVENTS, e => {
					// Ignore a middle or right click.
					if ( ! e.button || e.button === 0 ) {
						moveSibling( index );
					}
				}, slide );

			/*
			 * Subscribe keyup to handle Enter and Space key.
			 * Note that Array.includes is not supported by IE.
			 */
			Splide
				.off( 'keyup', slide )
				.on( 'keyup', e => {
					if ( TRIGGER_KEYS.indexOf( e.key ) > -1 ) {
						e.preventDefault();
						moveSibling( index );
					}
				}, slide, { passive: false } );
		} );
	}

	/**
	 * Move the sibling to the given index.
	 * Need to check "IDLE" status because slides can be moving by Drag component.
	 *
	 * @param {number} index - Target index.
	 */
	function moveSibling( index ) {
		if ( Splide.State.is( IDLE ) ) {
			sibling.go( index );
		}
	}

	return Sync;
}