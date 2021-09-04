import { fire, init } from '../../../test';
import { EventInterface } from '../EventInterface';


describe( 'EventInterface', () => {
  const splide = init();

  test( 'can provide `on` to listen to internal events and lock listeners.', () => {
    const { on } = EventInterface( splide );
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    on( 'mounted', callback1 );
    on( 'moved', callback2 );

    splide.emit( 'mounted' );
    splide.emit( 'moved' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );

    // Handlers should not be removed by `off()`.
    splide.off( 'mounted' );
    splide.off( 'moved' );

    splide.emit( 'mounted' );
    splide.emit( 'moved' );

    expect( callback1 ).toHaveBeenCalledTimes( 2 );
    expect( callback2 ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can provide `off` to remove locked listeners.', () => {
    const { on, off } = EventInterface( splide );
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    on( 'mounted', callback1 );
    on( 'moved', callback2 );

    splide.emit( 'mounted' );
    splide.emit( 'moved' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );

    // `off()` can remove handlers registered by `on()`.
    off( 'mounted' );
    off( 'moved' );

    splide.emit( 'mounted' );
    splide.emit( 'moved' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can provide `bind` to listen to native events.', () => {
    const { bind } = EventInterface( splide );
    const div = document.createElement( 'div' );
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bind( window, 'resize', callback1 );
    bind( div, 'click', callback2 );

    fire( window, 'resize' );
    fire( div, 'click' );

    expect( callback1 ).toHaveBeenCalledTimes( 1 );
    expect( callback2 ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can provide `unbind` to remove listeners.', () => {
    const { bind, unbind } = EventInterface( splide );
    const div = document.createElement( 'div' );
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bind( window, 'resize', callback1 );
    bind( div, 'click', callback2 );

    unbind( window, 'resize' );
    unbind( div, 'click' );

    fire( window, 'resize' );
    fire( div, 'click' );

    expect( callback1 ).not.toHaveBeenCalled();
    expect( callback2 ).not.toHaveBeenCalled();
  } );

  test( 'can remove all listeners when the splide is destroyed.', () => {
    const { on, bind } = EventInterface( splide );
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    bind( window, 'resize', callback1 );
    on( 'moved', callback2 );

    splide.destroy();

    fire( window, 'resize' );
    splide.emit( 'moved' );

    expect( callback1 ).not.toHaveBeenCalled();
    expect( callback2 ).not.toHaveBeenCalled();
  } );
} );
