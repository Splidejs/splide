/**
 * The component for cloning some slides for "loop" mode of the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { LOOP } from '../../constants/types';
import { addClass, removeAttribute, append, before, remove } from '../../utils/dom';


/**
 * The component for cloning some slides for "loop" mode of the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Store information of all clones.
	 *
	 * @type {Array}
	 */
	let clones = [];

	/**
	 * Clones component object.
	 *
	 * @type {Object}
	 */
	const Clones = {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			if ( Splide.is( LOOP ) ) {
				generateClones();

				Splide.on( 'refresh', () => {
					this.destroy();
					generateClones();
				} );
			}
		},

		/**
		 * Destroy.
		 */
		destroy() {
			remove( clones );
			clones = [];
		},

		/**
		 * Return all clones.
		 *
		 * @return {Element[]} - Cloned elements.
		 */
		get clones() {
			return clones;
		},

		/**
		 * Return clone length.
		 *
		 * @return {number} - A length of clones.
		 */
		get length() {
			return clones.length;
		},
	};

	/**
	 * Generate and append clones.
	 * Clone count is determined by:
	 * - Max pages a flick action can move.
	 * - Whether the slide length is enough for perPage.
	 */
	function generateClones() {
		const Slides = Components.Slides;
		const { perPage, drag, flickMaxPages } = Splide.options;
		const length = Slides.length;
		const count  = perPage * ( drag ? flickMaxPages + 1 : 1 ) + ( length < perPage ? perPage : 0 );

		if ( length ) {
			let slides = Slides.getSlides( false, false );

			while ( slides.length < count ) {
				slides = slides.concat( slides );
			}

			slides.slice( 0, count ).forEach( ( elm, index ) => {
				const clone = cloneDeeply( elm );
				append( Components.Elements.list, clone );
				clones.push( clone );

				Slides.register( index + length, index, clone );
			} );

			slides.slice( -count ).forEach( ( elm, index ) => {
				const clone = cloneDeeply( elm );
				before( clone, slides[0] );
				clones.push( clone );

				Slides.register( index - count, index, clone );
			} );
		}
	}

	/**
	 * Clone deeply the given element.
	 *
	 * @param {Element} elm - An element being duplicated.
	 *
	 * @return {Node} - A cloned node(element).
	 */
	function cloneDeeply( elm ) {
		const clone = elm.cloneNode( true );
		addClass( clone, Splide.classes.clone );

		// ID should not be duplicated.
		removeAttribute( clone, 'id' );
		return clone;
	}

	return Clones;
}