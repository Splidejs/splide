/**
 * The sub component for handling each slide.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { find, addClass, removeClass, hasClass, getAttribute, setAttribute } from '../../utils/dom';
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
	 * Events when the slide status is updated.
	 * Append a namespace to remove listeners later.
	 *
	 * @type {string}
	 */
	const STATUS_UPDATE_EVENTS = 'ready.slide updated.slide resize.slide '
		+ ( Splide.options.updateOnMove ? 'move.slide' : 'moved.slide' );

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
		 * @type {Element|null}
		 */
		container: find( slide, `.${ Splide.classes.container }` ),

		/**
		 * Whether this is a cloned slide or not.
		 *
		 * @type {boolean}
		 */
		isClone: realIndex > -1,

		/**
		 * Hold the original styles.
		 *
		 * @type {string}
		 */
		styles: getAttribute( slide, 'style' ) || '',

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			if ( ! this.isClone ) {
				slide.id = `${ Splide.root.id }-slide${ pad( index + 1 ) }`;
			}

			Splide
				.on( STATUS_UPDATE_EVENTS, () => this.update() )
				.on( STYLE_RESTORE_EVENTS, restoreStyles );
		},

		/**
		 * Destroy.
		 */
		destroy() {
			Splide.off( STATUS_UPDATE_EVENTS ).off( STYLE_RESTORE_EVENTS );
			removeClass( slide, values( STATUS_CLASSES ) );
			restoreStyles();
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

			const { floor }  = Math;
			const Components = Splide.Components;
			const Track      = Components.Track;
			const prop       = Splide.options.direction === TTB ? 'clientHeight' : 'clientWidth';
			const position   = floor( ( Track.toPosition( index ) + Track.offset( index ) - Track.position ) * Track.sign );
			const edge       = floor( position + slide[ prop ] );
			const size       = Components.Elements.track[ prop ];

			return ( 0 <= position && position <= size && 0 <= edge && edge <= size );
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