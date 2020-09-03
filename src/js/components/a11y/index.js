/**
 * The component for enhancing accessibility.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { setAttribute, removeAttribute } from '../../utils/dom';
import { sprintf } from '../../utils/utils';
import { ARIA_CONTROLS, ARIA_CURRENRT, ARIA_HIDDEN, ARIA_LABEL, TAB_INDEX } from '../../constants/a11y';


/**
 * The component for enhancing accessibility.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold a i18n object.
	 *
	 * @type {Object}
	 */
	const i18n = Splide.i18n;

	/**
	 * Hold the Elements component.
	 *
	 * @type {Object}
	 */
	const Elements = Components.Elements;

	/**
	 * All attributes related with A11y.
	 *
	 * @type {string[]}
	 */
	const allAttributes = [ ARIA_HIDDEN, TAB_INDEX, ARIA_CONTROLS, ARIA_LABEL, ARIA_CURRENRT, 'role' ];

	/**
	 * A11y component object.
	 *
	 * @type {Object}
	 */
	const A11y = {
		/**
		 * Required only when the accessibility option is true.
		 *
		 * @type {boolean}
		 */
		required: Splide.options.accessibility,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide
				.on( 'visible', Slide => { updateSlide( Slide.slide, true ) } )
				.on( 'hidden', Slide => { updateSlide( Slide.slide, false ) } )
				.on( 'arrows:mounted', initArrows )
				.on( 'arrows:updated', updateArrows )
				.on( 'pagination:mounted', initPagination )
				.on( 'pagination:updated', updatePagination )
				.on( 'refresh', () => { removeAttribute( Components.Clones.clones, allAttributes ) } );

			if ( Splide.options.isNavigation ) {
				Splide
					.on( 'navigation:mounted navigation:updated', initNavigation )
					.on( 'active', Slide => { updateNavigation( Slide, true ) } )
					.on( 'inactive', Slide => { updateNavigation( Slide, false ) } );
			}

			initAutoplay();
		},

		/**
		 * Destroy.
		 */
		destroy() {
			const Arrows = Components.Arrows;
			const arrows = Arrows ? Arrows.arrows : {};

			removeAttribute(
				Elements.slides.concat( [ arrows.prev, arrows.next, Elements.play, Elements.pause ] ),
				allAttributes
			);
		},
	};

	/**
	 * Update slide attributes when it gets visible or hidden.
	 *
	 * @param {Element} slide   - A slide element.
	 * @param {Boolean} visible - True when the slide gets visible, or false when hidden.
	 */
	function updateSlide( slide, visible ) {
		setAttribute( slide, ARIA_HIDDEN, ! visible );

		if ( Splide.options.slideFocus ) {
			setAttribute( slide, TAB_INDEX, visible ? 0 : -1 );
		}
	}

	/**
	 * Initialize arrows if they are available.
	 * Append screen reader elements and add aria-controls attribute.
	 *
	 * @param {Element} prev - Previous arrow element.
	 * @param {Element} next - Next arrow element.
	 */
	function initArrows( prev, next ) {
		const controls = Elements.track.id;

		setAttribute( prev, ARIA_CONTROLS, controls );
		setAttribute( next, ARIA_CONTROLS, controls );
	}

	/**
	 * Update arrow attributes.
	 *
	 * @param {Element} prev      - Previous arrow element.
	 * @param {Element} next      - Next arrow element.
	 * @param {number}  prevIndex - Previous slide index or -1 when there is no precede slide.
	 * @param {number}  nextIndex - Next slide index or -1 when there is no next slide.
	 */
	function updateArrows( prev, next, prevIndex, nextIndex ) {
		const index     = Splide.index;
		const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
		const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;

		setAttribute( prev, ARIA_LABEL, prevLabel );
		setAttribute( next, ARIA_LABEL, nextLabel );
	}

	/**
	 * Initialize pagination if it's available.
	 * Append a screen reader element and add aria-controls/label attribute to each item.
	 *
	 * @param {Object} data       - Data object containing all items.
	 * @param {Object} activeItem - An initial active item.
	 */
	function initPagination( data, activeItem ) {
		if ( activeItem ) {
			setAttribute( activeItem.button, ARIA_CURRENRT, true );
		}

		data.items.forEach( item => {
			const options  = Splide.options;
			const text     = options.focus === false && options.perPage > 1 ? i18n.pageX : i18n.slideX;
			const label    = sprintf( text, item.page + 1 );
			const button   = item.button;
			const controls = item.Slides.map( Slide => Slide.slide.id );

			setAttribute( button, ARIA_CONTROLS, controls.join( ' ' ) );
			setAttribute( button, ARIA_LABEL, label );
		} );
	}

	/**
	 * Update pagination attributes.
	 *
	 * @param {Object}  data - Data object containing all items.
	 * @param {Element} prev - A previous active element.
	 * @param {Element} curr - A current active element.
	 */
	function updatePagination( data, prev, curr ) {
		if ( prev ) {
			removeAttribute( prev.button, ARIA_CURRENRT );
		}

		if ( curr ) {
			setAttribute( curr.button, ARIA_CURRENRT, true );
		}
	}

	/**
	 * Initialize autoplay buttons.
	 */
	function initAutoplay() {
		[ 'play', 'pause' ].forEach( name => {
			const elm = Elements[ name ];

			if ( elm ) {
				if ( ! isButton( elm ) ) {
					setAttribute( elm, 'role', 'button' );
				}

				setAttribute( elm, ARIA_CONTROLS, Elements.track.id );
				setAttribute( elm, ARIA_LABEL, i18n[ name ] );
			}
		} );
	}

	/**
	 * Initialize navigation slider.
	 * Add button role, aria-label, aria-controls to slide elements and append screen reader text to them.
	 *
	 * @param {Splide} main - A main Splide instance.
	 */
	function initNavigation( main ) {
		Elements.each( Slide => {
			const slide     = Slide.slide;
			const realIndex = Slide.realIndex;

			if ( ! isButton( slide ) ) {
				setAttribute( slide, 'role', 'button' );
			}

			const slideIndex = realIndex > -1 ? realIndex : Slide.index;
			const label      = sprintf( i18n.slideX, slideIndex + 1 );
			const mainSlide  = main.Components.Elements.getSlide( slideIndex );

			setAttribute( slide, ARIA_LABEL, label );

			if ( mainSlide ) {
				setAttribute( slide, ARIA_CONTROLS, mainSlide.slide.id );
			}
		} );
	}

	/**
	 * Update navigation attributes.
	 *
	 * @param {Object}  Slide  - A target Slide object.
	 * @param {boolean} active - True if the slide is active or false if inactive.
	 */
	function updateNavigation( { slide }, active ) {
		if ( active ) {
			setAttribute( slide, ARIA_CURRENRT, true );
		} else {
			removeAttribute( slide, ARIA_CURRENRT );
		}
	}

	/**
	 * Check if the given element is button or not.
	 *
	 * @param {Element} elm - An element to be checked.
	 *
	 * @return {boolean} - True if the given element is button.
	 */
	function isButton( elm ) {
		return elm.tagName === 'BUTTON';
	}

	return A11y;
}