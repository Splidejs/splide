import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from '../../constants/arrows';
import { RTL, TTB } from '../../constants/directions';
import { BaseComponent, ComponentConstructor, Options } from '../../types';
import { apply } from '@splidejs/utils';


/**
 * The interface for the Direction component.
 *
 * @since 3.0.0
 */
export interface DirectionComponent extends BaseComponent {
  resolve<K extends OrientationMapKeys>(prop: K, axisOnly?: boolean, direction?: Options['direction']): typeof ORIENTATION_MAP[ K ][ number ] | K;
  resolve<R extends string>(prop: R, axisOnly?: boolean, direction?: Options['direction']): R;

  orient(value: number): number;

  /** @internal */
  left(): 'left' | 'right' | 'top';
  right(): 'left' | 'right' | 'bottom';
  width(): 'width' | 'height';
}

/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */
export const ORIENTATION_MAP = {
  width: ['height'],
  left: ['top', 'right'],
  right: ['bottom', 'left'],
  x: ['y'],
  X: ['Y'],
  Y: ['X'],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT],
} as const;

/**
 * Keys in ORIENTATION_MAP.
 *
 * @since 5.0.0
 */
type OrientationMapKeys = keyof typeof ORIENTATION_MAP;

/**
 * The component that absorbs the difference among directions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Direction component object.
 */
export const Direction: ComponentConstructor<DirectionComponent> = (Splide, Components, options) => {
  /**
   * Resolves the provided property name.
   *
   * @param prop      - A property name to translate.
   * @param axisOnly  - Optional. If `ture`, returns the same property for LTR and RTL.
   * @param direction - Optional. Specify the direction. The default value is the `direction` option.
   */
  function resolve(
    prop: string,
    axisOnly?: boolean,
    direction: Options['direction'] = options.direction,
  ): string {
    const index = direction === RTL && !axisOnly
      ? 1
      : direction === TTB ? 0 : -1;

    return find(prop, index) || prop.replace(/width|left|right/i, (match, offset) => {
      const replacement = find(match.toLowerCase(), index) || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }

  /**
   * Finds the prop in the orientation map.
   *
   * @param prop  - A prop to find.
   * @param index - An index for direction.
   *
   * @return A found value if available, or otherwise an empty string.
   */
  function find(prop: string, index: number): string {
    const props = ORIENTATION_MAP[prop as OrientationMapKeys];
    return props && index > -1 ? props[index] : '';
  }

  /**
   * Orients the value towards the current direction.
   *
   * @param value     - A value to orient.
   * @param direction - Optional. Specify the direction. The default value is the `direction` option.
   *
   * @return The oriented value.
   */
  function orient(value: number, direction: Options[ 'direction' ] = options.direction): number {
    return value * (direction === RTL ? 1 : -1);
  }

  return {
    resolve,
    orient,
    left: apply(resolve, 'left') as () => 'left' | 'right' | 'top',
    right: apply(resolve, 'right') as () => 'left' | 'right' | 'bottom',
    width: apply(resolve, 'width') as () => 'width' | 'height',
  };
};
