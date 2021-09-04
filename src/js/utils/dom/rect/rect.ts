/**
 * Returns a DOMRect object of the provided element.
 *
 * @param target - An element.
 */
export function rect( target: Element ): DOMRect {
  return target.getBoundingClientRect();
}
