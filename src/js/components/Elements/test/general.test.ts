import {
  CLASS_ACTIVE,
  CLASS_ARROW_NEXT,
  CLASS_ARROW_PREV,
  CLASS_LIST,
  CLASS_PROGRESS_BAR,
  CLASS_ROOT, CLASS_TOGGLE,
  CLASS_TRACK,
} from '../../../constants/classes';
import { RTL } from '../../../constants/directions';
import { init } from '../../../test';


describe( 'Elements', () => {
  test( 'can collect essential elements.', () => {
    const splide = init( {}, { autoplay: true, arrows: true, progress: true } );
    const { Elements } = splide.Components;

    expect( Elements.root.classList.contains( CLASS_ROOT ) ).toBe( true );
    expect( Elements.track.classList.contains( CLASS_TRACK ) ).toBe( true );
    expect( Elements.list.classList.contains( CLASS_LIST ) ).toBe( true );
    expect( Elements.slides.length ).toBe( splide.length );
    expect( Elements.prev.classList.contains( CLASS_ARROW_PREV ) ).toBe( true );
    expect( Elements.next.classList.contains( CLASS_ARROW_NEXT ) ).toBe( true );
    expect( Elements.bar.classList.contains( CLASS_PROGRESS_BAR ) ).toBe( true );
    expect( Elements.toggle.classList.contains( CLASS_TOGGLE ) ).toBe( true );
  } );

  test( 'can assign unique IDs to root, track and list elements.', () => {
    const splide = init( {}, { autoplay: true, arrows: true, progress: true } );
    const { Elements } = splide.Components;
    const { id } = Elements.root;

    expect( id ).not.toBe( '' );
    expect( Elements.track.id ).toBe( `${ id }-track` );
    expect( Elements.list.id ).toBe( `${ id }-list` );
  } );

  test( 'can add classes to root element.', () => {
    const splide = init( { type: 'loop', direction: RTL, isNavigation: true } );
    const { classList } = splide.root;
    const contains = classList.contains.bind( classList );

    expect( contains( `${ CLASS_ROOT }--loop` ) ).toBe( true );
    expect( contains( `${ CLASS_ROOT }--slide` ) ).toBe( false );
    expect( contains( `${ CLASS_ROOT }--fade` ) ).toBe( false );

    expect( contains( `${ CLASS_ROOT }--rtl` ) ).toBe( true );
    expect( contains( `${ CLASS_ROOT }--ltr` ) ).toBe( false );
    expect( contains( `${ CLASS_ROOT }--ttb` ) ).toBe( false );

    expect( contains( `${ CLASS_ROOT }--draggable` ) ).toBe( true );
    expect( contains( `${ CLASS_ROOT }--nav` ) ).toBe( true );

    expect( contains( CLASS_ACTIVE ) ).toBe( true );
  } );

  test( 'should not collect nested slider elements.', () => {
    const html = `
      <div class="splide">
        <div class="splide__track">
          <ul class="splide__list">
            <div class="splide__slide">
              <div id="nested-splide" class="splide">
                <div id="nested-splide-track" class="splide__track">
                  <ul id="nested-splide-list" class="splide__list">
                    <div id="nested-splide-slide" class="splide__slide">
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    `;

    const splide = init( {}, { html } );
    const { Elements } = splide.Components;

    expect( Elements.track.id ).not.toBe( 'nested-splide-track' );
    expect( Elements.list.id ).not.toBe( 'nested-splide-list' );
    expect( Elements.slides.length ).toBe( 1 );
  } );
} );
