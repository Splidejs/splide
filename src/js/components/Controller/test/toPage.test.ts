import { init } from '../../../test';


describe( 'Controller#toPage()', () => {
  test( 'can convert the slide index to the page index.', () => {
    const splide = init( { perPage: 3 } );
    const { toPage } = splide.Components.Controller;

    expect( toPage( 0 ) ).toBe( 0 );
    expect( toPage( 1 ) ).toBe( 0 );
    expect( toPage( 2 ) ).toBe( 0 );

    expect( toPage( 3 ) ).toBe( 1 );
    expect( toPage( 4 ) ).toBe( 1 );
    expect( toPage( 5 ) ).toBe( 1 );
  } );

  test( 'can convert the slide index to the page index with respecting the end index.', () => {
    const splide = init( { perPage: 3 }, { length: 4 } );
    const { toPage } = splide.Components.Controller;

    expect( toPage( 0 ) ).toBe( 0 );
    expect( toPage( 1 ) ).toBe( 1 );
    expect( toPage( 2 ) ).toBe( 1 );
    expect( toPage( 3 ) ).toBe( 1 );
  } );

  test( 'should return the slide index as is if the focus option is available.', () => {
    const splide = init( { focus: 'center', perPage: 3 } );
    const { toPage } = splide.Components.Controller;

    expect( toPage( 0 ) ).toBe( 0 );
    expect( toPage( 1 ) ).toBe( 1 );
    expect( toPage( 2 ) ).toBe( 2 );
    expect( toPage( 3 ) ).toBe( 3 );
  } );
} );
