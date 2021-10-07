import { EVENT_MOVE, EVENT_MOVED } from '../../../constants/events';
import { IDLE, MOVING } from '../../../constants/states';
import { fire, init } from '../../../test';


describe( 'Move#move()', () => {
  test( 'can move the slider with the transition component.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.move( 1, 1, -1 );
    fire( list, 'transitionend' );
    expect( list.style.transform ).toBe( 'translateX(-200px)' );

    Move.move( 2, 2, -1 );
    fire( list, 'transitionend' );
    expect( list.style.transform ).toBe( 'translateX(-400px)' );
  } );

  test( 'can change the state.', () => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    Move.move( 1, 1, -1 );
    expect( splide.state.is( MOVING ) ).toBe( true );

    fire( list, 'transitionend' );
    expect( splide.state.is( IDLE ) ).toBe( true );
  } );

  test( 'can emit events.', done => {
    const splide = init( { width: 200, height: 100 } );
    const { Move } = splide.Components;
    const { list } = splide.Components.Elements;

    splide.on( EVENT_MOVE, ( index, prev, dest ) => {
      expect( index ).toBe( 2 );
      expect( prev ).toBe( 1 );
      expect( dest ).toBe( 3 );
    } );

    splide.on( EVENT_MOVED, ( index, prev, dest ) => {
      expect( index ).toBe( 2 );
      expect( prev ).toBe( 1 );
      expect( dest ).toBe( 3 );

      done();
    } );

    Move.move( 3, 2, 1 );
    fire( list, 'transitionend' );
  } );
} );
