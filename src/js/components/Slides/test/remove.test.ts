import { init } from '../../../test';


describe( 'Slides#remove()', () => {
  test( 'can remove a slide at the specified index.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const Slide1 = Slides.getAt( 1 );
    const Slide2 = Slides.getAt( 2 );
    const length = Slides.getLength();

    Slides.remove( 1 );

    expect( Slides.getLength() ).toBe( length - 1 );
    expect( Slides.getAt( 1 ).slide ).not.toBe( Slide1.slide );
    expect( Slides.getAt( 1 ).slide ).toBe( Slide2.slide );
  } );

  test( 'can remove slides at the specified indices.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const Slide4 = Slides.getAt( 4 );
    const length = Slides.getLength();

    Slides.remove( [ 1, 2, 3 ] );

    expect( Slides.getLength() ).toBe( length - 3 );
    expect( Slides.getAt( 1 ).slide ).toBe( Slide4.slide );
  } );

  test( 'can remove slides by a selector.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const Slide3 = Slides.getAt( 3 );
    const length = Slides.getLength();

    Slides.remove( 'li:nth-child( 1 ), li:nth-child( 2 )' );

    expect( Slides.getLength() ).toBe( length - 2 );
    expect( Slides.getAt( 1 ).slide ).toBe( Slide3.slide );
  } );

  test( 'can remove slides by a predicate function.', () => {
    const splide = init();
    const { Slides } = splide.Components;
    const Slide3 = Slides.getAt( 3 );
    const length = Slides.getLength();

    Slides.remove( Slide => Slide.index < 3 );

    expect( Slides.getLength() ).toBe( length - 3 );
    expect( Slides.getAt( 0 ).slide ).toBe( Slide3.slide );
  } );
} );
