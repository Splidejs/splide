import { ARIA_CONTROLS, ARIA_LABEL } from '../../constants/attributes';
import { CLASS_ACTIVE } from '../../constants/classes';
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
import { getAttribute, setAttribute, style, toggleClass } from '../../utils';
import { INTERVAL_DATA_ATTRIBUTE } from './constants';


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
  const interval = RequestInterval( options.interval, Splide.go.bind( Splide, '>' ), onAnimationFrame );
  const { isPaused } = interval;
  const { Elements, Elements: { root, toggle } } = Components;
  const { autoplay } = options;

  /**
   * Indicates whether the slider is hovered or not.
   */
  let hovered: boolean;

  /**
   * Indicates whether one of slider elements has focus or not.
   */
  let focused: boolean;

  /**
   * Indicates whether the autoplay is stopped or not.
   * If stopped, autoplay won't start automatically unless `play()` is explicitly called.
   */
  let stopped = autoplay === 'pause';

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( autoplay ) {
      listen();
      toggle && setAttribute( toggle, ARIA_CONTROLS, Elements.track.id );
      stopped || play();
      update();
    }
  }

  /**
   * Listens to some events.
   */
  function listen(): void {
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

    if ( toggle ) {
      bind( toggle, 'click', () => {
        stopped ? play() : pause( true );
      } );
    }

    on( [ EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH ], interval.rewind );
    on( EVENT_MOVE, onMove );
  }

  /**
   * Starts autoplay and clears all flags.
   */
  function play(): void {
    if ( isPaused() && Components.Slides.isEnough() ) {
      interval.start( ! options.resetProgress );
      focused = hovered = stopped = false;
      update();
      emit( EVENT_AUTOPLAY_PLAY );
    }
  }

  /**
   * Pauses autoplay.
   *
   * @param stop - If `true`, autoplay keeps paused until `play()` is explicitly called.
   */
  function pause( stop = true ): void {
    stopped = !! stop;
    update();

    if ( ! isPaused() ) {
      interval.pause();
      emit( EVENT_AUTOPLAY_PAUSE );
    }
  }

  /**
   * Toggles play/pause according to current flags.
   * If autoplay is manually paused, this will do nothing.
   */
  function autoToggle(): void {
    if ( ! stopped ) {
      hovered || focused ? pause( false ) : play();
    }
  }

  /**
   * Updates the toggle button status.
   */
  function update(): void {
    if ( toggle ) {
      toggleClass( toggle, CLASS_ACTIVE, ! stopped );
      setAttribute( toggle, ARIA_LABEL, options.i18n[ stopped ? 'play' : 'pause' ] );
    }
  }

  /**
   * Called on every animation frame while autoplay is active.
   *
   * @param rate - The progress rate between 0 to 1.
   */
  function onAnimationFrame( rate: number ): void {
    const { bar } = Elements;
    bar && style( bar, 'width', `${ rate * 100 }%` );
    emit( EVENT_AUTOPLAY_PLAYING, rate );
  }

  /**
   * Updates or restores the interval duration.
   *
   * @param index - An index to move to.
   */
  function onMove( index: number ): void {
    const Slide = Components.Slides.getAt( index );
    interval.set( Slide && +getAttribute( Slide.slide, INTERVAL_DATA_ATTRIBUTE ) || options.interval );
  }

  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused,
  };
}
