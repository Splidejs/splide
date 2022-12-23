import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';
import './styles.scss';


insertHtml();

new Splide('#splide01', {
  type: 'loop',
  width: 1000,
  height: 400,
  speed: 1000,
  perPage: 3,
  gap: 5,
  updateOnMove: true,
  // padding: '3rem',
}).mount();
