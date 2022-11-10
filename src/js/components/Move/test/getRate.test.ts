import { init } from '@test';


describe('Move#getRate()', () => {
  test('can return the current progress rate.', () => {
    // To make the calculation simple, set the length to 11 so that the base number becomes 10.
    const splide = init({ width: 200, speed: 0 }, { length: 11 });
    const { getRate, translate } = splide.Components.Move;

    translate(-100); // Middle in the first slide
    expect(getRate()).toBe(0.05);

    translate(-150);
    expect(getRate()).toBe(0.075);

    translate(-200); // On the first slide
    expect(getRate()).toBe(0.1);

    translate(-250);
    expect(getRate()).toBe(0.125);

    splide.destroy();
  });

  test('can return 1 when the current index is the end index.', () => {
    const splide = init({ width: 200, speed: 0, perPage: 3 });
    const { getRate } = splide.Components.Move;
    const end = splide.Components.Controller.getEnd();

    splide.go(end);
    expect(getRate()).toBe(1);

    splide.destroy();
  });

  test('should work for fade carousels.', () => {
    const splide = init({ width: 200, speed: 0, type: 'fade' });
    const { length } = splide;
    const { getRate } = splide.Components.Move;

    expect(getRate()).toBe(0);

    splide.go(1);
    expect(getRate()).toBe(splide.index / (length - 1));

    splide.go(length - 1);
    expect(getRate()).toBe(splide.index / (length - 1));

    splide.destroy();
  });
});
