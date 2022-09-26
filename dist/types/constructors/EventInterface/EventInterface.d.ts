import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, EventMap } from '../../types';
import { EventBinderObject } from '../EventBinder/EventBinder';
/**
 * The interface for the EventInterface object.
 *
 * @since 3.0.0
 */
export interface EventInterfaceObject extends EventBinderObject {
    on<K extends keyof EventMap>(event: K, callback: EventMap[K]): void;
    on(events: string | string[], callback: AnyFunction): void;
    off<K extends keyof EventMap>(events: K | K[] | string | string[]): void;
    emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void;
    emit(event: string, ...args: any[]): void;
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
export declare function EventInterface(Splide?: Splide): EventInterfaceObject;
