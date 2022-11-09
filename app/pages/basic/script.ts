import { Splide } from '../../../src/js';
import '../../js/common';


const splide = new Splide('#splide01', {
  width: 1000,
  height: 400,
}).mount();

splide.on('move', () => console.log('move'));
splide.on('moved', () => console.log('moved'));