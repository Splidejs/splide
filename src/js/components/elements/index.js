/**
 * The component for the root element.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { find, addClass, child } from '../../utils/dom';
import { exist } from '../../utils/error';
import { values } from '../../utils/object';

/**
 * The property name for UID stored in a window object.
 *
 * @type {string}
 */
const UID_NAME = 'splideUid';


/**
 * The component for the root element.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
export default ( Splide ) => {
	/**
	 * Hold the root element.
	 *
	 * @type {Element}
	 */
	const root = Splide.root;

	/**
	 * Hold the class list.
	 *
	 * @type {Object}
	 */
	const classes = Splide.classes;

	/*
	 * Assign unique ID to the root element if it doesn't have the one.
	 * Note that IE doesn't support padStart() to fill the uid by 0.
	 */
	if ( ! root.id ) {
		let uid = window[ UID_NAME ] || 0;
		window[ UID_NAME ] = ++uid;
		root.id = `splide${ uid < 10 ? '0' + uid : uid }`;
	}

	/**
	 * Elements component object.
	 *
	 * @type {Object}
	 */
	const Elements = {
		/**
		 * Called when the component is mounted.
		 * Collect main elements and store them as member properties.
		 */
		mount() {
			const message = 'was not found.';

			this.slider = child( root, classes.slider );

			this.track = find( root, `.${ classes.track }` );
			exist( this.track, `A track ${ message }` );

			this.list = child( this.track, classes.list );
			exist( this.list, `A list ${ message }` );

			this.slides = values( this.list.children );
			exist( this.slides.length, `A slide ${ message }` );

			const arrows = findParts( classes.arrows );
			this.arrows = {
				prev: find( arrows, `.${ classes.prev }` ),
				next: find( arrows, `.${ classes.next }` ),
			};

			const autoplay = findParts( classes.autoplay );
			this.bar   = find( findParts( classes.progress ), `.${ classes.bar }` );
			this.play  = find( autoplay, `.${ classes.play }` );
			this.pause = find( autoplay, `.${ classes.pause }` );

			init();
		},

		/**
		 * Called after all components are mounted.
		 */
		mounted() {
			const rootClass = classes.root;
			const options   = Splide.options;

			addClass(
				root,
				`${ rootClass }`,
				`${ rootClass }--${ options.type }`,
				`${ rootClass }--${ options.direction }`,
				options.drag ? `${ rootClass }--draggable` : '',
				options.isNavigation ? `${ rootClass }--nav` : ''
			);
		},
	};

	/**
	 * Find parts only from children of the root or track.
	 *
	 * @return {Element|null} - A found element or null.
	 */
	function findParts( className ) {
		return child( root, className ) || child( Elements.slider, className );
	}

	/**
	 * Initialization.
	 * Assign ID to some elements if it's not available.
	 */
	function init() {
		if ( ! Elements.track.id ) {
			Elements.track.id = `${ root.id }-track`;
		}

		if ( ! Elements.list.id ) {
			Elements.list.id = `${ root.id }-list`;
		}
	}
	
	return Elements;
}