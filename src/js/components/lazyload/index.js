/**
 * The component for loading slider images lazily.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { STATUS_CLASSES } from '../../constants/classes';
import { create, remove, append, find, addClass, removeClass, setAttribute, getAttribute, applyStyle } from '../../utils/dom';

/**
 * The name for a data attribute.
 *
 * @type {string}
 */
const SRC_DATA_NAME = 'data-splide-lazy';


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
	let nextIndex = 0;

	/**
	 * Store objects containing an img element and a Slide object.
	 *
	 * @type {Object[]}
	 */
	let images = [];

	/**
	 * Store a lazyload option value.
	 *
	 * @type {string|boolean}
	 */
	const lazyload = Splide.options.lazyLoad;

	/**
	 * Whether to load images sequentially or not.
	 *
	 * @type {boolean}
	 */
	const isSequential = lazyload === 'sequential';

	/**
	 * Whether to stop sequential load.
	 *
	 * @type {boolean}
	 */
	let stop = false;

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
		required: lazyload,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Components.Slides.getSlides( true, true ).forEach( Slide => {
				const img = find( Slide.slide, `[${ SRC_DATA_NAME }]` );

				if ( img ) {
					images.push( { img, Slide } );
					applyStyle( img, { visibility: 'hidden' } );
				}
			} );

			if ( images.length ) {
				if ( isSequential ) {
					loadNext();
				} else {
					Splide.on( `mounted moved.${ name }`, index => { check( index || Splide.index ) } );
				}
			}
		},

		/**
		 * Destroy.
		 */
		destroy() {
			stop = true;
		},
	};

	/**
	 * Check how close each image is from the active slide and
	 * determine whether to start loading or not, according to the distance.
	 *
	 * @param {number} index - Current index.
	 */
	function check( index ) {
		const options = Splide.options;

		images = images.filter( image => {
			if ( image.Slide.isWithin( index, options.perPage * ( options.preloadPages + 1 ) ) ) {
				load( image.img, image.Slide );
				return false;
			}
			return true;
		} );

		// Unbind if all images are loaded.
		if ( ! images.length ) {
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

		setAttribute( img, 'src', getAttribute( img, SRC_DATA_NAME ) );
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
			applyStyle( img, { visibility: 'visible' } );
			Splide.emit( `${ name }:loaded`, img );
		}

		if ( isSequential && ! stop ) {
			loadNext();
		}
	}

	return Lazyload;
}