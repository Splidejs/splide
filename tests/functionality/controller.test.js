import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The Controller', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
	} );

	test( 'should parse control patterns.', () => {
		const perPage    = 3;
		const splide     = new Splide( '#splide', { perPage }, COMPLETE ).mount();
		const Controller = splide.Components.Controller;

		expect( Controller.parse( '+' ) ).toBe( 1 );
		expect( Controller.parse( '+2' ) ).toBe( 2 );
		expect( Controller.parse( '-' ) ).toBe( -1 );
		expect( Controller.parse( '-2' ) ).toBe( -2 );

		expect( Controller.parse( '>' ) ).toBe( perPage );
		expect( Controller.parse( '<' ) ).toBe( -perPage );
		expect( Controller.parse( '>2' ) ).toBe( perPage * 2 );

		expect( Controller.parse( '5' ) ).toBe( 5 );
	} );

	test( 'should trim index depending on a slider type and rewind option.', () => {
		const perPage    = 3;
		const splide     = new Splide( '#splide', { perPage }, COMPLETE ).mount();
		const slides     = splide.Components.Elements.slides;
		const Controller = splide.Components.Controller;

		expect( Controller.edgeIndex ).toBe( slides.length - perPage );
		expect( Controller.trim( 100 ) ).toBe( Controller.edgeIndex );
		expect( Controller.trim( -100 ) ).toBe( 0 );

		splide.options = { rewind: true };
		expect( Controller.edgeIndex ).toBe( slides.length - perPage );
		expect( Controller.trim( 100 ) ).toBe( 0 );
		expect( Controller.trim( -100 ) ).toBe( Controller.edgeIndex );
	} );

	test( 'should trim index properly in LOOP mode.', () => {
		const splide     = new Splide( '#splide', { perPage: 3, type: 'loop' }, COMPLETE ).mount();
		const Controller = splide.Components.Controller;

		expect( Controller.edgeIndex ).toBe( splide.length - 1 );
	} );
} );