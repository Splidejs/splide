import { autoWidth } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'When the autoWidth option is true, ', () => {
	let splide;
	const width = 800;

	beforeEach( () => {
		document.body.innerHTML = autoWidth;
		splide = new Splide( '#splide', { autoWidth: true }, COMPLETE );

		Object.defineProperty( splide.root.querySelector( '.splide__track' ), 'clientWidth', { value: width } );

		let accumulatedWidth = 0;

		splide.root.querySelectorAll( '.splide__slide' ).forEach( slide => {
			const slideWidth = parseInt( slide.style.width );

			Object.defineProperty( slide, 'offsetWidth', { value: slideWidth } );
			Object.defineProperty( slide, 'clientWidth', { value: slideWidth } );

			accumulatedWidth += slideWidth;
			const right = accumulatedWidth;

			slide.getBoundingClientRect = jest.fn( () => ( { right } ) );
		} );

		splide.mount();
	} );

	test( 'Splide should move slides according to their width.', done => {
		const { Elements, Track } = splide.Components;

		splide.on( 'moved', () => {
			const slide = Elements.getSlide( 0 ).slide;
			expect( Math.abs( Track.position ) ).toBe( slide.offsetWidth );
			done();
		} );

		splide.go( 1 );
		Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );

	test( '"is-visible" class is properly toggled by the slide and viewport width.', done => {
		const Elements = splide.Components.Elements;

		Element.prototype.hasClass = function( className ) {
			return this.classList.contains( className );
		};

		splide.on( 'moved', () => {
			const slide1 = Elements.slides[1];
			const slide2 = Elements.slides[2]; // 300px, active
			const slide3 = Elements.slides[3]; // 400px
			const slide4 = Elements.slides[4]; // 500px

			expect( slide1.hasClass( 'is-visible' ) ).toBeFalsy();
			expect( slide2.hasClass( 'is-active' ) && slide2.classList.contains( 'is-visible' ) ).toBeTruthy();
			expect( slide3.hasClass( 'is-visible' ) ).toBeTruthy();
			expect( slide4.hasClass( 'is-visible' ) ).toBeFalsy(); // Out of the viewport.
			done();
		} );

		splide.go( 2 );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );
} );