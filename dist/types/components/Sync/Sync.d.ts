import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
/**
 * The interface for the Sync component.
 *
 * @since 3.0.0
 */
export interface SyncComponent extends BaseComponent {
    remount(): void;
}
/**
 * The component for syncing multiple sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Sync component object.
 */
export declare function Sync(Splide: Splide, Components: Components, options: Options): SyncComponent;
//# sourceMappingURL=../../../../src/js/components/Sync/Sync.d.ts.map