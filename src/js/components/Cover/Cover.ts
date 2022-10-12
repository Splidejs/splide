import { EVENT_LAZYLOAD_LOADED, EVENT_MOUNTED, EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
import { apply, child, display, EventInterface } from '@splidejs/utils';
import { SlideComponent } from '../Slides/Slide';


/**
 * The interface for the Cover component.
 *
 * @since 3.0.0
 */
export interface CoverComponent extends BaseComponent {
}

/**
 * The component for setting the image as the slide background.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return A Cover component object.
 */
export function Cover(
  Splide: Splide,
  Components: Components,
  options: Options,
  event: EventInterface
): CoverComponent {
  const { on } = event;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.cover ) {
      on( EVENT_LAZYLOAD_LOADED, apply( toggle, true ) );
      on( [ EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH ], apply( cover, true ) );
    }
  }

  /**
   * Sets/removes the background image to/from all slides.
   *
   * @param cover - If `false`, removes the background image.
   */
  function cover( cover: boolean ): void {
    Components.Slides.forEach( Slide => {
      const img = child<HTMLImageElement>( Slide.container || Slide.slide, 'img' );

      if ( img && img.src ) {
        toggle( cover, img, Slide );
      }
    } );
  }

  /**
   * Sets/removes the background image to/from the parent element.
   *
   * @param cover - If `false`, removes the background image.
   * @param img   - A target image element.
   * @param Slide - A SlideComponent object where the image belongs.
   */
  function toggle( cover: boolean, img: HTMLImageElement, Slide: SlideComponent ): void {
    Slide.style( 'background', cover ? `center/cover no-repeat url("${ img.src }")` : '', true );
    display( img, cover ? 'none' : '' );
  }

  return {
    mount,
    destroy: apply( cover, false ),
  };
}
