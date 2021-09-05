export interface BuildHtmlArgs {
    id?: string;
    length?: number;
    arrows?: boolean;
    progress?: boolean;
    autoplay?: boolean;
    src?: boolean | string;
    dataSrc?: boolean | string;
    dataSrcset?: boolean | string;
    json?: string;
}
/**
 * Returns an HTML string for building a slider.
 *
 * @param args - Arguments.
 *
 * @return A built HTML.
 */
export declare function buildHtml(args?: BuildHtmlArgs): string;
//# sourceMappingURL=../../../../src/js/test/fixtures/html.d.ts.map