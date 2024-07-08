/**
 * Finds children that has the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - Optional. A selector to filter children.
 *
 * @return An array with filtered children.
 */
export declare function children<E extends HTMLElement>(parent: HTMLElement, selector?: string): E[];
