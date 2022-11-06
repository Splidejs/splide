import { ALL_ATTRIBUTES, ARIA_CONTROLS, ARIA_LABEL } from '../../constants/attributes';
import { CLASS_ARROWS } from '../../constants/classes';
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
  apply,
  assign,
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
  const { classes, i18n } = options;
  const { Elements, Controller } = Components;
  const { arrows: placeholder, track } = Elements;

  /**
   * The wrapper element.
   */
  let wrapper = placeholder;

  /**
   * The previous arrow element.
   */
  let prev = Elements.prev;

  /**
   * The next arrow element.
   */
  let next = Elements.next;

  /**
   * Indicates whether the component creates arrows or retrieved from the DOM.
   */
  let created: boolean;

  /**
   * Holds modifier classes.
   */
  let wrapperClasses: string;

  /**
   * An object with previous and next arrows.
   */
  const arrows: ArrowsComponent[ 'arrows' ] = {};

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    init();
    on(EVENT_UPDATED, remount);
  }

  /**
   * Remounts the component.
   */
  function remount(): void {
    destroy();
    mount();
  }

  /**
   * Initializes the component.
   */
  function init(): void {
    const { arrows: enabled = true } = options;

    if (enabled && !(prev && next)) {
      createArrows();
    }

    if (prev && next) {
      assign(arrows, { prev, next });
      display(wrapper, enabled ? '' : 'none');
      addClass(wrapper, (wrapperClasses = `${ CLASS_ARROWS }--${ options.direction }`));

      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    event.destroy();
    removeClass(wrapper, wrapperClasses);

    if (created) {
      removeNode(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }

  /**
   * Listens to some events.
   */
  function listen(): void {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, 'click', apply(go, '>'));
    bind(prev, 'click', apply(go, '<'));
  }

  /**
   * The wrapper function of Controller#go().
   *
   * @param control - The control pattern.
   */
  function go(control: string): void {
    Controller.go(control);
  }

  /**
   * Create arrows and append them to the slider.
   */
  function createArrows(): void {
    wrapper = placeholder || create('div', classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;

    append(wrapper, prev, next);
    !placeholder && before(track, wrapper);
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
    const arrow = `<button class="${ classes.arrow } ${ prev ? classes.prev : classes.next }" type="button">`
      + `<svg xmlns="${ XML_NAME_SPACE }" viewBox="0 0 ${ SIZE } ${ SIZE }" width="${ SIZE }" height="${ SIZE }">`
      + `<path d="${ options.arrowPath || PATH }" />`;

    return parseHtml<HTMLButtonElement>(arrow);
  }

  /**
   * Updates status of arrows, such as `disabled` and `aria-label`.
   */
  function update(): void {
    if (prev && next) {
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
  }

  return {
    arrows,
    mount,
    destroy,
    update,
  };
};
