import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The Layout ', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
	} );

	test( 'should apply max-width to a root element when a "width" option is provided.', () => {
		const splide = new Splide( '#splide', { width: 800 }, COMPLETE );
		splide.mount();
		expect( splide.root.style.maxWidth ).toBe( '800px' );
	} );

	test( 'should apply height to a slide element when a "height" option is provided.', () => {
		const splide = new Splide( '#splide', { height: 400 }, COMPLETE );
		splide.mount();

		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.height ).toBe( '400px' );
	} );

	test( 'should apply height to a slide element when a "fixedHeight" option is provided.', () => {
		const splide = new Splide( '#splide', { fixedHeight: 400 }, COMPLETE );
		splide.mount();

		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.height ).toBe( '400px' );
	} );

	test( 'should set proper width of a slide element according to a perPage option in horizontal mode.', () => {
		const splide = new Splide( '#splide', { perPage: 2 }, COMPLETE );
		splide.mount();

		const track = splide.Components.Elements.track;

		// Force to set clientWidth of a track.
		Object.defineProperty( track, 'clientWidth', { value: 800 } );

		splide.emit( 'resize' );

		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.width ).toBe( '400px' );

		// Is the width updated correctly after perPage option is updated?
		splide.options = { perPage: 4 };
		expect( slide.style.width ).toBe( '200px' );
	} );

	test( 'should set proper height of a slide element according to a perPage option in vertical mode.', () => {
		const splide = new Splide( '#splide', { direction: 'ttb', perPage: 2, height: 400 }, COMPLETE );
		splide.mount();

		const track = splide.Components.Elements.track;

		Object.defineProperty( track, 'clientWidth', { value: 800 } );

		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.height ).toBe( '200px' );

		splide.options = { perPage: 4 };
		expect( slide.style.height ).toBe( '100px' );
	} );

	test( 'should not set slide width when autoWidth option is true.', () => {
		const splide = new Splide( '#splide', { autoWidth: true }, COMPLETE );
		splide.mount();
		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.width ).toBeFalsy();
	} );

	test( 'should set margin according to a gap size.', () => {
		const splide = new Splide( '#splide', { gap: 10 }, COMPLETE );
		splide.mount();
		const slide = splide.Components.Elements.slides[0];
		expect( slide.style.marginRight ).toBe( '10px' );
	} );
} );