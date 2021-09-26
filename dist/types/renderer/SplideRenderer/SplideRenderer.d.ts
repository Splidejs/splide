import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
export declare class SplideRenderer {
    /**
     * Holds slide contents.
     */
    private contents;
    /**
     * The Direction component.
     */
    private Direction;
    /**
     * Holds the Style instance.
     */
    private Style;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * The slider ID.
     */
    private readonly id;
    /**
     * An array with slide HTML strings.
     */
    private slides;
    /**
     * An array with options for each breakpoint.
     */
    private breakpoints;
    /**
     * The SplideRenderer constructor.
     *
     * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
     * @param options  - Optional. Options.
     * @param id       - Optional. An ID of the slider.
     * @param defaults - Static default options.
     */
    constructor(contents: string[], options?: Options, id?: string, defaults?: Options);
    /**
     * Initializes the instance.
     */
    private init;
    /**
     * Generates HTML of slides with inserting provided contents.
     */
    private generateSlides;
    /**
     * Generates clones.
     */
    private generateClones;
    /**
     * Returns the number of clones to generate.
     *
     * @return A number of clones.
     */
    private getCloneCount;
    /**
     * Registers styles for the root element.
     */
    private registerRootStyles;
    /**
     * Registers styles for the track element.
     */
    private registerTrackStyles;
    /**
     * Registers styles for the list element.
     */
    private registerListStyles;
    /**
     * Registers styles for slides and clones.
     */
    private registerSlideStyles;
    /**
     * Returns percentage of the offset for the list element.
     * This does not include gaps because it can not be converted into percent.
     *
     * @return The offset as percent.
     */
    private calcOffsetPercent;
    /**
     * Returns the value of the left offset for the list element.
     *
     * @return The offset as `calc()`.
     */
    private cssOffsetLeft;
    /**
     * Resolves the prop for the current direction and converts it into the Kebab case.
     *
     * @param prop - A property name to resolve.
     *
     * @return A resolved property name in the Kebab case.
     */
    private resolve;
    /**
     * Returns padding in the CSS format.
     *
     * @param options - Options.
     * @param right   - Determines whether to get padding right or left.
     *
     * @return Padding in the CSS format.
     */
    private cssPadding;
    /**
     * Returns height of the track element in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssTrackHeight;
    /**
     * Returns height provided though options in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssHeight;
    /**
     * Returns width of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Width in the CSS format.
     */
    private cssSlideWidth;
    /**
     * Returns height of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssSlideHeight;
    /**
     * Returns width or height of each slide in the CSS format, considering the current direction.
     *
     * @param options - Options.
     *
     * @return Width or height in the CSS format.
     */
    private cssSlideSize;
    /**
     * Parses breakpoints and generate options for each breakpoint.
     */
    private parseBreakpoints;
    /**
     * Checks if the slider type is loop or not.
     *
     * @return `true` if the slider type is loop, or otherwise `false`.
     */
    private isLoop;
    /**
     * Checks if the direction is TTB or not.
     *
     * @return `true` if the direction is TTB, or otherwise `false`.
     */
    private isVertical;
    /**
     * Builds classes of the root element.
     *
     * @return Classes for the root element as a single string.
     */
    private buildClasses;
    /**
     * Returns the HTML of the slider.
     *
     * @return The generated HTML.
     */
    html(): string;
    /**
     * Removes a style element and clones.
     *
     * @param splide - A Splide instance.
     */
    clean(splide: Splide): void;
}
//# sourceMappingURL=../../../../src/js/renderer/SplideRenderer/SplideRenderer.d.ts.map