/**
 * The component for appending prev/next arrows.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { create, subscribe } from '../../utils/dom';
import { XML_NAME_SPACE, PATH, SIZE } from './path';


/**
 * The component for appending prev/next arrows.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components, name ) => {
	/**
	 * Keep all created elements.
	 *
	 * @type {Object}
	 */
	let arrows;

	/**
	 * Store the class list.
	 *
	 * @type {Object}
	 */
	const classes = Splide.classes;

	/**
	 * Hold the root element.
	 *
	 * @type {Element}
	 */
	const root = Splide.root;

	/**
	 * Arrows component object.
	 *
	 * @type {Object}
	 */
	const Arrows = {
		/**
		 * Required when the arrows option is true or arrow elements were found.
		 *
		 * @return {boolean} - True if the option is true or arrow elements were found.
		 */
		required: Splide.options.arrows
			|| ( Components.Elements.arrows && Components.Elements.arrows.prev && Components.Elements.arrows.next ),

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			const Elements = Components.Elements;
			arrows = Elements.arrows;

			// If arrows were not found in HTML, let's generate them.
			if ( ( ! arrows.prev || ! arrows.next ) && Splide.options.arrows ) {
				arrows = createArrows();
				root.insertBefore( arrows.wrapper, Elements.track );
			}

			if ( arrows ) {
				listen();
				bind();
			}

			this.arrows = arrows;
		},

		/**
		 * Called after all components are mounted.
		 */
		mounted() {
			Splide.emit( `${ name }:mounted`, arrows.prev, arrows.next );
		},
	};

	/**
	 * Subscribe click events.
	 */
	function listen() {
		const perMove = Splide.options.perMove;
		subscribe( arrows.prev, 'click', () => { Splide.go( perMove ? `-${ perMove }` : '<' ) } );
		subscribe( arrows.next, 'click', () => { Splide.go( perMove ? `+${ perMove }` : '>' ) } );
	}

	/**
	 * Update a disable attribute.
	 */
	function bind() {
		Splide.on( 'mounted move updated', () => {
			const { prev, next } = arrows;
			const { prevIndex, nextIndex } = Components.Controller;
			const isSame = prevIndex === nextIndex;

			prev.disabled = prevIndex < 0 || isSame;
			next.disabled = nextIndex < 0 || isSame;

			Splide.emit( `${ name }:updated`, prev, next, prevIndex, nextIndex );
		} );
	}

	/**
	 * Create a wrapper and arrow elements.
	 *
	 * @return {Object} - An object contains created elements.
	 */
	function createArrows() {
		const wrapper = create( 'div', { class: classes.arrows } );
		const prev    = createArrow( true );
		const next    = createArrow( false );

		wrapper.appendChild( prev );
		wrapper.appendChild( next );

		return { wrapper, prev, next };
	}

	/**
	 * Create an arrow element.
	 *
	 * @param {boolean} isPrev - Determine to create a prev arrow or next arrow.
	 *
	 * @return {Element} - A created arrow element.
	 */
	function createArrow( isPrev ) {
		const arrow = create( 'button', {
			class: `${ classes.arrow } ${ isPrev ? classes.prev : classes.next }`,
		} );

		arrow.innerHTML = `<svg xmlns="${ XML_NAME_SPACE }"	viewBox="0 0 ${ SIZE } ${ SIZE }"	width="${ SIZE }"	height="${ SIZE }">`
			+ `<path d="${ Splide.options.arrowPath || PATH }" />`
			+ `</svg>`;

		return arrow;
	}

	return Arrows;
}