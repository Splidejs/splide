import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'The Autoplay', () => {
	beforeEach( () => {
		document.body.innerHTML = minimum;
		jest.spyOn( window, 'requestAnimationFrame' ).mockImplementation( callback => {
			setTimeout( () => callback( new Date().getTime() ), 16 );
		} );
	} );

	test( 'should move slides automatically, emitting play/pause events.', done => {
		const splide          = new Splide( '#splide', { autoplay: true, interval: 100 }, COMPLETE );
		const playCallback    = jest.fn();
		const playingCallback = jest.fn();

		splide
			.on( 'autoplay:play', playCallback )
			.on( 'autoplay:playing', playingCallback )
			.on( 'autoplay:pause', () => {
				expect( splide.index ).toBe( 1 );
				expect( playCallback ).toHaveBeenCalled();
				expect( playingCallback ).toHaveBeenCalled();
				done();
			} );

		splide.mount();

		setTimeout( () => splide.Components.Autoplay.pause(), 120 );
	} );
} );