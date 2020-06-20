import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The Keyboard', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
	} );

	test( 'should listen to the keydown event of the document if the keyboard option is "global" or true.', done => {
		const splide = new Splide( '#splide', {}, COMPLETE );
		splide.mount();

		splide.on( 'moved', () => {
			expect( splide.index ).toBe( 1 );
			done();
		} );

		document.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'ArrowRight' } ) );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );

	test( 'should add tabindex to the root element if the keyboard option is "focused".', () => {
		const splide = new Splide( '#splide', { keyboard: 'focused' }, COMPLETE );
		splide.mount();
		expect( splide.root.getAttribute( 'tabindex' ) ).toBe( '0' );
	} );

	test( 'should listen to the keydown event of the root element if the keyboard option is "focused".', done => {
		const splide = new Splide( '#splide', { keyboard: 'focused' }, COMPLETE );
		splide.mount();

		splide.on( 'moved', () => {
			expect( splide.index ).toBe( 1 );
			done();
		} );

		splide.root.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'ArrowRight' } ) );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );
} );