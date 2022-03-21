import { CLASS_FOCUS_IN } from '../../../constants/classes';
import { fire, init } from '../../../test';


describe( 'Focus', () => {
  test( 'can add the status class to the root when focus comes into it by a key.', () => {
    const splide = init( {}, { arrows: true } );

    fire( document, 'keydown' );
    fire( splide.root, 'focusin' );

    expect( splide.root.classList.contains( CLASS_FOCUS_IN ) ).toBe( true );
  } );

  test( 'can remove the status class from the root when detecting pointerdown.', () => {
    const splide = init( {}, { arrows: true } );

    fire( document, 'keydown' );
    fire( splide.root, 'focusin' );

    expect( splide.root.classList.contains( CLASS_FOCUS_IN ) ).toBe( true );

    fire( splide.root, 'mousedown' );
    fire( splide.root, 'focusin' );

    expect( splide.root.classList.contains( CLASS_FOCUS_IN ) ).toBe( false );
  } );

  test( 'should not add the status class when focus comes into the root by pointing devices.', () => {
    const splide = init( {}, { arrows: true } );

    fire( document, 'mousedown' );
    fire( splide.root, 'focusin' );

    expect( splide.root.classList.contains( CLASS_FOCUS_IN ) ).toBe( false );
  } );
} );
