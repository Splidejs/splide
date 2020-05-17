/**
 * The component for handling pagination
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { create, remove, append, addClass, removeClass } from '../../utils/dom';
import { STATUS_CLASSES } from '../../constants/classes';

/**
 * The event name for updating some attributes of pagination nodes.
 *
 * @type {string}
 */
const ATTRIBUTES_UPDATE_EVENT = 'move.page';

/**
 * The event name for recreating pagination.
 *
 * @type {string}
 */
const UPDATE_EVENT = 'updated.page refresh.page';


/**
 * The component for handling pagination
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components, name ) => {
	/**
	 * Store all data for pagination.
	 * - list: A list element.
	 * - items: An array that contains objects(li, button, index, page).
	 *
	 * @type {Object}
	 */
	let data = {};

	/**
	 * Hold the Elements component.
	 *
	 * @type {Object}
	 */
	const Elements = Components.Elements;

	/**
	 * Pagination component object.
	 *
	 * @type {Object}
	 */
	const Pagination = {
		/**
		 * Called when the component is mounted.
		 */
		mount() {
			const pagination = Splide.options.pagination;

			if ( pagination ) {
				data = createPagination();

				const slider = Elements.slider;
				const parent = pagination === 'slider' && slider ? slider : Splide.root;
				append( parent, data.list );

				Splide.on( ATTRIBUTES_UPDATE_EVENT, updateAttributes );
			}

			Splide
				.off( UPDATE_EVENT )
				.on( UPDATE_EVENT, () => {
					Pagination.destroy();

					if ( Splide.options.pagination ) {
						Pagination.mount();
						Pagination.mounted();
					}
				} );
		},

		/**
		 * Called after all components are mounted.
		 */
		mounted() {
			if ( Splide.options.pagination ) {
				const index = Splide.index;
				Splide.emit( `${ name }:mounted`, data, this.getItem( index ) );
				updateAttributes( index, -1 );
			}
		},

		/**
		 * Destroy the pagination.
		 * Be aware that node.remove() is not supported by IE.
		 */
		destroy() {
			remove( data.list );

			if ( data.items ) {
				data.items.forEach( item => { Splide.off( 'click', item.button ) } );
			}

			// Do not remove UPDATE_EVENT to recreate pagination if needed.
			Splide.off( ATTRIBUTES_UPDATE_EVENT );

			data = {};
		},

		/**
		 * Return an item by index.
		 *
		 * @param {number} index - A slide index.
		 *
		 * @return {Object|undefined} - An item object on success or undefined on failure.
		 */
		getItem( index ) {
			return data.items[ Components.Controller.toPage( index ) ];
		},

		/**
		 * Return object containing pagination data.
		 *
		 * @return {Object} - Pagination data including list and items.
		 */
		get data() {
			return data;
		},
	};

	/**
	 * Update attributes.
	 *
	 * @param {number} index     - Active index.
	 * @param {number} prevIndex - Prev index.
	 */
	function updateAttributes( index, prevIndex ) {
		const prev   = Pagination.getItem( prevIndex );
		const curr   = Pagination.getItem( index );
		const active = STATUS_CLASSES.active;

		if ( prev ) {
			removeClass( prev.button, active );
		}

		if ( curr ) {
			addClass( curr.button, active );
		}

		Splide.emit( `${ name }:updated`, data, prev, curr );
	}

	/**
	 * Create a wrapper and button elements.
	 *
	 * @return {Object} - An object contains all data.
	 */
	function createPagination() {
		const options  = Splide.options;
		const classes  = Splide.classes;
		const list     = create( 'ul', { class: classes.pagination } );

		const items = Elements.getSlides( false )
			.filter( Slide => options.focus !== false || Slide.index % options.perPage === 0 )
			.map( ( Slide, page ) => {
				const li     = create( 'li', {} );
				const button = create( 'button', { class: classes.page, type: 'button' } );

				append( li, button );
				append( list, li );

				Splide.on( 'click', () => { Splide.go( `>${ page }` ) }, button );

				return { li, button, page, Slides: Elements.getSlidesByPage( page ) };
			} );

		return { list, items };
	}

	return Pagination;
}