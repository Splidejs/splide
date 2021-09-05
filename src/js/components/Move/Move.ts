import { Components, MoveComponent, Options } from '@splidejs/splide';
import { EVENT_MOVE, EVENT_MOVED, EVENT_REFRESH, EVENT_RESIZE, EVENT_UPDATED } from '../../constants/events';
import { IDLE, MOVING } from '../../constants/states';
import { LOOP, SLIDE } from '../../constants/types';
import { Splide } from '../../core/Splide/Splide';
import { EventInterface } from '../../constructors';
import { abs, clamp, rect } from '../../utils';


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
   * Indicates whether the slider is just looping or not.
   */
  let looping: boolean;

  /**
   * Indicates whether the component can move the slider or not.
   */
  let waiting: boolean;

  /**
   * Keeps the current position.
   */
  let currPosition = 0;

  /**
   * Keeps the rate of position to the slider width.
   */
  let positionRate = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    on( [ EVENT_RESIZE, EVENT_UPDATED, EVENT_REFRESH ], reposition );
  }

  /**
   * Repositions the slider.
   */
  function reposition(): void {
    if ( options.drag !== 'free' ) {
      jump( Splide.index );
    } else {
      if ( ! options[ resolve( 'fixedWidth' ) ] && ! options[ resolve( 'autoWidth' ) ] ) {
        translate( listSize() * positionRate );
      }

      if ( isExceededMax( currPosition ) ) {
        translate( getLimit( true ) );
      }
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
      const position = getPosition();

      looping = dest !== index;
      waiting = options.waitForTransition;

      Splide.state.set( MOVING );
      emit( EVENT_MOVE, index, prev, dest );

      Components.Transition.start( dest, () => {
        onMoved( dest, index, prev, position );
      } );
    }
  }

  /**
   * Called after the transition ends.
   *
   * @param dest        - A destination index to go to.
   * @param index       - A slide index.
   * @param prev        - A previous index.
   * @param oldPosition - An old position.
   */
  function onMoved( dest: number, index: number, prev: number, oldPosition: number ) {
    if ( looping ) {
      jump( index );
      looping = false;
    }

    waiting = false;
    Splide.state.set( IDLE );
    emit( EVENT_MOVED, index, prev, dest );

    if ( options.trimSpace === 'move' && dest !== prev && oldPosition === getPosition() ) {
      Components.Controller.go( dest > prev ? '>' : '<' );
    }
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
   * Moves the slider to the specified position.
   *
   * @param position - The destination.
   */
  function translate( position: number ): void {
    currPosition = loop( position );
    positionRate = currPosition / listSize();
    Components.Style.ruleBy( list, 'transform', `translate${ resolve( 'X' ) }(${ currPosition }px)` );
  }

  /**
   * Loops the provided position if it exceeds limits.
   *
   * @param position - A position to loop.
   */
  function loop( position: number ): number {
    if ( ! looping && Splide.is( LOOP ) ) {
      const diff        = position - currPosition;
      const exceededMin = isExceededMin( position );
      const exceededMax = isExceededMax( position );

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
      const distance   = abs( toPosition( slideIndex ) - position );

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

    return ( +focus || 0 ) * slideSize( index );
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
   * Checks if the slider can move now or not.
   *
   * @return `true` if the slider can move, or otherwise `false`.
   */
  function isBusy(): boolean {
    return !! ( looping || waiting );
  }

  /**
   * Checks if the provided position exceeds the minimum limit or not.
   *
   * @param position - A position to test.
   * @param offset   - Optional. Offsets the limit in pixel.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */
  function isExceededMin( position: number, offset?: number ): boolean {
    return orient( position ) + ( offset || 0 ) < orient( getLimit( false ) );
  }

  /**
   * Checks if the provided position exceeds the maximum limit or not.
   *
   * @param position - A position to test.
   * @param offset   - Optional. Offsets the limit in pixel.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */
  function isExceededMax( position: number, offset?: number ): boolean {
    return orient( position ) + ( offset || 0 ) > orient( getLimit( true ) );
  }

  /**
   * Checks if the slider position exceeds borders or not.
   *
   * @return `true` if the position is over borders, or otherwise `false`.
   */
  function isExceeded(): boolean {
    return isExceededMin( currPosition ) || isExceededMax( currPosition );
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
    isExceededMin,
    isExceededMax,
    isExceeded,
  };
}
