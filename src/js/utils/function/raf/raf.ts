/**
 * The arias of `window.requestAnimationFrame()`.
 */
export function raf( func: FrameRequestCallback ): number {
  return requestAnimationFrame( func );
}
