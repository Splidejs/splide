import { ARIA_CONTROLS, ARIA_LABEL } from '../../constants/attributes';
import {
  EVENT_AUTOPLAY_PAUSE,
  EVENT_AUTOPLAY_PLAY,
  EVENT_AUTOPLAY_PLAYING,
  EVENT_MOVE,
  EVENT_REFRESH,
  EVENT_SCROLL,
} from '../../constants/events';
import { EventInterface, RequestInterval } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { setAttribute, style } from '../../utils';


/**
 * The interface for the Autoplay component.
 *
 * @since 3.0.0
 */
export interface AutoplayComponent extends BaseComponent {
  play(): void;
  pause(): void;
  isPaused(): boolean;
}

/**
 * The component for auto playing sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Autoplay component object.
 */
export function Autoplay( Splide: Splide, Components: Components, options: Options ): AutoplayComponent {
  const { on, bind, emit } = EventInterface( Splide );
  const { Elements } = Components;
  const interval = RequestInterval( options.interval, Splide.go.bind( Splide, '>' ), update );
  const { isPaused } = interval;

  /**
   * Indicates whether the slider is hovered or not.
   */
  let hovered: boolean;

  /**
   * Indicates whether one of slider elements has focus or not.
   */
  let focused: boolean;

  /**
   * Turns into `true` when autoplay is manually paused.
   */
  let paused: boolean;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    const { autoplay } = options;

    if ( autoplay ) {
      initButton( true );
      initButton( false );
      listen();

      if ( autoplay !== 'pause' ) {
        play();
      }
    }
  }

  /**
   * Initializes a play/pause button.
   *
   * @param forPause - Determines whether to initialize a pause or play button.
   */
  function initButton( forPause: boolean ): void {
    const prop   = forPause ? 'pause' : 'play';
    const button = Elements[ prop ];

    if ( button ) {
      setAttribute( button, ARIA_CONTROLS, Elements.track.id );
      setAttribute( button, ARIA_LABEL, options.i18n[ prop ] );

      bind( button, 'click', forPause ? pause : play );
    }
  }

  /**
   * Listens to some events.
   */
  function listen(): void {
    const { root } = Elements;

    if ( options.pauseOnHover ) {
      bind( root, 'mouseenter mouseleave', e => {
        hovered = e.type === 'mouseenter';
        autoToggle();
      } );
    }

    if ( options.pauseOnFocus ) {
      bind( root, 'focusin focusout', e => {
        focused = e.type === 'focusin';
        autoToggle();
      } );
    }

    on( [ EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH ], interval.rewind );
  }

  /**
   * Starts autoplay and clears all flags.
   */
  function play(): void {
    if ( isPaused() && Components.Slides.isEnough() ) {
      interval.start( ! options.resetProgress );
      focused = hovered = paused = false;
      emit( EVENT_AUTOPLAY_PLAY );
    }
  }

  /**
   * Pauses autoplay.
   *
   * @param manual - If `true`, autoplay keeps paused until `play()` is explicitly called.
   */
  function pause( manual = true ): void {
    if ( ! isPaused() ) {
      interval.pause();
      emit( EVENT_AUTOPLAY_PAUSE );
    }

    paused = manual;
  }

  /**
   * Toggles play/pause according to current flags.
   * If autoplay is manually paused, this will do nothing.
   */
  function autoToggle(): void {
    if ( ! paused ) {
      if ( ! hovered && ! focused ) {
        play();
      } else {
        pause( false );
      }
    }
  }

  /**
   * Called on every animation frame when auto playing.
   *
   * @param rate - The progress rate between 0 to 1.
   */
  function update( rate: number ): void {
    const { bar } = Elements;

    if ( bar ) {
      style( bar, 'width', `${ rate * 100 }%` );
    }

    emit( EVENT_AUTOPLAY_PLAYING, rate );
  }

  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused,
  };
}
