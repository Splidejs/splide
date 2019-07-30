import { minimum } from '../data/html';
import Splide from '../../src/js/splide';
import { COMPLETE } from '../../src/js/components';


describe( 'Event', () => {
	let splide;

	beforeEach( () => {
		document.body.innerHTML = minimum;
		splide = new Splide( '#splide', {}, COMPLETE );
	} );

	test( '"mounted" should be emitted after components are mounted.', () => {
		const callback = jest.fn();

		splide.on( 'mounted', callback );
		splide.mount();

		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );

	test( '"updated" should be emitted after options are updated.', () => {
		const callback = jest.fn();

		splide.on( 'updated', callback );
		splide.mount();

		expect( callback ).not.toHaveBeenCalled();

		splide.options = { perPage: 2 };

		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );

	test( '"move"/"moved" should be emitted before/after a slider moves and should provide some indexes.', () => {
		const moveCallback = jest.fn();
		const movedCallback = jest.fn();

		splide.mount();
		splide.on( 'move', moveCallback );
		splide.on( 'moved', movedCallback );
		splide.go( '+1' );

		expect( moveCallback ).toHaveBeenCalledWith( 1, 0, 1 );
		expect( movedCallback ).toHaveBeenCalledWith( 1, 0, 1 );
	} );

	test( '"updated" should be emitted after options are updated.', () => {
		const callback = jest.fn();

		splide.on( 'updated', callback );
		splide.mount();

		expect( callback ).not.toHaveBeenCalled();

		splide.options = { perPage: 2 };

		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );
} );