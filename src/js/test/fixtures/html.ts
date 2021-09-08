import { SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from '../../components/LazyLoad/constants';
import { URL } from './constants';


export interface BuildHtmlArgs {
  id?: string;
  length?: number;
  arrows?: boolean;
  progress?: boolean;
  autoplay?: boolean;
  src?: boolean | string;
  dataSrc?: boolean | string;
  dataSrcset?: boolean | string;
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
    id,
    length = 10,
    arrows,
    progress,
    autoplay,
    src = true,
    dataSrc,
    dataSrcset,
    json,
  } = args;

  return `
<div class="splide"${ id ? ` id=${ id }` : '' }${ json ? ` data-splide='${ json }'` : '' }>
  <div class="splide__track">
    <ul class="splide__list">
      ${ generateSlides( length, src, dataSrc, dataSrcset ) }
    </ul>
  </div>

  ${ arrows ? HTML_ARROWS : '' }
  ${ progress ? HTML_PROGRESS : '' }
  ${ autoplay ? HTML_AUTOPLAY : '' }
</div>
`;
}

/**
 * Generates slides.
 *
 * @param length     - A number of slides.
 * @param src        - Whether to add src attribute or not.
 * @param dataSrc    - Whether to add data-splide-lazy attribute or not.
 * @param dataSrcset - Whether to add data-splide-lazy-srcset attribute or not.
 *
 * @return A built HTML.
 */
export function generateSlides(
  length: number,
  src?: boolean | string,
  dataSrc?: boolean | string,
  dataSrcset?: boolean | string
): string {
  return Array.from<string>( { length } ).reduce( ( html, item, index ) => {
    html += `<li class="splide__slide">`;

    const attrs = [ `alt="${ index }"` ];

    if ( src ) {
      attrs.push( `src="${ URL }/${ typeof src === 'string' ? src + '-' : '' }${ index }.jpg"` );
    }

    if ( dataSrc ) {
      attrs.push( `${ SRC_DATA_ATTRIBUTE }="${ URL }/${ typeof dataSrc === 'string' ? dataSrc + '-' : '' }${ index }.jpg"` );
    }

    if ( dataSrcset ) {
      attrs.push(
        `${ SRCSET_DATA_ATTRIBUTE }="${ URL }/${ typeof dataSrcset === 'string' ? dataSrcset + '-' : '' }${ index }.jpg 320w"`
      );
    }

    html += `<img ${ attrs.join( ' ' ) }>`;
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
<div class="splide__autoplay">
  <button class="splide__play">
    Play
  </button>

  <button class="splide__pause">
    Pause
  </button>
</div>
`;
