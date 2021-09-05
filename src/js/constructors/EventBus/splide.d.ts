declare module '@splidejs/splide' {
  /**
   * The interface for the EventBus instance.
   *
   * @since 3.0.0
   */
  interface EventBusObject {
    on( events: string | string[], callback: EventBusCallback, key?: object, priority?: number ): void;
    off( events: string | string[], key?: object ): void;
    offBy( key: object ): void;
    emit( event: string, ...args: any[] ): void;
    destroy(): void;
  }

  /**
   * The interface for the EventBus instance.
   *
   * @since 3.0.0
   */
  interface EventBusConstructor {
    new (): EventBusObject;
  }

  /**
   * The interface for each event handler object.
   *
   * @since 3.0.0
   */
  interface EventHandler {
    /**
     * The event name.
     */
    event: string;

    /**
     * A callback function.
     */
    callback: AnyFunction;

    /**
     * A namespace.
     */
    namespace: string;

    /**
     * The priority of the handler.
     */
    priority: number;

    /**
     * A key for a handler.
     */
    key?: object;
  }

  /**
   * The type for a callback function of the EventBus.
   *
   * @since 3.0.0
   */
  type EventBusCallback = AnyFunction;
}
