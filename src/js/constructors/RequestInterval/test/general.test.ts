import { wait } from '../../../test';
import { RequestInterval } from '../RequestInterval';


describe( 'RequestInterval', () => {
  test( 'can invoke a function repeatedly by the specified interval.', async () => {
    const callback          = jest.fn();
    const duration          = 1000;
    const durationAndBuffer = 1100;
    const interval          = RequestInterval( duration, callback );

    interval.start();

    expect( callback ).not.toHaveBeenCalled();

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 2 );

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 3 );
  } );

  test( 'can cancel the active interval.', async () => {
    const callback          = jest.fn();
    const duration          = 1000;
    const durationAndBuffer = 1100;
    const interval          = RequestInterval( duration, callback );

    interval.start();

    expect( callback ).not.toHaveBeenCalled();

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    interval.cancel();

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can pause/resume the active interval.', async () => {
    const callback          = jest.fn();
    const duration          = 1000;
    const durationAndBuffer = 1100;
    const interval          = RequestInterval( duration, callback );

    interval.start();

    expect( callback ).not.toHaveBeenCalled();

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );
    interval.pause();

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    interval.start( true );

    await wait( durationAndBuffer );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can rewind the active interval.', async () => {
    const callback = jest.fn();
    const duration = 1000;
    const buffer   = 100;
    const interval = RequestInterval( duration, callback );

    interval.start();

    expect( callback ).not.toHaveBeenCalled();

    // Rewind the interval timer around 900ms
    await wait( duration - buffer );
    interval.rewind();

    // Now around 1100ms, but the callback should not be called.
    await wait( buffer * 2 );
    expect( callback ).not.toHaveBeenCalled();

    // Around 1200ms after calling `rewind()`. The rewound timer should be expired.
    await wait( duration );
    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );

  test( 'can check if the interval is paused or not.', () => {
    const callback = jest.fn();
    const duration = 1000;
    const interval = RequestInterval( duration, callback );

    expect( interval.isPaused() ).toBe( true );

    interval.start();
    expect( interval.isPaused() ).toBe( false );

    interval.pause();
    expect( interval.isPaused() ).toBe( true );

    interval.start();
    expect( interval.isPaused() ).toBe( false );

    interval.cancel();
    expect( interval.isPaused() ).toBe( true );
  } );

  test( 'should pause the interval after reaching the limit.', async () => {
    const callback = jest.fn();
    const duration = 1000;
    const interval = RequestInterval( duration, callback, null, 1 );

    await wait( duration + 100 );
    expect( interval.isPaused() ).toBe( true );
  } );
} );
