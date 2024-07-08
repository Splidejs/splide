import { AnyFunction } from '../../types';
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
export declare function isObject(subject: unknown): subject is object;
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
export declare const isArray: <T>(subject: unknown) => subject is T[];
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
export declare const isFunction: (subject: unknown) => subject is AnyFunction;
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
export declare const isString: (subject: unknown) => subject is string;
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
export declare const isUndefined: (subject: unknown) => subject is undefined;
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */
export declare function isNull(subject: unknown): subject is null;
/**
 * Checks if the given subject is an HTMLElement instance or not.
 * This method takes into account which `window` the node belongs to.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
export declare function isHTMLElement(subject: unknown): subject is HTMLElement;
