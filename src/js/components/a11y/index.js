/**
 * The component for enhancing accessibility.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { create, setAttribute, removeAttribute } from '../../utils/dom';
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
	 * Hold elements for screen reader text.
	 *
	 * @type {Element}
	 */
	let prevSrt, nextSrt;

	/**
	 * Hold a i18n object.
	 *
	 * @type {Object}
	 */
	const i18n = Splide.i18n;

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
				.on( 'pagination:updated', updatePagination );

			if ( Splide.options.isNavigation ) {
				Splide
					.on( 'navigation:mounted', initNavigation )
					.on( 'active', Slide => { updateNavigation( Slide, true ) } )
					.on( 'inactive', Slide => { updateNavigation( Slide, false ) } );
			}
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
		setAttribute( slide, TAB_INDEX, visible ? 0 : -1 );
	}

	/**
	 * Initialize arrows if they are available.
	 * Append screen reader elements and add aria-controls attribute.
	 *
	 * @param {Element} prev - Previous arrow element.
	 * @param {Element} next - Next arrow element.
	 */
	function initArrows( prev, next ) {
		prevSrt = createSrt( i18n.prev );
		nextSrt = createSrt( i18n.next );

		prev.appendChild( prevSrt );
		next.appendChild( nextSrt );

		const controls = Components.Elements.track.id;

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
		const index = Splide.index;
		const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
		const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;

		prevSrt.innerHTML = prevLabel;
		nextSrt.innerHTML = nextLabel;

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
			const text     = ! options.focus && options.perView > 1 ? i18n.pageX : i18n.slideX;
			const label    = sprintf( text, item.page + 1 );
			const srt      = createSrt( label );
			const button   = item.button;
			const controls = [];

			button.appendChild( srt );
			item.Slides.forEach( Slide => { controls.push( Slide.slide.id ) } );

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
	 * Initialize navigation slider.
	 * Add button role, aria-label, aria-controls to slide elements and append screen reader text to them.
	 *
	 * @param {Splide} main - A main Splide instance.
	 */
	function initNavigation( main ) {
		const Slides = Components.Slides.getSlides( true, true );

		Slides.forEach( Slide => {
			const slide = Slide.slide;

			if ( slide.tagName.toLowerCase() !== 'button' ) {
				setAttribute( slide, 'role', 'button' )
			}

			const realIndex = Slide.realIndex;
			const label     = sprintf( i18n.slideX, realIndex + 1 );
			const mainSlide = main.Components.Slides.getSlide( realIndex );

			setAttribute( slide, ARIA_LABEL, label );
			slide.appendChild( createSrt( label ) );

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
	 * Create an element for screen reader text.
	 *
	 * @param {string} text - A screen reader text.
	 *
	 * @return {Element} - A created element.
	 */
	function createSrt( text ) {
		const srt = create( 'span', { class: Splide.classes.sr } );
		srt.textContent = text;
		return srt;
	}

	return A11y;
}