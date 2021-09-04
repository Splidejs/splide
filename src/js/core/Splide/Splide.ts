import {
  Component,
  Components,
  EventBusCallback,
  EventBusObject,
  Options,
  SlideMatcher,
  StateObject,
} from '@splide/splide';
import * as CoreComponents from '../../components';
import { CLASS_INITIALIZED } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { EVENT_DESTROY, EVENT_MOUNTED, EVENT_READY, EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { CREATED, DESTROYED, IDLE, STATES } from '../../constants/states';
import { FADE } from '../../constants/types';
import { EventBus, State } from '../../constructors';
import { Fade, Slide } from '../../transitions';
import { addClass, assert, assign, empty, forOwn, isString, merge, query } from '../../utils';


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
  readonly event: EventBusObject = EventBus();

  /**
   * The collection of all component objects.
   */
  readonly Components: Components = {} as Components;

  /**
   * The StateObject object.
   */
  readonly state: StateObject = State( CREATED );

  /**
   * Splide instances to sync with.
   */
  readonly splides: Splide[] = [];

  /**
   * The collection of options.
   */
  private readonly opts: Options = {};

  /**
   * The collection of extensions.
   */
  private Extensions: Record<string, Component> = {};

  /**
   * The Transition component.
   */
  private Transition: Component;

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

    merge( DEFAULTS, Splide.defaults );
    merge( merge( this.opts, DEFAULTS ), options || {} );
  }

  /**
   * Initializes the instance.
   *
   * @param Extensions - Optional. An object with extensions.
   * @param Transition - Optional. A Transition component.
   *
   * @return `this`
   */
  mount( Extensions?: Record<string, Component>, Transition?: Component ): this {
    this.state.set( CREATED );

    this.Transition = Transition || this.Transition || ( this.is( FADE ) ? Fade : Slide );
    this.Extensions = Extensions || this.Extensions;

    const Components = assign( {}, CoreComponents, this.Extensions, { Transition: this.Transition } );

    forOwn( Components, ( Component, key ) => {
      const component = Component( this, this.Components, this.opts );
      this.Components[ key ] = component;
      component.mount && component.mount();
    } );

    forOwn( this.Components, component => {
      component.mounted && component.mounted();
    } );

    this.emit( EVENT_MOUNTED );

    addClass( this.root, CLASS_INITIALIZED );

    this.state.set( IDLE );
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
    this.splides.push( splide );
    splide.splides.push( this );
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
   * @param control
   */
  go( control: number | string ): void {
    this.Components.Controller.go( control );
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
  on( events: string, callback: EventBusCallback ): this {
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
  off( events: string ): this {
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
  emit( event: string, ...args: any[] ): this {
    this.event.emit( event, ...args );
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
    this.Components.Slides.add( slides, index );
    return this;
  }

  /**
   * Removes slides that match the matcher
   * that can be an index, an array with indices, a selector, or an iteratee function.
   *
   * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
   */
  remove( matcher: SlideMatcher ): this {
    this.Components.Slides.remove( matcher );
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
    return this.opts.type === type;
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
  destroy( completely?: boolean ): this {
    const { event, state } = this;

    if ( state.is( CREATED ) ) {
      // Postpones destruction requested before the slider becomes ready.
      event.on( EVENT_READY, this.destroy.bind( this, completely ), this );
    } else {
      forOwn( this.Components, component => {
        component.destroy && component.destroy( completely );
      } );

      event.emit( EVENT_DESTROY );
      event.destroy();
      empty( this.splides );
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
    return this.opts;
  }

  /**
   * Merges options to the current options and emits `updated` event.
   *
   * @param options - An object with new options.
   */
  set options( options: Options ) {
    const { opts } = this;
    merge( opts, options );

    if ( ! this.state.is( CREATED ) ) {
      this.emit( EVENT_UPDATED, opts );
    }
  }

  /**
   * Returns the number of slides without clones.
   *
   * @return The number of slides.
   */
  get length(): number {
    return this.Components.Slides.getLength( true );
  }

  /**
   * Returns the active slide index.
   *
   * @return The active slide index.
   */
  get index(): number {
    return this.Components.Controller.getIndex();
  }
}

