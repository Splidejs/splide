/**
 * Extracts the timestamp from the event object.
 *
 * @param e - An Event object.
 */
export function timeOf( e: Event ): number {
  return e.timeStamp;
}