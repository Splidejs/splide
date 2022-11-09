import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../../src/css/themes/default/index.scss';
import './style.scss';


insertHtml({ id: 'nested01', selector: '.nest1' });
insertHtml({ id: 'nested02', selector: '.nest2' });

new Splide('#splide01', {
  gap: '1.5rem',
  height: 600,
}).mount();

new Splide('#nested01', {
  perPage: 2,
  height: 400,
  rewind: true,
  gap: '1rem',
}).mount();

new Splide('#nested02', {
  perPage: 2,
  direction: 'ttb',
  height: 400,
  gap: '1rem',
}).mount();
