import { forEach } from '../../array';


/**
 * Removes attributes from the element.
 *
 * @param elm   - An element.
 * @param attrs - An attribute or attributes to remove.
 */
export function removeAttribute( elm: Element, attrs: string | string[] ): void {
  if ( elm ) {
    forEach( attrs, attr => {
      elm.removeAttribute( attr );
    } );
  }
}
