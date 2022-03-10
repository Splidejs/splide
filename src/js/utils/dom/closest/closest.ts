import { isFunction } from '../../type/type';
import { matches } from '../matches/matches';


/**
 * Starts from the provided element, searches for the first element that matches the selector in ascendants.
 *
 * @param from     - An element to search from.
 * @param selector - A selector.
 *
 * @return The found element if available, or `null`.
 */
export function closest( from: HTMLElement, selector: string ): HTMLElement | null {
  if ( isFunction( from.closest ) ) {
    return from.closest( selector );
  }

  let elm: HTMLElement | null = from;

  while ( elm && elm.nodeType === 1 ) {
    if ( matches( elm, selector ) ) {
      break;
    }

    elm = elm.parentElement;
  }

  return elm;
}