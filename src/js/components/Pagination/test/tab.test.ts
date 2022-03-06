import { CLASS_PAGINATION, CLASS_PAGINATION_PAGE } from '../../../constants/classes';
import { fire, init } from '../../../test';
import { Options } from '../../../types';


/**
 * - `aria-selected` is tested on general.test.
 * - `aria-labelledby` is not necessary since each tabpanel has its own `aria-label`.
 */
describe( 'Pagination', () => {
  test( 'can set the `tablist` role to the pagination root.', () => {
    init();
    const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );
    expect( pagination.getAttribute( 'role' ) ).toBe( 'tablist' );
  } );

  test( 'can set the `tab` role to each item in pagination.', () => {
    init();
    const items = Array.from( document.getElementsByClassName( CLASS_PAGINATION_PAGE ) );

    items.forEach( item => {
      expect( item.getAttribute( 'role' ) ).toBe( 'tab' );
    } );

    expect( items.length ).toBeGreaterThan( 0 );
  } );

  test( 'can set the `aria-label` role to each item in pagination.', () => {
    const items = Array.from( document.getElementsByClassName( CLASS_PAGINATION_PAGE ) );

    items.forEach( ( item, index ) => {
      expect( item.getAttribute( 'aria-label' ) ).toBe( `Go to slide ${ index + 1 }` );
    } );
  } );

  test( 'can set `aria-controls="target slide ID"` to each item in pagination.', () => {
    const splide = init();
    const items  = Array.from( document.getElementsByClassName( CLASS_PAGINATION_PAGE ) );
    const Slides = splide.Components.Slides;

    items.forEach( ( item, index ) => {
      const Slide = Slides.getAt( index );

      if ( Slide ) {
        expect( item.getAttribute( 'aria-controls' ) ).toBe( Slide.slide.id );
      } else {
        fail();
      }
    } );
  } );

  describe.each( [
    [ 'ltr', 'ArrowRight', 'ArrowLeft' ],
    [ 'rtl', 'ArrowLeft', 'ArrowRight' ],
    [ 'ttb', 'ArrowDown', 'ArrowUp' ],
  ] )( 'in %s mode.', (
    direction,
    nextKey,
    prevKey
  ) => {
    test( 'can move focus by arrow keys and activate the corresponded slide', () => {
      const splide = init( { speed: 0, direction: direction as Options[ 'direction' ], height: 300 } );
      const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

      fire( items[ 0 ], 'keydown', { key: nextKey } );
      expect( items[ 1 ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( 1 );

      fire( items[ 1 ], 'keydown', { key: nextKey } );
      expect( items[ 2 ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( 2 );

      fire( items[ 2 ], 'keydown', { key: prevKey } );
      expect( items[ 1 ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( 1 );
    } );

    test( 'can loop focus by arrow keys.', () => {
      const splide = init( { speed: 0, direction: direction as Options[ 'direction' ], height: 300 } );
      const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );
      const end    = splide.length - 1;

      fire( items[ 0 ], 'keydown', { key: prevKey } );
      expect( items[ end ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( end );

      fire( items[ end ], 'keydown', { key: nextKey } );
      expect( items[ 0 ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( 0 );
    } );

    test( 'can focus the first slide by  and the last slide by End.', () => {
      const splide = init( { speed: 0, direction: direction as Options[ 'direction' ], height: 300 } );
      const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );
      const end    = splide.length - 1;

      fire( items[ 0 ], 'keydown', { key: 'End' } );
      expect( items[ end ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( end );

      fire( items[ end ], 'keydown', { key: 'Home' } );
      expect( items[ 0 ] === document.activeElement ).toBe( true );
      expect( splide.index ).toBe( 0 );
    } );

    test( 'can set proper orientation according to the direction.', () => {
      init( { speed: 0, direction: direction as Options[ 'direction' ], height: 300 } );
      const pagination = document.querySelector( `.${ CLASS_PAGINATION }` );

      expect( pagination.getAttribute( 'aria-orientation' ) )
        .toBe( direction === 'ttb' ? 'vertical' : null );
    } );
  } );

  test( 'should not activate keyboard shortcuts if `paginationKeyboard` option is disabled.', () => {
    const splide = init( { paginationKeyboard: false, speed: 0 } );
    const items  = document.getElementsByClassName( CLASS_PAGINATION_PAGE );

    fire( items[ 0 ], 'keydown', { key: 'ArrowRight' } );
    expect( items[ 1 ] === document.activeElement ).toBe( false );
    expect( splide.index ).toBe( 0 );
  } );
} );
