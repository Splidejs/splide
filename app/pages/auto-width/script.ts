import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01', useImage: true, autoWidth: true });

new Splide('#splide01', {
  height: 400,
  gap: '1rem',
  focus: 0,
  drag: 'free',
  omitEnd: true,
  autoWidth: true,
}).mount();

insertHtml({ id: 'splide02', useImage: true, autoWidth: true });

new Splide('#splide02', {
  type: 'loop',
  width: 1000,
  height: 400,
  gap: '1rem',
  autoWidth: true,
  focus: 'center',
}).mount();
