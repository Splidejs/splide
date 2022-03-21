import { AnyFunction } from '../../types';
import { empty, forEach } from '../../utils';


/**
 * The type for an EventTarget or an array with EventTarget objects.
 *
 * @since 4.0.0
 */
type EventTargets = EventTarget | EventTarget[];

/**
 * The interface for the EventBinder object.
 *
 * @since 3.0.0
 */
export interface EventBinderObject {
  bind( target: EventTargets, events: string | string[], callback: AnyFunction, options?: AddEventListenerOptions ): void
  unbind( target: EventTarget | EventTarget[], events: string | string[], callback?: AnyFunction ): void;
  dispatch<T>( target: EventTarget, event: string, detail?: T ): void;
  destroy(): void;
}

/**
 * The constructor function to provide methods to subscribe native events.
 *
 * @since 4.0.0
 * @constructor
 *
 * @return An EventBinder object.
 */
export function EventBinder(): EventBinderObject {
  /**
   * Stores all handlers that listen to native events.
   * `[ target, event, namespace, callback, remover ]`
   */
  let listeners: [ EventTarget, string, string | undefined, AnyFunction, () => void ][] = [];

  /**
   * Listens to native events.
   * - `destroy()` can unsubscribe all events.
   * - In IE, mediaQueryList does not inherit EventTarget,
   *   and only supports deprecated `addListener` and `removeListener`.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event or events to listen to.
   * @param callback - A callback function.
   * @param options  - Optional. The options to pass to the `addEventListener` function.
   */
  function bind(
    targets: EventTargets,
    events: string | string[],
    callback: AnyFunction,
    options?: AddEventListenerOptions
  ): void {
    forEachEvent( targets, events, ( target, event, namespace ) => {
      const isEventTarget = 'addEventListener' in target;
      const remover = isEventTarget
        ? target.removeEventListener.bind( target, event, callback, options )
        : target[ 'removeListener' ].bind( target, callback );

      isEventTarget ? target.addEventListener( event, callback, options ) : target[ 'addListener' ]( callback );
      listeners.push( [ target, event, namespace, callback, remover ] );
    } );
  }

  /**
   * Removes the event handler.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event name or names to remove.
   * @param callback - Optional. Specify the callback to remove.
   */
  function unbind( targets: EventTargets, events: string | string[], callback?: AnyFunction ): void {
    forEachEvent( targets, events, ( target, event, namespace ) => {
      listeners = listeners.filter( listener => {
        if ( listener[ 0 ] === target
          && listener[ 1 ] === event
          && listener[ 2 ] === namespace
          && ( ! callback || listener[ 3 ] === callback )
        ) {
          listener[ 4 ]();
          return false;
        }

        return true;
      } );
    } );
  }

  /**
   * Dispatches a custom event of the target.
   *
   * @param target - An event target.
   * @param type   - An event type.
   * @param detail - Optional. The `detail` object of the event.
   *
   * @return An event object.
   */
  function dispatch<T>( target: EventTarget, type: string, detail?: T ): CustomEvent {
    let e: CustomEvent;
    const bubbles = true;

    if ( typeof CustomEvent === 'function' ) {
      e = new CustomEvent( type, { bubbles, detail } );
    } else {
      e = document.createEvent( 'CustomEvent' );
      e.initCustomEvent( type, bubbles, false, detail );
    }

    target.dispatchEvent( e );
    return e;
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
    events: string | string[],
    iteratee: ( target: EventTarget, event: string, namespace: string | undefined ) => void
  ): void {
    forEach( targets, target => {
      target && forEach( events, events => {
        events.split( ' ' ).forEach( eventNS => {
          const fragment = eventNS.split( '.' );
          iteratee( target, fragment[ 0 ], fragment[ 1 ] );
        } );
      } );
    } );
  }

  /**
   * Removes all listeners.
   */
  function destroy(): void {
    listeners.forEach( data => { data[ 4 ]() } );
    empty( listeners );
  }

  return {
    bind,
    unbind,
    dispatch,
    destroy,
  };
}
