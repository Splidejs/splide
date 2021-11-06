import { EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { DEFAULT_EVENT_PRIORITY } from '../../constants/priority';
import { LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, BaseComponent, Components, Options } from '../../types';
import { approximatelyEqual, between, clamp, floor, isString, isUndefined, max } from '../../utils';


/**
 * The interface for the Controller component.
 *
 * @since 3.0.0
 */
export interface ControllerComponent extends BaseComponent {
  go( control: number | string, allowSameIndex?: boolean, callback?: AnyFunction ): void;
  scroll( destination: number, useIndex?: boolean, snap?: boolean, duration?: number, callback?: AnyFunction ): void;
  getNext( destination?: boolean ): number;
  getPrev( destination?: boolean ): number;
  getEnd(): number;
  setIndex( index: number ): void;
  getIndex( prev?: boolean ): number;
  toIndex( page: number ): number;
  toPage( index: number ): number;
  toDest( position: number ): number;
  hasFocus(): boolean;
}

/**
 * The component for controlling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Controller component object.
 */
export function Controller( Splide: Splide, Components: Components, options: Options ): ControllerComponent {
  const { on } = EventInterface( Splide );
  const { Move } = Components;
  const { getPosition, getLimit } = Move;
  const { isEnough, getLength } = Components.Slides;
  const isLoop  = Splide.is( LOOP );
  const isSlide = Splide.is( SLIDE );

  /**
   * The current index.
   */
  let currIndex = options.start || 0;

  /**
   * The previous index.
   */
  let prevIndex = currIndex;

  /**
   * The latest number of slides.
   */
  let slideCount: number;

  /**
   * The latest `perMove` value.
   */
  let perMove: number;

  /**
   * The latest `perMove` value.
   */
  let perPage: number;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();
    on( [ EVENT_UPDATED, EVENT_REFRESH ], init, DEFAULT_EVENT_PRIORITY - 1 );
  }

  /**
   * Initializes some parameters.
   * Needs to check the slides length since the current index may be out of the range after refresh.
   */
  function init(): void {
    slideCount = getLength( true );
    perMove    = options.perMove;
    perPage    = options.perPage;
    currIndex  = clamp( currIndex, 0, slideCount - 1 );
  }

  /**
   * Moves the slider by the control pattern.
   *
   * @see `Splide#go()`
   *
   * @param control        - A control pattern.
   * @param allowSameIndex - Optional. Determines whether to allow to go to the current index or not.
   * @param callback       - Optional. A callback function invoked after transition ends.
   */
  function go( control: number | string, allowSameIndex?: boolean, callback?: AnyFunction ): void {
    const dest = parse( control );

    if ( options.useScroll ) {
      scroll( dest, true, true, options.speed, callback );
    } else {
      const index = loop( dest );

      if ( index > -1 && ! Move.isBusy() && ( allowSameIndex || index !== currIndex ) ) {
        setIndex( index );
        Move.move( dest, index, prevIndex, callback );
      }
    }
  }

  /**
   * Scrolls the slider to the specified destination with updating indices.
   *
   * @param destination - A position or an index to scroll to.
   * @param useIndex    - Optional. Whether to use an index as a destination or not.
   * @param snap        - Optional. Whether to snap the closest slide or not.
   * @param duration    - Optional. Specifies the scroll duration.
   * @param callback    - Optional. A callback function invoked after scroll ends.
   */
  function scroll(
    destination: number,
    useIndex?: boolean,
    snap?: boolean,
    duration?: number,
    callback?: AnyFunction
  ): void {
    const dest = useIndex ? destination : toDest( destination );

    Components.Scroll.scroll( useIndex || snap ? Move.toPosition( dest, true ) : destination, duration, () => {
      setIndex( Move.toIndex( Move.getPosition() ) );
      callback && callback();
    } );
  }

  /**
   * Parses the control and returns a slide index.
   *
   * @param control - A control pattern to parse.
   *
   * @return A `dest` index.
   */
  function parse( control: number | string ): number {
    let index = currIndex;

    if ( isString( control ) ) {
      const [ , indicator, number ] = control.match( /([+\-<>])(\d+)?/ ) || [];

      if ( indicator === '+' || indicator === '-' ) {
        index = computeDestIndex( currIndex + +`${ indicator }${ +number || 1 }`, currIndex, true );
      } else if ( indicator === '>' ) {
        index = number ? toIndex( +number ) : getNext( true );
      } else if ( indicator === '<' ) {
        index = getPrev( true );
      }
    } else {
      index = isLoop ? control : clamp( control, 0, getEnd() );
    }

    return index;
  }

  /**
   * Returns a next destination index.
   *
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return A next index if available, or otherwise `-1`.
   */
  function getNext( destination?: boolean ): number {
    return getAdjacent( false, destination );
  }

  /**
   * Returns a previous destination index.
   *
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return A previous index if available, or otherwise `-1`.
   */
  function getPrev( destination?: boolean ): number {
    return getAdjacent( true, destination );
  }

  /**
   * Returns an adjacent destination index.
   *
   * @param prev        - Determines whether to return a previous or next index.
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return An adjacent index if available, or otherwise `-1`.
   */
  function getAdjacent( prev: boolean, destination?: boolean ): number {
    const number = perMove || ( hasFocus() ? 1 : perPage );
    const dest   = computeDestIndex( currIndex + number * ( prev ? -1 : 1 ), currIndex );

    if ( dest === -1 && isSlide ) {
      if ( ! approximatelyEqual( getPosition(), getLimit( ! prev ), 1 ) ) {
        return prev ? 0 : getEnd();
      }
    }

    return destination ? dest : loop( dest );
  }

  /**
   * Converts the desired destination index to the valid one.
   * - This may return clone indices if the editor is the loop mode,
   *   or `-1` if there is no slide to go.
   * - There are still slides where the slider can go if borders are between `from` and `dest`.
   *
   * @param dest        - The desired destination.
   * @param from        - A base index.
   * @param incremental - Optional. Whether the control is incremental or not.
   *
   * @return A converted destination index, including clones.
   */
  function computeDestIndex( dest: number, from: number, incremental?: boolean ): number {
    if ( isEnough() ) {
      const end = getEnd();

      // Will overrun:
      if ( dest < 0 || dest > end ) {
        if ( between( 0, dest, from, true ) || between( end, from, dest, true ) ) {
          dest = toIndex( toPage( dest ) );
        } else {
          if ( isLoop ) {
            dest = perMove
              ? dest
              : dest < 0 ? - ( slideCount % perPage || perPage ) : slideCount;
          } else if ( options.rewind ) {
            dest = dest < 0 ? end : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if ( ! incremental && dest !== from ) {
          dest = perMove ? dest : toIndex( toPage( from ) + ( dest < from ? -1 : 1 ) );
        }
      }
    } else {
      dest = -1;
    }

    return dest;
  }

  /**
   * Returns the end index where the slider can go.
   * For example, if the slider has 10 slides and the `perPage` option is 3,
   * the slider can go to the slide 8 (the index is 7).
   *
   * @return An end index.
   */
  function getEnd(): number {
    let end = slideCount - perPage;

    if ( hasFocus() || ( isLoop && perMove ) ) {
      end = slideCount - 1;
    }

    return max( end, 0 );
  }

  /**
   * Loops the provided index only in the loop mode.
   *
   * @param index - An index to loop.
   *
   * @return A looped index.
   */
  function loop( index: number ): number {
    if ( isLoop ) {
      return isEnough() ? index % slideCount + ( index < 0 ? slideCount : 0 ) : -1;
    }

    return index;
  }

  /**
   * Converts the page index to the slide index.
   *
   * @param page - A page index to convert.
   *
   * @return A slide index.
   */
  function toIndex( page: number ): number {
    return clamp( hasFocus() ? page : perPage * page, 0, getEnd() );
  }

  /**
   * Converts the slide index to the page index.
   *
   * @param index - An index to convert.
   */
  function toPage( index: number ): number {
    if ( ! hasFocus() ) {
      index = between( index, slideCount - perPage, slideCount - 1 ) ? slideCount - 1 : index;
      index = floor( index / perPage );
    }

    return index;
  }

  /**
   * Converts the destination position to the dest index.
   *
   * @param destination - A position to convert.
   *
   * @return A dest index.
   */
  function toDest( destination: number ): number {
    const closest = Move.toIndex( destination );
    return isSlide ? clamp( closest, 0, getEnd() ) : closest;
  }

  /**
   * Sets a new index and retains old one.
   *
   * @param index - A new index to set.
   */
  function setIndex( index: number ): void {
    if ( index !== currIndex ) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }

  /**
   * Returns the current/previous index.
   *
   * @param prev - Optional. Whether to return previous index or not.
   */
  function getIndex( prev?: boolean ): number {
    return prev ? prevIndex : currIndex;
  }

  /**
   * Verifies if the focus option is available or not.
   *
   * @return `true` if the slider has the focus option.
   */
  function hasFocus(): boolean {
    return ! isUndefined( options.focus ) || options.isNavigation;
  }

  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
  };
}
