/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
export declare function isObject(subject: any): subject is object;
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
export declare function isArray<T>(subject: any): subject is T[];
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
export declare function isFunction(subject: any): subject is (...args: any[]) => any;
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
export declare function isString(subject: any): subject is string;
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
export declare function isUndefined(subject: any): subject is undefined;
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */
export declare function isNull(subject: any): subject is null;
/**
 * Checks if the given subject is an HTMLElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
export declare function isHTMLElement(subject: any): subject is HTMLElement;
/**
 * Checks if the given subject is an HTMLButtonElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLButtonElement, or otherwise `false`.
 */
export declare function isHTMLButtonElement(subject: any): subject is HTMLButtonElement;
//# sourceMappingURL=../../../../src/js/utils/type/type.d.ts.map