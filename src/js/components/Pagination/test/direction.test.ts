import { CLASS_PAGINATION } from '../../../constants/classes';
import { init } from '../../../test';


describe( 'Pagination direction', () => {
  test( 'should follow the `direction` option unless the user provides `paginationDirection`.', () => {
    init( { direction: 'ttb', height: 1000 } );
    const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );

    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--ttb` ) ).toBe( true );
    expect( pagination.getAttribute( 'aria-orientation' ) ).toBe( 'vertical' );
  } );

  test( 'should follow the `paginationDirection`.', () => {
    init( { direction: 'ttb', paginationDirection: 'rtl', height: 1000 } );
    const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--rtl` ) ).toBe( true );
    expect( pagination.getAttribute( 'aria-orientation' ) ).toBeNull();
  } );

  test( 'should follow the `direction` option when it is updated.', () => {
    const splide = init();

    let pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--ltr` ) ).toBe( true );

    splide.options = { direction: 'rtl' };
    pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--rtl` ) ).toBe( true );
  } );

  test( 'should follow the `paginationDirection` option when it is updated.', () => {
    const splide = init( { paginationDirection: 'ttb' } );

    let pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--ttb` ) ).toBe( true );

    splide.options = { paginationDirection: 'ltr' };
    pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.classList.contains( `${ CLASS_PAGINATION }--ltr` ) ).toBe( true );
  } );
} );
