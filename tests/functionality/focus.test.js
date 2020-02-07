import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'Splide with "focus" option', () => {
	let splide;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide' ).mount( COMPLETE );
	} );

	test( 'should locate the active slide on the center of the slider if the value is "center".', () => {
		const { Track, Elements: { track } } = splide.Components;
		const width      = 900;
		const perPage    = 3;
		const slideWidth = width / perPage;

		Object.defineProperty( track, 'clientWidth', { value: width } );
		splide.options = { focus: 'center', perPage };

		expect( Track.offset( 0 ) ).toBe( - ( width / 2 - slideWidth / 2 ) );
	} );

	test( 'should locate the active slide according to the focus index.', () => {
		const { Track, Elements: { track } } = splide.Components;
		const width      = 900;
		const perPage    = 3;
		const focus      = 2;
		const slideWidth = width / perPage;

		Object.defineProperty( track, 'clientWidth', { value: width } );
		splide.options = { focus, perPage };

		expect( Track.offset( 0 ) ).toBe( - slideWidth * focus );
	} );
} );