/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propagation or not.
 */
export function prevent( e: Event, stopPropagation?: boolean ): void {
  e.preventDefault();

  if ( stopPropagation ) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
