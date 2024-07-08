import { AnyFunction } from '../../types';
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
    bind(target: EventTargets, events: string | string[], callback: AnyFunction, options?: AddEventListenerOptions): void;
    unbind(target: EventTarget | EventTarget[], events: string | string[], callback?: AnyFunction): void;
    dispatch<T>(target: EventTarget, event: string, detail?: T): void;
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
export declare function EventBinder(): EventBinderObject;
export {};
