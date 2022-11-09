import { buildAttrs, classNames } from '@splidejs/utils';
import { customArrows, customPagination, progressBar, toggleButton } from './parts';
import { SLIDES } from './pics';


interface BuildHtmlConfig extends GenerateSlidesConfig {
  id?: string;
  length?: number;
  heading?: string;
  hasToggle?: boolean;
  hasProgress?: boolean;
  hasArrows?: boolean;
  hasPagination?: boolean;
}

export function buildHtml(config: BuildHtmlConfig = {}): string {
  const { id = 'splide01', heading } = config;

  return `
  ${ heading ? `<h2>${ heading }</h2>` : '' }
	<div id="${ id }" class="splide">
	  <div class="splide__track">
	    <div class="splide__list">
	      ${ generateSlides(config) }
	    </div>
	  </div>
	  
	  ${ config.hasProgress ? progressBar() : '' }
	  ${ config.hasToggle ? toggleButton() : '' }
	  ${ config.hasArrows ? customArrows() : '' }
	  ${ config.hasPagination ? customPagination() : '' }
	</div>
	`;
}

interface GenerateSlidesConfig {
  length?: number;
  autoWidth?: boolean | number[];
  autoHeight?: boolean | number[];
  useImage?: boolean;
  onRenderSlide?: (index: number) => IterateeReturnType;
}

type IterateeReturnType = { attrs?: Parameters<typeof buildAttrs>[0], classes?: string | string[] };

const RANDOM_SIZES = ['300px', '200px', '400px', '600px'];

export function generateSlides(config: GenerateSlidesConfig = {}): string {
  const {
    length = 10,
    onRenderSlide,
    autoWidth,
    autoHeight,
    useImage,
  } = config;

  return Array.from<string>({ length }).reduce((html, item, index) => {
    const { attrs = {}, classes } = onRenderSlide ? onRenderSlide(index) : {} as IterateeReturnType;

    if (autoWidth) {
      const sizes = typeof autoWidth === 'boolean' ? RANDOM_SIZES : autoWidth;
      attrs.style = `width: ${ sizes[index % sizes.length] }`;
    }

    if (autoHeight) {
      const sizes = typeof autoHeight === 'boolean' ? RANDOM_SIZES : autoHeight;
      attrs.style = `height: ${ sizes[index % sizes.length] }`;
    }

    const attrsString = attrs ? buildAttrs(attrs) : '';
    const classesString = classNames(classes);

    html += `<div class="splide__slide ${ classesString }" ${ attrsString }>`;
    html += useImage ? `<img src="${ SLIDES[index] }" alt>` : index;
    html += `</div>\n`;

    return html;
  }, '');
}

interface InsertHtmlConfig extends BuildHtmlConfig {
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