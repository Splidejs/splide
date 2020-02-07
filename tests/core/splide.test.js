import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { DEFAULTS } from '../../src/js/constants/defaults';
import { COMPLETE } from '../../src/js/components';


describe( 'Splide ', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
	} );

	test( 'should find an element with the given selector.', () => {
		const splide = new Splide( '#splide', {}, COMPLETE );
		expect( splide.root.id ).toBe( 'splide' );
	} );

	test( 'should accept an element as a root on construction.', () => {
		const root   = document.getElementById( 'splide' );
		const splide = new Splide( root, {}, COMPLETE );
		expect( splide.root.id ).toBe( 'splide' );
	} );

	test( 'should overwrite default options with a given ones on construction.', () => {
		const splide = new Splide( '#splide', { perPage: 3 }, COMPLETE );
		expect( splide.options ).toEqual( { ...DEFAULTS, perPage: 3 } );
	} );

	test( '"is" should verify if a given type is a current one.', () => {
		const splide = new Splide( '#splide', { type: 'loop' }, COMPLETE ).mount();
		expect( splide.is( 'slide' ) ).toBe( false );
		expect( splide.is( 'loop' ) ).toBe( true );
	} );

	test( 'should make a root element visible after mount.', () => {
		const root = document.getElementById( 'splide' );
		root.style.visibility = 'hidden';

		const splide = new Splide( root, {}, COMPLETE );
		expect( splide.root.style.visibility ).toBe( 'hidden' );

		splide.mount();
		expect( splide.root.style.visibility ).toBe( 'visible' );
	} );

	test( 'should add a slide dynamically.', () => {
		const splide = new Splide( '#splide', { perMove: 1 }, COMPLETE ).mount();
		const slide  = document.createElement( 'li' );
		const length = splide.length;

		slide.classList.add( 'splide__slide' );
		slide.textContent = `${ length }`;

		splide.add( slide );

		expect( splide.length ).toBe( length + 1 );
		expect( parseInt( splide.Components.Elements.slides[ splide.length - 1 ].textContent ) ).toBe( length );
	} );

	test( 'should remove a slide dynamically.', () => {
		const splide = new Splide( '#splide', {}, COMPLETE ).mount();
		const length = splide.length;

		splide.remove( 0 );

		expect( splide.length ).toBe( length - 1 );
		expect( splide.Components.Elements.slides[0].textContent ).toBe( '2' );
	} );
} );