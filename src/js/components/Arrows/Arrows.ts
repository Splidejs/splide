import { ALL_ATTRIBUTES, ARIA_CONTROLS, ARIA_LABEL } from '../../constants/attributes';
import { CLASS_ARROWS, CLASSES } from '../../constants/classes';
import {
  EVENT_ARROWS_MOUNTED,
  EVENT_ARROWS_UPDATED,
  EVENT_END_INDEX_CHANGED,
  EVENT_MOUNTED,
  EVENT_MOVED,
  EVENT_REFRESH,
  EVENT_SCROLLED,
  EVENT_UPDATED,
} from '../../constants/events';
import { BaseComponent, ComponentConstructor } from '../../types';
import {
  addClass,
  append,
  before,
  create,
  display,
  parseHtml,
  removeAttribute,
  removeClass,
  removeNode,
  setAttribute,
} from '@splidejs/utils';
import { PATH, SIZE, XML_NAME_SPACE } from './path';
import { assert } from '../../utils';
import { I18N } from '../../constants/i18n';


/**
 * The interface for the Arrows component.
 *
 * @since 3.0.0
 */
export interface ArrowsComponent extends BaseComponent {
  readonly arrows: { readonly prev?: HTMLButtonElement, readonly next?: HTMLButtonElement };

  /** @internal */
  update(): void;
}

/**
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 * @param event      - An EventInterface instance.
 *
 * @return An Arrows component object.
 */
export const Arrows: ComponentConstructor<ArrowsComponent> = (Splide, Components, options, event) => {
  const { on, bind, emit } = event;
  const { classes = CLASSES, i18n = I18N } = options;
  const { Elements, Controller } = Components;
  const { arrows: placeholder, track } = Elements;

  /**
   * The wrapper element.
   */
  const wrapper = placeholder || create('div', classes.arrows);

  /**
   * The previous arrow element.
   */
  const prev = Elements.prev || createArrow(true);

  /**
   * The next arrow element.
   */
  const next = Elements.next || createArrow(false);

  /**
   * An object with previous and next arrows.
   */
  const arrows: ArrowsComponent['arrows'] = { prev, next };

  /**
   * Holds modifier classes.
   */
  let wrapperClasses: string;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();

    on(EVENT_UPDATED, () => {
      destroy();
      mount();
    });
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const { arrows: enabled = true } = options;

    wrapperClasses = `${ CLASS_ARROWS }--${ options.direction }`;
    addClass(wrapper, wrapperClasses);

    if (enabled) {
      display(wrapper, '');
      append(wrapper, prev, next);
      !placeholder && before(track, wrapper);
      listen();
      update();
      setAttribute([prev, next], ARIA_CONTROLS, track.id);
      emit(EVENT_ARROWS_MOUNTED, prev, next);
    } else {
      display(wrapper, 'none');
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    event.destroy();
    removeClass(wrapper, wrapperClasses);

    if (Elements.prev) {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    } else {
      removeNode(placeholder ? [prev, next] : wrapper);
    }
  }

  /**
   * Listens to some events.
   */
  function listen(): void {
    const { go } = Controller;
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, 'click', () => go('>'));
    bind(prev, 'click', () => go('<'));
  }

  /**
   * Creates an arrow button.
   * In IE, A SVG element is focusable.
   *
   * @param prev - Determines whether to create a previous or next arrow.
   *
   * @return A created button element.
   */
  function createArrow(prev: boolean): HTMLButtonElement {
    const { arrowPath = PATH } = options;
    const button = `<button class="${ classes.arrow } ${ prev ? classes.prev : classes.next }" type="button">`;
    const svg = arrowPath ? `<svg xmlns="${ XML_NAME_SPACE }" viewBox="0 0 ${ SIZE } ${ SIZE }" width="${ SIZE }" height="${ SIZE }"><path d="${ arrowPath }" />` : '';
    const html = parseHtml<HTMLButtonElement>(button + svg);

    assert(html);
    return html;
  }

  /**
   * Updates status of arrows, such as `disabled` and `aria-label`.
   */
  function update(): void {
    const index = Splide.index;
    const prevIndex = Controller.getPrev();
    const nextIndex = Controller.getNext();
    const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
    const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;

    prev.disabled = prevIndex < 0;
    next.disabled = nextIndex < 0;

    setAttribute(prev, ARIA_LABEL, prevLabel);
    setAttribute(next, ARIA_LABEL, nextLabel);

    emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
  }

  return {
    arrows,
    mount,
    destroy,
    update,
  };
};
