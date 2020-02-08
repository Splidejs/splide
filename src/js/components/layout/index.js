/**
 * The component for handing slide layouts and their sizes.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Horizontal from './directions/horizontal';
import Vertical from './directions/vertical';

import { unit } from '../../utils/utils';
import { throttle } from '../../utils/time';
import { applyStyle, removeAttribute } from '../../utils/dom';
import { assign } from "../../utils/object";
import { TTB } from "../../constants/directions";

/**
 * Interval time for throttle.
 *
 * @type {number}
 */
const THROTTLE = 100;


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
	const Layout = assign( {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			bind();
			init();
		},

		/**
		 * Destroy.
		 */
		destroy() {
			removeAttribute( [ Elements.list, Elements.track ], 'style' );
		},
	}, Splide.options.direction === TTB ?	Vertical( Splide, Components ) : Horizontal( Splide, Components ) );

	/**
	 * Init slider styles according to options.
	 */
	function init() {
		Layout.init();

		applyStyle( Splide.root, { maxWidth: unit( Splide.options.width ) } );
		Elements.each( Slide => { Slide.slide.style[ Layout.margin ] = unit( Layout.gap ) } );

		resize();
	}

	/**
	 * Listen the resize native event with throttle.
	 * Initialize when the component is mounted or options are updated.
	 */
	function bind() {
		Splide
			.on( 'resize load', throttle( () => { Splide.emit( 'resize' ) }, THROTTLE ), window )
			.on( 'resize', resize )
			.on( 'updated refresh', init );
	}

	/**
	 * Resize the list and slides including clones.
	 */
	function resize() {
		applyStyle( Elements.list, { width: unit( Layout.listWidth ), height: unit( Layout.listHeight ) } );
		applyStyle( Elements.track, { height: unit( Layout.height ) } );

		const slideHeight = unit( Layout.slideHeight() );

		Elements.each( Slide => {
			applyStyle( Slide.container, { height: slideHeight } );

			applyStyle( Slide.slide, {
				width : Splide.options.autoWidth ? null : unit( Layout.slideWidth( Slide.index ) ),
				height: Slide.container ? null : slideHeight,
			} );
		} );
	}

	return Layout;
}