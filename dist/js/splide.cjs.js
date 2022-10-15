/*!
 * Splide.js
 * Version  : 4.1.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const CREATED = 1;
const MOUNTED = 2;
const IDLE = 3;
const MOVING = 4;
const SCROLLING = 5;
const DRAGGING = 6;
const DESTROYED = 7;
const STATES = {
  CREATED,
  MOUNTED,
  IDLE,
  MOVING,
  SCROLLING,
  DRAGGING,
  DESTROYED
};

function empty(array) {
  array.length = 0;
}
function apply(func, ...args) {
  return func.bind(null, ...args);
}
const nextTick = setTimeout;
const noop = () => {
};
function raf(func) {
  return requestAnimationFrame(func);
}
function typeOf(type, subject) {
  return typeof subject === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
const isArray = Array.isArray;
const isFunction = apply(typeOf, "function");
const isString = apply(typeOf, "string");
apply(typeOf, "boolean");
const isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
function includes(array, value) {
  return array.includes(value);
}
function push(array, items) {
  array.push(...toArray(items));
  return array;
}
const arrayProto = Array.prototype;
function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}
function toggleClass(elm, classes, force) {
  if (elm) {
    forEach(isString(classes) ? classes.split(" ") : classes, (className) => {
      className && elm.classList.toggle(className, force);
    });
  }
}
function addClass(elm, classes) {
  toggleClass(elm, classes, true);
}
function append(parent, children2) {
  forEach(children2, parent.appendChild.bind(parent));
}
function before(nodes, ref) {
  forEach(nodes, (node) => {
    const parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
function matches(elm, selector) {
  return isHTMLElement(elm) && elm.matches(selector);
}
function children(parent, selector) {
  const children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter((child2) => matches(child2, selector)) : children2;
}
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
function closest(from, selector) {
  return from.closest(selector);
}
const assign = Object.assign;
const ownKeys = Object.keys;
function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach((key) => {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}
function merge(object, ...sources) {
  sources.forEach((source) => {
    forOwn(source, (value, key) => {
      if (isArray(value)) {
        value = value.slice();
      } else if (isObject(value)) {
        value = merge({}, isObject(object[key]) ? object[key] : {}, value);
      }
      object[key] = value;
    });
  });
  return object;
}
function omit(object, keys) {
  forEach(keys || ownKeys(object), (key) => {
    delete object[key];
  });
  return object;
}
function removeAttribute(elms, attrs) {
  forEach(elms, (elm) => {
    forEach(attrs, (attr) => {
      elm && elm.removeAttribute(attr);
    });
  });
}
function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, (elm) => {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}
function create(tag2, attrs, parent) {
  const elm = document.createElement(tag2);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = `${value}`;
  }
}
function display(elm, display2) {
  style(elm, "display", display2);
}
function focus(elm) {
  isHTMLElement(elm) && elm.focus({ preventScroll: true });
}
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
function hasClass(elm, className) {
  return !!elm && elm.classList.contains(className);
}
function rect(target) {
  return target.getBoundingClientRect();
}
function removeNode(nodes) {
  forEach(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}
function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
function queryAll(parent, selector) {
  return selector && parent ? slice(parent.querySelectorAll(selector)) : [];
}
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
function timeOf(e) {
  return e.timeStamp;
}
function unit(value) {
  return isString(value) ? value : value ? `${value}px` : "";
}
const { min, max, floor, ceil, abs, sign } = Math;
function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}
function between(number, x, y, exclusive) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
function clamp(number, x, y) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function format(string, replacements) {
  forEach(replacements, (replacement) => {
    string = string.replace("%s", `${replacement}`);
  });
  return string;
}
function pad(number, length = 2) {
  return `${number}`.padStart(length, "0");
}
const ids = {};
function uniqueId(prefix) {
  return `${prefix}${pad(ids[prefix] = (ids[prefix] || 0) + 1)}`;
}
function forEachEvent(events, iteratee) {
  forEach(events, (event) => {
    isString(event) && event.split(" ").forEach(iteratee);
  });
}
function arrayRemove(array, predicate) {
  const removed = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      removed.push(...array.splice(i, 1));
    }
  }
  return removed;
}
function EventBinder(removersRef) {
  const removers = removersRef || [];
  const key = removersRef ? {} : void 0;
  function bind(target, events, callback, options) {
    forEachEvent(events, (event) => {
      target.addEventListener(event, callback, options);
      removers.push([target.removeEventListener.bind(target, event, callback, options), key]);
    });
  }
  function destroy() {
    if (key) {
      arrayRemove(removers, (remover) => remover[1] === key).forEach((remover) => {
        remover[0]();
      });
    } else {
      removers.forEach((remover) => {
        remover[0]();
      });
      empty(removers);
    }
  }
  return {
    bind,
    create: apply(EventBinder, removers),
    destroy
  };
}
function EventBus(listenersRef) {
  const listeners = listenersRef || [];
  const key = listenersRef ? {} : void 0;
  function on(events, callback) {
    forEachEvent(events, (event) => {
      listeners.push([event, callback, key]);
    });
  }
  function off(events, callback) {
    forEachEvent(events, (event) => {
      arrayRemove(listeners, (listener) => {
        return listener[0] === event && (!callback || listener[1] === callback) && listener[2] === key;
      });
    });
  }
  function emit(event, ...args) {
    listeners.slice().forEach((listener) => {
      listener[0] === event && listener[1](...args);
    });
  }
  function destroy() {
    if (key) {
      arrayRemove(listeners, (listener) => listener[2] === key);
    } else {
      empty(listeners);
    }
  }
  return {
    on,
    off,
    emit,
    create: apply(EventBus, listeners),
    destroy
  };
}
function EventInterface(binder = EventBinder(), bus = EventBus()) {
  function create2() {
    return EventInterface(binder.create(), bus.create());
  }
  function destroy() {
    binder.destroy();
    bus.destroy();
  }
  return assign({}, binder, bus, { create: create2, destroy });
}
function RequestInterval(interval, onInterval, onUpdate, limit) {
  const { now } = Date;
  let startTime;
  let rate = 0;
  let id;
  let paused = true;
  let count = 0;
  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);
      if (rate >= 1) {
        onInterval();
        startTime = now();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      id = raf(update);
    }
  }
  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused
  };
}
function State(initialState) {
  let state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes(toArray(states), state);
  }
  return { set, is };
}
function Throttle(func, duration) {
  const interval = RequestInterval(duration || 0, func, void 0, 1);
  return () => {
    interval.isPaused() && interval.start();
  };
}

const EVENT_MOUNTED = "mounted";
const EVENT_READY = "ready";
const EVENT_MOVE = "move";
const EVENT_MOVED = "moved";
const EVENT_CLICK = "click";
const EVENT_ACTIVE = "active";
const EVENT_INACTIVE = "inactive";
const EVENT_VISIBLE = "visible";
const EVENT_HIDDEN = "hidden";
const EVENT_REFRESH = "refresh";
const EVENT_UPDATED = "updated";
const EVENT_RESIZE = "resize";
const EVENT_RESIZED = "resized";
const EVENT_DRAG = "drag";
const EVENT_DRAGGING = "dragging";
const EVENT_DRAGGED = "dragged";
const EVENT_SCROLL = "scroll";
const EVENT_SCROLLED = "scrolled";
const EVENT_OVERFLOW = "overflow";
const EVENT_DESTROY = "destroy";
const EVENT_ARROWS_MOUNTED = "arrows:mounted";
const EVENT_ARROWS_UPDATED = "arrows:updated";
const EVENT_PAGINATION_MOUNTED = "pagination:mounted";
const EVENT_PAGINATION_UPDATED = "pagination:updated";
const EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
const EVENT_AUTOPLAY_PLAY = "autoplay:play";
const EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
const EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
const EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
const EVENT_SLIDE_KEYDOWN = "sk";
const EVENT_SHIFTED = "sh";
const EVENT_END_INDEX_CHANGED = "ei";

const NOT_OVERFLOW_KEY = "!overflow";
function Breakpoints(Splide2, Components2, options, event) {
  const { state } = Splide2;
  const breakpoints = options.breakpoints || {};
  const reducedMotion = options.reducedMotion || {};
  const binder = EventBinder();
  const entries = [];
  function setup() {
    const isMin = options.mediaQuery === "min";
    ownKeys(breakpoints).sort((n, m) => isMin ? +n - +m : +m - +n).forEach((key) => {
      if (key !== NOT_OVERFLOW_KEY) {
        register(breakpoints[key], `(${isMin ? "min" : "max"}-width:${key}px)`);
      }
    });
    if (breakpoints[NOT_OVERFLOW_KEY]) {
      entries.push([breakpoints[NOT_OVERFLOW_KEY], () => Components2.Layout && !Components2.Layout.isOverflow()]);
      event.on(EVENT_OVERFLOW, update);
    }
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }
  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }
  function register(options2, query) {
    const queryList = matchMedia(query);
    binder.bind(queryList, "change", update);
    entries.push([options2, () => queryList.matches]);
  }
  function update() {
    const destroyed = state.is(DESTROYED);
    const direction = options.direction;
    const merged = entries.reduce((merged2, entry) => {
      return merge(merged2, entry[1]() ? entry[0] : {});
    }, {});
    omit(options);
    set(merged, false, !state.is(CREATED));
    if (options.destroy) {
      Splide2.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }
  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }
  function set(opts, base, notify) {
    merge(options, opts);
    base && merge(Object.getPrototypeOf(options), opts);
    if (notify) {
      Splide2.emit(EVENT_UPDATED, options);
    }
  }
  return {
    setup,
    destroy,
    reduce,
    set
  };
}

const ARROW = "Arrow";
const ARROW_LEFT = `${ARROW}Left`;
const ARROW_RIGHT = `${ARROW}Right`;
const ARROW_UP = `${ARROW}Up`;
const ARROW_DOWN = `${ARROW}Down`;

const LTR = "ltr";
const RTL = "rtl";
const TTB = "ttb";

const ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};
function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    const index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, (match, offset) => {
      const replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve,
    orient
  };
}

const ROLE = "role";
const TAB_INDEX = "tabindex";
const DISABLED = "disabled";
const ARIA_PREFIX = "aria-";
const ARIA_CONTROLS = `${ARIA_PREFIX}controls`;
const ARIA_CURRENT = `${ARIA_PREFIX}current`;
const ARIA_SELECTED = `${ARIA_PREFIX}selected`;
const ARIA_LABEL = `${ARIA_PREFIX}label`;
const ARIA_LABELLEDBY = `${ARIA_PREFIX}labelledby`;
const ARIA_HIDDEN = `${ARIA_PREFIX}hidden`;
const ARIA_ORIENTATION = `${ARIA_PREFIX}orientation`;
const ARIA_ROLEDESCRIPTION = `${ARIA_PREFIX}roledescription`;
const ARIA_LIVE = `${ARIA_PREFIX}live`;
const ARIA_BUSY = `${ARIA_PREFIX}busy`;
const ARIA_ATOMIC = `${ARIA_PREFIX}atomic`;
const ALL_ATTRIBUTES = [
  ROLE,
  TAB_INDEX,
  DISABLED,
  ARIA_CONTROLS,
  ARIA_CURRENT,
  ARIA_LABEL,
  ARIA_LABELLEDBY,
  ARIA_HIDDEN,
  ARIA_ORIENTATION,
  ARIA_ROLEDESCRIPTION
];

const PROJECT_CODE = "splide";
const DATA_ATTRIBUTE = `data-${PROJECT_CODE}`;

const CLASS_PREFIX = `${PROJECT_CODE}__`;
const STATUS_CLASS_PREFIX = "is-";
const CLASS_ROOT = PROJECT_CODE;
const CLASS_TRACK = `${CLASS_PREFIX}track`;
const CLASS_LIST = `${CLASS_PREFIX}list`;
const CLASS_SLIDE = `${CLASS_PREFIX}slide`;
const CLASS_CLONE = `${CLASS_SLIDE}--clone`;
const CLASS_CONTAINER = `${CLASS_SLIDE}__container`;
const CLASS_ARROWS = `${CLASS_PREFIX}arrows`;
const CLASS_ARROW = `${CLASS_PREFIX}arrow`;
const CLASS_ARROW_PREV = `${CLASS_ARROW}--prev`;
const CLASS_ARROW_NEXT = `${CLASS_ARROW}--next`;
const CLASS_PAGINATION = `${CLASS_PREFIX}pagination`;
const CLASS_PAGINATION_PAGE = `${CLASS_PAGINATION}__page`;
const CLASS_PROGRESS = `${CLASS_PREFIX}progress`;
const CLASS_PROGRESS_BAR = `${CLASS_PROGRESS}__bar`;
const CLASS_TOGGLE = `${CLASS_PREFIX}toggle`;
const CLASS_TOGGLE_PLAY = `${CLASS_TOGGLE}__play`;
const CLASS_TOGGLE_PAUSE = `${CLASS_TOGGLE}__pause`;
const CLASS_SPINNER = `${CLASS_PREFIX}spinner`;
const CLASS_SR = `${CLASS_PREFIX}sr`;
const CLASS_INITIALIZED = `${STATUS_CLASS_PREFIX}initialized`;
const CLASS_ACTIVE = `${STATUS_CLASS_PREFIX}active`;
const CLASS_PREV = `${STATUS_CLASS_PREFIX}prev`;
const CLASS_NEXT = `${STATUS_CLASS_PREFIX}next`;
const CLASS_VISIBLE = `${STATUS_CLASS_PREFIX}visible`;
const CLASS_LOADING = `${STATUS_CLASS_PREFIX}loading`;
const CLASS_FOCUS_IN = `${STATUS_CLASS_PREFIX}focus-in`;
const CLASS_OVERFLOW = `${STATUS_CLASS_PREFIX}overflow`;
const STATUS_CLASSES = [
  CLASS_ACTIVE,
  CLASS_VISIBLE,
  CLASS_PREV,
  CLASS_NEXT,
  CLASS_LOADING,
  CLASS_FOCUS_IN,
  CLASS_OVERFLOW
];
const CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[${PROJECT_CODE}] ${message || ""}`);
  }
}

const FRICTION = 5;
const LOG_INTERVAL = 200;
const POINTER_DOWN_EVENTS = "touchstart mousedown";
const POINTER_MOVE_EVENTS = "touchmove mousemove";
const POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

function Elements(Splide2, Components2, options, event) {
  const { on, bind } = event;
  const { root } = Splide2;
  const { i18n } = options;
  const elements = {};
  const slides = [];
  let rootClasses = [];
  let trackClasses = [];
  let track;
  let list;
  let isUsingKey;
  function setup() {
    collect();
    init();
    update();
  }
  function mount() {
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, setup);
    on(EVENT_UPDATED, update);
    bind(document, `${POINTER_DOWN_EVENTS} keydown`, (e) => {
      isUsingKey = e.type === "keydown";
    }, { capture: true });
    bind(root, "focusin", () => {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }
  function destroy(completely) {
    const attrs = ALL_ATTRIBUTES.concat("style");
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }
  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }
  function collect() {
    track = find(CLASS_TRACK);
    list = child(track, `.${CLASS_LIST}`);
    assert(track && list, "A track/list element is missing.");
    push(slides, children(list, `.${CLASS_SLIDE}:not(.${CLASS_CLONE})`));
    assign(elements, {
      root,
      track,
      list,
      slides,
      arrows: find(CLASS_ARROWS),
      pagination: find(CLASS_PAGINATION),
      prev: find(CLASS_ARROW_PREV),
      next: find(CLASS_ARROW_NEXT),
      bar: find(CLASS_PROGRESS_BAR),
      toggle: find(CLASS_TOGGLE)
    });
  }
  function init() {
    const id = root.id || uniqueId(PROJECT_CODE);
    const role = options.role;
    root.id = id;
    track.id = track.id || `${id}-track`;
    list.id = list.id || `${id}-list`;
    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute(root, ROLE, role);
    }
    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute(list, ROLE, "presentation");
  }
  function find(className) {
    const elm = query(root, `.${className}`);
    return elm && closest(elm, `.${CLASS_ROOT}`) === root ? elm : void 0;
  }
  function getClasses(base) {
    return [
      `${base}--${options.type}`,
      `${base}--${options.direction}`,
      options.drag && `${base}--draggable`,
      options.isNavigation && `${base}--nav`,
      base === CLASS_ROOT && CLASS_ACTIVE
    ];
  }
  return assign(elements, {
    setup,
    mount,
    destroy
  });
}

const SLIDE = "slide";
const LOOP = "loop";
const FADE = "fade";

function Slide$1(Splide2, index, slideIndex, slide) {
  const event = Splide2.event.create();
  const { on, emit, bind } = event;
  const { Components, root, options } = Splide2;
  const { isNavigation, updateOnMove, i18n, pagination, slideFocus } = options;
  const { Elements } = Components;
  const { resolve } = Components.Direction;
  const styles = getAttribute(slide, "style");
  const label = getAttribute(slide, ARIA_LABEL);
  const isClone = slideIndex > -1;
  const container = child(slide, `.${CLASS_CONTAINER}`);
  let destroyed;
  function mount() {
    if (!isClone) {
      slide.id = `${root.id}-slide${pad(index + 1)}`;
      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
    }
    listen();
  }
  function listen() {
    bind(slide, "click", apply(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, "style", styles);
    setAttribute(slide, ARIA_LABEL, label || "");
  }
  function initNavigation() {
    const controls = Splide2.splides.map((target) => {
      const Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls);
    setAttribute(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      const { index: curr } = Splide2;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }
  function updateActivity() {
    const active = isActive();
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility() {
    const visible = isVisible();
    const hidden = !visible && (!isActive() || isClone);
    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || "");
    }
    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
    if (!visible && document.activeElement === slide) {
      const Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }
  function style$1(prop, value, useContainer) {
    style(useContainer && container || slide, prop, value);
  }
  function isActive() {
    const { index: curr } = Splide2;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }
    const trackRect = rect(Elements.track);
    const slideRect = rect(slide);
    const left = resolve("left", true);
    const right = resolve("right", true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }
  function isWithin(from, distance) {
    let diff = abs(from - index);
    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min(diff, Splide2.length - diff);
    }
    return diff <= distance;
  }
  function pos() {
    const first = Components.Slides.get()[0];
    const left = resolve("left");
    return first ? abs(rect(slide)[left] - rect(first.slide)[left]) : 0;
  }
  function size() {
    return rect(slide)[resolve("width")];
  }
  const self = {
    index,
    slideIndex,
    slide,
    container,
    isClone,
    mount,
    destroy,
    update,
    pos,
    size,
    style: style$1,
    isWithin
  };
  return self;
}

function Slides(Splide2, Components2, options, event) {
  const { on, emit, bind } = event;
  const { slides, list } = Components2.Elements;
  const Slides2 = [];
  function mount() {
    init();
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, init);
  }
  function init() {
    slides.forEach((slide, index) => {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1((Slide2) => {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function update() {
    forEach$1((Slide2) => {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    const object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort((Slide1, Slide2) => Slide1.index - Slide2.index);
  }
  function get(excludeClones) {
    return excludeClones ? filter((Slide2) => !Slide2.isClone) : Slides2;
  }
  function getIn(page) {
    const { Controller } = Components2;
    const index = Controller.toIndex(page);
    const max = Controller.hasFocus() ? 1 : options.perPage;
    return filter((Slide2) => between(Slide2.index, index, index + max - 1));
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach(items, (slide) => {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement(slide)) {
        const ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove(matcher) {
    removeNode(filter(matcher).map((Slide2) => Slide2.slide));
    emit(EVENT_REFRESH);
  }
  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(
      isFunction(matcher) ? matcher : (Slide2) => isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index)
    );
  }
  function style(prop, value, useContainer) {
    forEach$1((Slide2) => {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    const images = queryAll(elm, "img");
    let { length } = images;
    if (length) {
      images.forEach((img) => {
        bind(img, "load error", () => {
          if (!--length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount,
    destroy,
    update,
    register,
    get,
    getIn,
    getAt,
    add,
    remove,
    forEach: forEach$1,
    filter,
    style,
    getLength,
    isEnough
  };
}

function Layout(Splide2, Components2, options, event) {
  const { on, bind, emit } = event;
  const { Slides } = Components2;
  const { resolve } = Components2.Direction;
  const { root, track, list } = Components2.Elements;
  const { getAt, style: styleSlides } = Slides;
  let vertical;
  let rootRect;
  let overflow;
  function mount() {
    init();
    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  function init() {
    vertical = options.direction === TTB;
    style(root, "maxWidth", unit(options.width));
    style(track, resolve("paddingLeft"), cssPadding(false));
    style(track, resolve("paddingRight"), cssPadding(true));
    resize(true);
  }
  function resize(force) {
    const newRect = rect(root);
    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }
  function cssPadding(right) {
    const { padding } = options;
    const prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    let height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = `calc(${height} - ${cssPadding(false)} - ${cssPadding(true)})`;
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    const gap = unit(options.gap);
    return `calc((100%${gap && ` + ${gap}`})/${options.perPage || 1}${gap && ` - ${gap}`})`;
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index = 0, withoutGap) {
    const Slide = getAt(index);
    return (Slide ? Slide.size() : 0) + (withoutGap ? 0 : getGap());
  }
  function totalSize(index, withoutGap) {
    const Slide = getAt(index);
    return Slide ? Slide.pos() + Slide.size() + (withoutGap ? 0 : getGap()) : 0;
  }
  function sliderSize(withoutGap) {
    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }
  function getGap() {
    const first = getAt(0);
    const second = getAt(1);
    return first && second ? second.pos() - first.pos() - first.size() : 0;
  }
  function getPadding(right) {
    return parseFloat(style(
      track,
      resolve(`padding${right ? "Right" : "Left"}`)
    )) || 0;
  }
  function isOverflow() {
    return Splide2.is(FADE) || sliderSize(true) > listSize();
  }
  return {
    mount,
    resize,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding,
    isOverflow
  };
}

const MULTIPLIER = 2;
function Clones(Splide2, Components2, options, event) {
  const { on } = event;
  const { Elements, Slides, Layout: { resize } } = Components2;
  const { resolve } = Components2.Direction;
  const clones = [];
  let cloneCount;
  function mount() {
    on(EVENT_REFRESH, remount);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      resize(true);
    }
  }
  function remount() {
    destroy();
    mount();
    resize(true);
  }
  function destroy() {
    removeNode(clones);
    empty(clones);
    event.destroy();
  }
  function observe() {
    const count = computeCloneCount();
    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        !count && Splide2.go(0);
        event.emit(EVENT_REFRESH);
      }
    }
  }
  function generate(count) {
    const slides = Slides.get().slice();
    const { length } = slides;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach((Slide, index) => {
        const isHead = index < count;
        const clone = cloneDeep(Slide.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
        push(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }
  function cloneDeep(elm, index) {
    const clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = `${Splide2.root.id}-clone${pad(index + 1)}`;
    return clone;
  }
  function computeCloneCount() {
    let { clones: clones2 } = options;
    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      const fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      const fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
    }
    return clones2;
  }
  return {
    mount,
    destroy
  };
}

function Move(Splide2, Components2, options, event) {
  const { on, emit } = event;
  const { set } = Splide2.state;
  const { Slides } = Components2;
  const { slideSize, getPadding, listSize, sliderSize, totalSize } = Components2.Layout;
  const { resolve, orient } = Components2.Direction;
  const { list, track } = Components2.Elements;
  let Transition;
  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }
  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }
    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, () => {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      const destination = preventLoop ? position : loop(position);
      style(list, "transform", `translate${resolve("X")}(${destination}px)`);
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide2.is(LOOP)) {
      const index = toIndex(position);
      const exceededMax = index > Components2.Controller.getEnd();
      const exceededMin = index < 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    const excess = position - getLimit(backwards);
    const size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }
  function toIndex(position) {
    const slides = Slides.get();
    let index = 0;
    let minDistance = Infinity;
    for (let i = 0; i < slides.length; i++) {
      const slideIndex = slides[i].index;
      const distance = abs(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    const position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    const left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }
    return position;
  }
  function offset(index) {
    const { focus } = options;
    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
  }
  function getLimit(max) {
    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function canShift(backwards) {
    const padding = getPadding(false);
    const shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= padding : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")] + padding;
  }
  function exceededLimit(max, position = getPosition()) {
    const exceededMin = max !== true && orient(position) < orient(getLimit(false));
    const exceededMax = max !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    exceededLimit,
    reposition
  };
}

function Controller(Splide2, Components2, options, event) {
  const { on, emit } = event;
  const { Move } = Components2;
  const { getPosition, getLimit, toPosition } = Move;
  const { isEnough, getLength } = Components2.Slides;
  const { omitEnd } = options;
  const isLoop = Splide2.is(LOOP);
  const isSlide = Splide2.is(SLIDE);
  const getNext = apply(getAdjacent, false);
  const getPrev = apply(getAdjacent, true);
  let currIndex = options.start || 0;
  let endIndex;
  let prevIndex = currIndex;
  let slideCount;
  let perMove;
  let perPage;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on(EVENT_RESIZED, onResized);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    const end = omitEnd ? endIndex : slideCount - 1;
    const index = clamp(currIndex, 0, end);
    prevIndex = index;
    if (index !== currIndex) {
      currIndex = index;
      Move.reposition();
    }
  }
  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }
  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      const dest = parse(control);
      const index = loop(dest);
      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move.move(dest, index, prevIndex, callback);
      }
    }
  }
  function jump(control) {
    const { set } = Components2.Breakpoints;
    const { speed } = options;
    set({ speed: 0 });
    go(control);
    set({ speed });
  }
  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, () => {
      const index = loop(Move.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }
  function parse(control) {
    let index = currIndex;
    if (isString(control)) {
      const [, indicator, number] = control.match(/([+\-<>])(\d+)?/) || [];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +`${indicator}${+number || 1}`, currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }
    return index;
  }
  function getAdjacent(prev, destination) {
    const number = perMove || (hasFocus() ? 1 : perPage);
    const dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      const index = computeMovableDestIndex(dest);
      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }
      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      const position = getPosition();
      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }
    return dest;
  }
  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }
  function getEnd() {
    let end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }
    return clamp(end, 0, slideCount - 1);
  }
  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }
  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }
  function toDest(destination) {
    const closest = Move.toIndex(destination);
    return isSlide ? clamp(closest, 0, endIndex) : closest;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }
  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }
  return {
    mount,
    go,
    jump,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
    isBusy
  };
}

const XML_NAME_SPACE = "http://www.w3.org/2000/svg";
const PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
const SIZE = 40;

function Arrows(Splide2, Components2, options, event) {
  const { on, bind, emit } = event;
  const { classes, i18n } = options;
  const { Elements, Controller } = Components2;
  const { arrows: placeholder, track } = Elements;
  let wrapper = placeholder;
  let prev = Elements.prev;
  let next = Elements.next;
  let created;
  let wrapperClasses;
  const arrows = {};
  function mount() {
    init();
    on(EVENT_UPDATED, remount);
  }
  function remount() {
    destroy();
    mount();
  }
  function init() {
    const enabled = options.arrows;
    if (enabled && !(prev && next)) {
      createArrows();
    }
    if (prev && next) {
      assign(arrows, { prev, next });
      display(wrapper, enabled ? "" : "none");
      addClass(wrapper, wrapperClasses = `${CLASS_ARROWS}--${options.direction}`);
      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }
  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);
    if (created) {
      removeNode(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }
  function listen() {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, "click", apply(go, ">"));
    bind(prev, "click", apply(go, "<"));
  }
  function go(control) {
    Controller.go(control, true);
  }
  function createArrows() {
    wrapper = placeholder || create("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }
  function createArrow(prev2) {
    const arrow = `<button class="${classes.arrow} ${prev2 ? classes.prev : classes.next}" type="button"><svg xmlns="${XML_NAME_SPACE}" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}"><path d="${options.arrowPath || PATH}" />`;
    return parseHtml(arrow);
  }
  function update() {
    if (prev && next) {
      const index = Splide2.index;
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
    update
  };
}

const INTERVAL_DATA_ATTRIBUTE = `${DATA_ATTRIBUTE}-interval`;

function Autoplay(Splide2, Components2, options, event) {
  const { on, bind, emit } = event;
  const interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
  const { isPaused } = interval;
  const { Elements, Elements: { root, toggle } } = Components2;
  const { autoplay } = options;
  let hovered;
  let focused;
  let stopped = autoplay === "pause";
  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
      stopped || play();
      update();
    }
  }
  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", (e) => {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", (e) => {
        focused = e.type === "focusin";
        autoToggle();
      });
    }
    if (toggle) {
      bind(toggle, "click", () => {
        stopped ? play() : pause(true);
      });
    }
    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE, onMove);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(stop = true) {
    stopped = !!stop;
    update();
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }
  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }
  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }
  function onAnimationFrame(rate) {
    const { bar } = Elements;
    bar && style(bar, "width", `${rate * 100}%`);
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function onMove(index) {
    const Slide = Components2.Slides.getAt(index);
    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused
  };
}

const BOUNCE_DIFF_THRESHOLD = 10;
const BOUNCE_DURATION = 600;
const FRICTION_FACTOR = 0.6;
const BASE_VELOCITY = 1.5;
const MIN_DURATION = 800;

function Scroll(Splide2, Components2, options, event) {
  const { on, emit } = event;
  const { state: { set } } = Splide2;
  const { Move } = Components2;
  const { getPosition, getLimit, exceededLimit, translate } = Move;
  const isSlide = Splide2.is(SLIDE);
  let interval;
  let callback;
  let friction = 1;
  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    const from = getPosition();
    clear();
    if (snap && (!isSlide || !exceededLimit())) {
      const size = Components2.Layout.sliderSize();
      const offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }
    const immediately = approximatelyEqual(from, destination, 1) || duration === 0;
    friction = 1;
    duration = immediately ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }
  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }
  function update(from, to, noConstrain, rate) {
    const position = getPosition();
    const target = from + (to - from) * easing(rate);
    const diff = (target - position) * friction;
    translate(position + diff);
    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;
      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }
  function easing(t) {
    const { easingFunc } = options;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }
  return {
    mount,
    destroy: clear,
    scroll,
    cancel
  };
}

const SCROLL_LISTENER_OPTIONS = { passive: false, capture: true };

function Drag(Splide2, Components2, options, event) {
  const { on, emit, bind } = event;
  const binder = event.create();
  const { state } = Splide2;
  const { Move, Scroll, Controller, Elements: { track }, Breakpoints: { reduce } } = Components2;
  const { resolve, orient } = Components2.Direction;
  const { getPosition, exceededLimit } = Move;
  let basePosition;
  let baseEvent;
  let prevBaseEvent;
  let isFree;
  let dragging;
  let exceeded = false;
  let clickPrevented;
  let disabled;
  let target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, { capture: true });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED], init);
  }
  function init() {
    const { drag } = options;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e) {
    clickPrevented = false;
    if (!disabled) {
      const isTouch = isTouchEvent(e);
      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          binder.bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          binder.bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move.cancel();
          Scroll.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }
  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }
    if (e.cancelable) {
      if (dragging) {
        Move.translate(basePosition + constrain(diffCoord(e)));
        const expired = diffTime(e) > LOG_INTERVAL;
        const hasExceeded = exceeded !== (exceeded = exceededLimit());
        if (expired || hasExceeded) {
          save(e);
        }
        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }
  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }
    if (dragging) {
      move(e);
      prevent(e);
    }
    binder.destroy();
    dragging = false;
  }
  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }
  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }
  function move(e) {
    const velocity = computeVelocity(e);
    const destination = computeDestination(velocity);
    const rewind = options.rewind && options.rewindByDrag;
    reduce(false);
    if (isFree) {
      Controller.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller.go(Controller.toDest(destination), true);
    }
    reduce(true);
  }
  function shouldStart(e) {
    const { dragMinThreshold: thresholds } = options;
    const isObj = isObject(thresholds);
    const mouse = isObj && thresholds.mouse || 0;
    const touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }
  function isSliderDirection(e) {
    return abs(diffCoord(e)) > abs(diffCoord(e, true));
  }
  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !exceeded) {
      const time = diffTime(e);
      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(
      abs(velocity) * (options.flickPower || 600),
      isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1)
    );
  }
  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }
  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }
  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }
  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)[`page${resolve(orthogonal ? "Y" : "X")}`];
  }
  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }
  function isDraggable(target2) {
    const { noDrag } = options;
    return !matches(target2, `.${CLASS_PAGINATION_PAGE}, .${CLASS_ARROW}`) && (!noDrag || !matches(target2, noDrag));
  }
  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount,
    disable,
    isDragging
  };
}

const KEYBOARD_EVENT = "keydown";
function Keyboard(Splide2, Components2, options, event) {
  const { on, bind, destroy } = event;
  const { root } = Splide2;
  const { resolve } = Components2.Direction;
  let target;
  let disabled;
  function mount() {
    init();
    on(EVENT_UPDATED, destroy);
    on(EVENT_UPDATED, init);
    on(EVENT_MOVE, onMove);
  }
  function init() {
    const { keyboard } = options;
    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    const _disabled = disabled;
    disabled = true;
    nextTick(() => {
      disabled = _disabled;
    });
  }
  function onKeydown(e) {
    if (!disabled) {
      if (e.key === resolve(ARROW_LEFT)) {
        Splide2.go("<");
      } else if (e.key === resolve(ARROW_RIGHT)) {
        Splide2.go(">");
      }
    }
  }
  return {
    mount,
    destroy,
    disable
  };
}

const SRC_DATA_ATTRIBUTE = `${DATA_ATTRIBUTE}-lazy`;
const SRCSET_DATA_ATTRIBUTE = `${SRC_DATA_ATTRIBUTE}-srcset`;
const IMAGE_SELECTOR = `[${SRC_DATA_ATTRIBUTE}], [${SRCSET_DATA_ATTRIBUTE}]`;

function LazyLoad(Splide2, Components2, options, event) {
  const { on, off, bind, emit } = event;
  const isSequential = options.lazyLoad === "sequential";
  const events = [EVENT_MOVED, EVENT_SCROLLED];
  let entries = [];
  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, init);
    }
  }
  function init() {
    empty(entries);
    register();
    if (isSequential) {
      loadNext();
    } else {
      off(events);
      on(events, check);
      check();
    }
  }
  function register() {
    Components2.Slides.forEach((Slide) => {
      queryAll(Slide.slide, IMAGE_SELECTOR).forEach((img) => {
        const src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        const srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
        if (src !== img.src || srcset !== img.srcset) {
          const className = options.classes.spinner;
          const parent = img.parentElement;
          const spinner = child(parent, `.${className}`) || create("span", className, parent);
          entries.push([img, Slide, spinner]);
          img.src || display(img, "none");
        }
      });
    });
  }
  function check() {
    entries = entries.filter((data) => {
      const distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }
  function load(data) {
    const [img] = data;
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply(onLoad, data));
    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }
  function onLoad(data, e) {
    const [img, Slide] = data;
    removeClass(Slide.slide, CLASS_LOADING);
    if (e.type !== "error") {
      removeNode(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
      emit(EVENT_RESIZE);
    }
    isSequential && loadNext();
  }
  function loadNext() {
    entries.length && load(entries.shift());
  }
  return {
    mount,
    destroy: apply(empty, entries),
    check
  };
}

function Pagination(Splide2, Components2, options, event) {
  const { on, emit, bind } = event;
  const { Slides, Elements, Controller } = Components2;
  const { hasFocus, getIndex, go } = Controller;
  const { resolve } = Components2.Direction;
  const { pagination: placeholder } = Elements;
  const items = [];
  let list;
  let paginationClasses;
  function mount() {
    destroy();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    const enabled = options.pagination;
    placeholder && display(placeholder, enabled ? "" : "none");
    if (enabled) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, { list, items }, getAt(Splide2.index));
    }
  }
  function destroy() {
    if (list) {
      removeNode(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }
    event.destroy();
  }
  function createPagination() {
    const { length } = Splide2;
    const { classes, i18n, perPage } = options;
    const max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
    addClass(list, paginationClasses = `${CLASS_PAGINATION}--${getDirection()}`);
    setAttribute(list, ROLE, "tablist");
    setAttribute(list, ARIA_LABEL, i18n.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
    for (let i = 0; i < max; i++) {
      const li = create("li", null, list);
      const button = create("button", { class: classes.page, type: "button" }, li);
      const controls = Slides.getIn(i).map((Slide) => Slide.slide.id);
      const text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", apply(onClick, i));
      if (options.paginationKeyboard) {
        bind(button, "keydown", apply(onKeydown, i));
      }
      setAttribute(li, ROLE, "presentation");
      setAttribute(button, ROLE, "tab");
      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({ li, button, page: i });
    }
  }
  function onClick(page) {
    go(`>${page}`, true);
  }
  function onKeydown(page, e) {
    const { length } = items;
    const { key } = e;
    const dir = getDirection();
    let nextPage = -1;
    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }
    const item = items[nextPage];
    if (item) {
      focus(item.button);
      go(`>${nextPage}`);
      prevent(e, true);
    }
  }
  function getDirection() {
    return options.paginationDirection || options.direction;
  }
  function getAt(index) {
    return items[Controller.toPage(index)];
  }
  function update() {
    const prev = getAt(getIndex(true));
    const curr = getAt(getIndex());
    if (prev) {
      const { button } = prev;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }
    if (curr) {
      const { button } = curr;
      addClass(button, CLASS_ACTIVE);
      setAttribute(button, ARIA_SELECTED, true);
      setAttribute(button, TAB_INDEX, "");
    }
    emit(EVENT_PAGINATION_UPDATED, { list, items }, prev, curr);
  }
  return {
    items,
    mount,
    destroy,
    getAt,
    update
  };
}

const TRIGGER_KEYS = [" ", "Enter"];
function Sync(Splide2, Components2, options, event) {
  const { isNavigation, slideFocus } = options;
  const events = [];
  function mount() {
    Splide2.splides.forEach((target) => {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });
    if (isNavigation) {
      navigate();
    }
  }
  function destroy() {
    events.forEach((event2) => {
      event2.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide, target) {
    const event2 = splide.event.create();
    event2.on(EVENT_MOVE, (index, prev, dest) => {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event2);
  }
  function navigate() {
    const ev = event.create();
    const { on } = ev;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(ev);
    ev.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }
  function update() {
    setAttribute(
      Components2.Elements.list,
      ARIA_ORIENTATION,
      options.direction === TTB ? "vertical" : ""
    );
  }
  function onClick(Slide) {
    Splide2.go(Slide.index);
  }
  function onKeydown(Slide, e) {
    if (includes(TRIGGER_KEYS, e.key)) {
      onClick(Slide);
      prevent(e);
    }
  }
  return {
    setup: apply(
      Components2.Breakpoints.set,
      { slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus },
      true
    ),
    mount,
    destroy,
    remount
  };
}

function Wheel(Splide2, Components2, options, event) {
  let lastTime = 0;
  function mount() {
    if (options.wheel) {
      event.bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e) {
    if (e.cancelable) {
      const { deltaY } = e;
      const backwards = deltaY < 0;
      const timeStamp = timeOf(e);
      const min = options.wheelMinThreshold || 0;
      const sleep = options.wheelSleep || 0;
      if (abs(deltaY) > min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }
      shouldPrevent(backwards) && prevent(e);
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount
  };
}

const VISUALLY_HIDDEN = `border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px`;

const SR_REMOVAL_DELAY = 90;
function Live(Splide2, Components2, options, event) {
  const { on } = event;
  const { track } = Components2.Elements;
  const enabled = options.live && !options.isNavigation;
  const sr = create("span", CLASS_SR);
  const interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = "\u2026";
      sr.style.cssText = VISUALLY_HIDDEN;
      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }
  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);
    if (active) {
      append(track, sr);
      interval.start();
    } else {
      removeNode(sr);
      interval.cancel();
    }
  }
  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    removeNode(sr);
  }
  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }
  return {
    mount,
    disable,
    destroy
  };
}

const COMPONENTS = {
  Breakpoints,
  Direction,
  Elements,
  Slides,
  Layout,
  Clones,
  Move,
  Controller,
  Arrows,
  Autoplay,
  Scroll,
  Drag,
  Keyboard,
  LazyLoad,
  Pagination,
  Sync,
  Wheel,
  Live
};

const I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};

const DEFAULTS = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};

function Fade(Splide2, Components2, options, event) {
  const { Slides } = Components2;
  function mount() {
    event.on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }
  function init() {
    Slides.forEach((Slide) => {
      Slide.style("transform", `translateX(-${100 * Slide.index}%)`);
    });
  }
  function start(index, done) {
    Slides.style("transition", `opacity ${options.speed}ms ${options.easing}`);
    nextTick(done);
  }
  return {
    mount,
    start,
    cancel: noop
  };
}

function Slide(Splide2, Components2, options, event) {
  const { Move, Controller, Scroll } = Components2;
  const { list } = Components2.Elements;
  const transition = apply(style, list, "transition");
  let endCallback;
  function mount() {
    event.bind(list, "transitionend", (e) => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    const destination = Move.toPosition(index, true);
    const position = Move.getPosition();
    const speed = getSpeed(index);
    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll.scroll(destination, speed, false, done);
      } else {
        transition(`transform ${speed}ms ${options.easing}`);
        Move.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move.jump(index);
      done();
    }
  }
  function cancel() {
    transition("");
    Scroll.cancel();
  }
  function getSpeed(index) {
    const { rewindSpeed } = options;
    if (Splide2.is(SLIDE) && rewindSpeed) {
      const prev = Controller.getIndex(true);
      const end = Controller.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  return {
    mount,
    start,
    cancel
  };
}

class Splide {
  static defaults = {};
  static STATES = STATES;
  root;
  event = EventInterface();
  Components = {};
  state = State(CREATED);
  splides = [];
  _o = {};
  _C;
  _E = {};
  _T;
  constructor(target, options = {}) {
    const root = isString(target) ? query(document, target) : target;
    assert(root, `${root} is invalid.`);
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS, Splide.defaults, options);
    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, "Invalid JSON");
    }
    this._o = Object.create(merge({}, options));
  }
  mount(Extensions = this._E, Transition = this._T) {
    const { state, Components: Components2 } = this;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions;
    const Constructors = assign({}, COMPONENTS, this._E, { Transition: this._T });
    forOwn(Constructors, (Component, key) => {
      const component = Component(this, Components2, this._o, this.event.create());
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, (component) => {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  }
  sync(splide) {
    this.splides.push({ splide });
    splide.splides.push({ splide: this, isParent: true });
    if (this.state.is(IDLE)) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  }
  go(control) {
    this._C.Controller.go(control);
    return this;
  }
  jump(control) {
    this._C.Controller.jump(control);
    return this;
  }
  on(events, callback) {
    this.event.on(events, callback);
    return this;
  }
  off(events, callback) {
    this.event.off(events, callback);
    return this;
  }
  emit(event, ...args) {
    this.event.emit(event, ...args);
    return this;
  }
  add(slides, index) {
    this._C.Slides.add(slides, index);
    return this;
  }
  remove(matcher) {
    this._C.Slides.remove(matcher);
    return this;
  }
  is(type) {
    return this._o.type === type;
  }
  refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  }
  destroy(completely = true) {
    const { event, state } = this;
    if (state.is(CREATED)) {
      this.on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, (component) => {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  }
  get options() {
    return this._o;
  }
  set options(options) {
    this._C.Breakpoints.set(options, true, true);
  }
  get length() {
    return this._C.Slides.getLength(true);
  }
  get index() {
    return this._C.Controller.getIndex();
  }
}

const CLASS_RENDERED = "is-rendered";

const RENDERER_DEFAULT_CONFIG = {
  listTag: "ul",
  slideTag: "li"
};

class Style {
  styles = {};
  id;
  options;
  constructor(id, options) {
    this.id = id;
    this.options = options;
  }
  rule(selector, prop, value, breakpoint) {
    breakpoint = breakpoint || "default";
    const selectors = this.styles[breakpoint] = this.styles[breakpoint] || {};
    const styles = selectors[selector] = selectors[selector] || {};
    styles[prop] = value;
  }
  build() {
    let css = "";
    if (this.styles.default) {
      css += this.buildSelectors(this.styles.default);
    }
    Object.keys(this.styles).sort((n, m) => this.options.mediaQuery === "min" ? +n - +m : +m - +n).forEach((breakpoint) => {
      if (breakpoint !== "default") {
        css += `@media screen and (max-width: ${breakpoint}px) {`;
        css += this.buildSelectors(this.styles[breakpoint]);
        css += `}`;
      }
    });
    return css;
  }
  buildSelectors(selectors) {
    let css = "";
    forOwn(selectors, (styles, selector) => {
      css += `${`#${this.id} ${selector}`.trim()} {`;
      forOwn(styles, (value, prop) => {
        if (value || value === 0) {
          css += `${prop}: ${value};`;
        }
      });
      css += "}";
    });
    return css;
  }
}

class SplideRenderer {
  static clean(splide) {
    const { on } = splide.event;
    const { root } = splide;
    const clones = queryAll(root, `.${CLASS_CLONE}`);
    on(EVENT_MOUNTED, () => {
      removeNode(child(root, "style"));
    });
    removeNode(clones);
  }
  contents;
  slides = [];
  Direction;
  Style;
  options = {};
  config;
  id;
  breakpoints = [];
  constructor(contents, options, config, defaults) {
    merge(DEFAULTS, defaults || {});
    merge(merge(this.options, DEFAULTS), options || {});
    this.contents = contents;
    this.config = assign({}, RENDERER_DEFAULT_CONFIG, config || {});
    this.id = this.config.id || uniqueId("splide");
    this.Style = new Style(this.id, this.options);
    this.Direction = Direction(null, null, this.options);
    assert(this.contents.length, "Provide at least 1 content.");
    this.init();
  }
  init() {
    this.parseBreakpoints();
    this.initSlides();
    this.registerRootStyles();
    this.registerTrackStyles();
    this.registerSlideStyles();
    this.registerListStyles();
  }
  initSlides() {
    push(this.slides, this.contents.map((content, index) => {
      content = isString(content) ? { html: content } : content;
      content.styles = content.styles || {};
      content.attrs = content.attrs || {};
      this.cover(content);
      const classes = `${this.options.classes.slide} ${index === 0 ? CLASS_ACTIVE : ""}`;
      assign(content.attrs, {
        class: `${classes} ${content.attrs.class || ""}`.trim(),
        style: this.buildStyles(content.styles)
      });
      return content;
    }));
    if (this.isLoop()) {
      this.generateClones(this.slides);
    }
  }
  registerRootStyles() {
    this.breakpoints.forEach(([width, options]) => {
      this.Style.rule(" ", "max-width", unit(options.width), width);
    });
  }
  registerTrackStyles() {
    const { Style: Style2 } = this;
    const selector = `.${CLASS_TRACK}`;
    this.breakpoints.forEach(([width, options]) => {
      Style2.rule(selector, this.resolve("paddingLeft"), this.cssPadding(options, false), width);
      Style2.rule(selector, this.resolve("paddingRight"), this.cssPadding(options, true), width);
      Style2.rule(selector, "height", this.cssTrackHeight(options), width);
    });
  }
  registerListStyles() {
    const { Style: Style2 } = this;
    const selector = `.${CLASS_LIST}`;
    this.breakpoints.forEach(([width, options]) => {
      Style2.rule(selector, "transform", this.buildTranslate(options), width);
      if (!this.cssSlideHeight(options)) {
        Style2.rule(selector, "aspect-ratio", this.cssAspectRatio(options), width);
      }
    });
  }
  registerSlideStyles() {
    const { Style: Style2 } = this;
    const selector = `.${CLASS_SLIDE}`;
    this.breakpoints.forEach(([width, options]) => {
      Style2.rule(selector, "width", this.cssSlideWidth(options), width);
      Style2.rule(selector, "height", this.cssSlideHeight(options) || "100%", width);
      Style2.rule(selector, this.resolve("marginRight"), unit(options.gap) || "0px", width);
      Style2.rule(`${selector} > img`, "display", options.cover ? "none" : "inline", width);
    });
  }
  buildTranslate(options) {
    const { resolve, orient } = this.Direction;
    const values = [];
    values.push(this.cssOffsetClones(options));
    values.push(this.cssOffsetGaps(options));
    if (this.isCenter(options)) {
      values.push(this.buildCssValue(orient(-50), "%"));
      values.push(...this.cssOffsetCenter(options));
    }
    return values.filter(Boolean).map((value) => `translate${resolve("X")}(${value})`).join(" ");
  }
  cssOffsetClones(options) {
    const { resolve, orient } = this.Direction;
    const cloneCount = this.getCloneCount();
    if (this.isFixedWidth(options)) {
      const { value, unit: unit2 } = this.parseCssValue(options[resolve("fixedWidth")]);
      return this.buildCssValue(orient(value) * cloneCount, unit2);
    }
    const percent = 100 * cloneCount / options.perPage;
    return `${orient(percent)}%`;
  }
  cssOffsetCenter(options) {
    const { resolve, orient } = this.Direction;
    if (this.isFixedWidth(options)) {
      const { value, unit: unit2 } = this.parseCssValue(options[resolve("fixedWidth")]);
      return [this.buildCssValue(orient(value / 2), unit2)];
    }
    const values = [];
    const { perPage, gap } = options;
    values.push(`${orient(50 / perPage)}%`);
    if (gap) {
      const { value, unit: unit2 } = this.parseCssValue(gap);
      const gapOffset = (value / perPage - value) / 2;
      values.push(this.buildCssValue(orient(gapOffset), unit2));
    }
    return values;
  }
  cssOffsetGaps(options) {
    const cloneCount = this.getCloneCount();
    if (cloneCount && options.gap) {
      const { orient } = this.Direction;
      const { value, unit: unit2 } = this.parseCssValue(options.gap);
      if (this.isFixedWidth(options)) {
        return this.buildCssValue(orient(value * cloneCount), unit2);
      }
      const { perPage } = options;
      const gaps = cloneCount / perPage;
      return this.buildCssValue(orient(gaps * value), unit2);
    }
    return "";
  }
  resolve(prop) {
    return camelToKebab(this.Direction.resolve(prop));
  }
  cssPadding(options, right) {
    const { padding } = options;
    const prop = this.Direction.resolve(right ? "right" : "left", true);
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  cssTrackHeight(options) {
    let height = "";
    if (this.isVertical()) {
      height = this.cssHeight(options);
      assert(height, '"height" is missing.');
      height = `calc(${height} - ${this.cssPadding(options, false)} - ${this.cssPadding(options, true)})`;
    }
    return height;
  }
  cssHeight(options) {
    return unit(options.height);
  }
  cssSlideWidth(options) {
    return options.autoWidth ? "" : unit(options.fixedWidth) || (this.isVertical() ? "" : this.cssSlideSize(options));
  }
  cssSlideHeight(options) {
    return unit(options.fixedHeight) || (this.isVertical() ? options.autoHeight ? "" : this.cssSlideSize(options) : this.cssHeight(options));
  }
  cssSlideSize(options) {
    const gap = unit(options.gap);
    return `calc((100%${gap && ` + ${gap}`})/${options.perPage || 1}${gap && ` - ${gap}`})`;
  }
  cssAspectRatio(options) {
    const { heightRatio } = options;
    return heightRatio ? `${1 / heightRatio}` : "";
  }
  buildCssValue(value, unit2) {
    return `${value}${unit2}`;
  }
  parseCssValue(value) {
    if (isString(value)) {
      const number = parseFloat(value) || 0;
      const unit2 = value.replace(/\d*(\.\d*)?/, "") || "px";
      return { value: number, unit: unit2 };
    }
    return { value, unit: "px" };
  }
  parseBreakpoints() {
    const { breakpoints } = this.options;
    this.breakpoints.push(["default", this.options]);
    if (breakpoints) {
      forOwn(breakpoints, (options, width) => {
        this.breakpoints.push([width, merge(merge({}, this.options), options)]);
      });
    }
  }
  isFixedWidth(options) {
    return !!options[this.Direction.resolve("fixedWidth")];
  }
  isLoop() {
    return this.options.type === LOOP;
  }
  isCenter(options) {
    if (options.focus === "center") {
      if (this.isLoop()) {
        return true;
      }
      if (this.options.type === SLIDE) {
        return !this.options.trimSpace;
      }
    }
    return false;
  }
  isVertical() {
    return this.options.direction === TTB;
  }
  buildClasses() {
    const { options } = this;
    return [
      CLASS_ROOT,
      `${CLASS_ROOT}--${options.type}`,
      `${CLASS_ROOT}--${options.direction}`,
      options.drag && `${CLASS_ROOT}--draggable`,
      options.isNavigation && `${CLASS_ROOT}--nav`,
      CLASS_ACTIVE,
      !this.config.hidden && CLASS_RENDERED
    ].filter(Boolean).join(" ");
  }
  buildAttrs(attrs) {
    let attr = "";
    forOwn(attrs, (value, key) => {
      attr += value ? ` ${camelToKebab(key)}="${value}"` : "";
    });
    return attr.trim();
  }
  buildStyles(styles) {
    let style = "";
    forOwn(styles, (value, key) => {
      style += ` ${camelToKebab(key)}:${value};`;
    });
    return style.trim();
  }
  renderSlides() {
    const { slideTag: tag } = this.config;
    return this.slides.map((content) => {
      return `<${tag} ${this.buildAttrs(content.attrs)}>${content.html || ""}</${tag}>`;
    }).join("");
  }
  cover(content) {
    const { styles, html = "" } = content;
    if (this.options.cover && !this.options.lazyLoad) {
      const src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);
      if (src && src[2]) {
        styles.background = `center/cover no-repeat url('${src[2]}')`;
      }
    }
  }
  generateClones(contents) {
    const { classes } = this.options;
    const count = this.getCloneCount();
    const slides = contents.slice();
    while (slides.length < count) {
      push(slides, slides);
    }
    push(slides.slice(-count).reverse(), slides.slice(0, count)).forEach((content, index) => {
      const attrs = assign({}, content.attrs, { class: `${content.attrs.class} ${classes.clone}` });
      const clone = assign({}, content, { attrs });
      index < count ? contents.unshift(clone) : contents.push(clone);
    });
  }
  getCloneCount() {
    if (this.isLoop()) {
      const { options } = this;
      if (options.clones) {
        return options.clones;
      }
      const perPage = max(...this.breakpoints.map(([, options2]) => options2.perPage));
      return perPage * ((options.flickMaxPages || 1) + 1);
    }
    return 0;
  }
  renderArrows() {
    let html = "";
    html += `<div class="${this.options.classes.arrows}">`;
    html += this.renderArrow(true);
    html += this.renderArrow(false);
    html += `</div>`;
    return html;
  }
  renderArrow(prev) {
    const { classes, i18n } = this.options;
    const attrs = {
      class: `${classes.arrow} ${prev ? classes.prev : classes.next}`,
      type: "button",
      ariaLabel: prev ? i18n.prev : i18n.next
    };
    return `<button ${this.buildAttrs(attrs)}><svg xmlns="${XML_NAME_SPACE}" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}"><path d="${this.options.arrowPath || PATH}" /></svg></button>`;
  }
  html() {
    const { rootClass, listTag, arrows, beforeTrack, afterTrack, slider, beforeSlider, afterSlider } = this.config;
    let html = "";
    html += `<div id="${this.id}" class="${this.buildClasses()} ${rootClass || ""}">`;
    html += `<style>${this.Style.build()}</style>`;
    if (slider) {
      html += beforeSlider || "";
      html += `<div class="splide__slider">`;
    }
    html += beforeTrack || "";
    if (arrows) {
      html += this.renderArrows();
    }
    html += `<div class="splide__track">`;
    html += `<${listTag} class="splide__list">`;
    html += this.renderSlides();
    html += `</${listTag}>`;
    html += `</div>`;
    html += afterTrack || "";
    if (slider) {
      html += `</div>`;
      html += afterSlider || "";
    }
    html += `</div>`;
    return html;
  }
}

exports.CLASSES = CLASSES;
exports.CLASS_ACTIVE = CLASS_ACTIVE;
exports.CLASS_ARROW = CLASS_ARROW;
exports.CLASS_ARROWS = CLASS_ARROWS;
exports.CLASS_ARROW_NEXT = CLASS_ARROW_NEXT;
exports.CLASS_ARROW_PREV = CLASS_ARROW_PREV;
exports.CLASS_CLONE = CLASS_CLONE;
exports.CLASS_CONTAINER = CLASS_CONTAINER;
exports.CLASS_FOCUS_IN = CLASS_FOCUS_IN;
exports.CLASS_INITIALIZED = CLASS_INITIALIZED;
exports.CLASS_LIST = CLASS_LIST;
exports.CLASS_LOADING = CLASS_LOADING;
exports.CLASS_NEXT = CLASS_NEXT;
exports.CLASS_OVERFLOW = CLASS_OVERFLOW;
exports.CLASS_PAGINATION = CLASS_PAGINATION;
exports.CLASS_PAGINATION_PAGE = CLASS_PAGINATION_PAGE;
exports.CLASS_PREV = CLASS_PREV;
exports.CLASS_PROGRESS = CLASS_PROGRESS;
exports.CLASS_PROGRESS_BAR = CLASS_PROGRESS_BAR;
exports.CLASS_ROOT = CLASS_ROOT;
exports.CLASS_SLIDE = CLASS_SLIDE;
exports.CLASS_SPINNER = CLASS_SPINNER;
exports.CLASS_SR = CLASS_SR;
exports.CLASS_TOGGLE = CLASS_TOGGLE;
exports.CLASS_TOGGLE_PAUSE = CLASS_TOGGLE_PAUSE;
exports.CLASS_TOGGLE_PLAY = CLASS_TOGGLE_PLAY;
exports.CLASS_TRACK = CLASS_TRACK;
exports.CLASS_VISIBLE = CLASS_VISIBLE;
exports.DEFAULTS = DEFAULTS;
exports.EVENT_ACTIVE = EVENT_ACTIVE;
exports.EVENT_ARROWS_MOUNTED = EVENT_ARROWS_MOUNTED;
exports.EVENT_ARROWS_UPDATED = EVENT_ARROWS_UPDATED;
exports.EVENT_AUTOPLAY_PAUSE = EVENT_AUTOPLAY_PAUSE;
exports.EVENT_AUTOPLAY_PLAY = EVENT_AUTOPLAY_PLAY;
exports.EVENT_AUTOPLAY_PLAYING = EVENT_AUTOPLAY_PLAYING;
exports.EVENT_CLICK = EVENT_CLICK;
exports.EVENT_DESTROY = EVENT_DESTROY;
exports.EVENT_DRAG = EVENT_DRAG;
exports.EVENT_DRAGGED = EVENT_DRAGGED;
exports.EVENT_DRAGGING = EVENT_DRAGGING;
exports.EVENT_END_INDEX_CHANGED = EVENT_END_INDEX_CHANGED;
exports.EVENT_HIDDEN = EVENT_HIDDEN;
exports.EVENT_INACTIVE = EVENT_INACTIVE;
exports.EVENT_LAZYLOAD_LOADED = EVENT_LAZYLOAD_LOADED;
exports.EVENT_MOUNTED = EVENT_MOUNTED;
exports.EVENT_MOVE = EVENT_MOVE;
exports.EVENT_MOVED = EVENT_MOVED;
exports.EVENT_NAVIGATION_MOUNTED = EVENT_NAVIGATION_MOUNTED;
exports.EVENT_OVERFLOW = EVENT_OVERFLOW;
exports.EVENT_PAGINATION_MOUNTED = EVENT_PAGINATION_MOUNTED;
exports.EVENT_PAGINATION_UPDATED = EVENT_PAGINATION_UPDATED;
exports.EVENT_READY = EVENT_READY;
exports.EVENT_REFRESH = EVENT_REFRESH;
exports.EVENT_RESIZE = EVENT_RESIZE;
exports.EVENT_RESIZED = EVENT_RESIZED;
exports.EVENT_SCROLL = EVENT_SCROLL;
exports.EVENT_SCROLLED = EVENT_SCROLLED;
exports.EVENT_SHIFTED = EVENT_SHIFTED;
exports.EVENT_SLIDE_KEYDOWN = EVENT_SLIDE_KEYDOWN;
exports.EVENT_UPDATED = EVENT_UPDATED;
exports.EVENT_VISIBLE = EVENT_VISIBLE;
exports.FADE = FADE;
exports.LOOP = LOOP;
exports.LTR = LTR;
exports.RTL = RTL;
exports.SLIDE = SLIDE;
exports.STATUS_CLASSES = STATUS_CLASSES;
exports.Splide = Splide;
exports.SplideRenderer = SplideRenderer;
exports.TTB = TTB;
exports["default"] = Splide;
