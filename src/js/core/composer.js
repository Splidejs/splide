/**
 * Provide a function for composing components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { each } from '../utils/object';
import { Slide, Fade } from '../transitions';
import { FADE } from '../constants/types';


/**
 * Compose components.
 *
 * @param {Splide}   Splide     - Splide instance.
 * @param {Object}   Components - Additional components.
 * @param {function} Transition - Change component for transition.
 *
 * @return {Object} - An object containing all components.
 */
export default function compose( Splide, Components, Transition ) {
	const components = {};

	each( Components, ( Component, name ) => {
		components[ name ] = Component( Splide, components, name.toLowerCase() );
	} );

	if ( ! Transition ) {
		Transition = Splide.is( FADE ) ? Fade : Slide;
	}

	components.Transition = Transition( Splide, components );

	return components;
}