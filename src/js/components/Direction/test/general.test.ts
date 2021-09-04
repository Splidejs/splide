import { LTR, RTL, TTB } from '../../../constants/directions';
import { init } from '../../../test';


describe( 'Direction', () => {
  const splide = init();
  const { options } = splide;
  const { resolve, orient } = splide.Components.Direction;

  test( 'can provide property names for LTR.', () => {
    options.direction = LTR;

    expect( resolve( 'marginRight' ) ).toBe( 'marginRight' );
    expect( resolve( 'width' ) ).toBe( 'width' );
    expect( resolve( 'paddingLeft' ) ).toBe( 'paddingLeft' );
  } );

  test( 'can provide property names for TTB.', () => {
    options.direction = TTB;

    expect( resolve( 'marginRight' ) ).toBe( 'marginBottom' );
    expect( resolve( 'width' ) ).toBe( 'height' );
    expect( resolve( 'paddingLeft' ) ).toBe( 'paddingTop' );
  } );

  test( 'can provide property names for RTL.', () => {
    options.direction = RTL;

    expect( resolve( 'marginRight' ) ).toBe( 'marginLeft' );
    expect( resolve( 'width' ) ).toBe( 'width' );
    expect( resolve( 'paddingLeft' ) ).toBe( 'paddingRight' );
  } );

  test( 'can provide same property names for LTR and RTL if the axisOnly is true.', () => {
    options.direction = RTL;

    expect( resolve( 'marginRight', true ) ).toBe( 'marginRight' );
    expect( resolve( 'paddingLeft', true ) ).toBe( 'paddingLeft' );
  } );

  test( 'can orient the provided value towards the current direction.', () => {
    options.direction = LTR;
    expect( orient( 1 ) ).toBe( -1 );

    options.direction = TTB;
    expect( orient( 1 ) ).toBe( -1 );

    options.direction = RTL;
    expect( orient( 1 ) ).toBe( 1 );
  } );
} );
