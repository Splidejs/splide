import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
import { BuildHtmlArgs } from '../fixtures';
interface InitArgs extends BuildHtmlArgs {
    mount?: boolean;
    html?: string;
    insertHtml?: boolean;
}
/**
 * Creates a new splide instance.
 *
 * @param args    - Arguments for initialization.
 * @param options - Options for Splide.
 *
 * @return A created Splide instance.
 */
export declare function init(options?: Options, args?: InitArgs): Splide;
/**
 * Converts translate values to positions.
 *
 * @param elm - An element to parse.
 *
 * @return An object with left and top offsets.
 */
export declare function parseTransform(elm: HTMLElement): {
    left: number;
    top: number;
};
/**
 * Fires any native event manually.
 *
 * @param target        - A target.
 * @param type          - An event type.
 * @param data          - Optional. Additional data.
 * @param eventInitDict - Optional. An EventInit object.
 *
 * @return An event object.
 */
export declare function fire(target: Window | Document | Element, type: string, data?: any, eventInitDict?: EventInit): Event;
/**
 * Emulates keydown.
 *
 * @param key    - A key to press.
 * @param target - A target.
 */
export declare function keydown(key: string, target?: Window | Element): void;
/**
 * Returns a new Promise resolved after the specified duration.
 *
 * @param duration - Duration to wait.
 *
 * @return A Promise instance.
 */
export declare function wait(duration?: number): Promise<void>;
export {};
//# sourceMappingURL=../../../../src/js/test/utils/utils.d.ts.map