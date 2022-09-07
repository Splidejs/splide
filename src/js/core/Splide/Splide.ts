import * as ComponentConstructors from '../../components';
import { SlideMatcher } from '../../components/Slides/Slides';
import { CLASS_INITIALIZED } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { EVENT_DESTROY, EVENT_MOUNTED, EVENT_READY, EVENT_REFRESH } from '../../constants/events';
import { DATA_ATTRIBUTE } from '../../constants/project';
import { CREATED, DESTROYED, IDLE, STATES } from '../../constants/states';
import { FADE } from '../../constants/types';
import { EventInterface, EventInterfaceObject, State, StateObject } from '../../constructors';
import { Fade, Slide } from '../../transitions';
import { AnyFunction, ComponentConstructor, Components, EventMap, Options, SyncTarget } from '../../types';
import { addClass, assert, assign, empty, forOwn, getAttribute, isString, merge, query, slice } from '../../utils';
import { ARIA_LABEL, ARIA_LABELLEDBY } from '../../constants/attributes';


/**
 * The frontend class for the Splide slider.
 *
 * @since 3.0.0
 */
export class Splide {
  /**
   * Changes the default options for all Splide instances.
   */
  static defaults: Options = {};

  /**
   * The collection of state numbers.
   */
  static readonly STATES = STATES;

  /**
   * The root element where the Splide is applied.
   */
  readonly root: HTMLElement;

  /**
   * The EventBusObject object.
   */
  readonly event: EventInterfaceObject = EventInterface();

  /**
   * The collection of all component objects.
   */
  readonly Components: Components = {} as Components;

  /**
   * The StateObject object.
   */
  readonly state: StateObject = State( CREATED );

  /**
   * An array with SyncTarget objects for splide instances to sync with.
   */
  readonly splides: SyncTarget[] = [];

  /**
   * The current options.
   */
  private readonly _o: Options = {};

  /**
   * The collection of all components.
   */
  private _C: Components;

  /**
   * The collection of extensions.
   */
  private _E: Record<string, ComponentConstructor> = {};

  /**
   * The Transition component.
   */
  private _T: ComponentConstructor;

  /**
   * The Splide constructor.
   *
   * @param target  - The selector for the target element, or the element itself.
   * @param options - Optional. An object with options.
   */
  constructor( target: string | HTMLElement, options?: Options ) {
    const root = isString( target ) ? query<HTMLElement>( document, target ) : target;
    assert( root, `${ root } is invalid.` );

    this.root = root;

    options = merge( {
      label     : getAttribute( root, ARIA_LABEL ) || '',
      labelledby: getAttribute( root, ARIA_LABELLEDBY ) || '',
    }, DEFAULTS, Splide.defaults, options || {} );

    try {
      merge( options, JSON.parse( getAttribute( root, DATA_ATTRIBUTE ) ) );
    } catch ( e ) {
      assert( false, 'Invalid JSON' );
    }

    this._o = Object.create( merge( {}, options ) );
  }

  /**
   * Initializes the instance.
   *
   * @param Extensions - Optional. An object with extensions.
   * @param Transition - Optional. A Transition component.
   *
   * @return `this`
   */
  mount( Extensions?: Record<string, ComponentConstructor>, Transition?: ComponentConstructor ): this {
    const { state, Components } = this;
    assert( state.is( [ CREATED, DESTROYED ] ), 'Already mounted!' );

    state.set( CREATED );

    this._C = Components;
    this._T = Transition || this._T || ( this.is( FADE ) ? Fade : Slide );
    this._E = Extensions || this._E;

    const Constructors = assign( {}, ComponentConstructors, this._E, { Transition: this._T } );

    forOwn( Constructors, ( Component, key ) => {
      const component = Component( this, Components, this._o );
      Components[ key ] = component;
      component.setup && component.setup();
    } );

    forOwn( Components, component => {
      component.mount && component.mount();
    } );

    this.emit( EVENT_MOUNTED );

    addClass( this.root, CLASS_INITIALIZED );

    state.set( IDLE );
    this.emit( EVENT_READY );

    return this;
  }

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
  sync( splide: Splide ): this {
    this.splides.push( { splide } );
    splide.splides.push( { splide: this, isParent: true } );

    if ( this.state.is( IDLE ) ) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }

    return this;
  }

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
  go( control: number | string ): this {
    this._C.Controller.go( control );
    return this;
  }

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
  on<K extends keyof EventMap>( events: K, callback: EventMap[ K ] ): this;
  on( events: string | string[], callback: AnyFunction ): this;
  on( events: string | string[], callback: AnyFunction ): this {
    this.event.on( events, callback );
    return this;
  }

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
  off<K extends keyof EventMap>( events: K | K[] | string | string[] ): this {
    this.event.off( events );
    return this;
  }

  /**
   * Emits an event and triggers registered handlers.
   *
   * @param event - An event name to emit.
   * @param args  - Optional. Any number of arguments to pass to handlers.
   *
   * @return `this`
   */
  emit<K extends keyof EventMap>( event: K, ...args: Parameters<EventMap[ K ]> ): this;
  emit( event: string, ...args: any[] ): this;
  emit( event: string ): this {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    this.event.emit( event, ...slice( arguments, 1 ) );
    return this;
  }

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
  add( slides: string | HTMLElement | Array<string | HTMLElement>, index?: number ): this {
    this._C.Slides.add( slides, index );
    return this;
  }

  /**
   * Removes slides that match the matcher
   * that can be an index, an array with indices, a selector, or an iteratee function.
   *
   * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
   */
  remove( matcher: SlideMatcher ): this {
    this._C.Slides.remove( matcher );
    return this;
  }

  /**
   * Checks the slider type.
   *
   * @param type - A type to test.
   *
   * @return `true` if the type matches the current one, or otherwise `false`.
   */
  is( type: string ): boolean {
    return this._o.type === type;
  }

  /**
   * Refreshes the slider.
   *
   * @return `this`
   */
  refresh(): this {
    this.emit( EVENT_REFRESH );
    return this;
  }

  /**
   * Destroys the slider.
   *
   * @param completely - Optional. If `true`, Splide will not remount the slider by breakpoints.
   *
   * @return `this`
   */
  destroy( completely = true ): this {
    const { event, state } = this;

    if ( state.is( CREATED ) ) {
      // Postpones destruction requested before the slider becomes ready.
      EventInterface( this ).on( EVENT_READY, this.destroy.bind( this, completely ) );
    } else {
      forOwn( this._C, component => {
        component.destroy && component.destroy( completely );
      }, true );

      event.emit( EVENT_DESTROY );
      event.destroy();
      completely && empty( this.splides );
      state.set( DESTROYED );
    }

    return this;
  }

  /**
   * Returns options.
   *
   * @return An object with the latest options.
   */
  get options(): Options {
    return this._o;
  }

  /**
   * Merges options to the current options and emits `updated` event.
   *
   * @param options - An object with new options.
   */
  set options( options: Options ) {
    this._C.Media.set( options, true, true );
  }

  /**
   * Returns the number of slides without clones.
   *
   * @return The number of slides.
   */
  get length(): number {
    return this._C.Slides.getLength( true );
  }

  /**
   * Returns the active slide index.
   *
   * @return The active slide index.
   */
  get index(): number {
    return this._C.Controller.getIndex();
  }
}
