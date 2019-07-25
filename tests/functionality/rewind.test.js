import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The "rewind" type Splide', () => {
	let splide;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide', { rewind: true }, COMPLETE ).mount();
	} );

	test( 'should rewind slider before the first slide or after the last(edgeIndex) slide.', () => {
		splide.go( splide.length );
		expect( splide.index ).toBe( 0 );

		splide.go( '-' );
		expect( splide.index ).toBe( splide.Components.Controller.edgeIndex );
	} );
} );