import { Splide } from '../../../src/js';
import '../../../src/css/themes/default/index.scss';


new Splide('#splide01', {
  width: 1000,
  perPage: 2,
  gap: '1rem',
  heightRatio: 0.3,
}).mount();
