import { Splide } from '../src/js';
import '../src/css/themes/default/index.scss';

const splide01 = new Splide('.splide', {}).mount();
splide01.on('move', () => console.log('move'));