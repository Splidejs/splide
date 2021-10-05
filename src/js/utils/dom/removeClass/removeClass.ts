import { toggleClass } from '../toggleClass/toggleClass';


/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */
export function removeClass( elm: Element, classes: string | string[] ): void {
  toggleClass( elm, classes, false );
}
