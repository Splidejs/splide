import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml();

new Splide('#splide01', {
  type: 'loop',
  width: 1000,
  height: 400,
  perPage: 3,
  gap: 5,
  direction: 'rtl',
  rewind: true,
  padding: {
    left: 40,
    right: 0,
  },
}).mount();
