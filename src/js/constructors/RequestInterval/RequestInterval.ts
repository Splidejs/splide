import { raf } from '../../utils';


/**
 * The interface for the returning value of the RequestInterval.
 *
 * @since 3.0.0
 */
export interface RequestIntervalInterface {
  start( resume?: boolean ): void;
  pause(): void;
  rewind(): void;
  cancel(): void;
  set( interval: number ): void;
  isPaused(): boolean;
}

/**
 * Requests interval like the native `setInterval()` with using `requestAnimationFrame`.
 *
 * @since 3.0.0
 *
 * @param interval   - The interval duration in milliseconds.
 * @param onInterval - The callback fired on every interval.
 * @param onUpdate   - Optional. Called on every animation frame, taking the progress rate.
 * @param limit      - Optional. Limits the number of interval.
 */
export function RequestInterval(
  interval: number,
  onInterval: () => void,
  onUpdate?: ( rate: number ) => void,
  limit?: number
): RequestIntervalInterface {
  const { now } = Date;

  /**
   * The time when the interval starts.
   */
  let startTime: number;

  /**
   * The current progress rate.
   */
  let rate = 0;

  /**
   * The animation frame ID.
   */
  let id: number;

  /**
   * Indicates whether the interval is currently paused or not.
   */
  let paused = true;

  /**
   * The loop count. This only works when the `limit` argument is provided.
   */
  let count = 0;

  /**
   * The update function called on every animation frame.
   */
  function update(): void {
    if ( ! paused ) {
      const elapsed = now() - startTime;

      if ( elapsed >= interval ) {
        rate      = 1;
        startTime = now();
      } else {
        rate = elapsed / interval;
      }

      if ( onUpdate ) {
        onUpdate( rate );
      }

      if ( rate === 1 ) {
        onInterval();

        if ( limit && ++count >= limit ) {
          return pause();
        }
      }

      raf( update );
    }
  }

  /**
   * Starts the interval.
   *
   * @param resume - Optional. Whether to resume the paused progress or not.
   */
  function start( resume?: boolean ): void {
    ! resume && cancel();
    startTime = now() - ( resume ? rate * interval : 0 );
    paused    = false;
    raf( update );
  }

  /**
   * Pauses the interval.
   */
  function pause(): void {
    paused = true;
  }

  /**
   * Rewinds the current progress.
   */
  function rewind(): void {
    startTime = now();
    rate      = 0;

    if ( onUpdate ) {
      onUpdate( rate );
    }
  }

  /**
   * Cancels the interval.
   */
  function cancel() {
    cancelAnimationFrame( id );
    rate   = 0;
    id     = 0;
    paused = true;
  }

  /**
   * Sets new interval duration.
   *
   * @param time - The interval duration in milliseconds.
   */
  function set( time: number ): void {
    interval = time;
  }

  /**
   * Checks if the interval is paused or not.
   *
   * @return `true` if the interval is paused, or otherwise `false`.
   */
  function isPaused(): boolean {
    return paused;
  }

  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused,
  };
}
