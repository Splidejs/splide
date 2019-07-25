import { throttle } from '../../src/js/utils/time';

describe( 'Time function ', () => {
	test( '"throttle" should reduce frequency of a callback function.', done => {
		const callback  = jest.fn();
		const throttled = throttle( callback, 40 );
		let counter = 0;

		const intervalID = setInterval( () => {
			counter++;
			throttled();

			if ( counter >= 10 ) {
				expect( callback ).toHaveBeenCalledTimes( 4 );
				clearInterval( intervalID );
				done();
			}
		}, 20 );
	} );
} );