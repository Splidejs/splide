import { RANDOM_SIZES, FAKE_URL } from '../constants';
import { SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from '../../../js/components/LazyLoad/constants';
import { INTERVAL_DATA_ATTRIBUTE } from '../../../js/components/Autoplay/constants';
import { buildAttrs, classNames, isArray } from '@splidejs/utils';
import { customArrows, customPagination, progressBar, toggleButton } from './parts';
import { DATA_ATTRIBUTE } from '../../../js/constants/project';


export interface BuildHtmlConfig extends GenerateSlidesConfig {
  tag?: string;
  id?: string;
  heading?: string;
  hasToggle?: boolean;
  hasProgress?: boolean;
  hasArrows?: boolean;
  hasPagination?: boolean;
  json?: string;
}

/**
 * Returns an HTML string for building a slider.
 *
 * @param config - Config.
 *
 * @return A built HTML.
 */
export function buildHtml(config: BuildHtmlConfig = {}): string {
  const { tag = 'div', id = 'splide01', heading, json } = config;
  const attrs: Record<string, number | string> = { id };
  attrs[DATA_ATTRIBUTE] = json ? json.replace(/"/g, '&#34') : '';

  return `
  ${ heading ? `<h2>${ heading }</h2>` : '' }
  <${ tag } class="splide" ${ buildAttrs(attrs) }>
    <div class="splide__track">
      <ul class="splide__list">
        ${ generateSlides(config) }
      </ul>
    </div>

	  ${ config.hasProgress ? progressBar() : '' }
	  ${ config.hasToggle ? toggleButton() : '' }
	  ${ config.hasArrows ? customArrows() : '' }
	  ${ config.hasPagination ? customPagination() : '' }
  </${ tag }>
  `;
}

export interface GenerateSlidesConfig {
  length?: number;
  useImage?: boolean;
  autoWidth?: boolean | number[];
  autoHeight?: boolean | number[];
  src?: boolean | string[];
  dataSrc?: boolean | string[];
  dataSrcset?: boolean | string[];
  dataInterval?: Array<undefined | number>;
  onRenderSlide?: (index: number) => RenderSlideReturnType;
}

export interface RenderSlideReturnType {
  attrs?: Parameters<typeof buildAttrs>[0],
  classes?: string | string[],
  content?: string;
}

/**
 * Generates slides.
 *
 * @param config - A GenerateSlidesConfig object.
 *
 * @return Built HTML as string.
 */
export function generateSlides(config: GenerateSlidesConfig): string {
  const {
    length = 10,
    useImage,
    autoWidth,
    autoHeight,
    dataInterval,
    onRenderSlide,
  } = config;

  return Array.from<string>({ length }).reduce((html, item, index) => {
    const { attrs = {}, classes, content } = onRenderSlide ? onRenderSlide(index) : {} as RenderSlideReturnType;

    if (dataInterval) {
      attrs[INTERVAL_DATA_ATTRIBUTE] = dataInterval[index];
    }

    if (autoWidth) {
      const sizes = isArray(autoWidth) ? autoWidth : RANDOM_SIZES;
      attrs.style = `width: ${ sizes[index % sizes.length] }`;
    }

    if (autoHeight) {
      const sizes = isArray(autoHeight) ? autoHeight : RANDOM_SIZES;
      attrs.style = `height: ${ sizes[index % sizes.length] }`;
    }

    html += `<li class="${ classNames('splide__slide', classes) }" ${ buildAttrs(attrs) }>`;

    if (content) {
      html += content;
    } else {
      html += useImage ? generateImage(config, index) : index;
    }
    html += `</li>`;
    return html;
  }, '');
}

function generateImage(config: GenerateSlidesConfig, index: number): string {
  const { src, dataSrc, dataSrcset } = config;

  const attrs: Record<string, number | string | undefined> = {};
  attrs.src = generateImageUrl(src, index);
  attrs[SRC_DATA_ATTRIBUTE] = generateImageUrl(dataSrc, index);

  const srcset = generateImageUrl(dataSrcset, index);
  attrs[SRCSET_DATA_ATTRIBUTE] = isArray(dataSrcset) ? srcset : `${ srcset } 320w`;

  return `<img alt ${ buildAttrs(attrs) }>`;
}

function generateImageUrl(srcLike: boolean | string[] | undefined, index: number): string | undefined {
  if (srcLike) {
    return isArray(srcLike) ? srcLike[index] : `${ FAKE_URL }/${ index }.jpg`;
  }

  return undefined;
}

export interface InsertHtmlConfig extends BuildHtmlConfig {
  selector?: string;
}

export function insertHtml(config: InsertHtmlConfig = {}): void {
  const { selector = '#app' } = config;
  let parent = document.querySelector(selector);

  if (!parent) {
    parent = document.getElementById('app');
  }

  if (!parent) {
    parent = document.createElement('div');
    parent.id = 'app';
    document.body.append(parent);
  }

  parent.insertAdjacentHTML('beforeend', buildHtml(config));
}