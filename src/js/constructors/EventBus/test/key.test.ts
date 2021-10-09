import { EventBus } from '../EventBus';


describe( 'EventBus', () => {
  test( 'can lock a listener by a key.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();
    const key       = {};

    event.on( 'mounted', onMounted, key );
    event.on( 'moved', onMoved, key );

    event.off( 'mounted' );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).toHaveBeenCalledTimes( 1 );
    expect( onMoved ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can remove a listener by a key.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();
    const key       = {};

    event.on( 'mounted', onMounted, key );
    event.on( 'moved', onMoved, key );

    event.off( 'mounted', key );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).toHaveBeenCalledTimes( 1 );

    event.off( 'moved', key );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can remove all listeners locked by the same key.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();
    const key       = {};

    event.on( 'mounted', onMounted, key );
    event.on( 'moved', onMoved, key );

    event.offBy( key );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).not.toHaveBeenCalled();
    expect( onMoved ).not.toHaveBeenCalled();
  } );

  test( 'should not remove a handler if a key does not match.', () => {
    const event     = EventBus();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const key       = {};

    event.on( 'mounted', callback1 );
    event.on( 'mounted', callback2, key );
    event.on( 'mounted', callback3, key );

    event.off( 'mounted', key );

    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).not.toHaveBeenCalled();
    expect( callback3 ).not.toHaveBeenCalled();
  } );
} );
