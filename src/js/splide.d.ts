/**
 * Type definitions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Type for a splide slider type.
 */
export type SplideType = 'slide' | 'loop' | 'fade';

/**
 * Type for a splide slider direction.
 */
export type SplideDirection = 'ltr' | 'rtl' | 'ttb';

/**
 * Type for a lazy load.
 */
export type LazyLoadType = 'nearby' | 'sequential';

/**
 * Type for an event name.
 */
export type SplideEvent = 'mounted' | 'updated' | 'move' | 'moved' | 'drag' | 'dragged' | 'visible' | 'hidden'
	| 'active' | 'inactive' | 'arrows:mounted' | 'arrows:updated' | 'pagination:mounted' | 'pagination:updated'
	| 'navigation:mounted' | 'autoplay:play' | 'autoplay:pause' | 'autoplay:playing' | 'lazyload:loaded';

/**
 * Options for each breakpoint.
 */
export interface BreakpointOptions {
	/**
	 * @default false
	 */
	rewind?: boolean;

	/**
	 * @default 400
	 */
	speed?: number;

	/**
	 * @default 0
	 */
	width?: number | string;

	/**
	 * @default 0
	 */
	height?: number | string;

	/**
	 * @default 0
	 */
	fixedWidth?: number | string;

	/**
	 * @default 0
	 */
	fixedHeight?: number | string;

	/**
	 * @default 0
	 */
	heightRatio?: number;

	/**
	 * @default 0
	 */
	perPage?: number;

	/**
	 * @default 0
	 */
	perMove?: number;

	/**
	 * @default 0
	 */
	clones?: number;

	/**
	 * @default false
	 */
	focus?: boolean | number | 'center';

	/**
	 * @default 0
	 */
	gap?: number | string;

	/**
	 * @default 0
	 */
	padding?: number
		| string
		| { left: number | string, right: number | string }
		| { top: number | string, bottom: number | string };

	/**
	 * @default true
	 */
	pagination?: boolean;

	/**
	 * @default 'cubic-bezier(.42,.65,.27,.99)'
	 */
	easing?: string;

	/**
	 * @default true
	 */
	drag?: boolean;

	/**
	 * @default false
	 */
	destroy?: boolean;
}

/**
 * All options.
 */
export interface SplideOptions extends BreakpointOptions {
	/**
	 * @default 'slide'
	 */
	type?: SplideType;

	/**
	 * @default 0
	 */
	rewindSpeed?: number;

	/**
	 * @default false
	 */
	waitForTransition?: boolean,

	/**
	 * @default false
	 */
	autoWidth?: boolean,

	/**
	 * @default false
	 */
	autoHeight?: boolean,

	/**
	 * @default 0
	 */
	start?: number;

	/**
	 * @default true
	 */
	arrows?: boolean;

	/**
	 * @default ''
	 */
	arrowPath?: string,

	/**
	 * @default false
	 */
	autoplay?: boolean;

	/**
	 * @default 5000
	 */
	interval?: number;

	/**
	 * @default true
	 */
	pauseOnHover?: boolean;

	/**
	 * @default true
	 */
	pauseOnFocus?: boolean;

	/**
	 * @default true
	 */
	resetProgress?: boolean;

	/**
	 * @default false
	 */
	lazyLoad?: false | LazyLoadType;

	/**
	 * @default 1
	 */
	preloadPages?: number;

	/**
	 * @default 'global'
	 */
	keyboard?: 'global' | 'focused' | boolean;

	/**
	 * @default 30
	 */
	dragAngleThreshold?: number;

	/**
	 * @default 150
	 */
	swipeDistanceThreshold?: number;

	/**
	 * @default 0.6
	 */
	flickVelocityThreshold?: number;

	/**
	 * @default 600
	 */
	flickPower?: number;

	/**
	 * @default {number}
	 */
	flickMaxPages?: number;

	/**
	 * @default {string}
	 */
	direction?: SplideDirection;

	/**
	 * @default false
	 */
	cover?: boolean;

	/**
	 * @default true
	 */
	accessibility?: boolean;

	/**
	 * @default true
	 */
	slideFocus?: true,

	/**
	 * @default false
	 */
	isNavigation?: boolean;

	/**
	 * @default true
	 */
	trimSpace?: boolean | 'move';

	/**
	 * @default false
	 */
	updateOnMove?: boolean;

	/**
	 * @default 100
	 */
	throttle?: number;

	/**
	 * @default false
	 */
	breakpoints?: boolean | { [ breakpoint: number ]: BreakpointOptions };

	classes?: { [ key: string ]: string };

	i18n?: { [ key: string ]: string };
}

/**
 * Interface for an event object.
 * It is created by Event constructor.
 */
export interface EventObject {
	on( events: SplideEvent, handler: ( ...args: any ) => void ): void;
	on( events: string, handler: ( ...args: any ) => void ): void;
	on<K extends keyof ElementEventMap>(
		events: K,
		handler: ( e: ElementEventMap[K] ) => void,
		elm?: HTMLElement | Window | Document,
		options?: boolean | AddEventListenerOptions
	): void;
	on(
		events: string,
		handler: ( e: Event ) => void,
		elm?: HTMLElement | Window | Document,
		options?: boolean | AddEventListenerOptions
	): void;

	off( SplideEvent: string ): void;
	off( events: string ): void;
	off( events: string, elm?: Element | Window | Document ): void;

	emit( events: string, ...args: any ): void;

	destroy();
}

/**
 * Collection of Splide states.
 */
export type StateMap = {
	CREATED  : 1;
	MOUNTED  : 2;
	IDLE     : 3;
	MOVING   : 4;
	DESTROYED: 5;
};

/**
 * Type for a Splide state.
 */
export type SplideState = StateMap[ keyof StateMap ];

/**
 * Interface for a State object.
 * It is created by the State constructor.
 */
export interface StateObject {
	set( state: SplideState ): void;
	set( state: string | number ): void;

	is( state: SplideState ): boolean;
	is( state: string | number ): boolean;
}

/**
 * Interface for a general component.
 */
export interface Component {
	required?: boolean;

	mount?(): void;
	mounted?(): void;
	destroy?( completely?: boolean ): void;
}

/**
 * Collection of built-in components including Transition.
 */
export interface EssentialComponentCollection {
	Options?: Options;
	Breakpoints?: Breakpoints;
	Controller?: Controller;
	Elements?: Elements;
	Track?: Track;
	Clones?: Clones;
	Layout?: Layout;
	Drag?: Drag;
	Click?: Click;
	Autoplay?: Autoplay;
	Cover?: Cover;
	Arrows?: Arrows;
	Pagination?: Pagination;
	LazyLoad?: LazyLoad;
	Keyboard?: Keyboard;
	Sync?: Sync;
	A11y?: A11y;
	Transition?: Transition;
}

/**
 * Interface for collection of all components including extensions.
 */
export interface ComponentCollection extends EssentialComponentCollection {
	[ name: string ]: Component;
}

/**
 * Type for a component constructor.
 */
export type ComponentConstructor = ( Splide: Splide, Components: ComponentCollection, name?: string ) => Component;

/**
 * Collection for component constructors(constructor functions).
 */
export interface ComponentConstructorCollection {
	[ name: string ]: ComponentConstructor;
}

/**
 * Interface for a transition component.
 */
export interface Transition extends Component {
	start(
		destIndex: number,
		newIndex: number,
		prevIndex: number,
		coord: Coordinates,
		done: () => void
	):  void;
}

/**
 * Type for a transition component constructor.
 */
export type TransitionConstructor = ( Splide: Splide, Components: ComponentCollection, name?: string ) => Transition;

/**
 * Type for coordinates
 */
export type Coordinates = { x: number, y: number };

/**
 * A11y component.
 */
export interface A11y extends Component {}

/**
 * Arrows component.
 */
export interface Arrows extends Component {
	arrows: { prev: HTMLElement | undefined, next: HTMLElement | undefined };
}

/**
 * Autoplay component.
 */
export interface Autoplay extends Component {
	play( flag?: number ): void;
	pause( flag?: number ): void;
}

/**
 * Breakpoints component.
 */
export interface Breakpoints extends Component {
	play( flag?: number ): void;
	pause( flag?: number ): void;
}

/**
 * Breakpoints component.
 */
export interface Click extends Component {}

/**
 * Clones component.
 */
export interface Clones extends Component {
	readonly clones: HTMLElement[];
	readonly length: number;
}

/**
 * Controller component.
 */
export interface Controller extends Component {
	readonly pageLength: number;
	readonly edgeIndex: number;
	readonly prevIndex: number;
	readonly nextIndex: number;

	go( control: string | number, silently: boolean ): void;
	parse( control: string | number ): number;
	toIndex( page: number ): number;
	toPage( page: number ): number;
	trim( index: number ): number;
	rewind( index: number ): number;
	isRtl(): boolean;
}

/**
 * Cover component.
 */
export interface Cover extends Component {}

/**
 * Drag component.
 */
export interface Drag extends Component {
	disabled: boolean;
}

/**
 * Slide sub component.
 */
export interface Slide extends Component {
	slide: HTMLElement,
	index: number,
	realIndex: number,
	container: HTMLElement | null,
	isClone: boolean,

	update(): void;
	isActive(): boolean;
	isVisible(): boolean;
	isWithin( from: number, within: number ): boolean;
}

/**
 * Elements component.
 */
export interface Elements extends Component {
	slider: HTMLElement | undefined;
	track: HTMLElement;
	list: HTMLElement;
	slides: HTMLElement[];
	arrows: { prev: HTMLElement | undefined, next: HTMLElement | undefined };
	bar: HTMLElement | undefined;
	play: HTMLElement | undefined;
	pause: HTMLElement | undefined;

	readonly length: number;
	readonly total: number;

	init(): void;
	register( slide: HTMLElement, index: number, realIndex: number ): void;
	getSlide( index: number ): Slide | undefined;
	getSlides( includeClones: boolean ): Slide[];
	getSlidesByPage( page: number ): Slide[];
	add( slide: HTMLElement, index: number, callback: ( Slide: Slide ) => void ): void;
	remove( index: number ): void;
	each( callback: ( Slide: Slide ) => void ): void;
}

/**
 * Keyboard component.
 */
export interface Keyboard extends Component {}

/**
 * Layout component.
 */
export interface Layout extends Component {
	readonly margin: string;
	readonly height: number;
	readonly width: number;
	readonly size: number;

	init(): void;
	totalWidth( index: number | undefined ): number;
	totalHeight( index: number | undefined ): number;
	totalSize( index: number | undefined ): number;
	slideWidth( index: number ): number;
	slideHeight( index: number ): number;
	slideSize( index: number | undefined ): number;
}

/**
 * LazyLoad component.
 */
export interface LazyLoad extends Component {}

/**
 * Options component.
 */
export interface Options extends Component {}

/**
 * Interface for a pagination item.
 */
export interface PaginationItem {
	li: HTMLLIElement;
	button: HTMLButtonElement;
	page: number;
	Slides: Slide[],
}

/**
 * Interface for pagination data.
 */
export interface PaginationData {
	list: HTMLUListElement;
	items: PaginationItem[];
}

/**
 * Pagination component.
 */
export interface Pagination extends Component {
	readonly data: PaginationData;

	getItem( index: number ): PaginationItem | undefined;
}

/**
 * Sync component.
 */
export interface Sync extends Component {}

/**
 * Track component.
 */
export interface Track extends Component {
	readonly sign: 1 | -1;
	readonly position: number;

	go( destIndex: number, newIndex: number, silently: boolean ): void;
	jump( index: number ): void;
	translate( position: number ): void;
	cancel(): void;
	shift(): void;
	trim( position: number ): number;
	toIndex( index: number ): number;
	toCoord( position: number ): Coordinates;
	toPosition( index: number ): number;
	offset( index: number ): number;
}

/**
 * Main Splide class declaration.
 */
export class Splide {
	root: HTMLElement;
	Components: ComponentCollection | null;
	Event: EventObject;
	State: StateObject;
	STATES: StateMap;

	options: SplideOptions;
	index: number;

	private _o: SplideOptions;
	private _i: number;
	private _c: ComponentConstructorCollection;
	private _e: ComponentConstructorCollection;
	private _t: TransitionConstructor | null;

	readonly length: number;
	readonly classes: { [ key: string ]: string };
	readonly i18n: { [ key: string ]: string };

	constructor( selector: string | HTMLElement, options?: SplideOptions );

	mount(
		Extensions?: ComponentConstructorCollection,
		Transition?: TransitionConstructor | null
	): this;

	sync( splide: Splide ): this;

	on( events: SplideEvent, handler: ( ...args: any[] ) => void ): this;
	on( events: string, handler: ( ...args: any[] ) => void ): this;
	on<K extends keyof ElementEventMap>(
		events: K,
		handler: ( e: ElementEventMap[K] ) => void,
		elm?: HTMLElement | Window | Document,
		options?: boolean | AddEventListenerOptions
	): this;
	on(
		events: string,
		handler: ( e: Event ) => void,
		elm?: HTMLElement | Window | Document,
		options?: boolean | AddEventListenerOptions
	): this;

	off( events: SplideEvent ): this;
	off( events: keyof ElementEventMap, elm?: Element | Window | Document ): this;
	off( events: string, elm?: Element | Window | Document ): this;

	emit( event: string, ...args: any[] ): this;

	go( control: string | number, wait?: boolean ): this;

	is( type: SplideType ): boolean;

	add( slide: HTMLElement | string, index?: number ): this;

	remove( index: number ): this;

	refresh(): this;

	destroy( completely?: boolean ): this;
}

// Export the main class as default.
export default Splide;