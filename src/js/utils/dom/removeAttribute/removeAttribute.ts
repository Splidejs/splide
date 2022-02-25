import { forEach } from '../../array';


/**
 * Removes attributes from the element.
 *
 * @param elms  - An element or elements.
 * @param attrs - An attribute or attributes to remove.
 */
export function removeAttribute( elms: Element | Element[], attrs: string | string[] ): void {
  forEach( elms, elm => {
    forEach( attrs, attr => {
      elm && elm.removeAttribute( attr );
    } );
  } );
}
