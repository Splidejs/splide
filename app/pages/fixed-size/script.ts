import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01' });

new Splide('#splide01', {
  type: 'loop',
  fixedWidth: '6rem',
  gap: 10,
  focus: 0,
  omitEnd: true,
}).mount();


insertHtml({ id: 'splide02' });

new Splide('#splide02', {
  fixedWidth: 200,
  gap: '1rem',
}).mount();


