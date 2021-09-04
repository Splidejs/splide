import { fire, init, keydown } from '../../../test';


describe( 'Sync#navigate()', () => {
  test( 'can make slides clickable.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init( { speed: 0, isNavigation: true }, { id: 'secondary', insertHtml: true, mount: false } );

    primary.sync( secondary ).mount();
    secondary.mount();

    const Slides = secondary.Components.Slides.get();

    fire( Slides[ 1 ].slide, 'click' );

    expect( primary.index ).toBe( 1 );
    expect( secondary.index ).toBe( 1 );

    fire( Slides[ 5 ].slide, 'click' );

    expect( primary.index ).toBe( 5 );
    expect( secondary.index ).toBe( 5 );
  } );

  test( 'can make slides receive key inputs.', () => {
    const primary   = init( { speed: 0 }, { id: 'primary', mount: false } );
    const secondary = init( { speed: 0, isNavigation: true }, { id: 'secondary', insertHtml: true, mount: false } );

    primary.sync( secondary ).mount();
    secondary.mount();

    const Slides = secondary.Components.Slides.get();

    Slides[ 1 ].slide.focus();
    keydown( 'Enter', Slides[ 1 ].slide );

    expect( primary.index ).toBe( 1 );
    expect( secondary.index ).toBe( 1 );

    Slides[ 5 ].slide.focus();
    keydown( ' ', Slides[ 5 ].slide );

    expect( primary.index ).toBe( 5 );
    expect( secondary.index ).toBe( 5 );

    Slides[ 3 ].slide.focus();
    keydown( 'Spacebar', Slides[ 3 ].slide );

    expect( primary.index ).toBe( 3 );
    expect( secondary.index ).toBe( 3 );
  } );
} );
