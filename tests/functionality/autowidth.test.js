import { width } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'When the autoWidth option is true, ', () => {
	let splide;

	beforeEach( () => {
		document.body.innerHTML = width;
		splide = new Splide( '#splide', { autoWidth: true }, COMPLETE );

		Object.defineProperty( splide.root.querySelector( '.splide__track' ), 'clientWidth', { value: 800 } );
		splide.root.querySelectorAll( '.splide__slide' ).forEach( slide => {
			Object.defineProperty( slide, 'offsetWidth', { value: parseInt( slide.style.width ) } );
			Object.defineProperty( slide, 'clientWidth', { value: parseInt( slide.style.width ) } );
		} );

		splide.mount();
	} );

	test( 'Splide should move slides according to their width.', done => {
		splide.on( 'moved', () => {
			const slide = splide.Components.Elements.slides[0];
			expect( Math.abs( splide.Components.Track.position ) ).toBe( slide.offsetWidth );
			done();
		} );

		splide.go( 1 );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );

	test( '"is-visible" class is properly toggled by the slide and viewport width.', done => {
		splide.on( 'moved', () => {
			const slide1 = splide.Components.Elements.slides[1];
			const slide2 = splide.Components.Elements.slides[2]; // 300px, active
			const slide3 = splide.Components.Elements.slides[3]; // 400px
			const slide4 = splide.Components.Elements.slides[4]; // 500px

			expect( slide1.classList.contains( 'is-visible' ) ).toBeFalsy();
			expect( slide2.classList.contains( 'is-active' ) && slide2.classList.contains( 'is-visible' ) ).toBeTruthy();
			expect( slide3.classList.contains( 'is-visible' ) ).toBeTruthy();
			expect( slide4.classList.contains( 'is-visible' ) ).toBeFalsy(); // Out of the viewport.
			done();
		} );

		splide.go( 2 );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );
} );