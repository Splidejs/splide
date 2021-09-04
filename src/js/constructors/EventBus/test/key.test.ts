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
} );
