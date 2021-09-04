/**
 * Returns an element that matches the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return A found element or `null`.
 */
export function query<E extends Element = Element>( parent: Element | Document, selector: string ): E | null {
  return parent && parent.querySelector( selector );
}
