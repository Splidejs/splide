import { Splide } from '../../../src/js';
import '../../../src/css/themes/default/index.scss';
import './style.scss';


new Splide('#splide01', {
  type: 'fade',
  width: 1000,
  rewind: true,
  rewindByDrag: true,
}).mount();
