import { Options } from '../../types';
/**
 * The class for generating styles as a string.
 *
 * @since 3.0.0
 */
export declare class Style {
    /**
     * The collection of registered styles categorized by each breakpoint.
     */
    private readonly styles;
    /**
     * The ID of the slider.
     */
    private readonly id;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * The Style constructor.
     *
     * @param id      - A slider ID.
     * @param options - Options.
     */
    constructor(id: string, options: Options);
    /**
     * Registers a CSS rule.
     *
     * @param selector - A selector.
     * @param prop
     * @param value
     * @param breakpoint
     */
    rule(selector: string, prop: string, value: string | number, breakpoint?: string): void;
    /**
     * Builds styles as a single string.
     *
     * @return Built styles.
     */
    build(): string;
    /**
     * Builds styles for each breakpoint.
     *
     * @param selectors - An object with styles.
     *
     * @return Built styles.
     */
    private buildSelectors;
}
//# sourceMappingURL=../../../../src/js/renderer/Style/Style.d.ts.map