import { BaseComponent } from '../../types';
/**
 * The interface for the Style component.
 *
 * @since 3.0.0
 */
export interface StyleComponent extends BaseComponent {
    rule(selector: string, prop: string, value: string | number): void;
    ruleBy(target: string | HTMLElement, prop: string, value: string | number): void;
}
/**
 * The component for managing styles of the slider.
 *
 * @since 3.0.0
 *
 * @return A Style component object.
 */
export declare function Style(): StyleComponent;
//# sourceMappingURL=../../../../src/js/components/Style/Style.d.ts.map