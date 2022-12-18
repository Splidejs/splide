import { assign, assert } from '@splidejs/utils';
import { CLASS_LIST, CLASS_ROOT, CLASS_SLIDE, CLASS_TRACK, Options, Splide } from '../../../js';
import { buildHtml, BuildHtmlConfig } from '../html';
import { SLIDER_WIDTH } from '../constants';


interface InitConfig extends BuildHtmlConfig {
  mount?: boolean;
  html?: string;
  insertHtml?: boolean;
}

const DOM_RECT = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => '',
};

/**
 * Creates a new splide instance.
 *
 * @param options - Options for Splide.
 * @param config  - Config for initialization.
 *
 * @return A created Splide instance.
 */
export function init(options: Options = {}, config: InitConfig = {}): Splide {
  const { width = SLIDER_WIDTH, height = 0 } = options;
  const { id, mount = true, html, insertHtml } = config;

  const slideWidth = +width / (options.perPage || 1);
  const slideHeight = +height / (options.perPage || 1);
  const innerHtml = html || buildHtml(config);

  if (insertHtml) {
    if (!document.body.innerHTML) {
      throw new Error('Invalid usage.');
    }

    document.body.insertAdjacentHTML('beforeend', innerHtml);
  } else {
    document.head.innerHTML = '';
    document.body.innerHTML = innerHtml;
  }


  const root = id ? document.getElementById(id) : document.querySelector(`.${ CLASS_ROOT }`);

  assert(root);

  const track = root.querySelector(`.${ CLASS_TRACK }`);
  const list = root.querySelector<HTMLElement>(`.${ CLASS_LIST }`);
  const slides = root.querySelectorAll<HTMLElement>(`.${ CLASS_SLIDE }`);

  assert(track);
  assert(list);

  root.getBoundingClientRect = (): DOMRect => {
    return assign({}, DOM_RECT, { width: +width });
  };

  track.getBoundingClientRect = (): DOMRect => {
    return assign({}, DOM_RECT, { width: +width, right: +width });
  };

  list.getBoundingClientRect = (): DOMRect => {
    return assign({}, DOM_RECT, {
      width: +width,
      ...parseTransform(list),
    });
  };

  setSlidesRect(Array.from(slides), list, slideWidth, slideHeight);

  const splide = new Splide(root as HTMLElement, options);

  if (mount) {
    splide.mount();

    // Can not simulate this method.
    splide.Components.Move.canShift = () => true;
  }

  return splide;
}

/**
 * Forcibly sets dimensions of provided slides.
 *
 * @param slides - An array with slides.
 * @param list   - A List element.
 * @param width  - Width of each slide.
 * @param height - Height of each slide.
 */
export function setSlidesRect(slides: HTMLElement[], list: HTMLElement, width: number, height: number): void {
  slides.forEach((slide, index) => {
    slide.getBoundingClientRect = (): DOMRect => {
      const offsets = parseTransform(list);

      return assign({}, DOM_RECT, {
        width: width,
        height: height,
        left: width * index + offsets.left,
        right: width * index + width + offsets.left,
        top: height * index + offsets.top,
        bottom: height * index + width + offsets.top,
      });
    };
  });
}

/**
 * Converts translate values to position.
 *
 * @param elm - An element to parse.
 *
 * @return An object with left and top offsets.
 */
export function parseTransform(elm: HTMLElement): { left: number, top: number } {
  const position = { left: 0, top: 0 };

  if (elm && elm.style.transform) {
    const { transform } = elm.style;

    if (transform.includes('translateX')) {
      position.left = parseFloat(transform.replace(/translateX\(|\)/g, '')) || 0;
    }

    if (transform.includes('translateY')) {
      position.top = parseFloat(transform.replace(/translateY\(|\)/g, '')) || 0;
    }
  }

  return position;
}

/**
 * Fires any native event manually.
 *
 * @param target        - A target.
 * @param type          - An event type.
 * @param data          - Optional. Additional data.
 * @param eventInitDict - Optional. An EventInit object.
 *
 * @return An event object.
 */
export function fire(
  target: Window | Document | Element,
  type: string,
  data: any = {},
  eventInitDict: EventInit = {},
): Event {
  const e = new Event(type, eventInitDict);

  if (data.timeStamp !== undefined) {
    Object.defineProperty(e, 'timeStamp', { value: data.timeStamp });
    delete data.timeStamp;
  }

  target.dispatchEvent(Object.assign(e, data));
  return e;
}

/**
 * Emulates keydown.
 *
 * @param key    - A key to press.
 * @param target - A target.
 */
export function keydown(key: string, target: Window | Element = window): void {
  fire(target, 'keydown', { key });
}

/**
 * Returns a new Promise resolved after the specified duration.
 *
 * @param duration - Duration to wait.
 *
 * @return A Promise instance.
 */
export function wait(duration = 0): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
