/**
 * The component for synchronizing a slider with another.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { subscribe } from '../../utils/dom';
import { LOOP } from '../../constants/types';
import { IDLE } from "../../constants/states";

/**
 * The event name for sync.
 *
 * @type {string}
 */
const SYNC_EVENT = 'move.sync';

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
	 * Keep the sub Splide instance.
	 *
	 * @type {Splide}
	 */
	let sub = Splide.sub;

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
		required: !! sub,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			sync();
			syncSub();

			if ( sub.options.isNavigation ) {
				bind();
			}
		},
	};

	/**
	 * Listen the primary slider event to move secondary one.
	 * Must unbind a handler at first to avoid infinite loop.
	 */
	function sync() {
		Splide.on( SYNC_EVENT, ( newIndex, prevIndex, destIndex ) => {
			sub
				.off( SYNC_EVENT )
				.go( sub.is( LOOP ) ? destIndex : newIndex, false );

			syncSub();
		} );
	}

	/**
	 * Listen the secondary slider event to move primary one.
	 * Must unbind a handler at first to avoid infinite loop.
	 */
	function syncSub() {
		sub.on( SYNC_EVENT, ( newIndex, prevIndex, destIndex ) => {
			Splide
				.off( SYNC_EVENT )
				.go( Splide.is( LOOP ) ? destIndex : newIndex, false );

			sync();
		} );
	}

	/**
	 * Listen some events on each slide.
	 */
	function bind() {
		const Slides = sub.Components.Slides.getSlides( true, true );

		Slides.forEach( Slide => {
			const slide = Slide.slide;

			/*
			 * Listen mouseup and touchend events to handle click.
			 * Need to check "IDLE" status because slides can be moving by Drag component.
			 */
			subscribe( slide, 'mouseup touchend', e => {
				// Ignore a middle or right click.
				if ( ! e.button || e.button === 0 ) {
					moveSub( Slide.index );
				}
			} );

			/*
			 * Subscribe keyup to handle Enter and Space key.
			 * Note that Array.includes is not supported by IE.
			 */
			subscribe( slide, 'keyup', e => {
				if ( TRIGGER_KEYS.indexOf( e.key ) > -1 ) {
					e.preventDefault();
					moveSub( Slide.index );
				}
			}, false );
		} );
	}

	function moveSub( index ) {
		if ( Splide.State.is( IDLE ) ) {
			sub.go( index );
		}
	}

	return Sync;
}