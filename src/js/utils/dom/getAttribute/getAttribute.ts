/**
 * Returns the specified attribute value.
 *
 * @param elm  - An element.
 * @param attr - An attribute to get.
 */
export function getAttribute( elm: Element, attr: string ): string | null {
  return elm.getAttribute( attr );
}
