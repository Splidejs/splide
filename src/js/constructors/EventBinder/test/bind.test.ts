import { fire } from '../../../test';
import { EventBinder } from '../EventBinder';


describe( 'EventBinder#bind()', () => {
  const div = document.createElement( 'div' );

  test( 'can listen to native events.', () => {
    const { bind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bind( window, 'resize', callback1 );
    bind( div, 'click', callback2 );

    fire( window, 'resize' );
    fire( div, 'click' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can accept multiple events separated by spaces.', () => {
    const { bind } = EventBinder();
    const callback = jest.fn();

    bind( div, 'load resize click', callback );

    fire( div, 'resize' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can accept multiple events as an array.', () => {
    const { bind } = EventBinder();
    const callback = jest.fn();

    bind( div, [ 'load', 'resize', 'click' ], callback );

    fire( div, 'resize' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can accept multiple events by spaces and an array.', () => {
    const { bind } = EventBinder();
    const callback = jest.fn();

    bind( div, [ 'load resize click', 'scroll', 'wheel' ], callback );

    fire( div, 'resize' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'scroll' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can accept a namespace by a dot notation.', () => {
    const { bind } = EventBinder();
    const callback = jest.fn();

    bind( div, [ 'load.namespace', 'resize.namespace', 'click.namespace' ], callback );

    fire( div, 'resize' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );
} );
