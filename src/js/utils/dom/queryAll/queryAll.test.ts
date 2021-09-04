import { queryAll } from './queryAll';


describe( 'queryAll', () => {
  beforeEach( () => {
    document.body.innerHTML = `
      <div id="div1">
        <span>1</span>
      </div>
      <div id="div2">
        <span>2</span>
      </div>
      <div id="div3">
        <span>3</span>
      </div>
    `;
  } );

  test( 'can get elements that match the selector.', () => {
    const divs = queryAll( document.body, 'div' );
    expect( divs.length ).toBe( 3 );
    expect( divs[ 0 ].id ).toBe( 'div1' );
    expect( divs[ 1 ].id ).toBe( 'div2' );
    expect( divs[ 2 ].id ).toBe( 'div3' );

    const spans = queryAll( document.body, '#div1 span' );

    expect( spans.length ).toBe( 1 );
    expect( spans[ 0 ].textContent ).toBe( '1' );
  } );
} );
