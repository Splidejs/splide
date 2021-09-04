declare module '@splide/splide' {
  /**
   * The interface for the returning value of the RequestInterval.
   *
   * @since 3.0.0
   */
  interface RequestIntervalInterface {
    start( resume?: boolean ): void;
    pause(): void;
    rewind(): void;
    cancel(): void;
    isPaused(): boolean;
  }
}
