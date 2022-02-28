import { EVENT_DESTROY } from '../../constants/events';
import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, EventMap } from '../../types';
import { apply, assign, isArray, slice, toArray } from '../../utils';
import { EventBinder, EventBinderObject } from '../EventBinder/EventBinder';


/**
 * The interface for the EventInterface object.
 *
 * @since 3.0.0
 */
export interface EventInterfaceObject extends EventBinderObject {
  on<K extends keyof EventMap>( event: K, callback: EventMap[ K ] ): void;
  on( events: string | string[], callback: AnyFunction ): void;
  off<K extends keyof EventMap>( events: K | K[] | string | string[] ): void;
  emit<K extends keyof EventMap>( event: K, ...args: Parameters<EventMap[ K ]> ): void
  emit( event: string, ...args: any[] ): void;

  /** @internal */
  bus: DocumentFragment;
}

/**
 * The constructor function that provides interface for internal and native events.
 *
 * @since 3.0.0
 * @constructor
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */
export function EventInterface( Splide?: Splide ): EventInterfaceObject {
  /**
   * The document fragment for internal events.
   * Provide the Splide instance to share the bus.
   */
  const bus = Splide ? Splide.event.bus : document.createDocumentFragment();

  /**
   * An event binder object.
   */
  const binder = EventBinder();

  /**
   * Listens to an internal event or events.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   */
  function on( events: string | string[], callback: AnyFunction ): void {
    binder.bind( bus, toArray( events ).join( ' ' ), e => {
      callback.apply( callback, isArray( e.detail ) ? e.detail : [] );
    } );
  }

  /**
   * Triggers callback functions.
   * This accepts additional arguments and passes them to callbacks.
   *
   * @param event - An event name.
   */
  function emit( event: string ): void {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    binder.dispatch( bus, event, slice( arguments, 1 ) );
  }

  if ( Splide ) {
    Splide.event.on( EVENT_DESTROY, binder.destroy );
  }

  return assign( binder, {
    bus,
    on,
    off: apply( binder.unbind, bus ),
    emit,
  } );
}