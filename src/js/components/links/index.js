/**
 * The component for disabling a link while a slider is dragged.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { values } from "../../utils/object";
import { removeAttribute, setAttribute, getAttribute } from "../../utils/dom";
import { FADE } from "../../constants/types";

/**
 * The name for a data attribute.
 *
 * @type {string}
 */
const HREF_DATA_NAME = 'data-splide-href';


/**
 * The component for disabling a link while a slider is dragged.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold all anchor elements under the list.
	 *
	 * @type {Array}
	 */
	let links = [];

	/**
	 * Links component object.
	 *
	 * @type {Object}
	 */
	const Links = {
		/**
		 * Mount only when the drag is activated and the slide type is not "fade".
		 *
		 * @type {boolean}
		 */
		required: Splide.options.drag && ! Splide.is( FADE ),

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			links = values( Components.Elements.list.getElementsByTagName( 'a' ) );
			links.forEach( link => { setAttribute( link, HREF_DATA_NAME, getAttribute( link, 'href' ) ) } );
			bind();
		},
	};

	/**
	 * Listen some events.
	 */
	function bind() {
		Splide.on( 'drag', disable );
		Splide.on( 'moved', enable );
	}

	/**
	 * Disable links by removing href attributes.
	 */
	function disable() {
		links.forEach( link => removeAttribute( link, 'href' ) );
	}

	/**
	 * Enable links by restoring href attributes.
	 */
	function enable() {
		links.forEach( link => setAttribute( link, 'href', getAttribute( link, HREF_DATA_NAME ) ) );
	}

	return Links;
}