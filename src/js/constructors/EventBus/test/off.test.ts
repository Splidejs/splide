import { EventBus } from '../EventBus';


describe( 'EventBus#off()', () => {
  test( 'can remove a listener.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();

    event.on( 'mounted', onMounted );
    event.on( 'moved', onMoved );

    event.off( 'mounted' );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can remove listeners by a string.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();

    event.on( 'mounted', onMounted );
    event.on( 'moved', onMoved );

    event.off( 'mounted moved' );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).not.toHaveBeenCalled();
  } );

  test( 'can remove listeners by an array.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();

    event.on( 'mounted', onMounted );
    event.on( 'moved', onMoved );

    event.off( [ 'mounted', 'moved' ] );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).not.toHaveBeenCalled();
  } );

  test( 'can remove listeners by a string and an array.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();
    const onReady   = jest.fn();

    event.on( 'mounted', onMounted );
    event.on( 'moved', onMoved );
    event.on( 'ready', onReady );

    event.off( [ 'mounted moved', 'ready' ] );

    event.emit( 'mounted' );
    event.emit( 'moved' );
    event.emit( 'ready' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).not.toHaveBeenCalled();
    expect( onReady ).not.toHaveBeenCalled();
  } );

  test( 'can remove a listener that belongs to the specified namespace.', () => {
    const event     = EventBus();
    const callback1 = jest.fn();
    const callback2   = jest.fn();
    const callback3   = jest.fn();

    event.on( 'mounted.namespace1', callback1 );
    event.on( 'mounted.namespace2', callback2 );
    event.on( 'mounted.namespace3', callback3 );

    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );

    event.off( 'mounted.namespace2' );
    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 2 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 2 );

    event.off( 'mounted.namespace3' );
    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 3 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 2 );
  } );
} );
