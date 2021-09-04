import { init } from '../../../test';


describe( 'Controller#toIndex()', () => {
  test( 'can convert the page index to the slide index.', () => {
    const splide = init( { perPage: 3 } );
    const { toIndex } = splide.Components.Controller;

    expect( toIndex( 0 ) ).toBe( 0 );
    expect( toIndex( 1 ) ).toBe( 3 );
    expect( toIndex( 2 ) ).toBe( 6 );
  } );

  test( 'can convert the page index with respecting the end index.', () => {
    const splide = init( { perPage: 3 }, { length: 4 } );
    const { toIndex } = splide.Components.Controller;

    expect( toIndex( 0 ) ).toBe( 0 );
    expect( toIndex( 1 ) ).toBe( 1 );
  } );
} );
