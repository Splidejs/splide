import { DEFAULT_EVENT_PRIORITY } from '../../constants/priority';
import { AnyFunction } from '../../types';
import { forOwn, push, slice, toArray } from '../../utils';


/**
 * The interface for the EventBus instance.
 *
 * @since 3.0.0
 */
export interface EventBusObject {
  on( events: string | string[], callback: EventBusCallback, key?: object, priority?: number ): void;
  off( events: string | string[], key?: object ): void;
  offBy( key: object ): void;
  emit( event: string, ...args: any[] ): void;
  destroy(): void;
}

/**
 * The interface for each event handler object.
 *
 * @since 3.0.0
 */
export interface EventHandler {
  _event: string;
  _callback: AnyFunction;
  _namespace: string;
  _priority: number;
  _key?: object;
}

/**
 * The type for a callback function of the EventBus.
 *
 * @since 3.0.0
 */
export type EventBusCallback = AnyFunction;

/**
 * The constructor to provided a simple event system.
 *
 * @since 3.0.0
 *
 * @return An EventBus object.
 */
export function EventBus(): EventBusObject {
  /**
   * The collection of registered handlers.
   */
  let handlers: Record<string, EventHandler[]> = {};

  /**
   * Registers an event handler.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param key      - Optional. An object for an identifier of the handler.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */
  function on(
    events: string | string[],
    callback: EventBusCallback,
    key?: object,
    priority = DEFAULT_EVENT_PRIORITY
  ): void {
    forEachEvent( events, ( event, namespace ) => {
      handlers[ event ] = handlers[ event ] || [];

      push( handlers[ event ], {
        _event    : event,
        _callback : callback,
        _namespace: namespace,
        _priority : priority,
        _key      : key,
      } ).sort( ( handler1, handler2 ) => handler1._priority - handler2._priority );
    } );
  }

  /**
   * Removes event handlers registered by `on()`.
   * If only the event name is provided, all handlers that associate with the event are removed.
   * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param key    - Optional. An object for an identifier of the handler.
   */
  function off( events: string | string[], key?: object ): void {
    forEachEvent( events, ( event, namespace ) => {
      const eventHandlers = handlers[ event ];

      handlers[ event ] = eventHandlers && eventHandlers.filter( handler => {
        return handler._key ? handler._key !== key : key || handler._namespace !== namespace;
      } );
    } );
  }

  /**
   * Removes all handlers locked by the specified key.
   *
   * @param key - A key.
   */
  function offBy( key: object ): void {
    forOwn( handlers, ( eventHandlers, event ) => {
      off( event, key );
    } );
  }

  /**
   * Triggers callback functions.
   * This accepts additional arguments and passes them to callbacks.
   *
   * @param event - An event name.
   */
  function emit( event: string ): void {
    ( handlers[ event ] || [] ).forEach( handler => {
      // eslint-disable-next-line prefer-rest-params, prefer-spread
      handler._callback.apply( handler, slice( arguments, 1 ) );
    } );
  }

  /**
   * Removes all handlers.
   */
  function destroy(): void {
    handlers = {};
  }

  /**
   * Parses provided events and iterates over them.
   *
   * @param events   - An event or events.
   * @param iteratee - An iteratee function.
   */
  function forEachEvent( events: string | string[], iteratee: ( event: string, namespace: string ) => void ): void {
    toArray( events ).join( ' ' ).split( ' ' ).forEach( eventNS => {
      const fragments = eventNS.split( '.' );
      iteratee( fragments[ 0 ], fragments[ 1 ] );
    } );
  }

  return {
    on,
    off,
    offBy,
    emit,
    destroy,
  };
}
