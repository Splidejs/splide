/**
 * The map to associate a non-standard name to the standard one.
 *
 * @since 4.0.0
 */
export declare const NORMALIZATION_MAP: {
    Spacebar: string;
    Right: string;
    Left: string;
    Up: string;
    Down: string;
};
/**
 * Normalizes the key.
 *
 * @param key - A string or a KeyboardEvent object.
 *
 * @return A normalized key.
 */
export declare function normalizeKey(key: string | KeyboardEvent): string;
