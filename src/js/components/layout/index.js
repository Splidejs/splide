/**
 * The component for handing slide layouts and their sizes.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Horizontal from './resolvers/horizontal';
import Vertical from './resolvers/vertical';

import { unit } from '../../utils/utils';
import { throttle } from '../../utils/time';
import { subscribe, applyStyle } from '../../utils/dom';

/**
 * Interval time for throttle.
 *
 * @type {number}
 */
const THROTTLE = 30;


/**
 * The component for handing slide layouts and their sizes.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store the root element.
	 *
	 * @type {Element}
	 */
	const root = Splide.root;

	/**
	 * Store the list element.
	 *
	 * @type {Element}
	 */
	let list;

	/**
	 * Store all Slide objects.
	 *
	 * @type {Object}
	 */
	let Slides;

	/**
	 * Hold a resolver object.
	 *
	 * @type {Object}
	 */
	let Resolver;

	/**
	 * Whether the slider is vertical or not.
	 * @type {boolean}
	 */
	const isVertical = Splide.options.direction === 'ttb';

	/**
	 * Keep the Elements component.
	 *
	 * @type {string}
	 */
	const Elements = Components.Elements;

	/**
	 * Layout component object.
	 *
	 * @type {Object}
	 */
	const Layout = {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			list   = Elements.list;
			Slides = Components.Slides.getSlides( true, true );

			bind();
			init();
		},

		/**
		 * Return slider width without padding.
		 *
		 * @return {number} - Current slide width.
		 */
		get width() {
			return Resolver.width;
		},

		/**
		 * Return slider height without padding.
		 *
		 * @return {number}
		 */
		get height() {
			return Resolver.height;
		},

		/**
		 * Return list width.
		 *
		 * @return {number} - Current list width.
		 */
		get listWidth() {
			return Resolver.listWidth;
		},

		/**
		 * Return list height.
		 *
		 * @return {number} - Current list height.
		 */
		get listHeight() {
			return Resolver.listHeight;
		},

		/**
		 * Return slide width including gap size.
		 * Note that slideWidth * perPage is NOT equal to slider width.
		 *
		 * @return {number} - Current slide width including gap size.
		 */
		get slideWidth() {
			return Resolver.slideWidth;
		},

		/**
		 * Return slide height.
		 *
		 * @return {number} - Computed slide height.
		 */
		get slideHeight() {
			return Resolver.slideHeight;
		},

		/**
		 * Return gap in px.
		 *
		 * @return {Object} - Gap amount in px.
		 */
		get gap() {
			return Resolver.gap;
		},

		/**
		 * Return padding object.
		 *
		 * @return {Object} - An object containing padding left and right in horizontal mode
		 *                    or top and bottom in vertical one.
		 */
		get padding() {
			return Resolver.padding;
		},
	};

	/**
	 * Init slider styles according to options.
	 */
	function init() {
		const options = Splide.options;

		if ( isVertical ) {
			Resolver = Vertical( Splide, Components, options );
		} else {
			Resolver = Horizontal( Splide, Components, options );
		}

		Resolver.init();

		applyStyle( root, { maxWidth: unit( options.width ) } );

		for ( const i in Slides ) {
			applyStyle( Slides[ i ].slide, { [ Resolver.marginProp ]: unit( options.gap ) } )
		}

		resize();
	}

	/**
	 * Listen the resize native event with throttle.
	 * Initialize when the component is mounted or options are updated.
	 */
	function bind() {
		const throttledResize = throttle( () => { Splide.emit( 'resize' ) }, THROTTLE );
		subscribe( window, 'resize', throttledResize );
		Splide.on( 'mounted resize', resize ).on( 'updated', init );

		if ( ! isVertical ) {
			Splide.on( 'mounted resize', updatePerPage );
		}
	}

	/**
	 * Resize the list and slides including clones.
	 */
	function resize() {
		applyStyle( list, { width: unit( Layout.listWidth ), height: unit( Layout.listHeight ) } );
		applyStyle( Components.Elements.track, { height: unit( Layout.height ) } );

		const slideWidth  = unit( Resolver.slideWidth );
		const slideHeight = unit( Resolver.slideHeight );

		for ( let i in Slides ) {
			const { slide, container } = Slides[ i ];

			applyStyle( container, { height: slideHeight } );
			applyStyle( slide, { width: slideWidth,	height: ! container ? slideHeight : '' } );
		}
	}

	/**
	 * Update the perPage number automatically according to the fixedWidth.
	 */
	function updatePerPage() {
		const options = Splide.options;

		if ( options.fixedWidth ) {
			const perPage = Math.floor( ( Layout.width + Resolver.gap ) / ( Layout.slideWidth + Resolver.gap ) ) || 1;

			if ( options.perPage !== perPage ) {
				Splide.options = { perPage };
			}
		}
	}

	return Layout;
}