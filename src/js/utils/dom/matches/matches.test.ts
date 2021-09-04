import { matches } from './matches';


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

  test( 'can test if the selector matches the element or not.', () => {
    const container = document.getElementById( 'container' );

    expect( matches( container, 'div' ) ).toBe( true );
    expect( matches( container, '#container' ) ).toBe( true );
    expect( matches( container, 'span' ) ).toBe( false );

    const span = container.firstElementChild;

    expect( matches( span, 'span' ) ).toBe( true );
    expect( matches( span, '#span1' ) ).toBe( true );
    expect( matches( span, '.active' ) ).toBe( true );
    expect( matches( span, '#container .active' ) ).toBe( true );

    expect( matches( span, '#container' ) ).toBe( false );
    expect( matches( span, '#span2' ) ).toBe( false );
  } );
} );
