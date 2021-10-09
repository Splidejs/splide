import { style } from '../style/style';


/**
 * Sets the `display` CSS value to the element.
 *
 * @param elm     - An element to set a new value to.
 * @param display - A new `display` value.
 */
export function display( elm: HTMLElement, display: string ): void {
  style( elm, 'display', display );
}
