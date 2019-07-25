import {
	find,
	child,
	create,
	applyStyle,
	addClass,
	removeClass,
	hasClass,
	setAttribute,
	removeAttribute,
	subscribe,
} from '../../src/js/utils/dom';

describe( 'DOM function ', () => {
	beforeEach( () => {
		document.body.innerHTML = `
      <ul class="root">
        <li class="child">First</li>
        <li class="child slide">Second</li>
        <li class="child">Third</li>
      </ul>
    `;
	} );

	test( '"find" should find the first element from the given parent with a selector.', () => {
		const elm = find( document, '.root' );
		expect( elm.tagName.toLowerCase() ).toBe( 'ul' );
	} );

	test( '"child" should find the first child element having the given class from the parent.', () => {
		const found = child( document.querySelector( '.root' ), 'slide' );
		expect( found.innerHTML ).toBe( 'Second' );
	} );

	test( '"create" should generate an element, applying some attributes if necessary.', () => {
		const elm = create( 'button', { class: 'btn' } );
		expect( elm.tagName.toLowerCase() ).toBe( 'button' );
		expect( elm.classList.contains( 'btn' ) ).toBe( true );
	} );

	test( '"applyStyle" should apply a style or styles to an element.', () => {
		const root = document.querySelector( '.root' );
		applyStyle( root, { width: '200px', height: '100px' } );
		expect( root.style.width ).toBe( '200px' );
		expect( root.style.height ).toBe( '100px' );
	} );

	test( '"addClass" should add a class or classes to an element.', () => {
		const root = document.querySelector( '.root' );
		addClass( root, 'class1', 'class2' );
		expect( root.classList.contains( 'class1' ) ).toBe( true );
		expect( root.classList.contains( 'class2' ) ).toBe( true );
	} );

	test( '"removeClass" should remove a class or classes from an element.', () => {
		const root = document.querySelector( '.root' );
		const classList = root.classList;

		classList.add( 'class3' );
		classList.add( 'class4' );
		removeClass( root, 'class3' );

		expect( classList.contains( 'class3' ) ).toBe( false );
	} );

	test( '"hasClass" should verify if an element has a class or not.', () => {
		expect( hasClass( document.querySelector( '.root' ), 'root' ) ).toBe( true );
	} );

	test( '"setAttribute" should add an attribute to an element.', () => {
		const root = document.querySelector( '.root' );
		setAttribute( root, 'data-root', 'a' );
		expect( root.dataset.root ).toBe( 'a' );
	} );

	test( '"removeAttribute" should remove an attribute from an element.', () => {
		const root = document.querySelector( '.root' );
		root.dataset.root = 'a';
		removeAttribute( root, 'data-root' );
		expect( root.dataset.root ).toBeUndefined();
	} );

	describe( '"subscribe" should', () => {
		test( 'listen multiple native events.', () => {
			const callback = jest.fn();
			subscribe( window, 'resize click', callback );

			global.dispatchEvent( new Event( 'resize' ) );
			global.dispatchEvent( new Event( 'click' ) );

			expect( callback ).toHaveBeenCalledTimes( 2 );
		} );

		test( 'return an array containing functions to remove listeners.', () => {
			const callback = jest.fn();
			const removers = subscribe( window, 'resize click', callback );

			expect( removers ).toHaveLength( 2 );

			removers.forEach( remover => remover() );

			expect( callback ).not.toHaveBeenCalled();
		} );
	} );
} );