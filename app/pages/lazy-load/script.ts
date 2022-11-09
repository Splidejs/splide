import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPc9/3HfwAI1gOuq1Su+AAAAABJRU5ErkJggg==';

insertHtml({
  id: 'splide01',
  heading: 'Src & Placeholder',
  onRenderSlide(index) {
    const url = `https://source.unsplash.com/random/960x540?sig=${ index + 1 }`;

    return {
      content: `<img data-splide-lazy="${ url }" src="${ placeholder }" alt>`,
    };
  },
});

const splide01 = new Splide('#splide01', {
  lazyLoad: 'nearby',
  heightRatio: (9 / 16) / 2,
  gap: '1rem',
  drag: 'free',
}).mount();

let sig = 20;

splide01.on('moved', index => {
  if (index === splide01.length - 1) {
    splide01.add([
      `<div class="splide__slide"><img alt data-splide-lazy="https://source.unsplash.com/random/960x540?sig=${ ++sig }"></div>`,
      `<div class="splide__slide"><img alt data-splide-lazy="https://source.unsplash.com/random/960x540?sig=${ ++sig }"></div>`,
    ]);
  }
});

insertHtml({
  id: 'splide02',
  heading: 'Srcset',
  onRenderSlide(index) {
    const small = `https://source.unsplash.com/random/640x360?sig=${ index + 1 }`;
    const large = `https://source.unsplash.com/random/960x540?sig=${ index + 1 }`;

    return {
      content: `<img data-splide-lazy-srcset="${ small } 640w, ${ large } 960w" src="${ placeholder }" alt>`,
    };
  },
});

new Splide('#splide02', {
  perPage: 2,
  lazyLoad: 'sequential',
  heightRatio: (9 / 16) / 2,
  gap: '1rem',
}).mount();

