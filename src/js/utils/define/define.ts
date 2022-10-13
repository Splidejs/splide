import { forOwn } from '@splidejs/utils';


/**
 * Defines getters in the provided object.
 * Properties will be enumerable but not writable.
 *
 * @param object  - An object where to define getters.
 * @param getters - An object literal containing getters as a key and a function.
 *
 * @return A provided object with getters.
 */
export function define<T, G extends Record<PropertyKey, () => unknown>>(
  object: T,
  getters: G
): T & Readonly<{
  [ K in keyof G ]: ReturnType<G[ K ]>
}> {
  forOwn( getters, ( get, key ) => {
    Object.defineProperty( object, key, { get, enumerable: true } );
  } );

  return object as any;
}
