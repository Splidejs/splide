import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, EventMap } from '../../types';
import { EventBusCallback } from '../EventBus/EventBus';
/**
 * The interface for the EventInterface object.
 *
 * @since 3.0.0
 */
export interface EventInterfaceObject {
    on<K extends keyof EventMap>(event: K, callback: EventMap[K], priority?: number): void;
    on(events: string | string[], callback: EventBusCallback, priority?: number): void;
    off<K extends keyof EventMap>(events: K | K[] | string | string[]): void;
    emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void;
    emit(event: string, ...args: any[]): void;
    bind(target: Element | Window | Document | Array<Element | Window | Document>, events: string, callback: AnyFunction, options?: AddEventListenerOptions): void;
    unbind(target: Element | Window | Document | Array<Element | Window | Document>, events: string, callback?: AnyFunction): void;
    destroy(): void;
}
/**
 * The function that provides interface for internal and native events.
 *
 * @since 3.0.0
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */
export declare function EventInterface(Splide: Splide): EventInterfaceObject;
//# sourceMappingURL=../../../../src/js/constructors/EventInterface/EventInterface.d.ts.map