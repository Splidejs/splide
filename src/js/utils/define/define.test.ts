import { define } from './define';


describe('define', () => {
  test('can define getters into an object.', () => {
    const object = define({}, { a: () => 1, b: () => true });

    // `object.a` should be `number` by the type assertion.
    expect(object.a).toBe(1);
    expect(object.b).toBe(true);
  });

  test('should define properties as `enumerable` but not `writable`.', () => {
    const object = {};
    define(object, { a: () => 1, b: () => true });

    const descriptor = Object.getOwnPropertyDescriptor(object, 'a');

    expect(descriptor?.enumerable).toBe(true);
    expect(descriptor?.writable).toBeUndefined();

    expect(Object.keys(object)).toStrictEqual(['a', 'b']);
  });
});