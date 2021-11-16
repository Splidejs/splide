import { CLASS_LIST, CLASS_ROOT, CLASS_SLIDE, CLASS_TRACK } from '../../constants/classes';
import { Splide } from '../../core/Splide/Splide';
import { Options } from '../../types';
import { assign } from '../../utils';
import { buildHtml, BuildHtmlArgs } from '../fixtures';
import { SLIDER_WIDTH } from '../fixtures/constants';


interface InitArgs extends BuildHtmlArgs {
  mount?: boolean;
  html?: string;
  insertHtml?: boolean;
}

/**
 * Creates a new splide instance.
 *
 * @param args    - Arguments for initialization.
 * @param options - Options for Splide.
 *
 * @return A created Splide instance.
 */
export function init( options: Options = {}, args: InitArgs = {} ): Splide {
  const { width = SLIDER_WIDTH, height = 0 } = options;
  const {
    id,
    length = 10,
    arrows,
    autoplay,
    progress,
    mount  = true,
    html,
    src,
    dataSrc,
    dataSrcset,
    json,
    insertHtml,
    dataInterval,
  } = args;

  const slideWidth  = +width / ( options.perPage || 1 );
  const slideHeight = +height / ( options.perPage || 1 );
  const innerHtml   = html
    || buildHtml( { length, arrows, autoplay, progress, src, dataSrc, dataSrcset, json, id, dataInterval } );

  if ( insertHtml ) {
    if ( ! document.body.innerHTML ) {
      throw new Error( 'Invalid usage.' );
    }

    document.body.insertAdjacentHTML( 'beforeend', innerHtml );
  } else {
    document.head.innerHTML = '';
    document.body.innerHTML = innerHtml;
  }

  const root   = id ? document.getElementById( id ) : document.querySelector( `.${ CLASS_ROOT }` );
  const track  = root.querySelector( `.${ CLASS_TRACK }` );
  const list   = root.querySelector( `.${ CLASS_LIST }` );
  const slides = root.querySelectorAll( `.${ CLASS_SLIDE }` );

  const domRect = {
    x     : 0,
    y     : 0,
    width : 0,
    height: 0,
    top   : 0,
    right : 0,
    bottom: 0,
    left  : 0,
    toJSON: () => '',
  };

  root.getBoundingClientRect = (): DOMRect => {
    return assign( {}, domRect, { width: +width } );
  };

  track.getBoundingClientRect = (): DOMRect => {
    return assign( {}, domRect, { width: +width, right: +width } );
  };

  list.getBoundingClientRect = (): DOMRect => {
    return assign( {}, domRect, {
      width: +width,
      ...parseTransform( list as HTMLElement ),
    } );
  };

  slides.forEach( ( slide, index ) => {
    slide.getBoundingClientRect = (): DOMRect => {
      const offsets = parseTransform( list as HTMLElement );

      return assign( {}, domRect, {
        width : slideWidth,
        height: slideHeight,
        left  : slideWidth * index + offsets.left,
        right : slideWidth * index + slideWidth + offsets.left,
      } );
    };
  } );

  const splide = new Splide( root as HTMLElement, options );

  if ( mount ) {
    splide.mount();
  }

  return splide;
}

/**
 * Converts translate values to positions.
 *
 * @param elm - An element to parse.
 *
 * @return An object with left and top offsets.
 */
export function parseTransform( elm: HTMLElement ): { left: number, top: number } {
  const position = { left: 0, top: 0 };

  if ( elm && elm.style.transform ) {
    const { transform } = elm.style;

    if ( transform.includes( 'translateX' ) ) {
      position.left = parseFloat( transform.replace( /translateX\(|\)/g, '' ) ) || 0;
    }

    if ( transform.includes( 'translateY' ) ) {
      position.top = parseFloat( transform.replace( /translateY\(|\)/g, '' ) ) || 0;
    }
  }

  return position;
}

/**
 * Fires any native event manually.
 *
 * @param target        - A target.
 * @param type          - An event type.
 * @param data          - Optional. Additional data.
 * @param eventInitDict - Optional. An EventInit object.
 *
 * @return An event object.
 */
export function fire(
  target: Window | Document | Element,
  type: string,
  data: any = {},
  eventInitDict: EventInit = {}
): Event {
  const e = new Event( type, eventInitDict );

  if ( data.timeStamp !== undefined ) {
    Object.defineProperty( e, 'timeStamp', { value: data.timeStamp } );
    delete data.timeStamp;
  }

  target.dispatchEvent( assign( e, data ) );
  return e;
}

/**
 * Emulates keydown.
 *
 * @param key    - A key to press.
 * @param target - A target.
 */
export function keydown( key: string, target: Window | Element = window ): void {
  fire( target, 'keydown', { key } );
}

/**
 * Returns a new Promise resolved after the specified duration.
 *
 * @param duration - Duration to wait.
 *
 * @return A Promise instance.
 */
export function wait( duration = 0 ): Promise<void> {
  return new Promise( resolve => {
    setTimeout( resolve, duration );
  } );
}
