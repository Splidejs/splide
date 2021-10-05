import { format } from './format';


describe( 'format', () => {
  test( 'can replace %s with provided replacements', () => {
    expect( format( '%s results', 10 ) ).toBe( '10 results' );
    expect( format( '%s/%s', [ 1, 10 ] ) ).toBe( '1/10' );
  } );
} );
