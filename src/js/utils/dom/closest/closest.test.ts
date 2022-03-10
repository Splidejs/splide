import { closest } from './closest';


describe.each( [ [ 'native' ], [ 'polyfill' ] ] )( 'closest (%s)', ( env ) => {
  if ( env === 'polyfill' ) {
    // Forces to disable the native method.
    Element.prototype.closest = null as any;
  }

  beforeEach( () => {
    document.body.innerHTML = `
      <div id="container" class="wrapper">
        <div id="outer" class="wrapper">
          <div id="inner">
            <span id="start">start</span>
          </div>
        </div>
      </div>
    `;
  } );

  test( 'can find the closest element.', () => {
    const from = document.getElementById( 'start' );

    if ( from ) {
      expect( closest( from, '#inner' )?.id ).toBe( 'inner' );
      expect( closest( from, '#outer' )?.id ).toBe( 'outer' );
      expect( closest( from, 'div' )?.id ).toBe( 'inner' );
      expect( closest( from, '.wrapper' )?.id ).toBe( 'outer' );
    } else {
      fail();
    }
  } );

  test( 'should include the provided element itself.', () => {
    const from = document.getElementById( 'start' );

    if ( from ) {
      expect( closest( from, 'span' )?.id ).toBe( 'start' );
    } else {
      fail();
    }
  } );

  test( 'should return null if no element is found.', () => {
    const from = document.getElementById( 'start' );

    if ( from ) {
      expect( closest( from, 'invalid' ) ).toBeNull();
    } else {
      fail();
    }
  } );
} );
