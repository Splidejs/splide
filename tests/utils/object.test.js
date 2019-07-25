import { each, merge, values } from '../../src/js/utils/object';

describe( 'Object function ', () => {
	test( '"merge" should deeply merge 2 objects.', () => {
		const merged = merge(
			{
				a: 1,
				b: 2,
				c: { x: 1, y: 2 },
			},
			{
				b: 3,
				c: { x: 0 },
			}
		);

		expect( merged ).toEqual( {
			a: 1,
			b: 3,
			c: { x: 0, y: 2 },
		} );
	} );

	test( '"each" should iterate an object.', () => {
		const obj    = { a: 1, b: 2 };
		const values = [];
		const keys   = [];

		each( obj, ( value, key ) => {
			values.push( value );
			keys.push( key );
		} );

		expect( values ).toEqual( [ 1, 2 ] );
		expect( keys ).toEqual( [ 'a', 'b' ] );
	} );

	test( '"values" should pick values from an object and return them as an array.', () => {
		const obj = { a: 1, b: 2 };
		expect( values( obj ) ).toEqual( [ 1, 2 ] );
	} );
} );