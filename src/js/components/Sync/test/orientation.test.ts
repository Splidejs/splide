import { fire, init, keydown } from '../../../test';


describe( 'Navigation list semantics', () => {
  test.each( [ false, true ] )( 'does not set orientation on a presentation list (isNavigation: %s).', isNavigation => {
    const splide = init( { isNavigation, direction: 'ttb', height: 1000 } );
    const list   = splide.Components.Elements.list;

    function expectPresentation(): void {
      expect( list.getAttribute( 'role' ) ).toBe( 'presentation' );
      expect( list.hasAttribute( 'aria-orientation' ) ).toBe( false );
    }

    expectPresentation();

    splide.options = { direction: 'ltr' };
    expectPresentation();

    splide.options = { direction: 'ttb' };
    expectPresentation();

    splide.refresh();
    expectPresentation();

    splide.destroy();
    expect( list.hasAttribute( 'aria-orientation' ) ).toBe( false );
    splide.mount();
    expectPresentation();
  } );

  test( 'keeps vertical navigation slides operable by click and keyboard.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init(
      { speed: 0, isNavigation: true, direction: 'ttb', height: 1000 },
      { id: 'secondary', insertHtml: true, mount: false }
    );

    primary.sync( secondary ).mount();
    secondary.mount();

    const slides = secondary.Components.Slides.get();
    fire( slides[ 1 ].slide, 'click' );
    expect( primary.index ).toBe( 1 );

    keydown( 'Enter', slides[ 3 ].slide );
    expect( primary.index ).toBe( 3 );

    keydown( ' ', slides[ 5 ].slide );
    expect( primary.index ).toBe( 5 );
    expect( secondary.index ).toBe( 5 );
  } );
} );
