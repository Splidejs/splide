import { forEach } from '../../array';


/**
 * Removes the provided node from its parent.
 *
 * @param nodes - A node or nodes to remove.
 */
export function remove( nodes: Node | Node[] ): void {
  forEach( nodes, node => {
    if ( node && node.parentNode ) {
      node.parentNode.removeChild( node );
    }
  } );
}
