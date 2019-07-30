import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { sprintf } from '../../src/js/utils/utils';
import { COMPLETE } from '../../src/js/components';


describe( 'The A11y', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
	} );

	test( 'should update screen reader texts and aria labels of arrows properly.', done => {
		const splide = new Splide( '#splide', { arrows: true, rewind: true }, COMPLETE );
		splide.mount();

		const Arrows  = splide.Components.Arrows;
		const srClass = splide.classes.sr;
		const i18n    = splide.i18n;

		const prev    = Arrows.arrows.prev;
		const next    = Arrows.arrows.next;
		const prevSrt = prev.querySelector( `.${ srClass }` );
		const nextSrt = next.querySelector( `.${ srClass }` );

		expect( prevSrt ).not.toBeNull();
		expect( nextSrt ).not.toBeNull();

		expect( prev.getAttribute( 'aria-label' ) ).toBe( i18n.last );
		expect( prevSrt.textContent ).toBe( i18n.last );

		expect( next.getAttribute( 'aria-label' ) ).toBe( i18n.next );
		expect( nextSrt.textContent ).toBe( i18n.next );

		splide.on( 'moved', () => {
			expect( prev.getAttribute( 'aria-label' ) ).toBe( i18n.prev );
			expect( prevSrt.textContent ).toBe( i18n.prev );

			expect( next.getAttribute( 'aria-label' ) ).toBe( i18n.first );
			expect( nextSrt.textContent ).toBe( i18n.first );

			done();
		} );

		splide.go( splide.length - 1 );
	} );

	describe( 'should initialize screen reader texts and aria labels of pagination properly', () => {
		function confirm( splide, labelFormat ) {
			const items = splide.Components.Pagination.data.items;

			items.forEach( ( { button, page } ) => {
				const label = sprintf( labelFormat, page + 1 );
				const srt   = button.querySelector( `.${ splide.classes.sr }` );

				expect( button.getAttribute( 'aria-label' ) ).toBe( label );
				expect( srt ).not.toBeNull();
				expect( srt.textContent ).toBe( label );
			} );
		}

		test( 'with "go to slide X" when perPage is 1.', () => {
			const splide = new Splide( '#splide', { pagination: true }, COMPLETE );
			splide.mount();

			confirm( splide, splide.i18n.slideX );
		} );

		test( 'with "go to page X" when perPage is not 1.', () => {
			const splide = new Splide( '#splide', { pagination: true, perPage: 2 }, COMPLETE );
			splide.mount();

			confirm( splide, splide.i18n.pageX );
		} );
	} );

} );