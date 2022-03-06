import { fire, init } from '../../../test';


describe( 'Controller#isBusy', () => {
  test( 'can check if the slider is moving or not.', () => {
    const splide = init( { width: 200, height: 100, waitForTransition: true } );
    const { Controller, Move } = splide.Components;

    expect( Controller.isBusy() ).toBe( false );

    Move.move( 1, 1, -1 );
    expect( Controller.isBusy() ).toBe( true );

    fire( splide.Components.Elements.list, 'transitionend' );
    expect( Controller.isBusy() ).toBe( false );
  } );

  test( 'can check if the slider is being scrolled or not.', () => {
    const splide = init( { width: 200, height: 100, waitForTransition: true } );
    const { Controller, Scroll } = splide.Components;

    expect( Controller.isBusy() ).toBe( false );

    Scroll.scroll( 10, 10 );
    expect( Controller.isBusy() ).toBe( true );

    Scroll.cancel();
    expect( Controller.isBusy() ).toBe( false );
  } );

  test( 'should always return true if `waitForTransition` is false.', () => {
    const splide = init( { width: 200, height: 100, waitForTransition: false } );
    const { Controller, Move, Scroll } = splide.Components;

    expect( Controller.isBusy() ).toBe( false );

    Move.move( 1, 1, -1 );
    expect( Controller.isBusy() ).toBe( false );

    Move.cancel();
    expect( Controller.isBusy() ).toBe( false );

    Scroll.scroll( 10, 10 );
    expect( Controller.isBusy() ).toBe( false );

    Scroll.cancel();
    expect( Controller.isBusy() ).toBe( false );
  } );
} );