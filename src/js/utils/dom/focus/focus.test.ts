import { focus } from './focus';


describe( 'focus', () => {
  test( 'can make an element focused if it is focusable.', () => {
    const div = document.createElement( 'div' );

    div.tabIndex = 0;
    document.body.appendChild( div );

    expect( document.activeElement ).not.toBe( div );

    focus( div );

    expect( document.activeElement ).toBe( div );
  } );
} );
