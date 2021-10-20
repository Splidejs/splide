/**
 * Focuses the provided element without scrolling the ascendant element.
 *
 * @param elm - An element to focus.
 */
export function focus( elm: HTMLElement ): void {
  elm[ 'setActive' ] && elm[ 'setActive' ]() || elm.focus( { preventScroll: true } );
}
