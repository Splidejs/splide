import { EVENT_REFRESH, EVENT_SCROLLED, EVENT_UPDATED } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { between, clamp, floor, isString, isUndefined, max } from '../../utils';


/**
 * The interface for the Controller component.
 *
 * @since 3.0.0
 */
export interface ControllerComponent extends BaseComponent {
  go( control: number | string, allowSameIndex?: boolean ): void;
  getNext( destination?: boolean ): number;
  getPrev( destination?: boolean ): number;
  getEnd(): number;
  setIndex( index: number ): void;
  getIndex( prev?: boolean ): number;
  toIndex( page: number ): number;
  toPage( index: number ): number;
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
  const { isEnough, getLength } = Components.Slides;
  const isLoop = Splide.is( LOOP );

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
    Move.jump( currIndex );

    on( [ EVENT_UPDATED, EVENT_REFRESH ], init );

    on( EVENT_SCROLLED, () => {
      setIndex( Move.toIndex( Move.getPosition() ) );
    }, 0 );
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    slideCount = getLength( true );
    perMove    = options.perMove;
    perPage    = options.perPage;
  }

  /**
   * Moves the slider by the control pattern.
   *
   * @todo
   *
   * @see `Splide#go()`
   *
   * @param control        - A control pattern.
   * @param allowSameIndex - Optional. Determines whether to allow to go to the current index or not.
   */
  function go( control: number | string, allowSameIndex?: boolean ): void {
    const dest  = parse( control );
    const index = loop( dest );

    if ( index > -1 && ! Move.isBusy() && ( allowSameIndex || index !== currIndex ) ) {
      setIndex( index );
      Move.move( dest, index, prevIndex );
    }
  }

  /**
   * Parses the control and returns a slide index.
   *
   * @param control - A control pattern to parse.
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
      if ( isLoop ) {
        index = clamp( control, -perPage, slideCount + perPage - 1 );
      } else {
        index = clamp( control, 0, getEnd() );
      }
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
    const dest = computeDestIndex( currIndex + getPerMove() * ( prev ? -1 : 1 ), currIndex );
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
        if ( ! isLoop && ! incremental && dest !== from ) {
          dest = toIndex( toPage( from ) + ( dest < from ? -1 : 1 ) );
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
   * Returns the number of slides to move for '>' and '<'.
   *
   * @return The number of slides to move.
   */
  function getPerMove(): number {
    return perMove || hasFocus() ? 1 : perPage;
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
   * Returns the current/previous index slide index.
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
    getNext,
    getPrev,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    hasFocus,
  };
}
