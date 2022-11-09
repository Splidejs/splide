import { Splide } from '../../../src/js';
import '../../../src/css/themes/default/index.scss';
import './style.scss';


new Splide('#splide01', {
  type: 'loop',
  width: 480,
  rewind: true,
  // live        : false,
  speed: 600,
  arrowPath: 'm13.5 7.01 13 13m-13 13 13-13',
  updateOnMove: true,
}).mount();
