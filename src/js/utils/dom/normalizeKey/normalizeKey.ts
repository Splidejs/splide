import { isString } from '../../type/type';


/**
 * The map to associate a non-standard name to the standard one.
 *
 * @since 4.0.0
 */
export const NORMALIZATION_MAP = {
  Spacebar: ' ',
  Right   : 'ArrowRight',
  Left    : 'ArrowLeft',
  Up      : 'ArrowUp',
  Down    : 'ArrowDown',
};

/**
 * Normalizes the key.
 *
 * @param key - A string or a KeyboardEvent object.
 *
 * @return A normalized key.
 */
export function normalizeKey( key: string | KeyboardEvent ): string {
  key = isString( key ) ? key : key.key;
  return NORMALIZATION_MAP[ key ] || key;
}