/**
 * The component for handling a click event.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The component for handling a click event.
 * Click should be disabled during drag/swipe.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
	/**
	 * Whether click is disabled or not.
	 *
	 * @type {boolean}
	 */
	let disabled = false;

	/**
	 * Click component object.
	 *
	 * @type {Object}
	 */
	const Click = {
		/**
		 * Mount only when the drag is activated and the slide type is not "fade".
		 *
		 * @type {boolean}
		 */
		required: Splide.options.drag,

		/**
		 * Called when the component is mounted.
		 */
		mount() {
			Splide
				.on( 'click', onClick, Components.Elements.track, { capture: true } )
				.on( 'drag', () => { disabled = true } )
				.on( 'moved', () => { disabled = false } );
		},
	};

	/**
	 * Called when a track element is clicked.
	 *
	 * @param {Event} e - A click event.
	 */
	function onClick( e ) {
		if ( disabled ) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	}

	return Click;
}