import { SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { Components, Options, TransitionComponent } from '../../types';
import { abs, style } from '../../utils';


/**
 * The component for the slide transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */
export function Slide( Splide: Splide, Components: Components, options: Options ): TransitionComponent {
  const { bind } = EventInterface( Splide );
  const { Move, Controller } = Components;
  const { list } = Components.Elements;

  /**
   * Holds the `done` callback function.
   */
  let endCallback: () => void;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    bind( list, 'transitionend', e => {
      if ( e.target === list && endCallback ) {
        cancel();
        endCallback();
      }
    } );
  }

  /**
   * Starts the transition.
   * The Move component calls this method just before the slider moves.
   *
   * @param index - A destination index.
   * @param done  - The callback function that must be called after the transition ends.
   */
  function start( index: number, done: () => void ): void {
    const destination = Move.toPosition( index, true );
    const position    = Move.getPosition();
    const speed       = getSpeed( index );

    if ( abs( destination - position ) >= 1 && speed >= 1 ) {
      apply( `transform ${ speed }ms ${ options.easing }` );
      Move.translate( destination, true );
      endCallback = done;
    } else {
      Move.jump( index );
      done();
    }
  }

  /**
   * Cancels the transition.
   */
  function cancel(): void {
    apply( '' );
  }

  /**
   * Returns the transition speed.
   *
   * @param index - A destination index.
   */
  function getSpeed( index: number ): number {
    const { rewindSpeed } = options;

    if ( Splide.is( SLIDE ) && rewindSpeed ) {
      const prev = Controller.getIndex( true );
      const end  = Controller.getEnd();

      if ( ( prev === 0 && index >= end ) || ( prev >= end && index === 0 ) ) {
        return rewindSpeed;
      }
    }

    return options.speed;
  }

  /**
   * Applies the transition CSS property to the list element.
   *
   * @param transition - A transition CSS value.
   */
  function apply( transition: string ): void {
    style( list, 'transition', transition );
  }

  return {
    mount,
    start,
    cancel,
  };
}
