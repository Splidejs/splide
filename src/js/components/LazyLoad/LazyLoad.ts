import { Components, LazyLoadComponent, LazyLoadImagesData, Options } from '@splide/splide';
import { ROLE } from '../../constants/attributes';
import { CLASS_LOADING } from '../../constants/classes';
import {
  EVENT_LAZYLOAD_LOADED,
  EVENT_MOUNTED,
  EVENT_MOVED,
  EVENT_REFRESH,
  EVENT_RESIZE,
} from '../../constants/events';
import { Splide } from '../../core/Splide/Splide';
import { EventInterface } from '../../constructors';
import {
  addClass,
  create,
  display,
  getAttribute,
  queryAll,
  remove,
  removeAttribute,
  removeClass,
  setAttribute,
} from '../../utils';
import { IMAGE_SELECTOR, SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from './constants';


/**
 * The component for lazily loading images.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An LazyLoad component object.
 */
export function LazyLoad( Splide: Splide, Components: Components, options: Options ): LazyLoadComponent {
  const { on, off, bind, emit } = EventInterface( Splide );
  const isSequential = options.lazyLoad === 'sequential';

  /**
   * Stores data of images.
   */
  let images: LazyLoadImagesData[] = [];

  /**
   * The current index of images.
   */
  let index = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    if ( options.lazyLoad ) {
      on( [ EVENT_MOUNTED, EVENT_REFRESH ], () => {
        destroy();
        init();
      } );

      if ( ! isSequential ) {
        on( [ EVENT_MOUNTED, EVENT_REFRESH, EVENT_MOVED ], observe );
      }
    }
  }

  /**
   * Finds images that contain specific data attributes.
   */
  function init() {
    Components.Slides.forEach( Slide => {
      queryAll<HTMLImageElement>( Slide.slide, IMAGE_SELECTOR ).forEach( img => {
        const src    = getAttribute( img, SRC_DATA_ATTRIBUTE );
        const srcset = getAttribute( img, SRCSET_DATA_ATTRIBUTE );

        if ( src !== img.src || srcset !== img.srcset ) {
          const spinner = create( 'span', options.classes.spinner, img.parentElement );
          setAttribute( spinner, ROLE, 'presentation' );
          images.push( { img, Slide, src, srcset, spinner } );
          display( img, 'none' );
        }
      } );
    } );

    if ( isSequential ) {
      loadNext();
    }
  }

  /**
   * Destroys the component.
   */
  function destroy() {
    index  = 0;
    images = [];
  }

  /**
   * Checks how close each image is from the active slide, and determines whether to start loading or not.
   * The last `+1` is for the current page.
   */
  function observe(): void {
    images = images.filter( data => {
      if ( data.Slide.isWithin( Splide.index, options.perPage * ( ( options.preloadPages || 1 ) + 1 ) ) ) {
        return load( data );
      }

      return true;
    } );

    if ( ! images.length ) {
      off( EVENT_MOVED );
    }
  }

  /**
   * Starts loading the image in the data.
   *
   * @param data - A LazyLoadImagesData object.
   */
  function load( data: LazyLoadImagesData ): void {
    const { img } = data;

    addClass( data.Slide.slide, CLASS_LOADING );
    bind( img, 'load error', e => { onLoad( data, e.type === 'error' ) } );

    [ 'src', 'srcset' ].forEach( name => {
      if ( data[ name ] ) {
        setAttribute( img, name, data[ name ] );
        removeAttribute( img, name === 'src' ? SRC_DATA_ATTRIBUTE : SRCSET_DATA_ATTRIBUTE );
      }
    } );
  }

  /**
   * Called when the image is loaded or any error occurs.
   *
   * @param data  - A LazyLoadImagesData object.
   * @param error - `true` if this method is called on error.
   */
  function onLoad( data: LazyLoadImagesData, error: boolean ): void {
    const { Slide } = data;

    removeClass( Slide.slide, CLASS_LOADING );

    if ( ! error ) {
      remove( data.spinner );
      display( data.img, '' );
      emit( EVENT_LAZYLOAD_LOADED, data.img, Slide );
      emit( EVENT_RESIZE );
    }

    if ( isSequential ) {
      loadNext();
    }
  }

  /**
   * Starts loading a next image.
   */
  function loadNext(): void {
    if ( index < images.length ) {
      load( images[ index++ ] );
    }
  }

  return {
    mount,
    destroy,
  };
}
