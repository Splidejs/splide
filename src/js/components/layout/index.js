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
	 * Whether the slider is vertical or not.
	 *
	 * @type {boolean}
	 */
	const isVertical = Splide.options.direction === TTB;

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

			// The word "size" means width for a horizontal slider and height for a vertical slider.
			this.totalSize = isVertical ? this.totalHeight : this.totalWidth;
			this.slideSize = isVertical ? this.slideHeight : this.slideWidth;
		},

		/**
		 * Destroy the component.
		 */
		destroy() {
			removeAttribute( [ Elements.list, Elements.track ], 'style' );
		},

		/**
		 * Return the slider height on the vertical mode or width on the horizontal mode.
		 *
		 * @return {number}
		 */
		get size() {
			return isVertical ? this.height : this.width;
		},
	}, isVertical ?	Vertical( Splide, Components ) : Horizontal( Splide, Components ) );

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
			.on( 'resize load', throttle( () => { Splide.emit( 'resize' ) }, Splide.options.throttle ), window )
			.on( 'resize', resize )
			.on( 'updated refresh', init );
	}

	/**
	 * Resize the track and slide elements.
	 */
	function resize() {
		const options = Splide.options;

		Layout.resize();

		applyStyle( Elements.track, { height: unit( Layout.height ) } );

		const slideHeight = options.autoHeight ? null : unit( Layout.slideHeight() );

		Elements.each( Slide => {
			applyStyle( Slide.container, { height: slideHeight } );

			applyStyle( Slide.slide, {
				width : options.autoWidth ? null : unit( Layout.slideWidth( Slide.index ) ),
				height: Slide.container ? null : slideHeight,
			} );
		} );
	}

	return Layout;
}