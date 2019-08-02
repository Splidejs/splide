/**
 * The component for handling all slides including clones.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Slide from './slide';


/**
 * The component for handling all slides including clones.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store slide elements.
	 *
	 * @type {Array}
	 */
	let slides = [];

	/**
	 * Store slide instances.
	 *
	 * @type {Array}
	 */
	let Slides = [];

	return {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			slides = Components.Elements.slides;

			for ( const i in slides ) {
				this.register( parseInt( i ), -1, slides[ i ] );
			}
		},

		/**
		 * Register a slide to create a Slide object and handle its behavior.
		 *
		 * @param {number}  index     - A unique index.
		 * @param {number}  realIndex - A real index for clones. Set -1 for real slides.
		 * @param {Element} slide     - A slide element.
		 */
		register( index, realIndex, slide ) {
			const slideObject = Slide( index, realIndex, slide, Splide );
			slideObject.init();
			Slides.push( slideObject );
		},

		/**
		 * Return the Slide object designated by the index.
		 *
		 * @return {Object|undefined} - A Slide object if available. Undefined if not.
		 */
		getSlide( index ) {
			return Slides.filter( Slide => Slide.index === index )[ 0 ];
		},

		/**
		 * Return slide elements.
		 *
		 * @param {boolean} includeClones - Whether to include cloned slides or not.
		 * @param {boolean} objects       - Whether to return elements or Slide objects
		 *
		 * @return {Object[]|Element[]} - Slide objects or elements.
		 */
		getSlides( includeClones, objects ) {
			if ( objects ) {
				return includeClones ? Slides : Slides.filter( Slide => ! Slide.isClone );
			}

			return includeClones ? Slides.map( Slide => Slide.slide ) : slides;
		},

		/**
		 * Return Slide objects belonging to the given page.
		 *
		 * @param {number} page - A page number.
		 *
		 * @return {Object[]} - An array containing Slide objects.
		 */
		getSlidesByPage( page ) {
			const idx     = Components.Controller.pageToIndex( page );
			const options = Splide.options;
			const max     = options.focus !== false ? 1 : options.perPage;

			return Slides.filter( ( { index } ) => idx <= index && index < idx + max );
		},

		/**
		 * Return slides length without clones.
		 *
		 * @return {number} - Slide length.
		 */
		get length() {
			return slides.length;
		},

		/**
		 * Return "Slides" length including clones.
		 *
		 * @return {number} - Slide length including clones.
		 */
		get total() {
			return Slides.length;
		},
	};
}