import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { STATUS_CLASSES } from "../../src/js/constants/classes";
import { COMPLETE } from '../../src/js/components';


describe( 'The "slide" type Splide', () => {
	let splide;
	const width = 800;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide', {}, COMPLETE ).mount();

		const { track, list, slides } = splide.Components.Elements;

		// Set up the getBoundingClientRect.
		slides.forEach( ( slide, index ) => {
			slide.getBoundingClientRect = jest.fn( () => ( {
				right: width * index + 1,
			} ) );

			Object.defineProperty( slide, 'offsetWidth', { value: width } );
			Object.defineProperty( slide, 'clientWidth', { value: width } );
		} );

		track.getBoundingClientRect = jest.fn( () => ( { left: 0, right: width } ) );

		splide.on( 'move', newIndex => {
			const offset = slides.filter( ( slide, index ) => index < newIndex ).reduce( ( offset, slide ) => {
				offset += slide.clientWidth;
				return offset;
			}, 0 );

			list.getBoundingClientRect = jest.fn( () => ( { left: -offset } ) );
		} );
	} );

	test( 'should init index and slide attributes correctly.', () => {
		expect( splide.index ).toBe( 0 );

		const Slide     = splide.Components.Elements.getSlide( splide.index );
		const classList = Slide.slide.classList;

		expect( classList.contains( STATUS_CLASSES.active ) ).toBe( true );
		expect( classList.contains( STATUS_CLASSES.visible ) ).toBe( true );
	} );

	test( 'should move slides and update attributes correctly.', done => {
		const { Track, Elements: { track, list } } = splide.Components;
		Object.defineProperty( track, 'clientWidth', { value: width } );

		expect( parseInt( Track.position ) ).toBe( 0 );

		splide.on( 'moved', ( newIndex, prevIndex ) => {
			expect( Track.position ).toBe( -width );

			const prevSlide   = splide.Components.Elements.getSlide( prevIndex );
			const newSlide    = splide.Components.Elements.getSlide( newIndex );
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