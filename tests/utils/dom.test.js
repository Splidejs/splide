import {
	find,
	child,
	create,
	remove,
	domify,
	applyStyle,
	addClass,
	removeClass,
	hasClass,
	setAttribute,
	removeAttribute,
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

	test( '"remove" should remove the given element.', () => {
		const root  = document.querySelector( '.root' );
		const slide = child( root, 'slide' );

		expect( root.children.length ).toBe( 3 );
		remove( slide );
		expect( root.children.length ).toBe( 2 );
	} );

	test( '"domify" should convert HTML string to elements.', () => {
		const root  = document.querySelector( '.root' );
		const li    = domify( '<li class="child">Forth</li>' );

		root.appendChild( li );

		const items = root.getElementsByTagName( 'li' );
		expect( items[ items.length - 1 ].textContent ).toBe( 'Forth' );
	} );

	test( '"applyStyle" should apply a style or styles to an element.', () => {
		const root = document.querySelector( '.root' );
		applyStyle( root, { width: '200px', height: '100px' } );
		expect( root.style.width ).toBe( '200px' );
		expect( root.style.height ).toBe( '100px' );
	} );

	test( '"addClass" should add a class or classes to an element.', () => {
		const root = document.querySelector( '.root' );
		addClass( root, [ 'class1', 'class2' ] );
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
		root.dataset.a = 'a';
		root.dataset.b = 'b';
		removeAttribute( root, [ 'data-a', 'data-b' ] );
		expect( root.dataset.a ).toBeUndefined();
		expect( root.dataset.b ).toBeUndefined();
	} );
} );