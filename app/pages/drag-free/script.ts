import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';
import './style.scss';


insertHtml();

const splide01 = new Splide('#splide01', {
  width: 1000,
  height: 400,
  // type: 'loop',
  parPage: 3,
  drag: 'free',
  snap: true,
  gap: '2rem',
}).mount();

const bar = document.querySelector<HTMLElement>('.bar');

if (bar) {
  const { getRate } = splide01.Components.Move;

  splide01.on('dragging scrolling', () => {
    bar.style.width = `${ getRate() * 100 }%`;
  });
} else {
  throw new Error('Could not find a bar element');
}
