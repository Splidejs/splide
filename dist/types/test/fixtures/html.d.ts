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
/**
 * Generates slides.
 *
 * @param length     - A number of slides.
 * @param src        - Whether to add src attribute or not.
 * @param dataSrc    - Whether to add data-splide-lazy attribute or not.
 * @param dataSrcset - Whether to add data-splide-lazy-srcset attribute or not.
 *
 * @return A built HTML.
 */
export declare function generateSlides(length: number, src?: boolean | string, dataSrc?: boolean | string, dataSrcset?: boolean | string): string;
export declare const HTML_ARROWS = "\n<div class=\"splide__arrows\">\n  <button class=\"splide__arrow splide__arrow--prev\">\n    Prev\n  </button>\n\n  <button class=\"splide__arrow splide__arrow--next\">\n    Next\n  </button>\n</div>\n";
export declare const HTML_PROGRESS = "\n<div class=\"splide__progress\">\n  <div class=\"splide__progress__bar\">\n  </div>\n</div>\n";
export declare const HTML_AUTOPLAY = "\n<div class=\"splide__autoplay\">\n  <button class=\"splide__play\">\n    Play\n  </button>\n\n  <button class=\"splide__pause\">\n    Pause\n  </button>\n</div>\n";
//# sourceMappingURL=../../../../src/js/test/fixtures/html.d.ts.map