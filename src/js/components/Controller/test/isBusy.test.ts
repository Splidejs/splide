import { fire, init } from '../../../test';


describe( 'Controller#isBusy', () => {
  test( 'can check if the slider is moving or not.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Controller, Move } = splide.Components;

    expect( Controller.isBusy() ).toBe( false );

    Move.move( 1, 1, -1 );
    expect( Controller.isBusy() ).toBe( true );

    fire( splide.Components.Elements.list, 'transitionend' );
    expect( Controller.isBusy() ).toBe( false );
  } );

  test( 'can check if the slider is being scrolled or not.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Controller, Scroll } = splide.Components;

    expect( Controller.isBusy() ).toBe( false );

    Scroll.scroll( 10, 0 );
    expect( Controller.isBusy() ).toBe( true );

    Scroll.cancel();
    expect( Controller.isBusy() ).toBe( false );
  } );
} );