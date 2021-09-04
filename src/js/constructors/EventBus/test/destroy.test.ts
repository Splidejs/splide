import { EventBus } from '../EventBus';


describe( 'EventBus#destroy', () => {
  test( 'can remove all handlers.', () => {
    const event     = EventBus();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const callback4 = jest.fn();
    const callback5 = jest.fn();
    const key       = {};

    event.on( 'mounted', callback1 );

    // With a namespace
    event.on( 'mounted.namespace', callback2 );

    // Multiple events
    event.on( 'mounted moved', callback3 );

    // With a key
    event.on( 'mounted', callback4, key );

    // With a key and a namespace
    event.on( 'mounted.namespace', callback5, key );

    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );
    expect( callback4 ).toHaveBeenCalledTimes( 1 );
    expect( callback5 ).toHaveBeenCalledTimes( 1 );

    event.destroy();
    event.emit( 'mounted' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
    expect( callback3 ).toHaveBeenCalledTimes( 1 );
    expect( callback4 ).toHaveBeenCalledTimes( 1 );
    expect( callback5 ).toHaveBeenCalledTimes( 1 );
  } );
} );
