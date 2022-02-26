import { EVENT_DESTROY } from '../../constants/events';
import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, EventMap } from '../../types';
import { apply, forEach } from '../../utils';
import { EventBusCallback } from '../EventBus/EventBus';


/**
 * The type for an EventTarget or an array with EventTarget objects.
 *
 * @since 3.7.0
 */
type EventTargets = EventTarget | EventTarget[];

/**
 * The interface for the EventInterface object.
 *
 * @since 3.0.0
 */
export interface EventInterfaceObject {
  on<K extends keyof EventMap>( event: K, callback: EventMap[ K ], priority?: number ): void;
  on( events: string | string[], callback: EventBusCallback, priority?: number ): void;
  off<K extends keyof EventMap>( events: K | K[] | string | string[] ): void;
  emit<K extends keyof EventMap>( event: K, ...args: Parameters<EventMap[ K ]> ): void
  emit( event: string, ...args: any[] ): void;
  bind( target: EventTargets, events: string, callback: AnyFunction, options?: AddEventListenerOptions ): void
  unbind( target: EventTarget | EventTarget[], events: string, callback?: AnyFunction ): void;
  destroy(): void;
}

/**
 * The function that provides interface for internal and native events.
 *
 * @since 3.0.0
 *
 * @param Splide - A Splide instance.
 * @param manual - Optional. Whether to destroy the interface manually or not.
 *
 * @return A collection of interface functions.
 */
export function EventInterface( Splide: Splide, manual?: boolean ): EventInterfaceObject {
  /**
   * Holds the event object.
   */
  const { event } = Splide;

  /**
   * The key for events.
   */
  const key = {};

  /**
   * Stores all handlers that listen to native events.
   */
  let listeners: [ EventTarget, string, AnyFunction, () => void ][] = [];

  /**
   * Registers an event handler with an unique key.
   * It can only be removed by `off()` method below.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */
  function on( events: string | string[], callback: EventBusCallback, priority?: number ): void {
    event.on( events, callback, key, priority );
  }

  /**
   * Removes event handlers registered by `on()`.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   */
  function off( events: string | string[] ): void {
    event.off( events, key );
  }

  /**
   * Listens to native events.
   * Splide#destory() will remove all registered listeners.
   * In IE and Safari, mediaQueryList does not inherit EventTarget,
   * and only supports deprecated `addListener` and `removeListener`.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event or events to listen to.
   * @param callback - A callback function.
   * @param options  - Optional. The options to pass to the `addEventListener` function.
   */
  function bind( targets: EventTargets, events: string, callback: AnyFunction, options?: AddEventListenerOptions ): void {
    forEachEvent( targets, events, ( target, event ) => {
      const isEventTarget = 'addEventListener' in target;
      const remover = isEventTarget
        ? target.removeEventListener.bind( target, event, callback, options )
        : target[ 'removeListener' ].bind( target, callback );

      isEventTarget ? target.addEventListener( event, callback, options ) : target[ 'addListener' ]( callback );
      listeners.push( [ target, event, callback, remover ] );
    } );
  }

  /**
   * Removes the event handler.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event name or names to remove.
   * @param callback - Optional. Specify the callback to remove.
   */
  function unbind( targets: EventTargets, events: string, callback?: AnyFunction ): void {
    forEachEvent( targets, events, ( target, event ) => {
      listeners = listeners.filter( listener => {
        if ( listener[ 0 ] === target && listener[ 1 ] === event && ( ! callback || listener[ 2 ] === callback ) ) {
          listener[ 3 ]();
          return false;
        }

        return true;
      } );
    } );
  }

  /**
   * Iterates over each target and event.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event name or names.
   * @param iteratee - An iteratee function.
   */
  function forEachEvent(
    targets: EventTargets,
    events: string,
    iteratee: ( target: EventTarget, event: string ) => void
  ): void {
    forEach( targets, target => {
      if ( target ) {
        events.split( ' ' ).forEach( apply( iteratee, target ) );
      }
    } );
  }

  /**
   * Removes all listeners.
   */
  function destroy(): void {
    listeners = listeners.filter( data => { data[ 3 ]() } );
    event.offBy( key );
  }

  /**
   * Invokes destroy when the slider is destroyed.
   */
  ! manual && event.on( EVENT_DESTROY, destroy, key );

  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy,
  };
}
