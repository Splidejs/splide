import { child } from '../child/child';


/**
 * Parses the provided HTML string and returns the first element.
 *
 * @param html - An HTML string to parse.
 *
 * @return An Element on success, or otherwise `undefined`.
 */
export function parseHtml<E extends HTMLElement>( html: string ): E | undefined {
  return child<E>( new DOMParser().parseFromString( html, 'text/html' ).body );
}
