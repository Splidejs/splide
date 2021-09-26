import { isString } from '../../type/type';
import { toggleClass } from '../toggleClass/toggleClass';


/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */
export function addClass( elm: Element, classes: string | string[] ): void {
  toggleClass( elm, isString( classes ) ? classes.split( ' ' ) : classes, true );
}
