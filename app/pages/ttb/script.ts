import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';
import './style.scss';


insertHtml({ id: 'splide01', heading: 'Loop' });

new Splide('#splide01', {
  width: 400,
  type: 'loop',
  perPage: 2,
  padding: '3rem',
  gap: '1rem',
  direction: 'ttb',
  height: '90vh',
  wheel: true,
  wheelSleep: 200,
}).mount();

insertHtml({ id: 'splide02', heading: 'Release Wheel' });

new Splide('#splide02', {
  width: 400,
  perPage: 2,
  gap: '1rem',
  direction: 'ttb',
  height: '90vh',
  releaseWheel: true,
  releaseTouch: true,
  wheel: true,
  wheelSleep: 200,
}).mount();