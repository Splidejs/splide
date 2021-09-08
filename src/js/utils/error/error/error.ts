import { PROJECT_CODE } from '../../../constants/project';


/**
 * Displays the error message on the console.
 *
 * @param message - A message.
 */
export function error( message: string ): void {
  console.error( `[${ PROJECT_CODE }] ${ message }` );
}
