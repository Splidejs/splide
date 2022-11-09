import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({ id: 'splide01', useImage: true });

const splide01 = new Splide('#splide01', {
  type: 'loop',
  width: 800,
  heightRatio: 0.4,
  perPage: 1,
  pagination: false,
  keyboard: true,
});

insertHtml({ id: 'splide02', useImage: true });

const splide02 = new Splide('#splide02', {
  width: 600,
  fixedWidth: 100,
  fixedHeight: 56,
  gap: '.7em',
  isNavigation: true,
  focus: 'center',
  pagination: false,
  rewind: true,
  keyboard: true,
  drag: 'free',
  updateOnDragged: false,
  dragMinThreshold: {
    mouse: 10,
    touch: 10,
  },
});

insertHtml({ id: 'splide03', useImage: true });

const splide03 = new Splide('#splide03', {
  width: 100,
  type: 'loop',
  direction: 'ttb',
  height: 300,
  fixedWidth: 100,
  fixedHeight: 56,
  gap: '.7em',
  isNavigation: true,
  pagination: false,
  keyboard: true,
});

splide01.sync(splide02);

splide01.mount();
splide02.mount();
splide03.mount();

// Attempts to sync after mount.
splide01.sync(splide03);