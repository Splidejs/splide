/**
 * The component for cloning some slides for "loop" mode of the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { addClass, removeAttribute, append, before, remove } from '../../utils/dom';
import { LOOP } from '../../constants/types';
import { TTB } from "../../constants/directions";
import { toPixel } from "../../utils/utils";


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
	 * Store the current clone count on one side.
	 *
	 * @type {number}
	 */
	let cloneCount = 0;

	/**
	 * Keep Elements component.
	 *
	 * @type {Object}
	 */
	const Elements = Components.Elements;

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
				init();

				Splide
					.on( 'refresh', init )
					.on( 'resize', () => {
						if ( cloneCount !== getCloneCount() ) {
							// Destroy before refresh not to collect clones by the Elements component.
							this.destroy();
							Splide.refresh();
						}
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
	 * Initialization.
	 */
	function init() {
		Clones.destroy();
		cloneCount = getCloneCount();
		generateClones( cloneCount );
	}

	/**
	 * Generate and append/prepend clones.
	 *
	 * @param {number} count - The half number of clones.
	 */
	function generateClones( count ) {
		const { length, register } = Elements;

		if ( length ) {
			let slides = Elements.slides;

			while ( slides.length < count ) {
				slides = slides.concat( slides );
			}

			// Clones after the last element.
			slides.slice( 0, count ).forEach( ( elm, index ) => {
				const clone = cloneDeeply( elm );
				append( Elements.list, clone );
				clones.push( clone );

				register( clone, index + length, index % length );
			} );

			// Clones before the first element.
			slides.slice( -count ).forEach( ( elm, index ) => {
				const clone = cloneDeeply( elm );
				before( clone, slides[0] );
				clones.push( clone );

				register( clone, index - count, ( length + index - count % length ) % length );
			} );
		}
	}

	/**
	 * Return half count of clones to be generated.
	 * Clone count is determined by:
	 * - "clones" value in the options.
	 * - Number of slides that can be placed in a view in "fixed" mode.
	 * - Max pages a flick action can move.
	 * - Whether the slide length is enough for perPage.
	 *
	 * @return {number} - Count for clones.
	 */
	function getCloneCount() {
		const options = Splide.options;

		if ( options.clones ) {
			return options.clones;
		}

		// Use the slide length in autoWidth mode because the number cannot be calculated.
		let baseCount = options.autoWidth || options.autoHeight ? Elements.length : options.perPage;

		const dimension = options.direction === TTB ? 'Height' : 'Width';
		const fixedSize = toPixel( Splide.root, options[ `fixed${ dimension }` ] );

		if ( fixedSize ) {
			// Roughly calculate the count. This needs not to be strict.
			baseCount = Math.ceil( Elements.track[ `client${ dimension }` ] / fixedSize );
		}

		return baseCount * ( options.drag ? options.flickMaxPages + 1 : 1 );
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