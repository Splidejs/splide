/**
 * Checks if the element contains the specified class or not.
 *
 * @param elm       - An element to check.
 * @param className - A class name that may be contained by the element.
 *
 * @return `true` if the element contains the class, or otherwise `false`.
 */
export function hasClass( elm: Element, className: string ): boolean {
  return elm && elm.classList.contains( className );
}
