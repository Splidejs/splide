import { INTERVAL_DATA_ATTRIBUTE } from '../../components/Autoplay/constants';
import { SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from '../../components/LazyLoad/constants';
import { URL } from './constants';


export interface BuildHtmlArgs {
  tag?: string;
  id?: string;
  length?: number;
  arrows?: boolean;
  progress?: boolean;
  autoplay?: boolean;
  src?: boolean | string;
  dataSrc?: boolean | string;
  dataSrcset?: boolean | string;
  dataInterval?: number[];
  json?: string;
}

/**
 * Returns an HTML string for building a slider.
 *
 * @param args - Arguments.
 *
 * @return A built HTML.
 */
export function buildHtml( args: BuildHtmlArgs = {} ): string {
  const {
    tag = 'div',
    id,
    length = 10,
    arrows,
    progress,
    autoplay,
    src = true,
    dataSrc,
    dataSrcset,
    dataInterval,
    json,
  } = args;

  return `
<${ tag } class="splide"${ id ? ` id=${ id }` : '' }${ json ? ` data-splide='${ json }'` : '' }>
  <div class="splide__track">
    <ul class="splide__list">
      ${ generateSlides( length, src, dataSrc, dataSrcset, dataInterval ) }
    </ul>
  </div>

  ${ arrows ? HTML_ARROWS : '' }
  ${ progress ? HTML_PROGRESS : '' }
  ${ autoplay ? HTML_AUTOPLAY : '' }
</${ tag }>
`;
}

/**
 * Generates slides.
 *
 * @param length       - A number of slides.
 * @param src          - Whether to add src attribute or not.
 * @param dataSrc      - Whether to add data-splide-lazy attribute or not.
 * @param dataSrcset   - Whether to add data-splide-lazy-srcset attribute or not.
 * @param dataInterval - An array with autoplay interval.
 *
 * @return A built HTML.
 */
export function generateSlides(
  length: number,
  src?: boolean | string,
  dataSrc?: boolean | string,
  dataSrcset?: boolean | string,
  dataInterval: number[] = []
): string {
  return Array.from<string>( { length } ).reduce( ( html, item, index ) => {
    const attrs: string[] = [];

    if ( dataInterval ) {
      const interval = dataInterval[ index ];

      if ( interval ) {
        attrs.push( `${ INTERVAL_DATA_ATTRIBUTE }="${ interval }"` );
      }
    }

    html += `<li class="splide__slide" ${ attrs.join( ' ' ) }>`;

    const imgAttrs = [ `alt="${ index }"` ];

    if ( src ) {
      imgAttrs.push( `src="${ URL }/${ typeof src === 'string' ? src + '-' : '' }${ index }.jpg"` );
    }

    if ( dataSrc ) {
      imgAttrs.push( `${ SRC_DATA_ATTRIBUTE }="${ URL }/${ typeof dataSrc === 'string' ? dataSrc + '-' : '' }${ index }.jpg"` );
    }

    if ( dataSrcset ) {
      imgAttrs.push(
        `${ SRCSET_DATA_ATTRIBUTE }="${ URL }/${ typeof dataSrcset === 'string' ? dataSrcset + '-' : '' }${ index }.jpg 320w"`
      );
    }

    html += `<img ${ imgAttrs.join( ' ' ) }>`;
    html += `</li>`;
    return html;
  }, '' );
}

export const HTML_ARROWS = `
<div class="splide__arrows">
  <button class="splide__arrow splide__arrow--prev">
    Prev
  </button>

  <button class="splide__arrow splide__arrow--next">
    Next
  </button>
</div>
`;

export const HTML_PROGRESS = `
<div class="splide__progress">
  <div class="splide__progress__bar">
  </div>
</div>
`;

export const HTML_AUTOPLAY = `
<button class="splide__toggle">
  <span class="splide__toggle__play">Play</span>
  <span class="splide__toggle__pause">Pause</span>
</button>
`;
