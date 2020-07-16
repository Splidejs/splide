/**
 * The component for loading slider images lazily.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { STATUS_CLASSES } from '../../constants/classes';
import {
	create,
	remove,
	append,
	addClass,
	removeClass,
	setAttribute,
	getAttribute,
	applyStyle,
} from '../../utils/dom';
import { each } from "../../utils/object";

/**
 * The name for a data attribute of src.
 *
 * @type {string}
 */
const SRC_DATA_NAME = 'data-splide-lazy';

/**
 * The name for a data attribute of srcset.
 *
 * @type {string}
 */
const SRCSET_DATA_NAME = 'data-splide-lazy-srcset';

/**
 * The component for loading slider images lazily.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components, name ) => {
	/**
	 * Next index for sequential loading.
	 *
	 * @type {number}
	 */
	let nextIndex;

	/**
	 * Store objects containing an img element and a Slide object.
	 *
	 * @type {Object[]}
	 */
	let images;

	/**
	 * Store the options.
	 *
	 * @type {Object}
	 */
	const options = Splide.options;

	/**
	 * Whether to load images sequentially or not.
	 *
	 * @type {boolean}
	 */
	const isSequential = options.lazyLoad === 'sequential';

	/**
	 * Lazyload component object.
	 *
	 * @type {Object}
	 */
	const Lazyload = {
		/**
		 * Mount only when the lazyload option is provided.
		 *
		 * @type {boolean}
		 */
		required: options.lazyLoad,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide.on( 'mounted refresh', () => {
				init();

				Components.Elements.each( Slide => {
					each( Slide.slide.querySelectorAll( `[${ SRC_DATA_NAME }], [${ SRCSET_DATA_NAME }]` ), img => {
						if ( ! img.src && ! img.srcset ) {
							images.push( { img, Slide } );
							applyStyle( img, { display: 'none' } );
						}
					} );
				} );

				if ( isSequential ) {
					loadNext();
				}
			} );

			if ( ! isSequential ) {
				Splide.on( `mounted refresh moved.${ name }`, check );
			}
		},

		/**
		 * Destroy.
		 */
		destroy: init,
	};

	/**
	 * Initialize parameters.
	 */
	function init() {
		images    = [];
		nextIndex = 0;
	}

	/**
	 * Check how close each image is from the active slide and
	 * determine whether to start loading or not, according to the distance.
	 *
	 * @param {number} index - Current index.
	 */
	function check( index ) {
		index = isNaN( index ) ? Splide.index : index;

		images = images.filter( image => {
			if ( image.Slide.isWithin( index, options.perPage * ( options.preloadPages + 1 ) ) ) {
				load( image.img, image.Slide );
				return false;
			}
			return true;
		} );

		// Unbind if all images are loaded.
		if ( ! images[0] ) {
			Splide.off( `moved.${ name }` );
		}
	}

	/**
	 * Start loading an image.
	 * Creating a clone of the image element since setting src attribute directly to it
	 * often occurs 'hitch', blocking some other processes of a browser.
	 *
	 * @param {Element} img   - An image element.
	 * @param {Object}  Slide - A Slide object.
	 */
	function load( img, Slide ) {
		addClass( Slide.slide, STATUS_CLASSES.loading );

		const spinner = create( 'span', { class: Splide.classes.spinner } );
		append( img.parentElement, spinner );

		img.onload  = () => { loaded( img, spinner, Slide, false ) };
		img.onerror = () => { loaded( img, spinner, Slide, true ) };

		setAttribute( img, 'srcset', getAttribute( img, SRCSET_DATA_NAME ) || '' );
		setAttribute( img, 'src', getAttribute( img, SRC_DATA_NAME ) || '' );
	}

	/**
	 * Start loading a next image in images array.
	 */
	function loadNext() {
		if ( nextIndex < images.length ) {
			const image = images[ nextIndex ];
			load( image.img, image.Slide );
		}

		nextIndex++;
	}

	/**
	 * Called just after the image was loaded or loading was aborted by some error.
	 *
	 * @param {Element} img     - An image element.
	 * @param {Element} spinner - A spinner element.
	 * @param {Object}  Slide   - A Slide object.
	 * @param {boolean} error   - True if the image was loaded successfully or false on error.
	 */
	function loaded( img, spinner, Slide, error ) {
		removeClass( Slide.slide, STATUS_CLASSES.loading );

		if ( ! error ) {
			remove( spinner );
			applyStyle( img, { display: '' } );
			Splide.emit( `${ name }:loaded`, img ).emit( 'resize' );
		}

		if ( isSequential ) {
			loadNext();
		}
	}

	return Lazyload;
}