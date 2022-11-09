import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01', useImage: true });

new Splide('#splide01', {
  width: 1000,
  height: 400,
}).mount();
