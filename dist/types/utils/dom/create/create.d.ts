/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */
export declare function create<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Record<string, string | number | boolean> | string | string[], parent?: HTMLElement): HTMLElementTagNameMap[K];
//# sourceMappingURL=../../../../../src/js/utils/dom/create/create.d.ts.map