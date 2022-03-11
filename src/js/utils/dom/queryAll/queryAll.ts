import { slice } from '../../arrayLike';


/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return An array with matched elements.
 */
export function queryAll<E extends Element = Element>( parent: Element | Document, selector?: string ): E[] {
  return selector ? slice<E>( parent.querySelectorAll( selector ) ) : [];
}
