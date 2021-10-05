import { children } from './children';


describe( 'children', () => {
  beforeEach( () => {
    document.body.innerHTML = `
      <div id="container">
        <span id="span1" class="active"></span>
        <button id="button1" class="active"></button>
        <span id="span2"></span>
        <button id="button2"></button>
        <span id="span3"></span>
        <button id="button3"></button>
      </div>
    `;
  } );

  test( 'can return children that have the specified tag name.', () => {
    const container = document.getElementById( 'container' );
    const spans     = children( container, 'span' );

    expect( spans.length ).toBe( 3 );
    expect( spans[ 0 ].id ).toBe( 'span1' );
    expect( spans[ 1 ].id ).toBe( 'span2' );
    expect( spans[ 2 ].id ).toBe( 'span3' );
  } );

  test( 'can return children that have the specified class name.', () => {
    const container = document.getElementById( 'container' );
    const spans     = children( container, '.active' );

    expect( spans.length ).toBe( 2 );
    expect( spans[ 0 ].id ).toBe( 'span1' );
    expect( spans[ 1 ].id ).toBe( 'button1' );
  } );

  test( 'should rerun an empty array if no element is found.', () => {
    const container = document.getElementById( 'container' );
    const elms = children( container, '.nothing' );
    expect( elms.length ).toBe( 0 );
  } );
} );
