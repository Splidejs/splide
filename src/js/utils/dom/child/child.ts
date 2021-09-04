import { children } from '../children/children';


/**
 * Returns a child element that matches the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return A matched child element if available, or otherwise `undefined`.
 */
export function child<E extends HTMLElement>( parent: HTMLElement, selector?: string ): E | undefined {
  return selector ? children<E>( parent, selector )[ 0 ] : parent.firstElementChild as E;
}
