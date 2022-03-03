function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*!
 * Splide.js
 * Version  : 3.6.14
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Splide = factory());
})(this, function () {
  'use strict';

  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_SHIFTED = "shifted";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_SLIDE_KEYDOWN = "slide:keydown";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_MEDIA = "media";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_REPOSITIONED = "repositioned";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var DRAGGING = 5;
  var DESTROYED = 6;
  var STATES = {
    CREATED: CREATED,
    MOUNTED: MOUNTED,
    IDLE: IDLE,
    MOVING: MOVING,
    DRAGGING: DRAGGING,
    DESTROYED: DESTROYED
  };

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function find(arrayLike, predicate) {
    return slice(arrayLike).filter(predicate)[0];
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    return subject instanceof HTMLElement;
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = ref.parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    return parent ? slice(parent.children).filter(function (child) {
      return matches(child, selector);
    }) : [];
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = Object.keys(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge(isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

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
      var style2 = elm.style;
      value = "" + value;

      if (style2[prop] !== value) {
        style2[prop] = value;
      }
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
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
    return slice(parent.querySelectorAll(selector));
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, minOrMax, maxOrMin, exclusive) {
    var minimum = min(minOrMax, maxOrMin);
    var maximum = max(minOrMax, maxOrMin);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = ("addEventListener" in target);
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initEvent(type, bubbles, false);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        target && forEach(events, function (events2) {
          events2.split(" ").forEach(function (eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy
    };
  }

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
      emit: emit
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        var elapsed = now() - startTime;

        if (elapsed >= interval) {
          rate = 1;
          startTime = now();
        } else {
          rate = elapsed / interval;
        }

        if (onUpdate) {
          onUpdate(rate);
        }

        if (rate === 1) {
          onInterval();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        raf(update);
      }
    }

    function start(resume) {
      !resume && cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      raf(update);
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
      cancelAnimationFrame(id);
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
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused
    };
  }

  function State(initialState) {
    var state = initialState;

    function set(value) {
      state = value;
    }

    function is(states) {
      return includes(toArray(states), state);
    }

    return {
      set: set,
      is: is
    };
  }

  function Throttle(func, duration) {
    var interval;

    function throttled() {
      var _this = this;

      if (!interval) {
        var args = slice(arguments);
        interval = RequestInterval(duration || 0, function () {
          func.apply(_this, args);
          interval = null;
        }, null, 1);
        interval.start();
      }
    }

    return throttled;
  }

  function Media(Splide2, Components2, options) {
    var binder = EventBinder();
    var breakpoints = options.breakpoints || {};
    var initialOptions = merge({}, options);
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      register(Object.keys(breakpoints).sort(function (n, m) {
        return isMin ? +m - +n : +n - +m;
      }).map(function (key) {
        return [breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)"];
      }));
      register([[{
        speed: 0,
        autoplay: "pause"
      }, "(prefers-reduced-motion: reduce)"]]);
      update();
    }

    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }

    function register(entries) {
      queries.push(entries.map(function (entry) {
        var query = matchMedia(entry[1]);
        binder.bind(query, "change", update);
        return [entry[0], query];
      }));
    }

    function update() {
      var options2 = accumulate();
      var _destroy = options2.destroy;

      if (_destroy) {
        Splide2.options = initialOptions;
        Splide2.destroy(_destroy === "completely");
      } else if (Splide2.state.is(DESTROYED)) {
        destroy(true);
        Splide2.mount();
      } else {
        Splide2.options = options2;
      }
    }

    function accumulate() {
      return queries.reduce(function (merged, entries) {
        var entry = find(entries, function (entry2) {
          return entry2[1].matches;
        }) || [];
        entry[1] && Splide2.emit(EVENT_MEDIA, entry[1]);
        return merge(merged, entry[0] || {});
      }, merge({}, initialOptions));
    }

    return {
      setup: setup,
      mount: noop,
      destroy: destroy
    };
  }

  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    marginRight: ["marginBottom", "marginLeft"],
    autoWidth: ["autoHeight"],
    fixedWidth: ["fixedHeight"],
    paddingLeft: ["paddingTop", "paddingRight"],
    paddingRight: ["paddingBottom", "paddingLeft"],
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: ["ArrowUp", "ArrowRight"],
    ArrowRight: ["ArrowDown", "ArrowLeft"]
  };

  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly) {
      var direction = options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop][index] || prop;
    }

    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }

    return {
      resolve: resolve,
      orient: orient
    };
  }

  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION, ARIA_ATOMIC, ARIA_LIVE];
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_SLIDER = PROJECT_CODE + "__slider";
  var CLASS_TRACK = PROJECT_CODE + "__track";
  var CLASS_LIST = PROJECT_CODE + "__list";
  var CLASS_SLIDE = PROJECT_CODE + "__slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = PROJECT_CODE + "__arrows";
  var CLASS_ARROW = PROJECT_CODE + "__arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = PROJECT_CODE + "__pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = PROJECT_CODE + "__progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_AUTOPLAY = PROJECT_CODE + "__autoplay";
  var CLASS_PLAY = PROJECT_CODE + "__play";
  var CLASS_PAUSE = PROJECT_CODE + "__pause";
  var CLASS_SPINNER = PROJECT_CODE + "__spinner";
  var CLASS_INITIALIZED = "is-initialized";
  var CLASS_ACTIVE = "is-active";
  var CLASS_PREV = "is-prev";
  var CLASS_NEXT = "is-next";
  var CLASS_VISIBLE = "is-visible";
  var CLASS_LOADING = "is-loading";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING];
  var CLASSES = {
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

  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
        on = _EventInterface.on;

    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var classes;
    var slider;
    var track;
    var list;

    function setup() {
      collect();
      init();
      addClass(root, classes = getClasses());
    }

    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
    }

    function destroy() {
      empty(slides);
      removeClass(root, classes);
      removeAttribute([root, track, list], ALL_ATTRIBUTES.concat("style"));
    }

    function update() {
      removeClass(root, classes);
      addClass(root, classes = getClasses());
    }

    function collect() {
      slider = child(root, "." + CLASS_SLIDER);
      track = query(root, "." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      var autoplay = find("." + CLASS_AUTOPLAY);
      var arrows = find("." + CLASS_ARROWS);
      assign(elements, {
        root: root,
        slider: slider,
        track: track,
        list: list,
        slides: slides,
        arrows: arrows,
        autoplay: autoplay,
        prev: query(arrows, "." + CLASS_ARROW_PREV),
        next: query(arrows, "." + CLASS_ARROW_NEXT),
        bar: query(find("." + CLASS_PROGRESS), "." + CLASS_PROGRESS_BAR),
        play: query(autoplay, "." + CLASS_PLAY),
        pause: query(autoplay, "." + CLASS_PAUSE)
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";
      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(root, ROLE, root.tagName !== "SECTION" && options.role || null);
      setAttribute(list, ROLE, "none");
    }

    function find(selector) {
      return child(root, selector) || child(slider, selector);
    }

    function getClasses() {
      return [CLASS_ROOT + "--" + options.type, CLASS_ROOT + "--" + options.direction, options.drag && CLASS_ROOT + "--draggable", options.isNavigation && CLASS_ROOT + "--nav", CLASS_ACTIVE];
    }

    function isTab() {
      return !!(options.pagination || options.isNavigation || Splide2.splides.some(function (target) {
        return !target.isParent && target.splide.options.isNavigation;
      }));
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy,
      isTab: isTab
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        emit = _EventInterface2.emit,
        bind = _EventInterface2.bind,
        destroyEvents = _EventInterface2.destroy;

    var Components = Splide2.Components,
        root = Splide2.root,
        options = Splide2.options;
    var isNavigation = options.isNavigation,
        updateOnMove = options.updateOnMove,
        i18n = options.i18n;
    var isTab = Components.Elements.isTab;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var focusableNodes = options.focusableNodes && queryAll(slide, options.focusableNodes);
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, isTab() ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, format(i18n.slideLabel, [index + 1, Splide2.length]));
      }

      listen();
    }

    function listen() {
      bind(slide, "click keydown", function (e) {
        emit(e.type === "click" ? EVENT_CLICK : EVENT_SLIDE_KEYDOWN, self, e);
      });
      on([EVENT_REFRESH, EVENT_REPOSITIONED, EVENT_SHIFTED, EVENT_MOVED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      destroyEvents();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
    }

    function initNavigation() {
      var controls = Splide2.splides.map(function (target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, "tab");
      updateActivity(isActive());
    }

    function onMove() {
      if (!destroyed) {
        update();
      }
    }

    function update() {
      if (!destroyed) {
        var currIndex = Splide2.index;
        updateActivity(isActive());
        updateVisibility(isVisible());
        toggleClass(slide, CLASS_PREV, index === currIndex - 1);
        toggleClass(slide, CLASS_NEXT, index === currIndex + 1);
      }
    }

    function updateActivity(active) {
      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);

        if (isNavigation) {
          setAttribute(slide, ARIA_SELECTED, active || null);
        }

        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility(visible) {
      var hidden = !visible && (!isActive() || isClone);
      setAttribute(slide, ARIA_HIDDEN, hidden || null);
      setAttribute(slide, TAB_INDEX, !hidden && options.slideFocus ? 0 : null);
      setAttribute(focusableNodes || [], TAB_INDEX, hidden ? -1 : null);

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }
    }

    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }

    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }

    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }

      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left");
      var right = resolve("right");
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }

      return diff <= distance;
    }

    var self = {
      index: index,
      slideIndex: slideIndex,
      slide: slide,
      container: container,
      isClone: isClone,
      mount: mount,
      destroy: destroy,
      update: update,
      style: style$1,
      isWithin: isWithin
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
        on = _EventInterface3.on,
        emit = _EventInterface3.emit,
        bind = _EventInterface3.bind;

    var _Components2$Elements = Components2.Elements,
        slides = _Components2$Elements.slides,
        list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
        Slides2.sort(function (Slide1, Slide2) {
          return Slide1.index - Slide2.index;
        });
      });
    }

    function init() {
      slides.forEach(function (slide, index) {
        register(slide, index, -1);
      });
    }

    function destroy() {
      forEach$1(function (Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }

    function update() {
      forEach$1(function (Slide2) {
        Slide2.update();
      });
    }

    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
    }

    function get(excludeClones) {
      return excludeClones ? filter(function (Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }

    function getIn(page) {
      var Controller = Components2.Controller;
      var index = Controller.toIndex(page);
      var max = Controller.hasFocus() ? 1 : options.perPage;
      return filter(function (Slide2) {
        return between(Slide2.index, index, index + max - 1);
      });
    }

    function getAt(index) {
      return filter(index)[0];
    }

    function add(items, index) {
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(filter(matcher).map(function (Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;

      if (length) {
        images.forEach(function (img) {
          bind(img, "load error", function () {
            if (! --length) {
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
      mount: mount,
      destroy: destroy,
      update: update,
      register: register,
      get: get,
      getIn: getIn,
      getAt: getAt,
      add: add,
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2),
        on = _EventInterface4.on,
        bind = _EventInterface4.bind,
        emit = _EventInterface4.emit;

    var Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements,
        root = _Components2$Elements2.root,
        track = _Components2$Elements2.track,
        list = _Components2$Elements2.list;
    var getAt = Slides.getAt,
        styleSlides = Slides.style;
    var vertical;
    var rootRect;

    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      rootRect = null;
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize();
    }

    function resize() {
      var newRect = rect(root);

      if (!rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth() || null);
        styleSlides("height", cssSlideHeight() || null, true);
        rootRect = newRect;
        emit(EVENT_RESIZED);
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth ? "" : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? "" : cssSlideSize() : cssHeight());
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }

    function listSize() {
      return rect(list)[resolve("width")];
    }

    function slideSize(index, withoutGap) {
      var Slide = getAt(index || 0);
      return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }

    function totalSize(index, withoutGap) {
      var Slide = getAt(index);

      if (Slide) {
        var right = rect(Slide.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize() {
      return totalSize(Splide2.length - 1, true) - totalSize(-1, true);
    }

    function getGap() {
      var Slide = getAt(0);
      return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
    }

    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }

    return {
      mount: mount,
      listSize: listSize,
      slideSize: slideSize,
      sliderSize: sliderSize,
      totalSize: totalSize,
      getPadding: getPadding
    };
  }

  function Clones(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2),
        on = _EventInterface5.on,
        emit = _EventInterface5.emit;

    var Elements = Components2.Elements,
        Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);
    }

    function init() {
      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        emit(EVENT_RESIZE);
      }
    }

    function destroy() {
      remove(clones);
      empty(clones);
    }

    function observe() {
      if (cloneCount < computeCloneCount()) {
        emit(EVENT_REFRESH);
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (!clones2) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage;
      }

      return clones2;
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Move(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2),
        on = _EventInterface6.on,
        emit = _EventInterface6.emit;

    var _Components2$Layout = Components2.Layout,
        slideSize = _Components2$Layout.slideSize,
        getPadding = _Components2$Layout.getPadding,
        totalSize = _Components2$Layout.totalSize,
        listSize = _Components2$Layout.listSize,
        sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction,
        resolve = _Components2$Directio.resolve,
        orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements,
        list = _Components2$Elements3.list,
        track = _Components2$Elements3.track;
    var Transition;

    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }

    function reposition() {
      if (!isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        emit(EVENT_REPOSITIONED);
      }
    }

    function move(dest, index, prev, callback) {
      if (!isBusy()) {
        var set = Splide2.state.set;
        var position = getPosition();

        if (dest !== index) {
          Transition.cancel();
          translate(shift(position, dest > index), true);
        }

        set(MOVING);
        emit(EVENT_MOVE, index, prev, dest);
        Transition.start(index, function () {
          set(IDLE);
          emit(EVENT_MOVED, index, prev, dest);

          if (options.trimSpace === "move" && dest !== prev && position === getPosition()) {
            Components2.Controller.go(dest > prev ? ">" : "<", false, callback);
          } else {
            callback && callback();
          }
        });
      }
    }

    function jump(index) {
      translate(toPosition(index, true));
    }

    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        list.style.transform = "translate" + resolve("X") + "(" + destination + "px)";
        position !== destination && emit(EVENT_SHIFTED);
      }
    }

    function loop(position) {
      if (Splide2.is(LOOP)) {
        var diff = orient(position - getPosition());
        var exceededMin = exceededLimit(false, position) && diff < 0;
        var exceededMax = exceededLimit(true, position) && diff > 0;

        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }

      return position;
    }

    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }

    function cancel() {
      translate(getPosition());
      Transition.cancel();
    }

    function toIndex(position) {
      var Slides = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;

      for (var i = 0; i < Slides.length; i++) {
        var slideIndex = Slides[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);

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
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }

    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }

    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize() - listSize()));
      }

      return position;
    }

    function offset(index) {
      var focus = options.focus;
      return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
    }

    function getLimit(max) {
      return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }

    function isBusy() {
      return Splide2.state.is(MOVING) && options.waitForTransition;
    }

    function exceededLimit(max, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }

    return {
      mount: mount,
      move: move,
      jump: jump,
      translate: translate,
      shift: shift,
      cancel: cancel,
      toIndex: toIndex,
      toPosition: toPosition,
      getPosition: getPosition,
      getLimit: getLimit,
      isBusy: isBusy,
      exceededLimit: exceededLimit,
      reposition: reposition
    };
  }

  function Controller(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2),
        on = _EventInterface7.on;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit;
    var _Components2$Slides = Components2.Slides,
        isEnough = _Components2$Slides.isEnough,
        getLength = _Components2$Slides.getLength;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH], init);
    }

    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      var index = clamp(currIndex, 0, slideCount - 1);

      if (index !== currIndex) {
        currIndex = index;
        Move.reposition();
      }
    }

    function go(control, allowSameIndex, callback) {
      var dest = parse(control);

      if (options.useScroll) {
        scroll(dest, true, true, options.speed, callback);
      } else {
        var index = loop(dest);

        if (index > -1 && !Move.isBusy() && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move.move(dest, index, prevIndex, callback);
        }
      }
    }

    function scroll(destination, useIndex, snap, duration, callback) {
      var dest = useIndex ? destination : toDest(destination);
      Components2.Scroll.scroll(useIndex || snap ? Move.toPosition(dest, true) : destination, duration, function () {
        setIndex(Move.toIndex(Move.getPosition()));
        callback && callback();
      });
    }

    function parse(control) {
      var index = currIndex;

      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [],
            indicator = _ref[1],
            number = _ref[2];

        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex, true);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, getEnd());
      }

      return index;
    }

    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex);

      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : getEnd();
        }
      }

      return destination ? dest : loop(dest);
    }

    function computeDestIndex(dest, from, incremental) {
      if (isEnough()) {
        var end = getEnd();

        if (dest < 0 || dest > end) {
          if (between(0, dest, from, true) || between(end, from, dest, true)) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = perMove || hasFocus() ? dest : dest < 0 ? -(slideCount % perPage || perPage) : slideCount;
            } else if (options.rewind) {
              dest = dest < 0 ? end : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (!incremental && dest !== from) {
            dest = perMove ? dest : toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }

      return dest;
    }

    function getEnd() {
      var end = slideCount - perPage;

      if (hasFocus() || isLoop && perMove) {
        end = slideCount - 1;
      }

      return max(end, 0);
    }

    function loop(index) {
      if (isLoop) {
        return isEnough() ? index % slideCount + (index < 0 ? slideCount : 0) : -1;
      }

      return index;
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, getEnd());
    }

    function toPage(index) {
      if (!hasFocus()) {
        index = between(index, slideCount - perPage, slideCount - 1) ? slideCount - 1 : index;
        index = floor(index / perPage);
      }

      return index;
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp(closest, 0, getEnd()) : closest;
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

    return {
      mount: mount,
      go: go,
      scroll: scroll,
      getNext: getNext,
      getPrev: getPrev,
      getAdjacent: getAdjacent,
      getEnd: getEnd,
      setIndex: setIndex,
      getIndex: getIndex,
      toIndex: toIndex,
      toPage: toPage,
      toDest: toDest,
      hasFocus: hasFocus
    };
  }

  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;

  function Arrows(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2),
        on = _EventInterface8.on,
        bind = _EventInterface8.bind,
        emit = _EventInterface8.emit;

    var classes = options.classes,
        i18n = options.i18n;
    var Elements = Components2.Elements,
        Controller = Components2.Controller;
    var wrapper = Elements.arrows;
    var prev = Elements.prev;
    var next = Elements.next;
    var created;
    var arrows = {};

    function mount() {
      init();
      on(EVENT_UPDATED, init);
    }

    function init() {
      if (options.arrows) {
        if (!prev || !next) {
          createArrows();
        }
      }

      if (prev && next) {
        if (!arrows.prev) {
          setAttribute([prev, next], ARIA_CONTROLS, Elements.list.id);
          arrows.prev = prev;
          arrows.next = next;
          listen();
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }

        display(wrapper, options.arrows === false ? "none" : "");
      }
    }

    function destroy() {
      if (created) {
        remove(wrapper);
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      var go = Controller.go;
      on([EVENT_MOUNTED, EVENT_MOVED, EVENT_UPDATED, EVENT_REFRESH, EVENT_SCROLLED], update);
      bind(next, "click", apply(go, ">", true, void 0));
      bind(prev, "click", apply(go, "<", true, void 0));
    }

    function createArrows() {
      wrapper = create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      before(wrapper, child(options.arrows === "slider" && Elements.slider || Splide2.root));
    }

    function createArrow(prev2) {
      var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
      return parseHtml(arrow);
    }

    function update() {
      var index = Splide2.index;
      var prevIndex = Controller.getPrev();
      var nextIndex = Controller.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }

    return {
      arrows: arrows,
      mount: mount,
      destroy: destroy
    };
  }

  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

  function Autoplay(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
        on = _EventInterface9.on,
        bind = _EventInterface9.bind,
        emit = _EventInterface9.emit;

    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), update);
    var isPaused = interval.isPaused;
    var Elements = Components2.Elements;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var paused = autoplay === "pause";

    function mount() {
      if (autoplay) {
        initButton(true);
        initButton(false);
        listen();
        !paused && play();
      }
    }

    function initButton(forPause) {
      var prop = forPause ? "pause" : "play";
      var button = Elements[prop];

      if (button) {
        setAttribute(button, ARIA_CONTROLS, Elements.track.id);
        setAttribute(button, ARIA_LABEL, options.i18n[prop]);
        bind(button, "click", forPause ? pause : play);
      }
    }

    function listen() {
      var root = Elements.root;

      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, updateInterval);
    }

    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = paused = false;
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }

    function pause(manual) {
      if (manual === void 0) {
        manual = true;
      }

      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }

      paused = manual;
    }

    function autoToggle() {
      if (!paused) {
        if (!hovered && !focused) {
          play();
        } else {
          pause(false);
        }
      }
    }

    function update(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }

    function updateInterval() {
      var Slide = Components2.Slides.getAt(Splide2.index);
      interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }

    return {
      mount: mount,
      destroy: interval.cancel,
      play: play,
      pause: pause,
      isPaused: isPaused
    };
  }

  function Cover(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2),
        on = _EventInterface10.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

        if (img && img.src) {
          toggle(cover2, img, Slide);
        }
      });
    }

    function toggle(cover2, img, Slide) {
      Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
      display(img, cover2 ? "none" : "");
    }

    return {
      mount: mount,
      destroy: apply(cover, false)
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
        on = _EventInterface11.on,
        emit = _EventInterface11.emit;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        exceededLimit = Move.exceededLimit;
    var interval;
    var scrollCallback;

    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, callback, suppressConstraint) {
      var start = getPosition();
      var friction = 1;
      duration = duration || computeDuration(abs(destination - start));
      scrollCallback = callback;
      clear();
      interval = RequestInterval(duration, onScrolled, function (rate) {
        var position = getPosition();
        var target = start + (destination - start) * easing(rate);
        var diff = (target - getPosition()) * friction;
        Move.translate(position + diff);

        if (Splide2.is(SLIDE) && !suppressConstraint && exceededLimit()) {
          friction *= FRICTION_FACTOR;

          if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
            bounce(exceededLimit(false));
          }
        }
      }, 1);
      emit(EVENT_SCROLL);
      interval.start();
    }

    function bounce(backwards) {
      scroll(getLimit(!backwards), BOUNCE_DURATION, null, true);
    }

    function onScrolled() {
      var position = getPosition();
      var index = Move.toIndex(position);

      if (!between(index, 0, Splide2.length - 1)) {
        Move.translate(Move.shift(position, index > 0), true);
      }

      scrollCallback && scrollCallback();
      emit(EVENT_SCROLLED);
    }

    function computeDuration(distance) {
      return max(distance / BASE_VELOCITY, MIN_DURATION);
    }

    function clear() {
      if (interval) {
        interval.cancel();
      }
    }

    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onScrolled();
      }
    }

    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }

    return {
      mount: mount,
      destroy: clear,
      scroll: scroll,
      cancel: cancel
    };
  }

  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };
  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup";

  function Drag(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2),
        on = _EventInterface12.on,
        emit = _EventInterface12.emit,
        bind = _EventInterface12.bind,
        unbind = _EventInterface12.unbind;

    var state = Splide2.state;
    var Move = Components2.Move,
        Scroll = Components2.Scroll,
        Controller = Components2.Controller;
    var track = Components2.Elements.track;
    var _Components2$Directio2 = Components2.Direction,
        resolve = _Components2$Directio2.resolve,
        orient = _Components2$Directio2.orient;
    var getPosition = Move.getPosition,
        exceededLimit = Move.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;

    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }

    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }

    function onPointerDown(e) {
      clickPrevented = false;

      if (!disabled) {
        var noDrag = options.noDrag;
        var isTouch = isTouchEvent(e);
        var isDraggable = !noDrag || !matches(e.target, noDrag);

        if (isDraggable && (isTouch || !e.button)) {
          if (!Move.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is(MOVING);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
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
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());

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

      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
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
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;

      if (isFree) {
        Controller.scroll(destination);
      } else if (Splide2.is(FADE)) {
        Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller.go(Controller.toDest(destination), true);
      }
    }

    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }

    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);

        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }

      return 0;
    }

    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
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
      return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
    }

    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
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
      mount: mount,
      disable: disable,
      isDragging: isDragging
    };
  }

  var IE_ARROW_KEYS = ["Left", "Right", "Up", "Down"];
  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2),
        on = _EventInterface13.on,
        bind = _EventInterface13.bind,
        unbind = _EventInterface13.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, onUpdated);
      on(EVENT_MOVE, onMove);
    }

    function init() {
      var keyboard = options.keyboard;

      if (keyboard) {
        if (keyboard === "focused") {
          target = root;
          setAttribute(root, TAB_INDEX, 0);
        } else {
          target = window;
        }

        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }

    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }

    function disable(value) {
      disabled = value;
    }

    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function () {
        disabled = _disabled;
      });
    }

    function onUpdated() {
      destroy();
      init();
    }

    function onKeydown(e) {
      if (!disabled) {
        var key = e.key;
        var normalizedKey = includes(IE_ARROW_KEYS, key) ? "Arrow" + key : key;

        if (normalizedKey === resolve("ArrowLeft")) {
          Splide2.go("<");
        } else if (normalizedKey === resolve("ArrowRight")) {
          Splide2.go(">");
        }
      }
    }

    return {
      mount: mount,
      destroy: destroy,
      disable: disable
    };
  }

  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface14 = EventInterface(Splide2),
        on = _EventInterface14.on,
        off = _EventInterface14.off,
        bind = _EventInterface14.bind,
        emit = _EventInterface14.emit;

    var isSequential = options.lazyLoad === "sequential";
    var images = [];
    var index = 0;

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, destroy);
        on(EVENT_REFRESH, init);

        if (!isSequential) {
          on([EVENT_MOUNTED, EVENT_REFRESH, EVENT_MOVED, EVENT_SCROLLED], observe);
        }
      }
    }

    function init() {
      Components2.Slides.forEach(function (_Slide) {
        queryAll(_Slide.slide, IMAGE_SELECTOR).forEach(function (_img) {
          var src = getAttribute(_img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(_img, SRCSET_DATA_ATTRIBUTE);

          if (src !== _img.src || srcset !== _img.srcset) {
            var className = options.classes.spinner;
            var parent = _img.parentElement;

            var _spinner = child(parent, "." + className) || create("span", className, parent);

            setAttribute(_spinner, ROLE, "presentation");
            images.push({
              _img: _img,
              _Slide: _Slide,
              src: src,
              srcset: srcset,
              _spinner: _spinner
            });
            !_img.src && display(_img, "none");
          }
        });
      });

      if (isSequential) {
        loadNext();
      }
    }

    function destroy() {
      index = 0;
      images = [];
    }

    function observe() {
      images = images.filter(function (data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;

        if (data._Slide.isWithin(Splide2.index, distance)) {
          return load(data);
        }

        return true;
      });

      if (!images.length) {
        off(EVENT_MOVED);
      }
    }

    function load(data) {
      var _img = data._img;
      addClass(data._Slide.slide, CLASS_LOADING);
      bind(_img, "load error", function (e) {
        onLoad(data, e.type === "error");
      });
      ["srcset", "src"].forEach(function (name) {
        if (data[name]) {
          setAttribute(_img, name, data[name]);
          removeAttribute(_img, name === "src" ? SRC_DATA_ATTRIBUTE : SRCSET_DATA_ATTRIBUTE);
        }
      });
    }

    function onLoad(data, error) {
      var _Slide = data._Slide;
      removeClass(_Slide.slide, CLASS_LOADING);

      if (!error) {
        remove(data._spinner);
        display(data._img, "");
        emit(EVENT_LAZYLOAD_LOADED, data._img, _Slide);
        emit(EVENT_RESIZE);
      }

      if (isSequential) {
        loadNext();
      }
    }

    function loadNext() {
      if (index < images.length) {
        load(images[index++]);
      }
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Pagination(Splide2, Components2, options) {
    var _EventInterface15 = EventInterface(Splide2),
        on = _EventInterface15.on,
        emit = _EventInterface15.emit,
        bind = _EventInterface15.bind,
        unbind = _EventInterface15.unbind;

    var Slides = Components2.Slides,
        Elements = Components2.Elements,
        Controller = Components2.Controller;
    var hasFocus = Controller.hasFocus,
        getIndex = Controller.getIndex;
    var items = [];
    var list;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on([EVENT_MOVE, EVENT_SCROLLED], update);
    }

    function init() {
      destroy();

      if (options.pagination && Slides.isEnough()) {
        createPagination();
        emit(EVENT_PAGINATION_MOUNTED, {
          list: list,
          items: items
        }, getAt(Splide2.index));
        update();
      }
    }

    function destroy() {
      if (list) {
        remove(list);
        items.forEach(function (item) {
          unbind(item.button, "click");
        });
        empty(items);
        list = null;
      }
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
          i18n = options.i18n,
          perPage = options.perPage;
      var parent = options.pagination === "slider" && Elements.slider || Elements.root;
      var max = hasFocus() ? length : ceil(length / perPage);
      list = create("ul", classes.pagination, parent);
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));
        setAttribute(li, ROLE, "none");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        items.push({
          li: li,
          button: button,
          page: i
        });
      }
    }

    function onClick(page) {
      Controller.go(">" + page, true, function () {
        var Slide = Slides.getAt(Controller.toIndex(page));
        Slide && focus(Slide.slide);
      });
    }

    function getAt(index) {
      return items[Controller.toPage(index)];
    }

    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());

      if (prev) {
        removeClass(prev.button, CLASS_ACTIVE);
        removeAttribute(prev.button, ARIA_SELECTED);
      }

      if (curr) {
        addClass(curr.button, CLASS_ACTIVE);
        setAttribute(curr.button, ARIA_SELECTED, true);
      }

      emit(EVENT_PAGINATION_UPDATED, {
        list: list,
        items: items
      }, prev, curr);
    }

    return {
      items: items,
      mount: mount,
      destroy: destroy,
      getAt: getAt,
      update: update
    };
  }

  var TRIGGER_KEYS = [" ", "Enter", "Spacebar"];

  function Sync(Splide2, Components2, options) {
    var list = Components2.Elements.list;
    var events = [];

    function mount() {
      Splide2.splides.forEach(function (target) {
        !target.isParent && sync(target.splide);
      });

      if (options.isNavigation) {
        navigate();
      }
    }

    function destroy() {
      events.forEach(function (event) {
        event.destroy();
      });
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide) {
      [Splide2, splide].forEach(function (instance) {
        var event = EventInterface(instance);
        var target = instance === Splide2 ? splide : Splide2;
        event.on(EVENT_MOVE, function (index, prev, dest) {
          target.go(target.is(LOOP) ? dest : index);
        });
        events.push(event);
      });
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      setAttribute(list, ROLE, "menu");
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(list, ARIA_ORIENTATION, options.direction !== TTB ? "horizontal" : null);
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
      mount: mount,
      destroy: destroy,
      remount: remount
    };
  }

  function Wheel(Splide2, Components2, options) {
    var _EventInterface16 = EventInterface(Splide2),
        bind = _EventInterface16.bind;

    var wheelOption = options.wheel;
    var wheel = isObject(wheelOption) ? wheelOption : wheelOption && {};
    var lastTime = 0;

    function mount() {
      if (wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }

    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);

        if (abs(deltaY) > (wheel.min || 0) && timeStamp - lastTime > (wheel.sleep || 0)) {
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
      mount: mount
    };
  }

  function Live(Splide2, Components2, options) {
    var _EventInterface17 = EventInterface(Splide2),
        on = _EventInterface17.on;

    var list = Components2.Elements.list;
    var live = options.live;
    var enabled = live && !options.isNavigation;

    function mount() {
      if (enabled) {
        setAttribute(list, ARIA_ATOMIC, false);
        disable(!Components2.Autoplay.isPaused());
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      }
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(list, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }

    return {
      mount: mount,
      disable: disable
    };
  }

  var ComponentConstructors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Media: Media,
    Direction: Direction,
    Elements: Elements,
    Slides: Slides,
    Layout: Layout,
    Clones: Clones,
    Move: Move,
    Controller: Controller,
    Arrows: Arrows,
    Autoplay: Autoplay,
    Cover: Cover,
    Scroll: Scroll,
    Drag: Drag,
    Keyboard: Keyboard,
    LazyLoad: LazyLoad,
    Pagination: Pagination,
    Sync: Sync,
    Wheel: Wheel,
    Live: Live
  });
  var I18N = {
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
    select: "Select slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    waitForTransition: true,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    keyboard: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    slideFocus: true,
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N
  };

  function Fade(Splide2, Components2, options) {
    var _EventInterface18 = EventInterface(Splide2),
        on = _EventInterface18.on;

    function mount() {
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
        nextTick(function () {
          Components2.Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
        });
      });
    }

    function start(index, done) {
      var track = Components2.Elements.track;
      style(track, "height", unit(rect(track).height));
      nextTick(function () {
        done();
        style(track, "height", "");
      });
    }

    return {
      mount: mount,
      start: start,
      cancel: noop
    };
  }

  function Slide(Splide2, Components2, options) {
    var _EventInterface19 = EventInterface(Splide2),
        bind = _EventInterface19.bind;

    var Move = Components2.Move,
        Controller = Components2.Controller;
    var list = Components2.Elements.list;
    var endCallback;

    function mount() {
      bind(list, "transitionend", function (e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }

    function start(index, done) {
      var destination = Move.toPosition(index, true);
      var position = Move.getPosition();
      var speed = getSpeed(index);

      if (abs(destination - position) >= 1 && speed >= 1) {
        apply("transform " + speed + "ms " + options.easing);
        Move.translate(destination, true);
        endCallback = done;
      } else {
        Move.jump(index);
        done();
      }
    }

    function cancel() {
      apply("");
    }

    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;

      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller.getIndex(true);
        var end = Controller.getEnd();

        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }

      return options.speed;
    }

    function apply(transition) {
      style(list, "transition", transition);
    }

    return {
      mount: mount,
      start: start,
      cancel: cancel
    };
  }

  var _Splide = /*#__PURE__*/function () {
    function _Splide(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._options = {};
      this._Extensions = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({}, DEFAULTS, _Splide.defaults, options || {});

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._options = options;
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this2 = this;

      var state = this.state,
          Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._Components = Components2;
      this._Transition = Transition || this._Transition || (this.is(FADE) ? Fade : Slide);
      this._Extensions = Extensions || this._Extensions;
      var Constructors = assign({}, ComponentConstructors, this._Extensions, {
        Transition: this._Transition
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this2, Components2, _this2._options);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };

    _proto.sync = function sync(splide) {
      this.splides.push({
        splide: splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });

      if (this.state.is(IDLE)) {
        this._Components.Sync.remount();

        splide.Components.Sync.remount();
      }

      return this;
    };

    _proto.go = function go(control) {
      this._Components.Controller.go(control);

      return this;
    };

    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };

    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };

    _proto.emit = function emit(event) {
      var _this$event;

      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

      return this;
    };

    _proto.add = function add(slides, index) {
      this._Components.Slides.add(slides, index);

      return this;
    };

    _proto.remove = function remove(matcher) {
      this._Components.Slides.remove(matcher);

      return this;
    };

    _proto.is = function is(type) {
      return this._options.type === type;
    };

    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
          state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._Components, function (component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }

      return this;
    };

    _createClass(_Splide, [{
      key: "options",
      get: function get() {
        return this._options;
      },
      set: function set(options) {
        var _options = this._options;
        merge(_options, options);

        if (!this.state.is(CREATED)) {
          this.emit(EVENT_UPDATED, _options);
        }
      }
    }, {
      key: "length",
      get: function get() {
        return this._Components.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._Components.Controller.getIndex();
      }
    }]);

    return _Splide;
  }();

  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;
  return Splide;
});
