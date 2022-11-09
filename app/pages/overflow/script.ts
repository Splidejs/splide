import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';
import './style.scss';


insertHtml({ id: 'splide01', heading: 'Loop' });

const splide01 = new Splide('#splide01', {
  type: 'loop',
  fixedWidth: '6rem',
  fixedHeight: '4rem',
  gap: 10,
  omitEnd: true,
  focus: 0,
  breakpoints: {
    '!overflow': {
      arrows: false,
      drag: false,
      pagination: false,
      clones: 0,
    },
  },
}).mount();

splide01.on('overflow', overflow => console.log('overflow', overflow));

insertHtml({ id: 'splide02', heading: 'Slide' });

const splide02 = new Splide('#splide02', {
  fixedWidth: '6rem',
  fixedHeight: '4rem',
  gap: 10,
  breakpoints: {
    '!overflow': {
      arrows: false,
      drag: false,
      pagination: false,
    },
  },
}).mount();

splide02.on('overflow', overflow => console.log('overflow', overflow));