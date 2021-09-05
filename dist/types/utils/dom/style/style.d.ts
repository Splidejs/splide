/**
 * The union for CSS style properties, such as "padding", "fontSize", etc.
 *
 * @since 0.1.0
 */
export declare type CSSStyleProperties = Exclude<keyof CSSStyleDeclaration, number>;
export declare function style(elms: HTMLElement | HTMLElement[], styles: Record<string, string | number>): void;
export declare function style<K extends CSSStyleProperties>(elms: HTMLElement, styles: K): CSSStyleDeclaration[K];
export declare function style(elms: HTMLElement, styles: string): string;
//# sourceMappingURL=../../../../../src/js/utils/dom/style/style.d.ts.map