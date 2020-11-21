/**
 * The sub component for handling each slide.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import {
	child,
	addClass,
	removeClass,
	hasClass,
	getAttribute,
	setAttribute,
	removeAttribute,
	applyStyle,
	getRect,
} from '../../utils/dom';
import { FADE, SLIDE } from '../../constants/types';
import { STATUS_CLASSES } from '../../constants/classes';
import { values } from "../../utils/object";
import { pad } from "../../utils/utils";
import { TTB } from "../../constants/directions";

/**
 * Events for restoring original styles.
 *
 * @type {string}
 */
const STYLE_RESTORE_EVENTS = 'update.slide';


/**
 * The sub component for handling each slide.
 *
 * @param {Splide}  Splide    - A Splide instance.
 * @param {number}  index     - An unique slide index.
 * @param {number}  realIndex - Clones should pass a real slide index.
 * @param {Element} slide     - A slide element.
 *
 * @return {Object} - The sub component object.
 */
export default ( Splide, index, realIndex, slide ) => {
	/**
	 * Whether to update "is-active" class before or after transition.
	 *
	 * @type {boolean}
	 */
	const updateOnMove = Splide.options.updateOnMove;

	/**
	 * Events when the slide status is updated.
	 * Append a namespace to remove listeners later.
	 *
	 * @type {string}
	 */
	const STATUS_UPDATE_EVENTS = 'ready.slide updated.slide resized.slide moved.slide'
		+ ( updateOnMove ? ' move.slide' : '' );

	/**
	 * Slide sub component object.
	 *
	 * @type {Object}
	 */
	const Slide = {
		/**
		 * Slide element.
		 *
		 * @type {Element}
		 */
		slide,

		/**
		 * Slide index.
		 *
		 * @type {number}
		 */
		index,

		/**
		 * Real index for clones.
		 *
		 * @type {number}
		 */
		realIndex,

		/**
		 * Container element if available.
		 *
		 * @type {Element|undefined}
		 */
		container: child( slide, Splide.classes.container ),

		/**
		 * Whether this is a cloned slide or not.
		 *
		 * @type {boolean}
		 */
		isClone: realIndex > -1,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			if ( ! this.isClone ) {
				slide.id = `${ Splide.root.id }-slide${ pad( index + 1 ) }`;
			}

			Splide
				.on( STATUS_UPDATE_EVENTS, () => this.update() )
				.on( STYLE_RESTORE_EVENTS, restoreStyles )
				.on( 'click', () => Splide.emit( 'click', this ), slide );

			/*
			 * Add "is-active" class to a clone element temporarily
			 * and it will be removed on "moved" event.
			 */
			if ( updateOnMove ) {
				Splide.on( 'move.slide', newIndex => {
					if ( newIndex === realIndex ) {
						update( true, false );
					}
				} );
			}

			// Make sure the slide is shown.
			applyStyle( slide, { display: '' } );

			// Hold the original styles.
			this.styles = getAttribute( slide, 'style' ) || '';
		},

		/**
		 * Destroy.
		 */
		destroy() {
			Splide.off( STATUS_UPDATE_EVENTS ).off( STYLE_RESTORE_EVENTS ).off( 'click', slide );
			removeClass( slide, values( STATUS_CLASSES ) );
			restoreStyles();
			removeAttribute( this.container, 'style' );
		},

		/**
		 * Update active and visible status.
		 */
		update() {
			update( this.isActive(), false );
			update( this.isVisible(), true );
		},

		/**
		 * Check whether this slide is active or not.
		 *
		 * @return {boolean} - True if the slide is active or false if not.
		 */
		isActive() {
			return Splide.index === index;
		},

		/**
		 * Check whether this slide is visible in the viewport or not.
		 *
		 * @return {boolean} - True if the slide is visible or false if not.
		 */
		isVisible() {
			const active = this.isActive();

			if ( Splide.is( FADE ) || active ) {
				return active;
			}

			const { ceil }  = Math;
			const trackRect = getRect( Splide.Components.Elements.track );
			const slideRect = getRect( slide );

			if ( Splide.options.direction === TTB ) {
				return trackRect.top <= slideRect.top && slideRect.bottom <= ceil( trackRect.bottom );
			}

			return trackRect.left <= slideRect.left && slideRect.right <= ceil( trackRect.right );
		},

		/**
		 * Calculate how far this slide is from another slide and
		 * return true if the distance is within the given number.
		 *
		 * @param {number} from   - Index of a target slide.
		 * @param {number} within - True if the slide is within this number.
		 *
		 * @return {boolean} - True if the slide is within the number or false otherwise.
		 */
		isWithin( from, within ) {
			let diff = Math.abs( from - index );

			if ( ! Splide.is( SLIDE ) && ! this.isClone ) {
				diff = Math.min( diff, Splide.length - diff );
			}

			return diff < within;
		},
	};

	/**
	 * Update classes for activity or visibility.
	 *
	 * @param {boolean} active        - Is active/visible or not.
	 * @param {boolean} forVisibility - Toggle classes for activity or visibility.
	 */
	function update( active, forVisibility ) {
		const type      = forVisibility ? 'visible' : 'active';
		const className = STATUS_CLASSES[ type ];

		if ( active ) {
			addClass( slide, className );
			Splide.emit( `${ type }`, Slide );
		} else {
			if ( hasClass( slide, className ) ) {
				removeClass( slide, className );
				Splide.emit( `${ forVisibility ? 'hidden' : 'inactive' }`, Slide );
			}
		}
	}

	/**
	 * Restore the original styles.
	 */
	function restoreStyles() {
		setAttribute( slide, 'style', Slide.styles );
	}

	return Slide;
}