import { AnyFunction } from '../../types';
import { apply } from '../function';


/**
 * The alias of the type check function.
 *
 * @param type    - A type.
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is the specified type.
 */
function typeOf( type: string, subject: unknown ): boolean {
  return typeof subject === type;
}

/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
export function isObject( subject: unknown ): subject is object {
  return ! isNull( subject ) && typeOf( 'object', subject );
}

/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
export const isArray: <T>( subject: unknown ) => subject is T[] = Array.isArray;

/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
export const isFunction = <( subject: unknown ) => subject is AnyFunction>apply( typeOf, 'function' );

/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
export const isString = <( subject: unknown ) => subject is string>apply( typeOf, 'string' );

/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
export const isUndefined = <( subject: unknown ) => subject is undefined>apply( typeOf, 'undefined' );

/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */
export function isNull( subject: unknown ): subject is null {
  return subject === null;
}

/**
 * Checks if the given subject is an HTMLElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
export function isHTMLElement( subject: unknown ): subject is HTMLElement {
  return subject instanceof HTMLElement;
}

/**
 * Checks if the given subject is an HTMLButtonElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLButtonElement, or otherwise `false`.
 */
export function isHTMLButtonElement( subject: unknown ): subject is HTMLButtonElement {
  return subject instanceof HTMLButtonElement;
}
