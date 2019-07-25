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
		const splide = new Splide( '#splide', { fixedHeight: '40em' }, COMPLETE );
		splide.mount();

		const slide = splide.Components.Elements.slides.pop();
		expect( slide.style.height ).toBe( '40em' );
	} );

	test( 'should set proper width of a slide element according to a perView option in horizontal mode.', () => {
		const splide = new Splide( '#splide', { perView: 2 }, COMPLETE );
		splide.mount();

		const track = splide.Components.Elements.track;

		// Force to set clientWidth of a track.
		Object.defineProperty( track, 'clientWidth', { value: 800 } );

		splide.emit( 'resize' );

		const slide = splide.Components.Elements.slides.pop();
		expect( slide.style.width ).toBe( '400px' );

		// Is the width updated correctly after perView option is updated?
		splide.options = { perView: 4 };
		expect( slide.style.width ).toBe( '200px' );
	} );

	test( 'should set proper height of a slide element according to a perView option in vertical mode.', () => {
		const splide = new Splide( '#splide', { direction: 'ttb', perView: 2, height: 400 }, COMPLETE );
		splide.mount();

		const track  = splide.Components.Elements.track;

		Object.defineProperty( track, 'clientWidth', { value: 800 } );

		const slide = splide.Components.Elements.slides.pop();
		expect( slide.style.height ).toBe( '200px' );

		splide.options = { perView: 4 };
		expect( slide.style.height ).toBe( '100px' );
	} );

	test( 'should set margin according to a gap size.', () => {
		const splide = new Splide( '#splide', { gap: 10 }, COMPLETE );
		splide.mount();
		const slide  = splide.Components.Elements.slides.pop();
		expect( slide.style.marginRight ).toBe( '10px' );
	} );
} );