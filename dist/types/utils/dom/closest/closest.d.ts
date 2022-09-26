/**
 * Starts from the provided element, searches for the first element that matches the selector in ascendants.
 *
 * @param from     - An element to search from.
 * @param selector - A selector.
 *
 * @return The found element if available, or `null`.
 */
export declare function closest(from: HTMLElement, selector: string): HTMLElement | null;
