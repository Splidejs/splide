import { EventBus } from '../EventBus';


describe( 'EventBus#on()', () => {
  test( 'can listen to an event.', () => {
    const event     = EventBus();
    const onMounted = jest.fn();
    const onMoved   = jest.fn();

    event.on( 'mounted', onMounted );
    event.on( 'moved', onMoved );

    event.emit( 'mounted' );
    event.emit( 'moved' );

    expect( onMounted ).toHaveBeenCalledTimes( 1 );
    expect( onMoved ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can listen to multiple events by a string.', () => {
    const event    = EventBus();
    const callback = jest.fn();

    event.on( 'mounted ready moved', callback );

    event.emit( 'mounted' );
    event.emit( 'moved' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    event.emit( 'ready' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can listen to multiple events by an array.', () => {
    const event    = EventBus();
    const callback = jest.fn();

    event.on( [ 'mounted', 'moved', 'ready' ], callback );

    event.emit( 'mounted' );
    event.emit( 'moved' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    event.emit( 'ready' );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can listen to multiple events by a string and an array.', () => {
    const event    = EventBus();
    const callback = jest.fn();

    event.on( [ 'mounted moved ready', 'active visible', 'destroy' ], callback );

    event.emit( 'mounted' );
    event.emit( 'moved' );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    event.emit( 'active' );
    event.emit( 'destroy' );
    expect( callback ).toHaveBeenCalledTimes( 4 );
  } );

  test( 'can listen to an event with priority.', () => {
    const event = EventBus();
    const called: number[] = [];

    event.on( 'mounted', () => {
      called.push( 3 );
    }, null, 3 );

    event.on( 'mounted', () => {
      called.push( 2 );
    }, null, 2 );

    event.on( 'mounted', () => {
      called.push( 1 );
    }, null, 1 );

    event.emit( 'mounted' );

    expect( called ).toEqual( [ 1, 2, 3 ] );
  } );

  test( 'can receive arguments.', () => {
    const event    = EventBus();
    const callback = jest.fn();

    event.on( 'mounted', callback );
    event.emit( 'mounted', 1, true, 'string' );

    expect( callback ).toHaveBeenCalledWith( 1, true, 'string' );
  } );
} );
