import { ROLE } from '../../constants/attributes';
import { CLASS_LOADING } from '../../constants/classes';
import {
  EVENT_LAZYLOAD_LOADED,
  EVENT_MOUNTED,
  EVENT_MOVED,
  EVENT_REFRESH,
  EVENT_RESIZE,
} from '../../constants/events';
import { EventInterface } from '../../constructors';
import { Splide } from '../../core/Splide/Splide';
import { BaseComponent, Components, Options } from '../../types';
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
import { SlideComponent } from '../Slides/Slide';
import { IMAGE_SELECTOR, SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from './constants';


/**
 * The interface for the LazyLoad component.
 *
 * @since 3.0.0
 */
export interface LazyLoadComponent extends BaseComponent {
}

/**
 * The interface for all components.
 *
 * @since 3.0.0
 */
export interface LazyLoadImagesData {
  _img: HTMLImageElement;
  _spinner: HTMLSpanElement;
  _Slide: SlideComponent;
  src: string | null;
  srcset: string | null;
}

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
    Components.Slides.forEach( _Slide => {
      queryAll<HTMLImageElement>( _Slide.slide, IMAGE_SELECTOR ).forEach( _img => {
        const src    = getAttribute( _img, SRC_DATA_ATTRIBUTE );
        const srcset = getAttribute( _img, SRCSET_DATA_ATTRIBUTE );

        if ( src !== _img.src || srcset !== _img.srcset ) {
          const _spinner = create( 'span', options.classes.spinner, _img.parentElement );
          setAttribute( _spinner, ROLE, 'presentation' );
          images.push( { _img, _Slide, src, srcset, _spinner } );
          ! _img.src && display( _img, 'none' );
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
      const distance = options.perPage * ( ( options.preloadPages || 1 ) + 1 ) - 1;

      if ( data._Slide.isWithin( Splide.index, distance ) ) {
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
    const { _img } = data;

    addClass( data._Slide.slide, CLASS_LOADING );
    bind( _img, 'load error', e => { onLoad( data, e.type === 'error' ) } );

    [ 'src', 'srcset' ].forEach( name => {
      if ( data[ name ] ) {
        setAttribute( _img, name, data[ name ] );
        removeAttribute( _img, name === 'src' ? SRC_DATA_ATTRIBUTE : SRCSET_DATA_ATTRIBUTE );
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
    const { _Slide } = data;

    removeClass( _Slide.slide, CLASS_LOADING );

    if ( ! error ) {
      remove( data._spinner );
      display( data._img, '' );
      emit( EVENT_LAZYLOAD_LOADED, data._img, _Slide );
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
