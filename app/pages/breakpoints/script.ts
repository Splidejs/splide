import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01', useImage: true });

const options = {
  perPage: 3,
  arrows: false,
  // mediaQuery: 'min',
  breakpoints: {
    1200: {
      perPage: 1,
      gap: '1rem',
      arrows: true,
      padding: 50,
      height: 500,
      destroy: false,
    },
    1000: {
      perPage: 2,
      gap: 0,
      arrows: false,
      padding: 0,
      pagination: false,
    },
    800: {
      destroy: true,
    },
  },
};

new Splide('#splide01', options).mount();

insertHtml({ id: 'splide02', hasArrows: true, hasPagination: true });
new Splide('#splide02', options).mount();

