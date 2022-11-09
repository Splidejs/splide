import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import { SLIDES } from '../../js/pics';
import '../../js/common';


insertHtml({ useImage: true });

const splide = new Splide('#splide01', {
  type: 'loop',
  width: 1000,
  height: 400,
  perPage: 3,
  gap: '1rem',
}).mount();

const addButton = document.getElementById('add');
const removeButton = document.getElementById('remove');

if (addButton) {
  addButton.addEventListener('click', function () {
    splide.add([
      `<div class="splide__slide"><img src="${ SLIDES[11] }"></div>`,
      `<div class="splide__slide"><img src="${ SLIDES[12] }"></div>`,
    ]);
  });
}

if (removeButton) {
  removeButton.addEventListener('click', function () {
    splide.remove(splide.length - 1);
  });
}