import { init } from '@test';
import { CLASS_ARROWS } from '../../../constants/classes';


describe('Arrows with custom arrows', () => {
  test('can use provided elements.', () => {
    const splide = init({ arrows: true, speed: 0 }, { hasArrows: true });
    const { Arrows } = splide.Components;
    const { prev, next } = splide.Components.Elements;

    expect(Arrows.arrows.prev).toBe(prev);
    expect(Arrows.arrows.next).toBe(next);
  });

  test('can hide provided elements if the `arrows` option is disabled.', () => {
    const splide = init({ arrows: false, speed: 0 }, { hasArrows: true });
    const { arrows } = splide.Components.Elements;

    expect(arrows?.style.display).toBe('none');
  });

  test('should not remove provided elements on destroy.', () => {
    const splide = init({ arrows: true, speed: 0 }, { hasArrows: true });
    splide.destroy();

    expect(document.querySelector(`.${ CLASS_ARROWS }`)).not.toBeNull();
  });
});
