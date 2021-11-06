import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
import { RendererConfig, SlideContent } from '../types/types';
/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
export declare class SplideRenderer {
    /**
     * Removes a style element and clones.
     *
     * @param splide - A Splide instance.
     */
    static clean(splide: Splide): void;
    /**
     * Holds slide contents.
     */
    private readonly contents;
    /**
     * Stores data of slides.
     */
    private readonly slides;
    /**
     * The Direction component.
     */
    private readonly Direction;
    /**
     * Holds the Style instance.
     */
    private readonly Style;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * Holds options for this instance.
     */
    private readonly config;
    /**
     * The slider ID.
     */
    private readonly id;
    /**
     * An array with options for each breakpoint.
     */
    private readonly breakpoints;
    /**
     * The SplideRenderer constructor.
     *
     * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
     * @param options  - Optional. Slider options.
     * @param config   - Static default options.
     * @param defaults - Default options for the slider. Pass `Splide.defaults` if you are using it.
     */
    constructor(contents: string[] | SlideContent[], options?: Options, config?: RendererConfig, defaults?: Options);
    /**
     * Initializes the instance.
     */
    private init;
    /**
     * Initializes slides.
     */
    private initSlides;
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
     * Builds multiple `translateX` for the list element.
     *
     * @param options - Options for each breakpoint.
     *
     * @return A string with multiple translate functions.
     */
    private buildTranslate;
    /**
     * Returns offset for the list element.
     * This does not include gaps because it can not be converted into percent.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    private cssOffsetClones;
    /**
     * Returns offset for centering the active slide.
     *
     * Note:
     * ( 100% + gap ) / perPage - gap
     * 100% / perPage + gap / perPage - gap;
     * 50% / perPage + ( gap / perPage - gap ) / 2;
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    private cssOffsetCenter;
    /**
     * Returns offset for gaps.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset as `calc()`.
     */
    private cssOffsetGaps;
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
     * Returns the aspectRatio value to simulate the `heightRatio` option.
     *
     * @param options - Options.
     *
     * @return aspectRatio in the CSS format.
     */
    private cssAspectRatio;
    /**
     * Builds the css value by the provided value and unit.
     *
     * @param value - A value.
     * @param unit  - A CSS unit.
     *
     * @return A built value for a CSS value.
     */
    private buildCssValue;
    /**
     * Parses the CSS value into number and unit.
     *
     * @param value - A value to parse.
     *
     * @return An object with value and unit.
     */
    private parseCssValue;
    /**
     * Parses breakpoints and generate options for each breakpoint.
     */
    private parseBreakpoints;
    /**
     * Checks if the slide width is fixed or not.
     *
     * @return `true` if the slide width is fixed, or otherwise `false`.
     */
    private isFixedWidth;
    /**
     * Checks if the slider type is loop or not.
     *
     * @return `true` if the slider type is loop, or otherwise `false`.
     */
    private isLoop;
    /**
     * Checks if the active slide should be centered or not.
     *
     * @return `true` if the slide should be centered, or otherwise `false`.
     */
    private isCenter;
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
     * Converts provided attributes into a single string.
     *
     * @param attrs - An object with attributes.
     *
     * @return A built string.
     */
    private buildAttrs;
    /**
     * Converts provided styles into a single string.
     *
     * @param styles - An object with styles.
     *
     * @return A built string.
     */
    private buildStyles;
    /**
     * Generates HTML of slides with inserting provided contents.
     *
     * @return The HTML for all slides and clones.
     */
    private renderSlides;
    /**
     * Add the `background` style for the cover mode.
     *
     * @param content - A slide content.
     */
    private cover;
    /**
     * Generates clones.
     *
     * @param contents - An array with SlideContent objects.
     */
    private generateClones;
    /**
     * Returns the number of clones to generate.
     *
     * @return A number of clones.
     */
    private getCloneCount;
    /**
     * Generates arrows and the wrapper element.
     *
     * @return The HTML for arrows.
     */
    private renderArrows;
    /**
     * Generates an arrow HTML.
     * Some attributes are temporary, and Splide changes them after mount.
     *
     * @param prev - Options for each breakpoint.
     *
     * @return The HTML for the prev or next arrow.
     */
    private renderArrow;
    /**
     * Returns the HTML of the slider.
     *
     * @return The generated HTML.
     */
    html(): string;
}
//# sourceMappingURL=../../../../src/js/renderer/SplideRenderer/SplideRenderer.d.ts.map