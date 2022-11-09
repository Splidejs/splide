import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml();

const options = {
  width: 1000,
  height: 400,
  perPage: 2,
  gap: '1rem',
};

const root = document.getElementById('splide01');

if (root) {
  root.dataset.splide = JSON.stringify(options);
  new Splide(root).mount();
} else {
  throw new Error('Could not find a root element.');
}

