export declare function create<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Record<string, string | number | boolean> | string, parent?: HTMLElement): HTMLElementTagNameMap[K];
export declare function create(tag: string, attrs?: Record<string, string | number | boolean> | string, parent?: HTMLElement): HTMLElement;
