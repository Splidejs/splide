import { EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { MOVING, SCROLLING } from '../../constants/states';
import { LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, BaseComponent, Components, Options } from '../../types';
import { apply, approximatelyEqual, between, clamp, floor, isString, isUndefined, max } from '../../utils';


/**
 * The interface for the Controller component.
 *
 * @since 3.0.0
 */
export interface ControllerComponent extends BaseComponent {
  go( control: number | string, allowSameIndex?: boolean, callback?: AnyFunction ): void;
  scroll( destination: number, duration?: number, snap?: boolean, callback?: AnyFunction ): void;
  getNext( destination?: boolean ): number;
  getPrev( destination?: boolean ): number;
  getAdjacent( prev: boolean, destination?: boolean ): number;
  getEnd(): number;
  setIndex( index: number ): void;
  getIndex( prev?: boolean ): number;
  toIndex( page: number ): number;
  toPage( index: number ): number;
  toDest( position: number ): number;
  hasFocus(): boolean;
  isBusy(): boolean;
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
  const { getPosition, getLimit, toPosition } = Move;
  const { isEnough, getLength } = Components.Slides;
  const isLoop  = Splide.is( LOOP );
  const isSlide = Splide.is( SLIDE );
  const getNext = apply( getAdjacent, false );
  const getPrev = apply( getAdjacent, true );

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
    on( [ EVENT_UPDATED, EVENT_REFRESH ], init );
  }

  /**
   * Initializes some parameters.
   * Needs to check the slides length since the current index may be out of the range after refresh.
   * The process order must be Elements -> Controller -> Move.
   */
  function init(): void {
    slideCount = getLength( true );
    perMove    = options.perMove;
    perPage    = options.perPage;

    const index = clamp( currIndex, 0, slideCount - 1 );

    if ( index !== currIndex ) {
      currIndex = index;
      Move.reposition();
    }
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
    if ( ! isBusy() ) {
      const dest  = parse( control );
      const index = loop( dest );

      if ( index > -1 && ( allowSameIndex || index !== currIndex ) ) {
        setIndex( index );
        Move.move( dest, index, prevIndex, callback );
      }
    }
  }

  /**
   * Scrolls the slider to the specified destination with updating indices.
   *
   * @param destination - An index to scroll the slider to.
   * @param duration    - Optional. Specifies the scroll duration.
   * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
   * @param callback    - Optional. A callback function invoked after scroll ends.
   */
  function scroll( destination: number, duration?: number, snap?: boolean, callback?: AnyFunction ): void {
    Components.Scroll.scroll( destination, duration, snap, () => {
      setIndex( loop( Move.toIndex( Move.getPosition() ) ) );
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
        index = computeDestIndex( currIndex + +`${ indicator }${ +number || 1 }`, currIndex );
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
   * Returns an adjacent destination index.
   *
   * @internal
   *
   * @param prev        - Determines whether to return a previous or next index.
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return An adjacent index if available, or otherwise `-1`.
   */
  function getAdjacent( prev: boolean, destination?: boolean ): number {
    const number = perMove || ( hasFocus() ? 1 : perPage );
    const dest   = computeDestIndex( currIndex + number * ( prev ? -1 : 1 ), currIndex, ! ( perMove || hasFocus() ) );

    if ( dest === -1 && isSlide ) {
      if ( ! approximatelyEqual( getPosition(), getLimit( ! prev ), 1 ) ) {
        return prev ? 0 : getEnd();
      }
    }

    return destination ? dest : loop( dest );
  }

  /**
   * Converts the desired destination index to the valid one.
   * - If the `move` option is `true`, finds the dest index whose position is different with the current one.
   * - This may return clone indices if the editor is the loop mode,
   *   or `-1` if there is no slide to go.
   * - There are still slides where the slider can go if borders are between `from` and `dest`.
   *
   * @param dest     - The desired destination.
   * @param from     - A base index.
   * @param snapPage - Optional. Whether to snap a page or not.
   *
   * @return A converted destination index, including clones.
   */
  function computeDestIndex( dest: number, from: number, snapPage?: boolean ): number {
    if ( isEnough() ) {
      const end   = getEnd();
      const index = computeMovableDestIndex( dest );

      if ( index !== dest ) {
        from     = dest;
        dest     = index;
        snapPage = false;
      }

      if ( dest < 0 || dest > end ) {
        if ( between( 0, dest, from, true ) || between( end, from, dest, true ) ) {
          dest = toIndex( toPage( dest ) );
        } else {
          if ( isLoop ) {
            dest = snapPage
              ? dest < 0 ? - ( slideCount % perPage || perPage ) : slideCount
              : dest;
          } else if ( options.rewind ) {
            dest = dest < 0 ? end : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if ( snapPage && dest !== from ) {
          dest = toIndex( toPage( from ) + ( dest < from ? -1 : 1 ) );
        }
      }
    } else {
      dest = -1;
    }

    return dest;
  }

  /**
   * Finds the dest index whose position is different with the current one.
   * This can be negative or greater than `length - 1`.
   *
   * @param dest - A dest index.
   *
   * @return A dest index.
   */
  function computeMovableDestIndex( dest: number ): number {
    if ( isSlide && options.trimSpace === 'move' && dest !== currIndex ) {
      const position = getPosition();

      while ( position === toPosition( dest, true ) && between( dest, 0, Splide.length - 1, ! options.rewind ) ) {
        dest < currIndex ? --dest : ++dest;
      }
    }

    return dest;
  }

  /**
   * Loops the provided index only in the loop mode.
   *
   * @param index - An index to loop.
   *
   * @return A looped index.
   */
  function loop( index: number ): number {
    return isLoop ? ( index + slideCount ) % slideCount || 0 : index;
  }

  /**
   * Returns the end index where the slider can go.
   * For example, if the slider has 10 slides and the `perPage` option is 3,
   * the slider can go to the slide 8 (the index is 7).
   *
   * @return An end index.
   */
  function getEnd(): number {
    return max( slideCount - ( hasFocus() || ( isLoop && perMove ) ? 1 : perPage ), 0 );
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
   *
   * @return A page index.
   */
  function toPage( index: number ): number {
    return hasFocus()
      ? index
      : floor( ( index >= getEnd() ? slideCount - 1 : index ) / perPage );
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

  /**
   * Checks if the slider is moving/scrolling or not.
   *
   * @return `true` if the slider can move, or otherwise `false`.
   */
  function isBusy(): boolean {
    return Splide.state.is( [ MOVING, SCROLLING ] ) && !! options.waitForTransition;
  }

  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
    isBusy,
  };
}
