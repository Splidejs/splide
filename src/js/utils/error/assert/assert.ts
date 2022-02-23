import { PROJECT_CODE } from '../../../constants/project';


/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message to display.
 */
export function assert( condition: any, message?: string ): void {
  if ( ! condition ) {
    throw new Error( `[${ PROJECT_CODE }] ${ message || '' }` );
  }
}
