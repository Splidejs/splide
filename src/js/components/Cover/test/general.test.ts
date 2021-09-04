import { CLASS_SLIDE } from '../../../constants/classes';
import { findRule, init } from '../../../test';
import { URL } from '../../../test/fixtures/constants';


describe( 'Cover', () => {
  test( 'can set the image in the slide to the background image.', () => {
    const splide = init( { cover: true } );
    const slides = splide.root.querySelectorAll<HTMLElement>( `.${ CLASS_SLIDE }` );
    const rule1  = findRule( `#${ slides[ 0 ].id }` );
    const rule2  = findRule( `#${ slides[ 1 ].id }` );

    expect( rule1.style.background ).toBe( `center/cover no-repeat url("${ URL }/0.jpg")` );
    expect( rule2.style.background ).toBe( `center/cover no-repeat url("${ URL }/1.jpg")` );

    splide.destroy();
  } );

  test( 'can remove the background image on destroy.', () => {
    const splide = init( { cover: true } );
    const slides = splide.root.querySelectorAll<HTMLElement>( `.${ CLASS_SLIDE }` );
    const rule1  = findRule( `#${ slides[ 0 ].id }` );
    const rule2  = findRule( `#${ slides[ 1 ].id }` );

    splide.Components.Cover.destroy();

    expect( rule1.style.background ).toBe( '' );
    expect( rule2.style.background ).toBe( '' );

    splide.destroy();
  } );
} );
