import { EVENT_MOVE, EVENT_MOVED, EVENT_REFRESH, EVENT_RESIZED, EVENT_UPDATED } from '../../constants/events';
import { DEFAULT_EVENT_PRIORITY } from '../../constants/priority';
import { IDLE, MOVING } from '../../constants/states';
import { LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { abs, clamp, isUndefined, rect } from '../../utils';
import { SNAP_THRESHOLD } from './constants';


/**
 * The interface for the Move component.
 *
 * @since 3.0.0
 */
export interface MoveComponent extends BaseComponent {
  move( dest: number, index: number, prev: number ): void;
  jump( index: number ): void;
  translate( position: number ): void;
  cancel(): void;
  toIndex( position: number ): number;
  toPosition( index: number, trimming?: boolean ): number;
  getPosition(): number;
  getLimit( max: boolean ): number;
  isBusy(): boolean;
  exceededLimit( max?: boolean | undefined, position?: number ): boolean;
}

/**
 * The component for moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Move component object.
 */
export function Move( Splide: Splide, Components: Components, options: Options ): MoveComponent {
  const { on, emit } = EventInterface( Splide );
  const { slideSize, getPadding, totalSize, listSize, sliderSize } = Components.Layout;
  const { resolve, orient } = Components.Direction;
  const { list, track } = Components.Elements;

  /**
   * Indicates whether the component can move the slider or not.
   */
  let waiting: boolean;

  /**
   * Indicates whether the the slider should snap the position to the specific slide or not.
   */
  let shouldSnap = true;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( [ EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH ], reposition, DEFAULT_EVENT_PRIORITY - 1 );
  }

  /**
   * Repositions the slider.
   * This must be called before the Slide component checks the visibility.
   */
  function reposition(): void {
    if ( exceededLimit( true ) ) {
      translate( getLimit( true ) );
    } else if ( shouldSnap || ( shouldSnap = canSnap() ) ) {
      jump( Splide.index );
    }
  }

  /**
   * Goes to the slide at the specified index with the Transition component.
   *
   * @param dest  - A destination index to go to.
   * @param index - A slide index.
   * @param prev  - A previous index.
   */
  function move( dest: number, index: number, prev: number ): void {
    if ( ! isBusy() ) {
      const { set } = Splide.state;
      const position = getPosition();
      const looping  = dest !== index;

      waiting = looping || options.waitForTransition;
      set( MOVING );
      emit( EVENT_MOVE, index, prev, dest );

      Components.Transition.start( dest, () => {
        looping && jump( index );
        waiting = false;
        set( IDLE );
        emit( EVENT_MOVED, index, prev, dest );

        if ( options.trimSpace === 'move' && dest !== prev && position === getPosition() ) {
          Components.Controller.go( dest > prev ? '>' : '<' );
        }
      } );
    }
  }

  /**
   * Jumps to the slide at the specified index.
   *
   * @param index - An index to jump to.
   */
  function jump( index: number ): void {
    waiting = false;
    Components.Transition.cancel();
    translate( toPosition( index, true ) );
  }

  /**
   * Moves the slider to the specified position.
   *
   * @param position - The destination.
   */
  function translate( position: number ): void {
    position   = loop( position );
    shouldSnap = canSnap( position );

    Components.Style.ruleBy(
      list,
      'transform',
      `translate${ resolve( 'X' ) }(${ 100 * position / listSize() }%)`
    );
  }

  /**
   * Loops the provided position if it exceeds limits.
   *
   * @param position - A position to loop.
   */
  function loop( position: number ): number {
    if ( ! waiting && Splide.is( LOOP ) ) {
      const diff        = position - getPosition();
      const exceededMin = exceededLimit( false, position );
      const exceededMax = exceededLimit( true, position );

      if ( ( exceededMin && diff > 0 ) || ( exceededMax && diff < 0 ) ) {
        position += orient( sliderSize() * ( exceededMin ? 1 : -1 ) );
      }
    }

    return position;
  }

  /**
   * Cancels transition.
   */
  function cancel(): void {
    translate( getPosition() );
    Components.Transition.cancel();
  }

  /**
   * Returns the closest index to the position.
   *
   * @param position - A position to convert.
   *
   * @return The closest index to the position.
   */
  function toIndex( position: number ): number {
    const Slides = Components.Slides.get();

    let index       = 0;
    let minDistance = Infinity;

    for ( let i = 0; i < Slides.length; i++ ) {
      const slideIndex = Slides[ i ].index;
      const distance   = abs( toPosition( slideIndex, true ) - position );

      if ( distance < minDistance ) {
        minDistance = distance;
        index       = slideIndex;
      } else {
        break;
      }
    }

    return index;
  }

  /**
   * Converts the slide index to the position.
   *
   * @param index    - An index to convert.
   * @param trimming - Optional. Whether to trim edge spaces or not.
   *
   * @return The position corresponding with the index.
   */
  function toPosition( index: number, trimming?: boolean ): number {
    const position = orient( totalSize( index - 1 ) - offset( index ) );
    return trimming ? trim( position ) : position;
  }

  /**
   * Returns the current position.
   *
   * @return The position of the list element.
   */
  function getPosition(): number {
    const left = resolve( 'left' );
    return rect( list )[ left ] - rect( track )[ left ] + orient( getPadding( false ) );
  }

  /**
   * Trims spaces on the edge of the slider.
   *
   * @param position - A position to trim.
   *
   * @return A trimmed position.
   */
  function trim( position: number ): number {
    if ( options.trimSpace && Splide.is( SLIDE ) ) {
      position = clamp( position, 0, orient( sliderSize() - listSize() ) );
    }

    return position;
  }

  /**
   * Returns the offset amount.
   *
   * @param index - An index.
   */
  function offset( index: number ): number {
    const { focus } = options;

    if ( focus === 'center' ) {
      return ( listSize() - slideSize( index, true ) ) / 2;
    }

    return +focus * slideSize( index ) || 0;
  }

  /**
   * Returns the limit number that the slider can move to.
   *
   * @param max - Determines whether to return the maximum or minimum limit.
   *
   * @return The border number.
   */
  function getLimit( max: boolean ): number {
    const trimming = !! options.trimSpace;
    return max ? toPosition( Components.Controller.getEnd(), trimming ) : toPosition( 0, trimming );
  }

  /**
   * Checks if the provided position is enough close to some slide to snap or not.
   *
   * @param position - A position to test.
   *
   * @return `true` if found the slide to snap, or otherwise `false`.
   */
  function canSnap( position?: number ): boolean {
    position = isUndefined( position ) ? getPosition() : position;
    return abs( position - toPosition( toIndex( position ), true ) ) < SNAP_THRESHOLD;
  }

  /**
   * Checks if the slider can move now or not.
   *
   * @return `true` if the slider can move, or otherwise `false`.
   */
  function isBusy(): boolean {
    return waiting;
  }

  /**
   * Checks if the provided position exceeds the minimum or maximum limit or not.
   *
   * @param max      - Optional. `true` for testing max, `false` for min, and `undefined` for both.
   * @param position - Optional. A position to test. If omitted, tests the current position.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */
  function exceededLimit( max?: boolean | undefined, position?: number ): boolean {
    position = isUndefined( position ) ? getPosition() : position;
    const exceededMin = max !== true && orient( position ) < orient( getLimit( false ) );
    const exceededMax = max !== false && orient( position ) > orient( getLimit( true ) );
    return exceededMin || exceededMax;
  }

  return {
    mount,
    move,
    jump,
    translate,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    isBusy,
    exceededLimit,
  };
}
