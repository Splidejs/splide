import { fire, init } from '../../../test';


describe( 'Move', () => {
  test( 'can jump to the specific slide.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.jump( 2 );
    expect( list.style.transform ).toBe( 'translateX(-400px)' );

    Move.jump( 4 );
    expect( list.style.transform ).toBe( 'translateX(-800px)' );

    splide.destroy();
  } );

  test( 'can set transform to the list element.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.translate( 100 );
    expect( list.style.transform ).toBe( 'translateX(100px)' );

    Move.translate( 500 );
    expect( list.style.transform ).toBe( 'translateX(500px)' );

    splide.destroy();
  } );

  test( 'can loop the slider if it exceeds bounds.', () => {
    // Note: All clones do not have dimensions.
    const width    = 200;
    const splide   = init( { type: 'loop', width, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.translate( width );
    expect( list.style.transform ).toBe( `translateX(${ -width * ( splide.length - 1 ) }px)` );

    splide.destroy();
  } );

  test( 'can cancel the transition.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.move( 1, 1, -1 );

    expect( list.style.transition ).not.toBe( '' );

    Move.cancel();
    expect( list.style.transition ).toBe( '' );

    splide.destroy();
  } );

  test( 'can convert the position to the closest index.', () => {
    const splide   = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;

    expect( Move.toIndex( 0 ) ).toBe( 0 );
    expect( Move.toIndex( -99 ) ).toBe( 0 );
    expect( Move.toIndex( -100 ) ).toBe( 1 );
    expect( Move.toIndex( -200 ) ).toBe( 1 );
    expect( Move.toIndex( -299 ) ).toBe( 1 );
    expect( Move.toIndex( -300 ) ).toBe( 2 );

    splide.destroy();
  } );

  test( 'can convert the index to the position.', () => {
    const splide   = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;

    expect( Move.toPosition( 0 ) ).toBe( -0 );
    expect( Move.toPosition( 1 ) ).toBe( -200 );
    expect( Move.toPosition( 2 ) ).toBe( -400 );
    expect( Move.toPosition( 3 ) ).toBe( -600 );

    splide.destroy();
  } );

  test( 'can check the position exceeds bounds or not.', () => {
    const width     = 200;
    const splide    = init( { width, height: 100 } );
    const totalSize = width * splide.length;
    const { Move }  = splide.Components;

    expect( Move.exceededLimit( false, -10 ) ).toBe( false );
    expect( Move.exceededLimit( false, 10 ) ).toBe( true );

    expect( Move.exceededLimit( true, - ( totalSize - width ) + 10 ) ).toBe( false );
    expect( Move.exceededLimit( true, - ( totalSize - width ) - 10 ) ).toBe( true );

    Move.translate( 10 );

    expect( Move.exceededLimit() ).toBe( true );

    splide.destroy();
  } );

  test( 'can check if the slider can move or not.', () => {
    const splide   = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;

    expect( Move.isBusy() ).toBe( false );

    Move.move( 1, 1, -1 );
    expect( Move.isBusy() ).toBe( true );

    fire( splide.Components.Elements.list, 'transitionend' );
    expect( Move.isBusy() ).toBe( false );

    splide.destroy();
  } );
} );
