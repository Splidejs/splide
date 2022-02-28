import { fire } from '../../../test';
import { EventBinder } from '../EventBinder';


describe( 'EventBinder#unbind()', () => {
  const div = document.createElement( 'div' );

  test( 'can remove a listener.', () => {
    const { bind, unbind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bind( div, 'click', callback1 );
    bind( div, 'mouseenter', callback2 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 2 );

    unbind( div, 'click' );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 2 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 2 );

    expect( callback2 ).not.toHaveBeenCalled();
  } );

  test( 'can remove multiple listeners by a string.', () => {
    const { bind, unbind } = EventBinder();
    const callback = jest.fn();

    bind( div, 'click mouseenter mouseleave', callback );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    unbind( div, 'click mouseleave' );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseleave' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can remove multiple listeners by an array.', () => {
    const { bind, unbind } = EventBinder();
    const callback = jest.fn();

    bind( div, 'click mouseenter mouseleave', callback );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    unbind( div, [ 'click', 'mouseleave' ] );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseleave' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can remove multiple listeners by a string and an array.', () => {
    const { bind, unbind } = EventBinder();
    const callback = jest.fn();

    bind( div, 'click mouseenter mouseleave mousemove', callback );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    unbind( div, [ 'click mousemove', 'mouseleave' ] );

    fire( div, 'click' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseleave' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mousemove' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    fire( div, 'mouseenter' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can only remove events that belong to the specified namespace.', () => {
    const { bind, unbind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    bind( div, 'click.namespace1', callback1 );
    bind( div, 'click.namespace2', callback2 );
    bind( div, 'click.namespace3', callback3 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );

    unbind( div, 'click.namespace1' );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 2 );

    unbind( div, 'click.namespace2' );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );

    unbind( div, 'click.namespace3' );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can remove all handlers in the same namespace.', () => {
    const { bind, unbind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    bind( div, 'click.namespace', callback1 );
    bind( div, 'click.namespace', callback2 );
    bind( div, 'click.namespace', callback3 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );

    unbind( div, 'click.namespace' );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can only remove the specified callback.', () => {
    const { bind, unbind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    bind( div, 'click', callback1 );
    bind( div, 'click', callback2 );
    bind( div, 'click', callback3 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );

    unbind( div, 'click', callback1 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 2 );

    unbind( div, 'click', callback2 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );

    unbind( div, 'click', callback3 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can only remove the specified callback in the same namespace.', () => {
    const { bind, unbind } = EventBinder();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    bind( div, 'click.namespace', callback1 );
    bind( div, 'click.namespace', callback2 );
    bind( div, 'click.namespace', callback3 );

    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );

    unbind( div, 'click.namespace', callback1 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 2 );

    unbind( div, 'click.namespace', callback2 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );

    unbind( div, 'click.namespace', callback3 );
    fire( div, 'click' );
    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
    expect( callback3 ).toHaveBeenCalledTimes( 3 );
  } );
} );
