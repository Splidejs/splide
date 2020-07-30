/**
 * The component for main elements.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Slide from './slide';
import {
	find,
	addClass,
	removeClass,
	child,
	children,
	remove,
	append,
	before,
	domify,
	applyStyle,
	loaded,
} from '../../utils/dom';
import { exist } from '../../utils/error';
import { pad } from "../../utils/utils";
import { STATUS_CLASSES } from "../../constants/classes";


/**
 * The property name for UID stored in a window object.
 *
 * @type {string}
 */
const UID_NAME = 'uid';


/**
 * The component for main elements.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */
export default ( Splide, Components ) => {
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

	/**
	 * Store Slide objects.
	 *
	 * @type {Array}
	 */
	let Slides = [];

	/*
	 * Assign unique ID to the root element if it doesn't have the one.
	 * Note that IE doesn't support padStart() to fill the uid by 0.
	 */
	if ( ! root.id ) {
		window.splide = window.splide || {};
		let uid = window.splide[ UID_NAME ] || 0;
		window.splide[ UID_NAME ] = ++uid;
		root.id = `splide${ pad( uid ) }`;
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
			this.init();

			Splide
				.on( 'refresh', () => {
					this.destroy();
					this.init();
				} ).on( 'updated', () => {
					removeClass( root, getClasses() );
					addClass( root, getClasses() );
				} );
		},

		/**
		 * Destroy.
		 */
		destroy() {
			Slides.forEach( Slide => { Slide.destroy() } );
			Slides = [];
			removeClass( root, getClasses() );
		},

		/**
		 * Initialization.
		 */
		init() {
			collect();
			addClass( root, getClasses() );

			this.slides.forEach( ( slide, index ) => {
				this.register( slide, index, -1 );
			} );
		},

		/**
		 * Register a slide to create a Slide object and handle its behavior.
		 *
		 * @param {Element} slide     - A slide element.
		 * @param {number}  index     - A unique index. This can be negative.
		 * @param {number}  realIndex - A real index for clones. Set -1 for real slides.
		 */
		register( slide, index, realIndex ) {
			const SlideObject = Slide( Splide, index, realIndex, slide );
			SlideObject.mount();
			Slides.push( SlideObject );
		},

		/**
		 * Return the Slide object designated by the index.
		 * Note that "find" is not supported by IE.
		 *
		 * @return {Object|undefined} - A Slide object if available. Undefined if not.
		 */
		getSlide( index ) {
			return Slides.filter( Slide => Slide.index === index )[0];
		},

		/**
		 * Return all Slide objects.
		 *
		 * @param {boolean} includeClones - Whether to include cloned slides or not.
		 *
		 * @return {Object[]} - Slide objects.
		 */
		getSlides( includeClones ) {
			return includeClones ? Slides : Slides.filter( Slide => ! Slide.isClone );
		},

		/**
		 * Return Slide objects belonging to the given page.
		 *
		 * @param {number} page - A page number.
		 *
		 * @return {Object[]} - An array containing Slide objects.
		 */
		getSlidesByPage( page ) {
			const idx     = Components.Controller.toIndex( page );
			const options = Splide.options;
			const max     = options.focus !== false ? 1 : options.perPage;

			return Slides.filter( ( { index } ) => idx <= index && index < idx + max );
		},

		/**
		 * Insert a slide to a slider.
		 * Need to refresh Splide after adding a slide.
		 *
		 * @param {Node|string} slide    - A slide element to be added.
		 * @param {number}      index    - A slide will be added at the position.
		 * @param {Function}    callback - Called right after the slide is added to the DOM tree.
		 */
		add( slide, index, callback ) {
			if ( typeof slide === 'string' ) {
				slide = domify( slide );
			}

			if ( slide instanceof Element ) {
				const ref = this.slides[ index ];

				// This will be removed in mount() of a Slide component.
				applyStyle( slide, { display: 'none' } );

				if ( ref ) {
					before( slide, ref );
					this.slides.splice( index, 0, slide );
				} else {
					append( this.list, slide );
					this.slides.push( slide );
				}

				loaded( slide, () => { callback && callback( slide ) } );
			}
		},

		/**
		 * Remove a slide from a slider.
		 * Need to refresh Splide after removing a slide.
		 *
		 * @param index - Slide index.
		 */
		remove( index ) {
			remove( this.slides.splice( index, 1 )[0] );
		},

		/**
		 * Trigger the provided callback for each Slide object.
		 *
		 * @param {Function} callback - A callback function. The first argument will be the Slide object.
		 */
		each( callback ) {
			Slides.forEach( callback );
		},

		/**
		 * Return slides length without clones.
		 *
		 * @return {number} - Slide length.
		 */
		get length() {
			return this.slides.length;
		},

		/**
		 * Return "SlideObjects" length including clones.
		 *
		 * @return {number} - Slide length including clones.
		 */
		get total() {
			return Slides.length;
		},
	};

	/**
	 * Collect elements.
	 */
	function collect() {
		Elements.slider = child( root, classes.slider );
		Elements.track  = find( root, `.${ classes.track }` );
		Elements.list   = child( Elements.track, classes.list );

		exist( Elements.track && Elements.list, 'Track or list was not found.' );

		Elements.slides = children( Elements.list, classes.slide );

		const arrows = findParts( classes.arrows );
		Elements.arrows = {
			prev: find( arrows, `.${ classes.prev }` ),
			next: find( arrows, `.${ classes.next }` ),
		};

		const autoplay = findParts( classes.autoplay );
		Elements.bar   = find( findParts( classes.progress ), `.${ classes.bar }` );
		Elements.play  = find( autoplay, `.${ classes.play }` );
		Elements.pause = find( autoplay, `.${ classes.pause }` );

		Elements.track.id = Elements.track.id || `${ root.id }-track`;
		Elements.list.id  = Elements.list.id || `${ root.id }-list`;
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
			STATUS_CLASSES.active,
		];
	}

	/**
	 * Find parts only from children of the root or track.
	 *
	 * @return {Element} - A found element or undefined.
	 */
	function findParts( className ) {
		return child( root, className ) || child( Elements.slider, className );
	}

	return Elements;
}