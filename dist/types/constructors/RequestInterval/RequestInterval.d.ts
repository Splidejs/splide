/**
 * The interface for the returning value of the RequestInterval.
 *
 * @since 3.0.0
 */
export interface RequestIntervalInterface {
    start(resume?: boolean): void;
    pause(): void;
    rewind(): void;
    cancel(): void;
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
export declare function RequestInterval(interval: number, onInterval: () => void, onUpdate?: (rate: number) => void, limit?: number): RequestIntervalInterface;
//# sourceMappingURL=../../../../src/js/constructors/RequestInterval/RequestInterval.d.ts.map