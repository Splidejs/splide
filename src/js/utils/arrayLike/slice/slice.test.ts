import { slice } from './slice';


describe( 'slice', () => {
  const arrayLike = { length: 3, 0: '1', 1: '2', 2: '3' };

  test( 'can slice an array-like object.', () => {
    expect( slice( arrayLike ) ).toEqual( [ '1', '2', '3' ] );
    expect( slice( arrayLike, 1 ) ).toEqual( [ '2', '3' ] );
    expect( slice( arrayLike, 1, 2 ) ).toEqual( [ '2' ] );
  } );

  test( 'can slice a node list.', () => {
    const div = document.createElement( 'div' );
    div.innerHTML = `<span>1</span><span>2</span><span>3</span><span>4</span>`;

    const spans = slice( div.children );

    expect( spans.length ).toBe( 4 );
    expect( spans[ 0 ] instanceof HTMLSpanElement ).toBe( true );
    expect( spans[ 3 ].textContent ).toBe( '4' );
  } );
} );
