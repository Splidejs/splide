import {
  EVENT_MOUNTED,
  EVENT_MOVE,
  EVENT_MOVED,
  EVENT_REFRESH,
  EVENT_RESIZED,
  EVENT_SHIFTED,
  EVENT_UPDATED,
} from '../../constants/events';
import { IDLE, MOVING } from '../../constants/states';
import { FADE, LOOP, SLIDE } from '../../constants/types';
import { Splide } from '../../core/Splide/Splide';
import { AnyFunction, BaseComponent, Components, Options, TransitionComponent } from '../../types';
import { abs, ceil, clamp, EventInterface, rect, style } from '@splidejs/utils';


/**
 * The interface for the Move component.
 *
 * @since 3.0.0
 */
export interface MoveComponent extends BaseComponent {
  move( dest: number, index: number, prev: number, callback?: AnyFunction ): void;
  jump( index: number ): void;
  translate( position: number, preventLoop?: boolean ): void;
  shift( position: number, backwards: boolean ): number;
  cancel(): void;
  toIndex( position: number ): number;
  toPosition( index: number, trimming?: boolean ): number;
  getPosition(): number;
  getLimit( max: boolean ): number;
  exceededLimit( max?: boolean | undefined, position?: number ): boolean;

  /** @internal */
  reposition(): void;
}

/**
 * The component for moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Move component object.
 */
export function Move(
  Splide: Splide,
  Components: Components,
  options: Options,
  event: EventInterface
): MoveComponent {
  const { on, emit } = event;
  const { set } = Splide.state;
  const { Slides } = Components;
  const { slideSize, getPadding, listSize, sliderSize } = Components.Layout;
  const { resolve, orient } = Components.Direction;
  const { list, track } = Components.Elements;

  /**
   * Holds the Transition component.
   */
  let Transition: TransitionComponent;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    Transition = Components.Transition;
    on( [ EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH ], reposition );
  }

  /**
   * Repositions the slider.
   * - Do not call `cancel()` here because LazyLoad may emit resize while transitioning.
   * - iOS Safari emits window resize event while the user swipes the slider because of the bottom bar.
   */
  function reposition(): void {
    if ( ! Components.Controller.isBusy() ) {
      Components.Scroll.cancel();
      jump( Splide.index );
      Components.Slides.update();
    }
  }

  /**
   * Moves the slider to the dest index with the Transition component.
   *
   * @param dest     - A destination index to go to, including clones'.
   * @param index    - A slide index.
   * @param prev     - A previous index.
   * @param callback - Optional. A callback function invoked after transition ends.
   */
  function move( dest: number, index: number, prev: number, callback?: AnyFunction ): void {
    if ( dest !== index && canShift( dest > prev ) ) {
      cancel();
      translate( shift( getPosition(), dest > prev ), true );
    }

    set( MOVING );
    emit( EVENT_MOVE, index, prev, dest );

    Transition.start( index, () => {
      set( IDLE );
      emit( EVENT_MOVED, index, prev, dest );
      callback && callback();
    } );
  }

  /**
   * Jumps to the slide at the specified index.
   *
   * @param index - An index to jump to.
   */
  function jump( index: number ): void {
    translate( toPosition( index, true ) );
  }

  /**
   * Moves the slider to the provided position.
   *
   * @param position    - The position to move to.
   * @param preventLoop - Optional. If `true`, sets the provided position as is.
   */
  function translate( position: number, preventLoop?: boolean ): void {
    if ( ! Splide.is( FADE ) ) {
      const destination = preventLoop ? position : loop( position );
      style( list, 'transform', `translate${ resolve( 'X' ) }(${ destination }px)` );
      position !== destination && emit( EVENT_SHIFTED );
    }
  }

  /**
   * Loops the provided position if it exceeds bounds (limit indices).
   *
   * @param position - A position to loop.
   */
  function loop( position: number ): number {
    if ( Splide.is( LOOP ) ) {
      const index       = toIndex( position );
      const exceededMax = index > Components.Controller.getEnd();
      const exceededMin = index < 0;

      if ( exceededMin || exceededMax ) {
        position = shift( position, exceededMax );
      }
    }

    return position;
  }

  /**
   * Adds or subtracts the slider width to the provided position.
   *
   * @param position  - A position to shift.
   * @param backwards - Determines whether to shift the slider backwards or forwards.
   *
   * @return The shifted position.
   */
  function shift( position: number, backwards: boolean ): number {
    const excess = position - getLimit( backwards );
    const size   = sliderSize();
    position -= orient( size * ( ceil( abs( excess ) / size ) || 1 ) ) * ( backwards ? 1 : -1 );
    return position;
  }

  /**
   * Cancels transition.
   */
  function cancel(): void {
    translate( getPosition(), true );
    Transition.cancel();
  }

  /**
   * Returns the closest index to the position.
   *
   * @todo
   *
   * @param position - A position to convert.
   *
   * @return The closest index to the position.
   */
  function toIndex( position: number ): number {
    const slides = Slides.get();

    let index       = 0;
    let minDistance = Infinity;

    for ( let i = 0; i < slides.length; i++ ) {
      const slideIndex = slides[ i ].index;
      const distance   = abs( toPosition( slideIndex, true ) - position );

      if ( distance <= minDistance ) {
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
    const Slide    = Slides.getAt( index );
    const position = Slide ? orient( Slide.pos() - offset( index ) ) : 0;
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
      position = clamp( position, 0, orient( sliderSize( true ) - listSize() ) );
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
    return focus === 'center' ? ( listSize() - slideSize( index, true ) ) / 2 : +focus * slideSize( index ) || 0;
  }

  /**
   * Returns the limit number that the slider can move to.
   *
   * @param max - Determines whether to return the maximum or minimum limit.
   *
   * @return The border number.
   */
  function getLimit( max: boolean ): number {
    return toPosition( max ? Components.Controller.getEnd() : 0, !! options.trimSpace );
  }

  /**
   * Checks if there is enough width to shift the slider.
   *
   * @param backwards - `true` for checking backwards, or `false` for doing forwards.
   *
   * @return `true` if the slider can be shifted for the specified direction, or otherwise `false`.
   */
  function canShift( backwards: boolean ): boolean {
    const padding = getPadding( false );
    const shifted = orient( shift( getPosition(), backwards ) );

    return backwards
      ? shifted >= padding
      : shifted <= list[ resolve( 'scrollWidth' ) ] - rect( track )[ resolve( 'width' ) ] + padding;
  }

  /**
   * Checks if the provided position exceeds the minimum or maximum limit or not.
   *
   * @param max      - Optional. `true` for testing max, `false` for min, and `undefined` for both.
   * @param position - Optional. A position to test. If omitted, tests the current position.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */
  function exceededLimit( max?: boolean | undefined, position = getPosition() ): boolean {
    const exceededMin = max !== true && orient( position ) < orient( getLimit( false ) );
    const exceededMax = max !== false && orient( position ) > orient( getLimit( true ) );
    return exceededMin || exceededMax;
  }

  return {
    mount,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    exceededLimit,
    reposition,
  };
}
