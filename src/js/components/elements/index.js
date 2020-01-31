/**
 * The component for main elements.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { find, addClass, removeClass, child, remove, append, before, domify } from '../../utils/dom';
import { exist } from '../../utils/error';
import { values } from '../../utils/object';

/**
 * The property name for UID stored in a window object.
 *
 * @type {string}
 */
const UID_NAME = 'uid';


/**
 * The component for main elements.
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
		window.splide = window.splide || {};
		let uid = window.splide[ UID_NAME ] || 0;
		window.splide[ UID_NAME ] = ++uid;
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
		 * Destroy.
		 */
		destroy() {
			removeClass( root, getClasses() );
		},

		/**
		 * Insert a slide to a slider.
		 * Need to refresh Splide after adding a slide.
		 *
		 * @param {Node|string} slide - A slide element to be added.
		 * @param {number}      index - A slide will be added at the position.
		 */
		add( slide, index ) {
			if ( typeof slide === 'string' ) {
				slide = domify( slide );
			}

			if ( slide instanceof Element ) {
				const ref = this.slides[ index ];

				if ( ref ) {
					before( slide, ref );
					this.slides.splice( index, 0, slide );
				} else {
					append( this.list, slide );
					this.slides.push( slide );
				}
			}
		},

		/**
		 * Remove a slide from a slider.
		 * Need to refresh Splide after removing a slide.
		 *
		 * @param index - Slide index.
		 */
		remove( index ) {
			const slides = this.slides.splice( index, 1 );
			remove( slides[0] );
		},
	};

	/**
	 * Initialization.
	 * Assign ID to some elements if it's not available.
	 */
	function init() {
		Elements.track.id = Elements.track.id || `${ root.id }-track`;
		Elements.list.id  = Elements.list.id || `${ root.id }-list`;

		addClass( root, getClasses() );
	}

	/**
	 * Return class names for the root element.
	 */
	function getClasses() {
		const rootClass = classes.root;
		const options   = Splide.options;

		return [
			`${ rootClass }--${ options.type }`,
			`${ rootClass }--${ options.direction }`,
			options.drag ? `${ rootClass }--draggable` : '',
			options.isNavigation ? `${ rootClass }--nav` : '',
		];
	}

	/**
	 * Find parts only from children of the root or track.
	 *
	 * @return {Element|null} - A found element or null.
	 */
	function findParts( className ) {
		return child( root, className ) || child( Elements.slider, className );
	}

	return Elements;
}