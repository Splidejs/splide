import { removeClass } from './removeClass';


describe( 'removeClass', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="container"></div>';
  } );

  test( 'can remove a class from the element.', () => {
    const container = document.getElementById( 'container' );

    container.classList.add( 'active' );
    expect( container.classList.contains( 'active' ) ).toBe( true );

    removeClass( container, 'active' );
    expect( container.classList.contains( 'active' ) ).toBe( false );
  } );

  test( 'can remove classes from the element.', () => {
    const container = document.getElementById( 'container' );

    container.classList.add( 'active' );
    container.classList.add( 'visible' );

    expect( container.classList.contains( 'active' ) ).toBe( true );
    expect( container.classList.contains( 'visible' ) ).toBe( true );

    removeClass( container, [ 'active', 'visible' ] );

    expect( container.classList.contains( 'active' ) ).toBe( false );
    expect( container.classList.contains( 'visible' ) ).toBe( false );
  } );
} );
