import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01', autoHeight: true });

new Splide('#splide01', {
  direction: 'ttb',
  width: 600,
  height: '90vh',
  gap: '1rem',
  focus: 0,
  drag: 'free',
  omitEnd: true,
  autoHeight: true,
}).mount();

insertHtml({ id: 'splide02', useImage: true, autoHeight: true });

new Splide('#splide02', {
  type: 'loop',
  width: 600,
  direction: 'ttb',
  height: '90vh',
  gap: '1rem',
  autoHeight: true,
  focus: 'center',
}).mount();
