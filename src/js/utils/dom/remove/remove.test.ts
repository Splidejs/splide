import { remove } from './remove';


describe( 'remove', () => {
  test( 'can remove an element from its parent.', () => {
    const div  = document.createElement( 'div' );
    const span = document.createElement( 'span' );

    div.appendChild( span );
    expect( div.firstElementChild ).toBe( span );

    remove( span );
    expect( div.children.length ).toBe( 0 );
  } );

  test( 'can remove elements from its parent.', () => {
    const div   = document.createElement( 'div' );
    const span1 = document.createElement( 'span' );
    const span2 = document.createElement( 'span' );
    const span3 = document.createElement( 'span' );

    div.appendChild( span1 );
    div.appendChild( span2 );
    div.appendChild( span3 );
    expect( div.children[ 0 ] ).toBe( span1 );
    expect( div.children[ 1 ] ).toBe( span2 );
    expect( div.children[ 2 ] ).toBe( span3 );

    remove( [ span1, span2, span3 ] );
    expect( div.children.length ).toBe( 0 );
  } );

  test( 'can remove a text node from its parent.', () => {
    const span = document.createElement( 'span' );
    const node = document.createTextNode( 'sample' );

    span.appendChild( node );
    expect( span.textContent ).toBe( 'sample' );

    remove( node );
    expect( span.textContent ).toBe( '' );
  } );
} );
