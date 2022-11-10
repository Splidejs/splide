import { fire, init, FAKE_URL } from '@test';


describe('LazyLoad in the `sequential` mode', () => {
  test('can sequentially load images.', () => {
    init({ lazyLoad: 'sequential' }, { useImage: true, src:false, dataSrc: true });
    const images = document.getElementsByTagName('img');

    expect(images[0].src).toBe(`${ FAKE_URL }/0.jpg`);
    expect(images[1].src).toBe('');
    expect(images[2].src).toBe('');

    fire(images[0], 'load');
    expect(images[1].src).toBe(`${ FAKE_URL }/1.jpg`);
    expect(images[2].src).toBe('');

    fire(images[1], 'load');
    expect(images[2].src).toBe(`${ FAKE_URL }/2.jpg`);
  });

  test('should load the next image if the current image throws error to load.', () => {
    init({ lazyLoad: 'sequential' }, { useImage: true, src:false, dataSrc: true });
    const images = document.getElementsByTagName('img');

    expect(images[0].src).toBe(`${ FAKE_URL }/0.jpg`);
    expect(images[1].src).toBe('');
    expect(images[2].src).toBe('');

    fire(images[0], 'error');
    expect(images[1].src).toBe(`${ FAKE_URL }/1.jpg`);

    fire(images[1], 'error');
    expect(images[2].src).toBe(`${ FAKE_URL }/2.jpg`);
  });
});
