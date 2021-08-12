import { default as Core } from '../../splide';
import { COMPLETE } from '../../components';


/**
 * Exports the Splide class with all components.
 *
 * @since 1.0.0
 */
export class Splide extends Core {
	constructor( root, options ) {
		super( root, options, COMPLETE );
	}
}

export { Splide as default };
