import { camelToKebab } from './camelToKebab';


describe( 'camelToKebab', () => {
  test( 'can convert a string in the camel case to the kebab case.', () => {
    expect( camelToKebab( 'maxWidth' ) ).toBe( 'max-width' );
    expect( camelToKebab( 'borderLeftWidth' ) ).toBe( 'border-left-width' );
    expect( camelToKebab( 'listStyleType' ) ).toBe( 'list-style-type' );

    expect( camelToKebab( 'ButtonElement' ) ).toBe( 'button-element' );
  } );

  test( 'should do nothing if the string is already described in the kebab case.', () => {
    expect( camelToKebab( 'max-width' ) ).toBe( 'max-width' );
    expect( camelToKebab( 'border-left-width' ) ).toBe( 'border-left-width' );
  } );
} );
