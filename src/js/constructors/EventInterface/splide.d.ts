declare module '@splidejs/splide' {
  /**
   * The interface for the EventInterface object.
   *
   * @since 3.0.0
   */
  interface EventInterfaceObject {
    on( events: string | string[], callback: EventBusCallback, priority?: number ): void;
    off( events: string | string[] ): void;
    emit( event: string, ...args: any[] ): void;
    bind(
      target: Element | Window | Document | Array<Element | Window | Document>,
      events: string,
      callback: AnyFunction,
      options?: AddEventListenerOptions
    ): void
    unbind( target: Element | Window | Document | Array<Element | Window | Document>, events: string );
    destroy(): void;
  }
}
