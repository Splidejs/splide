import { before } from './before';


describe( 'before', () => {
  beforeEach( () => {
    document.body.textContent = '';
  } );

  test( 'can insert a node before the reference node.', () => {
    const ref   = document.createElement( 'a' );
    const span1 = document.createElement( 'span' );
    const span2 = document.createElement( 'span' );

    document.body.appendChild( ref );

    before( span1, ref );
    expect( document.body.firstChild ).toBe( span1 );
    expect( span1.nextSibling ).toBe( ref );

    before( span2, ref );
    expect( document.body.firstChild ).toBe( span1 );
    expect( span1.nextSibling ).toBe( span2 );
    expect( span2.nextSibling ).toBe( ref );
  } );

  test( 'can insert nodes before the reference node.', () => {
    const ref   = document.createElement( 'a' );
    const span1 = document.createElement( 'span' );
    const span2 = document.createElement( 'span' );
    const span3 = document.createElement( 'span' );

    document.body.appendChild( ref );

    before( [ span1, span2, span3 ], ref );

    expect( document.body.children[ 0 ] ).toBe( span1 );
    expect( document.body.children[ 1 ] ).toBe( span2 );
    expect( document.body.children[ 2 ] ).toBe( span3 );
    expect( document.body.children[ 3 ] ).toBe( ref );
  } );
} );
