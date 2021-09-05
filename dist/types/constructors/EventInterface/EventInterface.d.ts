import { Splide } from '../../core/Splide/Splide';
import { AnyFunction } from '../../types';
import { EventBusCallback } from '../EventBus/EventBus';
/**
 * The interface for the EventInterface object.
 *
 * @since 3.0.0
 */
export interface EventInterfaceObject {
    on(events: string | string[], callback: EventBusCallback, priority?: number): void;
    off(events: string | string[]): void;
    emit(event: string, ...args: any[]): void;
    bind(target: Element | Window | Document | Array<Element | Window | Document>, events: string, callback: AnyFunction, options?: AddEventListenerOptions): void;
    unbind(target: Element | Window | Document | Array<Element | Window | Document>, events: string): void;
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