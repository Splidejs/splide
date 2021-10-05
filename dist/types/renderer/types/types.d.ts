/**
 * The interface for the content of each slide.
 *
 * @since 3.0.0
 */
export interface SlideContent {
    /**
     * The HTML or text for each slide.
     */
    html?: string;
    /**
     * The collection of styles. They will remain after Splide is applied.
     */
    styles?: Record<string, string | number>;
    /**
     * The collection of attributes. They will remain after Splide is applied.
     */
    attrs?: Record<string, string | number | boolean>;
}
/**
 * The interface for the config of the renderer.
 *
 * @since 3.0.0
 */
export interface RendererConfig {
    /**
     * The slider ID.
     */
    id?: string;
    /**
     * The additional class for the root element.
     */
    rootClass?: string;
    /**
     * The tag used for the list element.
     */
    listTag?: string;
    /**
     * The tag used for each slide.
     */
    slideTag?: string;
    /**
     * Determines whether to render arrows or not.
     */
    arrows?: boolean;
    /**
     * Keeps the slider hidden.
     */
    hidden?: boolean;
    /**
     * Determines whether to wrap the track by the slider element or not.
     */
    slider?: boolean;
    /**
     * The additional HTML rendered before the slider element.
     */
    beforeSlider?: string;
    /**
     * The additional HTML rendered after the slider element.
     */
    afterSlider?: string;
    /**
     * The additional HTML rendered before the track element.
     */
    beforeTrack?: string;
    /**
     * The additional HTML rendered after the track element.
     */
    afterTrack?: string;
}
//# sourceMappingURL=../../../../src/js/renderer/types/types.d.ts.map