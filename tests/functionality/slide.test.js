import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { STATUS_CLASSES } from "../../src/js/constants/classes";
import { COMPLETE } from '../../src/js/components';


describe( 'The "slide" type Splide', () => {
	let splide;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide', {}, COMPLETE ).mount();
	} );

	test( 'should init index and slide attributes correctly.', () => {
		expect( splide.index ).toBe( 0 );

		const Slide     = splide.Components.Slides.getSlide( splide.index );
		const classList = Slide.slide.classList;

		expect( classList.contains( STATUS_CLASSES.active ) ).toBe( true );
		expect( classList.contains( STATUS_CLASSES.visible ) ).toBe( true );
	} );

	test( 'should move slides and update attributes correctly.', done => {
		const { Track, Elements: { track, list } } = splide.Components;
		Object.defineProperty( track, 'clientWidth', { value: 800 } );

		expect( parseInt( Track.position ) ).toBe( 0 );

		splide.on( 'moved', ( newIndex, prevIndex ) => {
			expect( Track.position ).toBe( -800 );

			const prevSlide   = splide.Components.Slides.getSlide( prevIndex );
			const newSlide    = splide.Components.Slides.getSlide( newIndex );
			const prevClasses = prevSlide.slide.classList;
			const newClasses  = newSlide.slide.classList;

			expect( prevSlide.index ).toBe( 0 );
			expect( newSlide.index ).toBe( 1 );

			expect( prevClasses.contains( STATUS_CLASSES.active ) ).toBe( false );
			expect( prevClasses.contains( STATUS_CLASSES.visible ) ).toBe( false );

			expect( newClasses.contains( STATUS_CLASSES.active ) ).toBe( true );
			expect( newClasses.contains( STATUS_CLASSES.visible ) ).toBe( true );

			done();
		} );

		splide.go( '+' );
		list.dispatchEvent( new Event( 'transitionend' ) );
	} );

	test( 'should not rewind index.', () => {
		expect( splide.index ).toBe( 0 );
		splide.go( '-' );
		expect( splide.index ).toBe( 0 );
	} );
} );