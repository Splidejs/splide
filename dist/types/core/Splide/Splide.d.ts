import { SlideMatcher } from '../../components/Slides/Slides';
import { EventBusCallback, EventBusObject, StateObject } from '../../constructors';
import { ComponentConstructor, Components, EventMap, Options, SyncTarget } from '../../types';
/**
 * The frontend class for the Splide slider.
 *
 * @since 3.0.0
 */
export declare class Splide {
    /**
     * Changes the default options for all Splide instances.
     */
    static defaults: Options;
    /**
     * The collection of state numbers.
     */
    static readonly STATES: {
        CREATED: number;
        MOUNTED: number;
        IDLE: number;
        MOVING: number;
        DESTROYED: number;
    };
    /**
     * The root element where the Splide is applied.
     */
    readonly root: HTMLElement;
    /**
     * The EventBusObject object.
     */
    readonly event: EventBusObject;
    /**
     * The collection of all component objects.
     */
    readonly Components: Components;
    /**
     * The StateObject object.
     */
    readonly state: StateObject;
    /**
     * An array with SyncTarget objects for splide instances to sync with.
     */
    readonly splides: SyncTarget[];
    /**
     * The collection of options.
     */
    private readonly _options;
    /**
     * The collection of all components.
     */
    private _Components;
    /**
     * The collection of extensions.
     */
    private _Extensions;
    /**
     * The Transition component.
     */
    private _Transition;
    /**
     * The Splide constructor.
     *
     * @param target  - The selector for the target element, or the element itself.
     * @param options - Optional. An object with options.
     */
    constructor(target: string | HTMLElement, options?: Options);
    /**
     * Initializes the instance.
     *
     * @param Extensions - Optional. An object with extensions.
     * @param Transition - Optional. A Transition component.
     *
     * @return `this`
     */
    mount(Extensions?: Record<string, ComponentConstructor>, Transition?: ComponentConstructor): this;
    /**
     * Syncs the slider with the provided one.
     * This method must be called before the `mount()`.
     *
     * @example
     * ```ts
     * var primary   = new Splide();
     * var secondary = new Splide();
     *
     * primary.sync( secondary );
     * primary.mount();
     * secondary.mount();
     * ```
     *
     * @param splide - A Splide instance to sync with.
     *
     * @return `this`
     */
    sync(splide: Splide): this;
    /**
     * Moves the slider with the following control pattern.
     *
     * | Pattern | Description |
     * |---|---|
     * | `i` | Goes to the slide `i` |
     * | `'+${i}'` | Increments the slide index by `i` |
     * | `'-${i}'` | Decrements the slide index by `i` |
     * | `'>'` | Goes to the next page |
     * | `'<'` | Goes to the previous page |
     * | `>${i}` | Goes to the page `i` |
     *
     * In most cases, `'>'` and `'<'` notations are enough to control the slider
     * because they respect `perPage` and `perMove` options.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     *
     * // Goes to the slide 1:
     * splide.go( 1 );
     *
     * // Increments the index:
     * splide.go( '+2' );
     *
     * // Goes to the next page:
     * splide.go( '>' );
     *
     * // Goes to the page 2:
     * splide.go( '>2' );
     * ```
     *
     * @param control - A control pattern.
     *
     * @return `this`
     */
    go(control: number | string): this;
    /**
     * Registers an event handler.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     *
     * // Listens to a single event:
     * splide.on( 'move', function() {} );
     *
     * // Listens to multiple events:
     * splide.on( 'move resize', function() {} );
     *
     * // Appends a namespace:
     * splide.on( 'move.myNamespace resize.myNamespace', function() {} );
     * ```
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to append a namespace.
     * @param callback - A callback function.
     *
     * @return `this`
     */
    on<K extends keyof EventMap>(events: K, callback: EventMap[K]): this;
    on(events: string | string[], callback: EventBusCallback): this;
    /**
     * Removes the registered all handlers for the specified event or events.
     * If you want to only remove a particular handler, use namespace to identify it.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     *
     * // Removes all handlers assigned to "move":
     * splide.off( 'move' );
     *
     * // Only removes handlers that belong to the specified namespace:
     * splide.off( 'move.myNamespace' );
     * ```
     *
     * @param events - An event name or names separated by spaces. Use a dot(.) to append a namespace.
     *
     * @return `this`
     */
    off<K extends keyof EventMap>(events: K | K[] | string | string[]): this;
    /**
     * Emits an event and triggers registered handlers.
     *
     * @param event - An event name to emit.
     * @param args  - Optional. Any number of arguments to pass to handlers.
     *
     * @return `this`
     */
    emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): this;
    emit(event: string, ...args: any[]): this;
    /**
     * Inserts a slide at the specified position.
     *
     * @example
     * ```ts
     * var splide = new Splide();
     * splide.mount();
     *
     * // Adds the slide by the HTML:
     * splide.add( '<li></li> );
     *
     * // or adds the element:
     * splide.add( document.createElement( 'li' ) );
     * ```
     *
     * @param slides - A slide element, an HTML string that represents a slide, or an array with them.
     * @param index  - Optional. An index to insert a slide at.
     *
     * @return `this`
     */
    add(slides: string | HTMLElement | Array<string | HTMLElement>, index?: number): this;
    /**
     * Removes slides that match the matcher
     * that can be an index, an array with indices, a selector, or an iteratee function.
     *
     * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
     */
    remove(matcher: SlideMatcher): this;
    /**
     * Checks the slider type.
     *
     * @param type - A type to test.
     *
     * @return `true` if the type matches the current one, or otherwise `false`.
     */
    is(type: string): boolean;
    /**
     * Refreshes the slider.
     *
     * @return `this`
     */
    refresh(): this;
    /**
     * Destroys the slider.
     *
     * @param completely - Optional. If `true`, Splide will not remount the slider by breakpoints.
     *
     * @return `this`
     */
    destroy(completely?: boolean): this;
    /**
     * Returns options.
     *
     * @return An object with the latest options.
     */
    get options(): Options;
    /**
     * Merges options to the current options and emits `updated` event.
     *
     * @param options - An object with new options.
     */
    set options(options: Options);
    /**
     * Returns the number of slides without clones.
     *
     * @return The number of slides.
     */
    get length(): number;
    /**
     * Returns the active slide index.
     *
     * @return The active slide index.
     */
    get index(): number;
}
//# sourceMappingURL=../../../../src/js/core/Splide/Splide.d.ts.map