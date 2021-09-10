import { AnyFunction } from '../../types';
/**
 * The interface for the EventBus instance.
 *
 * @since 3.0.0
 */
export interface EventBusObject {
    on(events: string | string[], callback: EventBusCallback, key?: object, priority?: number): void;
    off(events: string | string[], key?: object): void;
    offBy(key: object): void;
    emit(event: string, ...args: any[]): void;
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
export declare type EventBusCallback = AnyFunction;
/**
 * The constructor to provided a simple event system.
 *
 * @since 3.0.0
 *
 * @return An EventBus object.
 */
export declare function EventBus(): EventBusObject;
//# sourceMappingURL=../../../../src/js/constructors/EventBus/EventBus.d.ts.map