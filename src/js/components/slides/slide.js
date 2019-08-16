/**
 * The sub component for handling each slide.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { find, addClass, removeClass, hasClass } from '../../utils/dom';
import { SLIDE } from '../../constants/types';
import { STATUS_CLASSES } from '../../constants/classes';


/**
 * The sub component for handling each slide.
 *
 * @param {number}  index     - An unique slide index.
 * @param {number}  realIndex - Clones should pass a real slide index.
 * @param {Element} slide     - A slide element.
 * @param {Splide}  Splide    - A Splide instance.
 *
 * @return {Object} - The sub component object.
 */
export default function Slide( index, realIndex, slide, Splide ) {
	return {
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
		 * Whether this is clone or not.
		 *
		 * @type {boolean}
		 */
		isClone: realIndex > -1,

		/**
		 * Called when the component is mounted.
		 */
		init() {
			if ( ! slide.id && ! this.isClone ) {
				const number = index + 1;
				slide.id = `${ Splide.root.id }-slide${ number < 10 ? '0' + number : number }`;
			}

			Splide.on( 'mounted moved updated', () => {
				this.update( this.isActive(), false );
				this.update( this.isVisible(), true );
			} ).on( 'resize', () => { this.update( this.isVisible(), true ) } );
		},

		/**
		 * Update classes for activity or visibility.
		 *
		 * @param {boolean} active        - Is active/visible or not.
		 * @param {boolean} forVisibility - Toggle classes for activity or visibility.
		 */
		update( active, forVisibility ) {
			const type      = forVisibility ? 'visible' : 'active';
			const className = STATUS_CLASSES[ type ];

			if ( active ) {
				addClass( slide, className );
				Splide.emit( `${ type }`, this );
			} else {
				if ( hasClass( slide, className ) ) {
					removeClass( slide, className );
					Splide.emit( `${ forVisibility ? 'hidden' : 'inactive' }`, this );
				}
			}
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
		 * Check whether this slide is visible or not.
		 *
		 * @return {boolean} - True if the slide is visible or false if not.
		 */
		isVisible() {
			const { focus, trimSpace }  = Splide.options;
			const { index: activeIndex, length } = Splide;
			const isCenter  = 'center' === focus;
			const numInView = Splide.Components.Layout.numInView;
			const offset    = isCenter ? numInView / 2 : parseInt( focus ) || 0;

			if ( trimSpace ) {
				if ( activeIndex < offset ) {
					return index < numInView;
				} else if ( activeIndex >= length - ( numInView - offset ) ) {
					return index >= length - numInView;
				}
			}

			const min = activeIndex - offset + ( isCenter && numInView % 2 === 0 ? 1 : 0 );

			return min <= index && index < activeIndex + numInView - offset;
		},

		/**
		 * Calculate how far this slide is from another slide and
		 * return true if the distance is within the given number.
		 *
		 * @param {number} from   - Index of a target slide.
		 * @param {number} within - True if the slide is within this number.
		 *
		 * @return {boolean} - True if the slide is within this number or false otherwise.
		 */
		isWithin( from, within ) {
			let diff = Math.abs( from - index );

			if ( ! Splide.is( SLIDE ) && ! this.isClone ) {
				diff = Math.min( diff, Splide.length - diff );
			}

			return diff < within;
		},
	};
}