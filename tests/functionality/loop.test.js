import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The "loop" type Splide', () => {
	let splide;
	const width = 800;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide', { type: 'loop' }, COMPLETE ).mount();

		// Set up the getBoundingClientRect.
		splide.Components.Elements.getSlides( true ).forEach( Slide => {
			Slide.slide.getBoundingClientRect = jest.fn( () => ( {
				right: width * ( Slide.index + 1 + splide.Components.Clones.length  / 2 ),
			} ) );
		} );
	} );

	test( 'should activate a Clones component and yield clone slides', () => {
		const Clones = splide.Components.Clones;
		expect( Clones.length ).toBeGreaterThan( 0 );
	} );

	test( 'should init track position according to length of clones.', () => {
		const { Track, Clones, Elements } = splide.Components;

		Object.defineProperty( Elements.track, 'clientWidth', { value: width } );
		global.dispatchEvent( new Event( 'resize' ) );
		expect( Math.abs( Track.toPosition( 0 ) ) ).toBe( width * Clones.length / 2 );
	} );

	test( 'should move to clones before the first slide or after the last one then jump to actual slide.', done => {
		splide.on( 'move', ( newIndex, prevIndex, destIndex ) => {
			expect( newIndex ).toBe( 0 );
			expect( destIndex ).toBe( splide.length );
		} );

		splide.on( 'moved', ( newIndex, prevIndex, destIndex ) => {
			expect( newIndex ).toBe( 0 );
			expect( destIndex ).toBe( splide.length );

			expect( splide.index ).toBe( 0 );

			done();
		} );

		splide.go( splide.length );
		splide.Components.Elements.list.dispatchEvent( new Event( 'transitionend' ) );
	} );
} );