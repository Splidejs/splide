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
		// Expect scroll to end when current index is below edge.
		splide.go( splide.length );
		expect( splide.index ).toBe( splide.Components.Controller.edgeIndex );
		// Expect rewind to beginning when current index is at edge.
		splide.go( splide.length );
		expect( splide.index ).toBe( 0 );

		// Expect rewind to end when current index is at 0.
		splide.go( -1 );
		expect( splide.index ).toBe( splide.Components.Controller.edgeIndex );
		// Expect scroll to beginning when current index is above 0.
		splide.go( -splide.length );
		expect( splide.index ).toBe( 0 );
	} );
} );
