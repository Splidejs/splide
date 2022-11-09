import { Splide } from '../../../src/js';
import { insertHtml } from '../../js/html';
import '../../js/common';


insertHtml({
  hasProgress: true,
  hasToggle: true,
  onRenderSlide(index) {
    if (index === 1) {
      return { attrs: { 'data-splide-interval': 1000 } };
    }

    if (index === 2) {
      return { attrs: { 'data-splide-interval': 10000 } };
    }

    return {};
  },
});

new Splide('#splide01', {
  width: 1000,
  height: 400,
  gap: '1rem',
  autoplay: true,
  // pauseOnFocus: false,
  // pauseOnHover: false,
}).mount();