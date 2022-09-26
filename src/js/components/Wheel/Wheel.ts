import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { MOVING } from '../../constants/states';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, prevent, timeOf } from '../../utils';


/**
 * The interface for the Wheel component.
 *
 * @since 3.0.0
 */
export interface WheelComponent extends BaseComponent {
}

/**
 * The component for observing the mouse wheel and moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Wheel component object.
 */
export function Wheel( Splide: Splide, Components: Components, options: Options ): WheelComponent {
  const { bind } = EventInterface( Splide );

  /**
   * Holds the last time when the wheel moves the slider.
   */
  let lastTime = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if (options.freeScroll) {
      bind( Components2.Elements.track, 'wheel', freeWheel, SCROLL_LISTENER_OPTIONS );
    } else if ( options.wheel ) {
      bind( Components.Elements.track, 'wheel', onWheel, SCROLL_LISTENER_OPTIONS );
    }
  }

  function detectTrackPad(e) {
    // This works because wheelDeltaY measures the physical distance that
    // the actual hardware mouse wheel has travelled,
    // while deltaY measures the amount of scrolling produced on screen.
    // A conventional mouse typically has a much lower "scroll resolution"
    // than a trackpad. That is to say, with a trackpad you can make a tiny motion
    // and a get a tiny scroll on screen. A conventional mouse scrolls in chunkier,
    // low resolution clicks. To complete a full rotation of the mouse wheel,
    // it might make 10 clicks. There is no such thing as a half click or quarter click.
    // For a conventional mouse, a single wheel click is reported as 120 wheelDeltaY "units"
    // and results in about ~100px worth of scrolling. The physical wheelDeltaY unit is
    // a completely arbitrary number, it is not measuring inches or degrees or anything like that.
    // The number 120 was selected simply because it has a lot of useful factors.
    // The amount of scrolling on screen is represented by deltaY,
    // and it varies significantly by browser.
    // (Sidenote, deltaY is generally measured in "lines" not pixels, though it's complicated, see previous link).
    // Interacting with a trackpad is different in two ways.
    // First of all, you can get wheelDeltaY values much smaller than 120,
    // because very subtle finger gestures are detectable.
    // Second, the wheelDeltaY is exactly 3x the deltaY value
    // (at least in every browser I've managed to test). So,
    // for instance, if you make a physical finger gesture equal to 12 click units,
    // it will generally result in 4 pixels worth of scrolling.
    // (Y1 = Y2 * 3) to detect the existence of a trackpad,
    // but you could probably also be successful simply by checking if abs(wheelDeltaY) equals 120

    var isTrackpad = false;
    if (e.wheelDeltaY) {
      if (e.wheelDeltaY === e.deltaY * -3) {
        isTrackpad = true;
      }
    } else if (e.deltaMode === 0) {
      isTrackpad = true;
     }
    return isTrackpad;
   }

  /**
   * Called when the user rotates the mouse wheel on the slider.
   *
   * @param e - A WheelEvent object.
   */
  function onWheel( e: WheelEvent ): void {
    if ( e.cancelable ) {
      const { deltaY } = e;
      const backwards = deltaY < 0;
      const timeStamp = timeOf( e );
      const min       = options.wheelMinThreshold || 0;
      const sleep     = options.wheelSleep || 0;

      if ( abs( deltaY ) > min && timeStamp - lastTime > sleep ) {
        Splide.go( backwards ? '<' : '>' );
        lastTime = timeStamp;
      }

      shouldPrevent( backwards ) && prevent( e );
    }
  }

  /**
   * Called when the user rotates the mouse wheel on the slider (follows up and down) +
   * follows trackpad movement as well.
   *
   * @param e - A WheelEvent object.
   */
  function freeWheel( e: WheelEvent ): void {
    if (e.cancelable) {
      const isTrackpad = detectTrackPad(e);
      var timeStamp = timeOf(e);
      var _min = options.wheelMinThreshold || 0;
      var sleep = options.wheelSleep || 0;
      if (isTrackpad) {
        var deltaX = e.deltaX;
        var backwards = deltaX < 0;
        if (abs(deltaX) > _min && timeStamp - lastTime > sleep) {
          Splide.go(backwards ? '<' : '>');
          lastTime = timeStamp;
        }
        shouldPrevent(backwards) && prevent(e);
      } else {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide.go(backwards ? '<' : '>');
          lastTime = timeStamp;
        }
        shouldPrevent(backwards) && prevent(e);
      }
    }
  }

  /**
   * Checks whether the component should prevent the default action of the wheel event or not.
   *
   * @param backwards - Set this to `true` for backwards direction.
   *
   * @return `true` if the action should be prevented.
   */
  function shouldPrevent( backwards: boolean ): boolean {
    return ! options.releaseWheel
      || Splide.state.is( MOVING )
      || Components.Controller.getAdjacent( backwards ) !== -1;
  }

  return {
    mount,
  };
}
