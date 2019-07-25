import { between, sprintf, unit } from '../../src/js/utils/utils';

describe( 'Utility function ', () => {
	test( '"between" should trim the first given value by other 2 numbers.', () => {
		expect( between( 5, 0, 10 ) ).toBe( 5 );
		expect( between( 11, 0, 10 ) ).toBe( 10 );
		expect( between( 11, 10, 0 ) ).toBe( 10 );
		expect( between( -1, 10, 0 ) ).toBe( 0 );
	} );

	test( '"sprintf" should replace %s from the first argument with the second one.', () => {
		expect( sprintf( '%s, world!', 'Hello' ) ).toBe( 'Hello, world!' );
	} );

	describe( '"unit" should', () => {
		test( 'return the given value itself when the argument is string.', () => {
			expect( unit( '1px' ) ).toBe( '1px' );
		} );

		test( 'append "px" to the given number.', () => {
			expect( unit( 1 ) ).toBe( '1px' );
		} );

		test( 'return an empty string when the given value is falsy.', () => {
			expect( unit( 0 ) ).toBe( '' );
		} );
	} );
} );

