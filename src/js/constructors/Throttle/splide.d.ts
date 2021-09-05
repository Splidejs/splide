declare module '@splidejs/splide' {
  /**
   * The interface for the returning value of the RequestInterval.
   *
   * @since 3.0.0
   */
  interface ThrottleInstance<F extends AnyFunction> extends Function {
    ( ...args: Parameters<F> ): void;
  }
}
