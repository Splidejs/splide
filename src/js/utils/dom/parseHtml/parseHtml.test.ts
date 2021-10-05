import { parseHtml } from './parseHtml';


describe( 'parseHtml', () => {
  test( 'can parse the provided HTML string.', () => {
    const div = parseHtml( '<div id="container" class="active"><span>content</span></div>' );

    expect( div.id ).toBe( 'container' );
    expect( div.classList.contains( 'active' ) ).toBe( true );
    expect( div.firstElementChild.tagName.toUpperCase() ).toBe( 'SPAN' );
    expect( div.firstElementChild.textContent ).toBe( 'content' );
  } );

  test( 'can parse the provided SVG string.', () => {
    const svg = parseHtml( '<svg id="icon"><path d="m19 18-14-13m0 13 14-13"></path></svg>' );

    expect( svg instanceof SVGElement ).toBe( true );
    expect( svg.id ).toBe( 'icon' );
    expect( svg.firstElementChild.tagName.toUpperCase() ).toBe( 'PATH' );
  } );
} );
