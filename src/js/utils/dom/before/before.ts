import { forEach } from '../../array';


/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */
export function before( nodes: Node | Node[], ref: Node ): void {
  forEach( nodes, node => {
    const parent = ref.parentNode;

    if ( parent ) {
      parent.insertBefore( node, ref );
    }
  } );
}
