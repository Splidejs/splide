import { CLASS_ACTIVE, CLASS_PAGINATION, CLASS_PAGINATION_PAGE } from '../../../constants/classes';
import { fire, init } from '../../../test';


describe( 'Pagination', () => {
  test( 'can create pagination.', () => {
    const splide     = init();
    const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    const items      = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    expect( pagination.children.length ).toBe( splide.length );
    expect( items.length ).toBe( splide.length );
  } );

  test( 'can create pagination according to the perPage option.', () => {
    const splide = init( { perPage: 3 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    expect( items.length ).toBe( Math.ceil( splide.length / 3 ) );
  } );

  test( 'can move the slider when the item is clicked.', () => {
    const splide = init( { speed: 0 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    fire( items[ 1 ], 'click' );
    expect( splide.index ).toBe( 1 );

    fire( items[ 5 ], 'click' );
    expect( splide.index ).toBe( 5 );
  } );

  test( 'can move the slider to the end index when the last item is clicked.', () => {
    const splide = init( { perPage: 3 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    fire( items[ items.length - 1 ], 'click' );
    expect( splide.index ).toBe( splide.Components.Controller.getEnd() );
  } );

  test( 'can update status classes by the index.', () => {
    const splide = init();
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    expect( items[ 0 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( items[ 0 ].getAttribute( 'aria-current' ) ).toBe( 'true' );

    splide.go( 2 );

    expect( items[ 0 ].classList.contains( CLASS_ACTIVE ) ).toBe( false );
    expect( items[ 0 ].getAttribute( 'aria-current' ) ).toBeNull();
    expect( items[ 2 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( items[ 2 ].getAttribute( 'aria-current' ) ).toBe( 'true' );
  } );

  test( 'can update status classes by the page.', () => {
    const splide = init( { perPage: 3, speed: 0 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    splide.go( 4 ); // page: 1

    expect( items[ 1 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( items[ 1 ].getAttribute( 'aria-current' ) ).toBe( 'true' );

    splide.go( 7 ); // end page

    expect( items[ 3 ].classList.contains( CLASS_ACTIVE ) ).toBe( true );
    expect( items[ 3 ].getAttribute( 'aria-current' ) ).toBe( 'true' );
  } );

  test( 'can set focus to the selected slide.', () => {
    const splide = init( { speed: 0 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    fire( items[ 0 ], 'click' );
    expect( splide.Components.Slides.getAt( 0 ).slide ).toBe( document.activeElement );

    fire( items[ 1 ], 'click' );
    expect( splide.Components.Slides.getAt( 1 ).slide ).toBe( document.activeElement );
  } );

  test( 'should not create pagination if slides are not enough to the perPage option.', () => {
    init( { perPage: 3 }, { length: 1 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    expect( items.length ).toBe( 0 );
  } );

  test( 'should remove the pagination on destroy.', () => {
    const splide = init();
    splide.destroy();

    const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination ).toBeNull();
  } );
} );
