import { fire, init } from '../../../test';
import { URL } from '../../../test/fixtures/constants';


describe( 'LazyLoad in the `sequential` mode', () => {
  test( 'can sequentially load images.', () => {
    init( { lazyLoad: 'sequential' }, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].src ).toBe( `${ URL }/0.jpg` );
    expect( images[ 1 ].src ).toBe( '' );
    expect( images[ 2 ].src ).toBe( '' );

    fire( images[ 0 ], 'load' );
    expect( images[ 1 ].src ).toBe( `${ URL }/1.jpg` );
    expect( images[ 2 ].src ).toBe( '' );

    fire( images[ 1 ], 'load' );
    expect( images[ 2 ].src ).toBe( `${ URL }/2.jpg` );
  } );

  test( 'should load the next image if the current image throws error to load.', () => {
    init( { lazyLoad: 'sequential' }, { src: false, dataSrc: true } );
    const images = document.getElementsByTagName( 'img' );

    expect( images[ 0 ].src ).toBe( `${ URL }/0.jpg` );
    expect( images[ 1 ].src ).toBe( '' );
    expect( images[ 2 ].src ).toBe( '' );

    fire( images[ 0 ], 'error' );
    expect( images[ 1 ].src ).toBe( `${ URL }/1.jpg` );

    fire( images[ 1 ], 'error' );
    expect( images[ 2 ].src ).toBe( `${ URL }/2.jpg` );
  } );
} );
