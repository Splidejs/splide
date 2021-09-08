function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * Splide.js
 * Version  : 3.0.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */

/**
 * The project code.
 *
 * @since 3.0.0
 */
var PROJECT_CODE = 'splide';
/**
 * The data attribute prefix.
 *
 * @since 3.0.0
 */

var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
/**
 * Splide has been just created.
 */

var CREATED = 1;
/**
 * Splide has mounted components.
 */

var MOUNTED = 2;
/**
 * Splide is ready.
 */

var IDLE = 3;
/**
 * Splide is moving.
 */

var MOVING = 4;
/**
 * Splide has been destroyed.
 */

var DESTROYED = 5;
/**
 * The collection of all states.
 *
 * @since 3.0.0
 */

var STATES = {
  CREATED: CREATED,
  MOUNTED: MOUNTED,
  IDLE: IDLE,
  MOVING: MOVING,
  DESTROYED: DESTROYED
};
/**
 * Empties the array.
 *
 * @param array - A array to empty.
 */

function empty(array) {
  array.length = 0;
}
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */


function isObject(subject) {
  return !isNull(subject) && typeof subject === 'object';
}
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */


function isArray(subject) {
  return Array.isArray(subject);
}
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */


function isFunction(subject) {
  return typeof subject === 'function';
}
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */


function isString(subject) {
  return typeof subject === 'string';
}
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */


function isUndefined(subject) {
  return typeof subject === 'undefined';
}
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */


function isNull(subject) {
  return subject === null;
}
/**
 * Checks if the given subject is an HTMLElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */


function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}
/**
 * Checks if the given subject is an HTMLButtonElement or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLButtonElement, or otherwise `false`.
 */


function isHTMLButtonElement(subject) {
  return subject instanceof HTMLButtonElement;
}
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */


function toArray(value) {
  return isArray(value) ? value : [value];
}
/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */


function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
/**
 * Checks if the array includes the value or not.
 * `Array#includes` is not supported by IE.
 *
 * @param array - An array.
 * @param value - A value to search for.
 *
 * @return `true` if the array includes the value, or otherwise `false`.
 */


function includes(array, value) {
  return array.indexOf(value) > -1;
}
/**
 * Extended `Array#push()` that accepts an item or an array with items.
 *
 * @param array - An array to push items.
 * @param items - An item or items to push.
 *
 * @return A provided array itself.
 */


function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}

var arrayProto = Array.prototype;
/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */

function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}
/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */


function find(arrayLike, predicate) {
  return slice(arrayLike).filter(predicate)[0];
}
/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */


function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function (name) {
      if (name) {
        elm.classList[add ? 'add' : 'remove'](name);
      }
    });
  }
}
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */


function addClass(elm, classes) {
  toggleClass(elm, classes, true);
}
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */


function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}
/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */


function before(nodes, ref) {
  forEach(nodes, function (node) {
    var parent = ref.parentNode;

    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
/**
 * Checks if the element can be selected by the provided selector or not.
 *
 * @param elm      - An element to check.
 * @param selector - A selector to test.
 *
 * @return `true` if the selector matches the element, or otherwise `false`.
 */


function matches(elm, selector) {
  return (elm['msMatchesSelector'] || elm.matches).call(elm, selector);
}
/**
 * Finds children that has the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return An array with filtered children.
 */


function children(parent, selector) {
  return parent ? slice(parent.children).filter(function (child) {
    return matches(child, selector);
  }) : [];
}
/**
 * Returns a child element that matches the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - A selector to filter children.
 *
 * @return A matched child element if available, or otherwise `undefined`.
 */


function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn(object, iteratee) {
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== '__proto__') {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object  - An object to assign properties to.
 * @param sources - Objects to assign properties from.
 *
 * @return An object assigned properties of the sources to.
 */


function assign(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    forOwn(source, function (value, key) {
      object[key] = source[key];
    });
  });
  return object;
}
/**
 * Recursively merges source properties to the object.
 *
 * @param object - An object to merge properties to.
 * @param source - A source object to merge properties from.
 *
 * @return A new object with merged properties.
 */


function merge(object, source) {
  forOwn(source, function (value, key) {
    object[key] = isObject(value) ? merge(isObject(object[key]) ? object[key] : {}, value) : value;
  });
  return object;
}
/**
 * Removes attributes from the element.
 *
 * @param elm   - An element.
 * @param attrs - An attribute or attributes to remove.
 */


function removeAttribute(elm, attrs) {
  if (elm) {
    forEach(attrs, function (attr) {
      elm.removeAttribute(attr);
    });
  }
}

function setAttribute(elm, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function (value, name) {
      setAttribute(elm, name, value);
    });
  } else {
    isNull(value) ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}
/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */


function create(tag, attrs, parent) {
  var elm = document.createElement(tag);

  if (attrs) {
    if (isString(attrs) || isArray(attrs)) {
      addClass(elm, attrs);
    } else {
      setAttribute(elm, attrs);
    }
  }

  if (parent) {
    append(parent, elm);
  }

  return elm;
}
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elms   - An element or elements to apply styles to.
 * @param styles - An object literal with styles.
 */


function style(elms, styles) {
  if (isString(styles)) {
    return isArray(elms) ? null : getComputedStyle(elms)[styles];
  }

  forOwn(styles, function (value, key) {
    if (!isNull(value)) {
      forEach(elms, function (elm) {
        if (elm) {
          elm.style[key] = "" + value;
        }
      });
    }
  });
}
/**
 * Sets the `display` CSS value to the element.
 *
 * @param elm     - An element to set a new value to.
 * @param display - A new `display` value.
 */


function display(elm, display) {
  style(elm, {
    display: display
  });
}
/**
 * Returns the specified attribute value.
 *
 * @param elm  - An element.
 * @param attr - An attribute to get.
 */


function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
/**
 * Checks if the element contains the specified class or not.
 *
 * @param elm       - An element to check.
 * @param className - A class name that may be contained by the element.
 *
 * @return `true` if the element contains the class, or otherwise `false`.
 */


function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
/**
 * Parses the provided HTML string and returns the first element.
 *
 * @param html - An HTML string to parse.
 *
 * @return An Element on success, or otherwise `undefined`.
 */


function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, 'text/html').body);
}
/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propagation or not.
 */


function prevent(e, stopPropagation) {
  e.preventDefault();

  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
/**
 * Returns an element that matches the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return A found element or `null`.
 */


function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return An array with matched elements.
 */


function queryAll(parent, selector) {
  return slice(parent.querySelectorAll(selector));
}
/**
 * Returns a DOMRect object of the provided element.
 *
 * @param target - An element.
 */


function rect(target) {
  return target.getBoundingClientRect();
}
/**
 * Removes the provided node from its parent.
 *
 * @param nodes - A node or nodes to remove.
 */


function remove(nodes) {
  forEach(nodes, function (node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */


function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
/**
 * Appends `px` to the provided number.
 * If the value is already string, just returns it.
 *
 * @param value - A value to append `px` to.
 *
 * @return A string with the CSS unit.
 */


function unit(value) {
  return isString(value) ? value : value ? value + "px" : '';
}
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message to display.
 */


function assert(condition, message) {
  if (message === void 0) {
    message = '';
  }

  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + message);
  }
}
/**
 * Invokes the callback on the next tick.
 *
 * @param callback - A callback function.
 */


function nextTick(callback) {
  setTimeout(callback);
}
/**
 * No operation.
 */


var noop = function noop() {}; // eslint-disable-line no-empty-function, @typescript-eslint/no-empty-function

/**
 * The arias of `window.requestAnimationFrame()`.
 */


function raf(func) {
  return requestAnimationFrame(func);
}
/**
 * Checks if the subject number is between `minOrMax` and `maxOrMin`.
 *
 * @param number    - A subject number to check.
 * @param minOrMax  - A min or max number.
 * @param maxOrMin  - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */


function between(number, minOrMax, maxOrMin, exclusive) {
  var min = Math.min(minOrMax, maxOrMin);
  var max = Math.max(minOrMax, maxOrMin);
  return exclusive ? min < number && number < max : min <= number && number <= max;
}

var max$1 = Math.max,
    min$1 = Math.min;
/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 */

function clamp(number, x, y) {
  var minimum = min$1(x, y);
  var maximum = max$1(x, y);
  return min$1(max$1(minimum, number), maximum);
}
/**
 * Returns the sign of the provided number.
 *
 * @param x - A number.
 *
 * @return `1` for positive numbers, `-1` for negative numbers, or `0` for `0`.
 */


function sign(x) {
  return +(x > 0) - +(x < 0);
}

var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    abs = Math.abs,
    round = Math.round;
/**
 * The component for managing options.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Options component object.
 */

function Options(Splide, Components, options) {
  /**
   * Keeps the initial options to apply when no matched query exists.
   */
  var initialOptions;
  /**
   * Stores breakpoints with the MediaQueryList object.
   */

  var points;
  /**
   * Holds the current breakpoint.
   */

  var currPoint;
  /**
   * Called when the component is constructed.
   */

  function setup() {
    try {
      merge(options, JSON.parse(getAttribute(Splide.root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, e.message);
    }

    initialOptions = merge({}, options);
  }
  /**
   * Called when the component is mounted.
   */


  function mount() {
    var breakpoints = options.breakpoints;

    if (breakpoints) {
      points = Object.keys(breakpoints).sort(function (n, m) {
        return +n - +m;
      }).map(function (point) {
        return [point, matchMedia("(" + (options.mediaQuery || 'max') + "-width:" + point + "px)")];
      });
      addEventListener('resize', observe);
      observe();
    }
  }
  /**
   * Destroys the component.
   *
   * @param completely - Will be `true` for complete destruction.
   */


  function destroy(completely) {
    if (completely) {
      removeEventListener('resize', observe);
    }
  }
  /**
   * Observes breakpoints.
   * The `currPoint` may be `undefined`.
   */


  function observe() {
    var item = find(points, function (item) {
      return item[1].matches;
    }) || [];

    if (item[0] !== currPoint) {
      onMatch(currPoint = item[0]);
    }
  }
  /**
   * Called when the media query matches breakpoints.
   *
   * @param point - A matched point, or `undefined` that means no breakpoint matches a media query.
   */


  function onMatch(point) {
    var newOptions = options.breakpoints[point] || initialOptions;

    if (newOptions.destroy) {
      Splide.options = initialOptions;
      Splide.destroy(newOptions.destroy === 'completely');
    } else {
      if (Splide.state.is(DESTROYED)) {
        destroy(true);
        Splide.mount();
      }

      Splide.options = newOptions;
    }
  }

  return {
    setup: setup,
    mount: mount,
    destroy: destroy
  };
}
/**
 * Enumerates slides from left to right.
 */

/**
 * Enumerates slides from right to left.
 */


var RTL = 'rtl';
/**
 * Enumerates slides in a col.
 */

var TTB = 'ttb';
/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */

var ORIENTATION_MAP = {
  marginRight: ['marginBottom', 'marginLeft'],
  width: ['height'],
  autoWidth: ['autoHeight'],
  fixedWidth: ['fixedHeight'],
  paddingLeft: ['paddingTop', 'paddingRight'],
  paddingRight: ['paddingBottom', 'paddingLeft'],
  left: ['top', 'right'],
  right: ['bottom', 'left'],
  x: ['y'],
  X: ['Y'],
  pageX: ['pageY'],
  ArrowLeft: ['ArrowUp', 'ArrowRight'],
  ArrowRight: ['ArrowDown', 'ArrowLeft']
};
/**
 * The component that absorbs the difference among directions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Direction component object.
 */

function Direction(Splide, Components, options) {
  /**
   * Resolves the provided property name.
   *
   * @param prop     - A property name to translate.
   * @param axisOnly - Optional. If `ture`, returns the same property for LTR and RTL.
   */
  function resolve(prop, axisOnly) {
    var direction = options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop][index] || prop;
  }
  /**
   * Orients the value towards the current direction.
   *
   * @param value - A value to orient.
   *
   * @return The oriented value.
   */


  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }

  return {
    resolve: resolve,
    orient: orient
  };
}

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
var CLASS_INITIALIZED = 'is-initialized';
var CLASS_ACTIVE = 'is-active';
var CLASS_PREV = 'is-prev';
var CLASS_NEXT = 'is-next';
var CLASS_VISIBLE = 'is-visible';
var CLASS_LOADING = 'is-loading';
/**
 * The array with all status classes.
 *
 * @since 3.0.0
 */

var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING];
/**
 * The collection of classes for elements that Splide dynamically creates.
 *
 * @since 3.0.0
 */

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
var EVENT_MOUNTED = 'mounted';
var EVENT_READY = 'ready';
var EVENT_MOVE = 'move';
var EVENT_MOVED = 'moved';
var EVENT_CLICK = 'click';
var EVENT_ACTIVE = 'active';
var EVENT_INACTIVE = 'inactive';
var EVENT_VISIBLE = 'visible';
var EVENT_HIDDEN = 'hidden';
var EVENT_SLIDE_KEYDOWN = 'slide:keydown';
var EVENT_REFRESH = 'refresh';
var EVENT_UPDATED = 'undated';
var EVENT_RESIZE = 'resize';
var EVENT_RESIZED = 'resized';
var EVENT_DRAG = 'drag';
var EVENT_DRAGGING = 'dragging';
var EVENT_DRAGGED = 'dragged';
var EVENT_SCROLL = 'scroll';
var EVENT_SCROLLED = 'scrolled';
var EVENT_DESTROY = 'destroy';
var EVENT_ARROWS_MOUNTED = 'arrows:mounted';
var EVENT_ARROWS_UPDATED = 'arrows:updated';
var EVENT_PAGINATION_MOUNTED = 'pagination:mounted';
var EVENT_PAGINATION_PAGE = 'pagination:page';
var EVENT_PAGINATION_UPDATED = 'pagination:updated';
var EVENT_NAVIGATION_MOUNTED = 'navigation:mounted';
var EVENT_AUTOPLAY_PLAY = 'autoplay:play';
var EVENT_AUTOPLAY_PLAYING = 'autoplay:playing';
var EVENT_AUTOPLAY_PAUSE = 'autoplay:pause';
var EVENT_LAZYLOAD_LOADED = 'lazyload:loaded';
/**
 * The constructor to provided a simple event system.
 *
 * @since 3.0.0
 *
 * @return An EventBus object.
 */

function EventBus() {
  /**
   * The collection of registered handlers.
   */
  var handlers = {};
  /**
   * Registers an event handler.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param key      - Optional. An object for an identifier of the handler.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */

  function on(events, callback, key, priority) {
    if (priority === void 0) {
      priority = 10;
    }

    forEachEvent(events, function (event, namespace) {
      handlers[event] = handlers[event] || [];
      push(handlers[event], {
        event: event,
        callback: callback,
        namespace: namespace,
        priority: priority,
        key: key
      }).sort(function (handler1, handler2) {
        return handler1.priority - handler2.priority;
      });
    });
  }
  /**
   * Removes event handlers registered by `on()`.
   * If only the event name is provided, all handlers that associate with the event are removed.
   * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param key    - Optional. An object for an identifier of the handler.
   */


  function off(events, key) {
    forEachEvent(events, function (event, namespace) {
      var eventHandlers = handlers[event];
      handlers[event] = eventHandlers && eventHandlers.filter(function (handler) {
        return handler.key ? handler.key !== key : handler.namespace !== namespace;
      });
    });
  }
  /**
   * Removes all handlers locked by the specified key.
   *
   * @param key - A key.
   */


  function offBy(key) {
    forOwn(handlers, function (eventHandlers, event) {
      off(event, key);
    });
  }
  /**
   * Triggers callback functions.
   * This accepts additional arguments and passes them to callbacks.
   *
   * @param event - An event name.
   */


  function emit(event) {
    var _arguments = arguments;
    (handlers[event] || []).forEach(function (handler) {
      handler.callback.apply(handler, slice(_arguments, 1));
    });
  }
  /**
   * Removes all handlers.
   */


  function destroy() {
    handlers = {};
  }
  /**
   * Parses provided events and iterates over them.
   *
   * @param events   - An event or events.
   * @param iteratee - An iteratee function.
   */


  function forEachEvent(events, iteratee) {
    toArray(events).join(' ').split(' ').forEach(function (eventNS) {
      var fragments = eventNS.split('.');
      iteratee(fragments[0], fragments[1]);
    });
  }

  return {
    on: on,
    off: off,
    offBy: offBy,
    emit: emit,
    destroy: destroy
  };
}
/**
 * The function that provides interface for internal and native events.
 *
 * @since 3.0.0
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */


function EventInterface(Splide) {
  /**
   * Holds the event object.
   */
  var event = Splide.event;
  /**
   * The key for events.
   */

  var key = {};
  /**
   * Stores all handlers that listen to native events.
   */

  var listeners = [];
  /**
   * Registers an event handler with an unique key.
   * It can only be removed by `off()` method below.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */

  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  /**
   * Removes event handlers registered by `on()`.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   */


  function off(events) {
    event.off(events, key);
  }
  /**
   * Listens to native events.
   * Splide#destory() will remove all registered listeners.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event or events to listen to.
   * @param callback - A callback function.
   * @param options  - Optional. The options to pass to the `addEventListener` function.
   */


  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function (target, event) {
      listeners.push([target, event, callback, options]);
      target.addEventListener(event, callback, options);
    });
  }
  /**
   * Removes the event handler.
   *
   * @param targets - A target element, the window object or the document object.
   * @param events  - An event name or names to remove.
   */


  function unbind(targets, events) {
    forEachEvent(targets, events, function (target, event) {
      listeners = listeners.filter(function (listener) {
        if (listener[0] === target && listener[1] === event) {
          target.removeEventListener(event, listener[2], listener[3]);
          return false;
        }

        return true;
      });
    });
  }
  /**
   * Iterates over each target and event.
   *
   * @param targets  - A target element, the window object or the document object.
   * @param events   - An event name or names.
   * @param iteratee - An iteratee function.
   */


  function forEachEvent(targets, events, iteratee) {
    forEach(targets, function (target) {
      if (target) {
        events.split(' ').forEach(iteratee.bind(null, target));
      }
    });
  }
  /**
   * Removes all listeners.
   */


  function destroy() {
    listeners = listeners.filter(function (data) {
      return unbind(data[0], data[1]);
    });
    event.offBy(key);
  }
  /**
   * Invokes destroy when the slider is destroyed.
   */


  event.on(EVENT_DESTROY, destroy, key);
  return {
    on: on,
    off: off,
    emit: event.emit,
    bind: bind,
    unbind: unbind,
    destroy: destroy
  };
}
/**
 * Requests interval like the native `setInterval()` with using `requestAnimationFrame`.
 *
 * @since 3.0.0
 *
 * @param interval   - The interval duration in milliseconds.
 * @param onInterval - The callback fired on every interval.
 * @param onUpdate   - Optional. Called on every animation frame, taking the progress rate.
 * @param limit      - Optional. Limits the number of interval.
 */


function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  /**
   * The time when the interval starts.
   */

  var startTime;
  /**
   * The current progress rate.
   */

  var rate = 0;
  /**
   * The animation frame ID.
   */

  var id;
  /**
   * Indicates whether the interval is currently paused or not.
   */

  var paused = true;
  /**
   * The loop count. This only works when the `limit` argument is provided.
   */

  var count = 0;
  /**
   * The update function called on every animation frame.
   */

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
          pause();
          return;
        }
      }

      raf(update);
    }
  }
  /**
   * Starts the interval.
   *
   * @param resume - Optional. Whether to resume the paused progress or not.
   */


  function start(resume) {
    !resume && cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    raf(update);
  }
  /**
   * Pauses the interval.
   */


  function pause() {
    paused = true;
  }
  /**
   * Rewinds the current progress.
   */


  function rewind() {
    startTime = now();
    rate = 0;

    if (onUpdate) {
      onUpdate(rate);
    }
  }
  /**
   * Cancels the interval.
   */


  function cancel() {
    cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  /**
   * Checks if the interval is paused or not.
   *
   * @return `true` if the interval is paused, or otherwise `false`.
   */


  function isPaused() {
    return paused;
  }

  return {
    start: start,
    rewind: rewind,
    pause: pause,
    cancel: cancel,
    isPaused: isPaused
  };
}
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */


function State(initialState) {
  /**
   * The current state.
   */
  var state = initialState;
  /**
   * Sets a new state.
   *
   * @param value - A new state value.
   */

  function set(value) {
    state = value;
  }
  /**
   * Checks if the current state matches the provided one.
   *
   * @param states - A state to check.
   *
   * @return `true` if the current state is the provided one.
   */


  function is(states) {
    return includes(toArray(states), state);
  }

  return {
    set: set,
    is: is
  };
}
/**
 * Returns the throttled function.
 *
 * @param func     - A function to throttle.
 * @param duration - Optional. Throttle duration in milliseconds.
 *
 * @return A throttled function.
 */


function Throttle(func, duration) {
  var interval;

  function throttled() {
    var _arguments2 = arguments,
        _this = this;

    if (!interval) {
      interval = RequestInterval(duration || 0, function () {
        func.apply(_this, _arguments2);
        interval = null;
      }, null, 1);
      interval.start();
    }
  }

  return throttled;
}
/**
 * Formats a string.
 *
 * @param string       - A string to format.
 * @param replacements - A replacement or replacements.
 *
 * @return A formatted string.
 */


function format(string, replacements) {
  forEach(replacements, function (replacement) {
    string = string.replace('%s', "" + replacement);
  });
  return string;
}
/**
 * Pads the number with 0.
 *
 * @param number - A number to pad.
 *
 * @return string - Padded number.
 */


function pad(number) {
  return number < 10 ? "0" + number : "" + number;
}
/**
 * Stores unique IDs.
 *
 * @since 3.0.0
 */


var ids = {};
/**
 * Returns a sequential unique ID as "{ prefix }-{ number }".
 *
 * @param prefix - A prefix for the ID.
 */

function uniqueId(prefix) {
  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}
/**
 * The component that collects and handles elements which the slider consists of.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Elements component object.
 */


function Elements(Splide, Components, options) {
  var _EventInterface = EventInterface(Splide),
      on = _EventInterface.on;

  var root = Splide.root;
  var elements = {};
  /**
   * Stores all slide elements.
   */

  var slides = [];
  /**
   * Stores all root classes.
   */

  var classes;
  /**
   * The slider element that may be `undefined`.
   */

  var slider;
  /**
   * The track element.
   */

  var track;
  /**
   * The list element.
   */

  var list;
  /**
   * Called when the component is constructed.
   */

  function setup() {
    collect();
    identify();
    addClass(root, classes = getClasses());
  }
  /**
   * Called when the component is mounted.
   */


  function mount() {
    on(EVENT_REFRESH, refresh);
    on(EVENT_UPDATED, update);
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    empty(slides);
    removeClass(root, classes);
  }
  /**
   * Recollects slide elements.
   */


  function refresh() {
    destroy();
    setup();
  }
  /**
   * Updates the status of elements.
   */


  function update() {
    removeClass(root, classes);
    addClass(root, classes = getClasses());
  }
  /**
   * Collects elements which the slider consists of.
   */


  function collect() {
    slider = child(root, "." + CLASS_SLIDER);
    track = query(root, "." + CLASS_TRACK);
    list = child(track, "." + CLASS_LIST);
    assert(track && list, 'Missing a track/list element.');
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
      prev: query(arrows, "." + CLASS_ARROW_PREV),
      next: query(arrows, "." + CLASS_ARROW_NEXT),
      bar: query(find("." + CLASS_PROGRESS), "." + CLASS_PROGRESS_BAR),
      play: query(autoplay, "." + CLASS_PLAY),
      pause: query(autoplay, "." + CLASS_PAUSE)
    });
  }
  /**
   * Assigns unique IDs to essential elements.
   */


  function identify() {
    var id = root.id || uniqueId(PROJECT_CODE);
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";
  }
  /**
   * Finds an element only in children of the root or slider element.
   *
   * @return {Element} - A found element or undefined.
   */


  function find(selector) {
    return child(root, selector) || child(slider, selector);
  }
  /**
   * Return an array with classes for the root element.
   *
   * @return An array with classes.
   */


  function getClasses() {
    return [CLASS_ROOT + "--" + options.type, CLASS_ROOT + "--" + options.direction, options.drag && CLASS_ROOT + "--draggable", options.isNavigation && CLASS_ROOT + "--nav", CLASS_ACTIVE];
  }

  return assign(elements, {
    setup: setup,
    mount: mount,
    destroy: destroy
  });
}
/**
 * The component for managing styles of the slider.
 *
 * @since 3.0.0
 *
 * @return A Style component object.
 */


function Style() {
  /**
   * The style element for the slider.
   */
  var style;
  /**
   * The CSSStyleSheet object of the created style element.
   */

  var sheet;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    style = create('style', {}, document.head);
    sheet = style.sheet;
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    remove(style);
    sheet = null;
  }
  /**
   * Registers the style for the selector.
   *
   * @param selector - A selector string.
   * @param prop     - A CSS property, accepting the camel case.
   * @param value    - A CSS value.
   */


  function rule(selector, prop, value) {
    var _sheet = sheet,
        cssRules = _sheet.cssRules;
    var cssRule = find(cssRules, function (cssRule) {
      return isCSSStyleRule(cssRule) && cssRule.selectorText === selector;
    }) || cssRules[sheet.insertRule(selector + "{}", 0)];

    if (isCSSStyleRule(cssRule)) {
      cssRule.style[prop] = "" + value;
    }
  }
  /**
   * Registers the style by the element or the ID.
   *
   * @param target - A target element or ID.
   * @param prop   - A CSS property, accepting the camel case.
   * @param value  - A CSS value.
   */


  function ruleBy(target, prop, value) {
    rule("#" + (isHTMLElement(target) ? target.id : target), prop, value);
  }
  /**
   * Checks if the provided rule is a CSSStyleRule instance or not.
   *
   * @param cssRule - An instance to check.
   *
   * @return `true` if the cssRule is an instance of CSSStyleRule, or otherwise `false`.
   */


  function isCSSStyleRule(cssRule) {
    return cssRule instanceof CSSStyleRule;
  }

  return {
    mount: mount,
    destroy: destroy,
    rule: rule,
    ruleBy: ruleBy
  };
}

var ROLE = 'role';
var ARIA_CONTROLS = 'aria-controls';
var ARIA_CURRENT = 'aria-current';
var ARIA_LABEL = 'aria-label';
var ARIA_HIDDEN = 'aria-hidden';
var TAB_INDEX = 'tabindex';
var DISABLED = 'disabled';
/**
 * The array with all attributes.
 *
 * @since 3.0.0
 */

var ALL_ATTRIBUTES = [ROLE, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_HIDDEN, TAB_INDEX, DISABLED];
/**
 * The type for the regular slider.
 *
 * @since 3.0.0
 */

var SLIDE = 'slide';
/**
 * The type for the carousel slider.
 *
 * @since 3.0.0
 */

var LOOP = 'loop';
/**
 * The type for the fade slider that can not have multiple slides in a page.
 *
 * @since 3.0.0
 */

var FADE = 'fade';
/**
 * The sub component for managing each slide.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param index      - A slide index.
 * @param slideIndex - A slide index for clones. This must be `-1` if the slide is not clone.
 * @param slide      - A slide element.
 *
 * @return A Slide sub component.
 */

function Slide$1(Splide, index, slideIndex, slide) {
  var _EventInterface2 = EventInterface(Splide),
      on = _EventInterface2.on,
      emit = _EventInterface2.emit,
      bind = _EventInterface2.bind,
      destroyEvents = _EventInterface2.destroy;

  var Components = Splide.Components,
      root = Splide.root,
      options = Splide.options;
  var isNavigation = options.isNavigation,
      updateOnMove = options.updateOnMove;
  var resolve = Components.Direction.resolve;
  var isClone = slideIndex > -1;
  var container = child(slide, "." + CLASS_CONTAINER);
  /**
   * Called when the component is mounted.
   */

  function mount() {
    var _this2 = this;

    init();
    bind(slide, 'click keydown', function (e) {
      emit(e.type === 'click' ? EVENT_CLICK : EVENT_SLIDE_KEYDOWN, _this2, e);
    });
    on(EVENT_MOUNTED, onMounted.bind(this));
  }
  /**
   * Called after all components are mounted.
   * Updating the status on mount is too early to notify other components of the active slide.
   */


  function onMounted() {
    var boundUpdate = update.bind(this);
    boundUpdate();
    on([EVENT_MOVED, EVENT_UPDATED, EVENT_RESIZED, EVENT_SCROLLED], boundUpdate);

    if (updateOnMove) {
      on(EVENT_MOVE, onMove.bind(this));
    }
  }
  /**
   * If the `updateOnMove` option is `true`, called when the slider starts moving.
   *
   * @param next - A next index.
   * @param prev - A previous index.
   * @param dest - A destination index.
   */


  function onMove(next, prev, dest) {
    if (dest === index) {
      updateActivity.call(this, true);
    }

    update.call(this);
  }
  /**
   * Initializes the component.
   */


  function init() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad(index + 1);
    }

    if (isNavigation) {
      if (!isHTMLButtonElement(slide)) {
        setAttribute(slide, ROLE, 'button');
      }

      var idx = isClone ? slideIndex : index;
      var label = format(options.i18n.slideX, idx + 1);
      var controls = Splide.splides.map(function (splide) {
        return splide.root.id;
      }).join(' ');
      setAttribute(slide, ARIA_LABEL, label);
      setAttribute(slide, ARIA_CONTROLS, controls);
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    destroyEvents();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
  }
  /**
   * Updates attribute and classes of the slide.
   */


  function update() {
    var currIndex = Splide.index;
    updateActivity.call(this, isActive());
    updateVisibility.call(this, isVisible());
    toggleClass(slide, CLASS_PREV, index === currIndex - 1);
    toggleClass(slide, CLASS_NEXT, index === currIndex + 1);
  }
  /**
   * Updates the status related with activity.
   *
   * @param active - Set `true` if the slide is active.
   */


  function updateActivity(active) {
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);

      if (isNavigation) {
        setAttribute(slide, ARIA_CURRENT, active || null);
      }

      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, this);
    }
  }
  /**
   * Updates the status related with visibility.
   *
   * @param visible - Set `true` if the slide is visible.
   */


  function updateVisibility(visible) {
    setAttribute(slide, ARIA_HIDDEN, !visible || null);
    setAttribute(slide, TAB_INDEX, visible && options.slideFocus ? 0 : null);

    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, this);
    }
  }
  /**
   * Adds a CSS rule to the slider or the container.
   *
   * @param prop         - A property name.
   * @param value        - A CSS value to add.
   * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
   */


  function rule(prop, value, useContainer) {
    var selector = "#" + slide.id + (container && useContainer ? " > ." + CLASS_CONTAINER : '');
    Components.Style.rule(selector, prop, value);
  }
  /**
   * Checks if the slide is active or not.
   *
   * @return `true` if the slide is active.
   */


  function isActive() {
    return Splide.index === index;
  }
  /**
   * Checks if the slide is visible or not.
   */


  function isVisible() {
    if (Splide.is(FADE)) {
      return isActive();
    }

    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve('left');
    var right = resolve('right');
    return floor(trackRect[left]) <= slideRect[left] && slideRect[right] <= ceil(trackRect[right]);
  }
  /**
   * Calculates how far this slide is from another slide and
   * returns `true` if the distance is within the given number.
   *
   * @param from     - An index of a base slide.
   * @param distance - `true` if the slide is within this number.
   *
   * @return `true` if the slide is within the `distance` from the base slide, or otherwise `false`.
   */


  function isWithin(from, distance) {
    var diff = abs(from - index);

    if (!Splide.is(SLIDE) && !isClone) {
      diff = min(diff, Splide.length - diff);
    }

    return diff <= distance;
  }

  return {
    index: index,
    slideIndex: slideIndex,
    slide: slide,
    container: container,
    isClone: isClone,
    mount: mount,
    destroy: destroy,
    rule: rule,
    isWithin: isWithin
  };
}
/**
 * The component for managing all slides include clones.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Slides component object.
 */


function Slides(Splide, Components, options) {
  var _EventInterface3 = EventInterface(Splide),
      on = _EventInterface3.on,
      emit = _EventInterface3.emit,
      bind = _EventInterface3.bind;

  var _Components$Elements = Components.Elements,
      slides = _Components$Elements.slides,
      list = _Components$Elements.list;
  /**
   * Stores all SlideComponent objects.
   */

  var Slides = [];
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    on(EVENT_REFRESH, refresh);
  }
  /**
   * Initializes the component.
   */


  function init() {
    slides.forEach(function (slide, index) {
      register(slide, index, -1);
    });
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    forEach$1(function (Slide) {
      Slide.destroy();
    });
    empty(Slides);
  }
  /**
   * Discards all Slide components and regenerates them.
   */


  function refresh() {
    destroy();
    init();
  }
  /**
   * Registers a slide element and creates a Slide object.
   *
   * @param slide      - A slide element to register.
   * @param index      - A slide index.
   * @param slideIndex - A slide index for clones. This must be `-1` for regular slides.
   */


  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide, index, slideIndex, slide);
    object.mount();
    Slides.push(object);
  }
  /**
   * Returns all Slide objects.
   *
   * @param excludeClones - Optional. Determines whether to exclude clones or not.
   *
   * @return An array with Slide objects.
   */


  function get(excludeClones) {
    return excludeClones ? filter(function (Slide) {
      return !Slide.isClone;
    }) : Slides;
  }
  /**
   * Returns slides in the specified page.
   *
   * @param page - A page index.
   *
   * @return An array with slides that belong to the page.
   */


  function getIn(page) {
    var Controller = Components.Controller;
    var index = Controller.toIndex(page);
    var max = Controller.hasFocus() ? 1 : options.perPage;
    return filter(function (Slide) {
      return between(Slide.index, index, index + max - 1);
    });
  }
  /**
   * Returns a Slide object at the specified index.
   *
   * @param index - A slide index.
   *
   * @return A Slide object if available, or otherwise `undefined`.
   */


  function getAt(index) {
    return filter(index)[0];
  }
  /**
   * Inserts a slide or slides at a specified index.
   *
   * @param items - A slide element, an HTML string or an array with them.
   * @param index - Optional. An index to insert the slide at. If omitted, appends it to the list.
   */


  function add(items, index) {
    forEach(items, function (slide) {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }

      if (isHTMLElement(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, emit.bind(null, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  /**
   * Removes slides that match the matcher
   * that can be an index, an array with indices, a selector, or an iteratee function.
   *
   * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
   */


  function remove$1(matcher) {
    remove(filter(matcher).map(function (Slide) {
      return Slide.slide;
    }));
    emit(EVENT_REFRESH);
  }
  /**
   * Iterates over Slide objects by the iteratee function.
   *
   * @param iteratee      - An iteratee function that takes a Slide object, an index and an array with Slides.
   * @param excludeClones - Optional. Determines whether to exclude clones or not.
   */


  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  /**
   * Filters Slides by the matcher
   * that can be an index, an array with indices, a selector, or an predicate function.
   *
   * @param matcher - An index, an array with indices, a selector string, or an predicate function.
   *
   * @return An array with SlideComponent objects.
   */


  function filter(matcher) {
    return Slides.filter(isFunction(matcher) ? matcher : function (Slide) {
      return isString(matcher) ? matches(Slide.slide, matcher) : includes(toArray(matcher), Slide.index);
    });
  }
  /**
   * Adds a CSS rule to all slides or containers.
   *
   * @param prop         - A property name.
   * @param value        - A CSS value to add.
   * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
   */


  function rule(prop, value, useContainer) {
    forEach$1(function (Slide) {
      Slide.rule(prop, value, useContainer);
    });
  }
  /**
   * Invokes the callback after all images in the element are loaded.
   *
   * @param elm      - An element that may contain images.
   * @param callback - A callback function.
   */


  function observeImages(elm, callback) {
    var images = queryAll(elm, 'img');
    var length = images.length;

    if (length) {
      images.forEach(function (img) {
        bind(img, 'load error', function () {
          if (! --length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  /**
   * Returns the length of slides.
   *
   * @param excludeClones - Optional. Determines whether to exclude clones or not.
   *
   * @return The length of slides.
   */


  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides.length;
  }
  /**
   * Checks if the number of slides is over than the `perPage` option, including clones.
   *
   * @return `true` if there are enough slides, or otherwise `false`.
   */


  function isEnough() {
    return Slides.length > options.perPage;
  }

  return {
    mount: mount,
    destroy: destroy,
    register: register,
    get: get,
    getIn: getIn,
    getAt: getAt,
    add: add,
    remove: remove$1,
    forEach: forEach$1,
    filter: filter,
    rule: rule,
    getLength: getLength,
    isEnough: isEnough
  };
}
/**
 * The component that generates clones for the loop slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Clones component object.
 */


function Clones(Splide, Components, options) {
  var _EventInterface4 = EventInterface(Splide),
      on = _EventInterface4.on,
      emit = _EventInterface4.emit;

  var Elements = Components.Elements,
      Slides = Components.Slides;
  var resolve = Components.Direction.resolve;
  var clones = [];
  /**
   * Keeps the current number of clones.
   */

  var cloneCount;
  /**
   * The index used for generating IDs.
   */

  var cloneIndex;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    on(EVENT_REFRESH, refresh);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
  }
  /**
   * Removes all clones if available, and generates new clones.
   */


  function init() {
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
    }
  }
  /**
   * Destroys clones.
   */


  function destroy() {
    remove(clones);
    empty(clones);
  }
  /**
   * Discards all clones and regenerates them.
   * Must do this before the Elements component collects slide elements.
   */


  function refresh() {
    destroy();
    init();
  }
  /**
   * Observes the required clone count and refreshes the slider if necessary.
   */


  function observe() {
    if (cloneCount !== computeCloneCount()) {
      emit(EVENT_REFRESH);
    }
  }
  /**
   * Generates the specified number of clones.
   *
   * @param count - The number of clones to generate for each side.
   */


  function generate(count) {
    var slides = Slides.get().slice();
    var length = slides.length;

    if (length) {
      cloneIndex = 0;

      while (slides.length < count) {
        push(slides, slides);
      }

      slides.slice(-count).concat(slides.slice(0, count)).forEach(function (Slide, index) {
        var isHead = index < count;
        var clone = cloneDeep(Slide.slide);
        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
        push(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }
  /**
   * Deeply clones the provided element with removing the ID attribute.
   *
   * @param elm - An element to clone.
   *
   * @return A cloned element.
   */


  function cloneDeep(elm) {
    var clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide.root.id + "-clone" + pad(++cloneIndex);
    return clone;
  }
  /**
   * Returns the number of elements to generate.
   * This always returns 0 if the slider type is not `'loop'`.
   *
   * @return The number of clones.
   */


  function computeCloneCount() {
    var clones = options.clones;

    if (!Splide.is(LOOP)) {
      clones = 0;
    } else if (!clones) {
      var fixedSize = options[resolve('fixedWidth')];
      var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve('width')] / fixedSize);
      var baseCount = fixedCount || options[resolve('autoWidth')] && Splide.length || options.perPage;
      clones = baseCount * (options.drag ? (options.flickMaxPages || 1) + 1 : 2);
    }

    return clones;
  }

  return {
    mount: mount,
    destroy: destroy
  };
}
/**
 * The component that layouts slider components and provides methods for dimensions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Layout component object.
 */


function Layout(Splide, Components, options) {
  var _EventInterface5 = EventInterface(Splide),
      on = _EventInterface5.on,
      bind = _EventInterface5.bind,
      emit = _EventInterface5.emit;

  var Slides = Components.Slides;
  var ruleBy = Components.Style.ruleBy;
  var resolve = Components.Direction.resolve;
  var _Components$Elements2 = Components.Elements,
      root = _Components$Elements2.root,
      track = _Components$Elements2.track,
      list = _Components$Elements2.list;
  var getAt = Slides.getAt;
  var vertical = options.direction === TTB;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    bind(window, 'resize load', Throttle(emit.bind(this, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  /**
   * Initializes the component on `mount` or `updated`.
   * Uses `max-width` for the root to prevent the slider from exceeding the parent element.
   */


  function init() {
    ruleBy(root, 'maxWidth', unit(options.width));
    ruleBy(track, resolve('paddingLeft'), cssPadding(false));
    ruleBy(track, resolve('paddingRight'), cssPadding(true));
    Slides.rule(resolve('marginRight'), unit(options.gap));
    Slides.rule('width', cssSlideWidth());
    setSlidesHeight();
    resize();
  }
  /**
   * Updates dimensions of some elements when the slider is resized.
   */


  function resize() {
    ruleBy(track, 'height', cssTrackHeight());
    options.heightRatio && setSlidesHeight();
    emit(EVENT_RESIZED);
  }
  /**
   * Updates the height of slides or their container elements if available.
   */


  function setSlidesHeight() {
    Slides.rule('height', cssSlideHeight(), true);
  }
  /**
   * Parses the padding option and returns the value for each side.
   * This method returns `paddingTop` or `paddingBottom` for the vertical slider.
   *
   * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
   *
   * @return The padding value as a CSS string.
   */


  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? 'right' : 'left', true);
    return padding ? unit(padding[prop] || (isObject(padding) ? '0' : padding)) : '';
  }
  /**
   * Returns the height of the track element as a CSS string.
   *
   * @return The height of the track.
   */


  function cssTrackHeight() {
    var height = '';

    if (vertical) {
      height = cssHeight();
      assert(height, '"height" or "heightRatio" is missing.');
      var paddingTop = cssPadding(false);
      var paddingBottom = cssPadding(true);

      if (paddingTop || paddingBottom) {
        height = "calc(" + height;
        height += "" + (paddingTop ? " - " + paddingTop : '') + (paddingBottom ? " - " + paddingBottom : '') + ")";
      }
    }

    return height;
  }
  /**
   * Converts options related with height to a CSS string.
   *
   * @return The height as a CSS string if available, or otherwise an empty string.
   */


  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  /**
   * Returns the width of the slide as a CSS string.
   *
   * @return The width of the slide.
   */


  function cssSlideWidth() {
    return options.autoWidth ? '' : unit(options.fixedWidth) || (vertical ? '' : cssSlideSize());
  }
  /**
   * Returns the height of the slide as a CSS string.
   *
   * @return The height of the slide.
   */


  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? '' : cssSlideSize() : cssHeight());
  }
  /**
   * Returns the CSS string for slide width or height without gap.
   *
   * @return The CSS string for slide width or height.
   */


  function cssSlideSize() {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }
  /**
   * Returns the list width for the horizontal slider, or the height for the vertical slider.
   *
   * @return The size of the track element in pixel.
   */


  function listSize() {
    return rect(list)[resolve('width')];
  }
  /**
   * Returns the slide width for the horizontal slider, or the height for the vertical slider.
   *
   * @param index      - Optional. A slide index.
   * @param withoutGap - Optional. Determines whether to exclude the gap amount or not.
   *
   * @return The size of the specified slide element in pixel.
   */


  function slideSize(index, withoutGap) {
    var Slide = getAt(index || 0);
    return Slide ? rect(Slide.slide)[resolve('width')] + (withoutGap ? 0 : getGap()) : 0;
  }
  /**
   * Returns the total width or height of slides from 0 to the specified index.
   *
   * @param index      - A slide index. If omitted, uses the last index.
   * @param withoutGap - Optional. Determines whether to exclude the last gap or not.
   *
   * @return The total width of slides in the horizontal slider, or the height in the vertical one.
   */


  function totalSize(index, withoutGap) {
    var Slide = getAt(index);

    if (Slide) {
      var right = rect(Slide.slide)[resolve('right')];
      var left = rect(list)[resolve('left')];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }

    return 0;
  }
  /**
   * Returns the slider size without clones.
   *
   * @return The slider size.
   */


  function sliderSize() {
    var firstSlide = getAt(0);
    var lastSlide = getAt(Slides.getLength(true) - 1);

    if (firstSlide && lastSlide) {
      return rect(lastSlide.slide)[resolve('right')] - rect(firstSlide.slide)[resolve('left')];
    }

    return 0;
  }
  /**
   * Returns the gap value.
   *
   *
   * @return The gap value in pixel.
   */


  function getGap() {
    var Slide = getAt(0);
    return Slide ? parseFloat(style(Slide.slide, resolve('marginRight'))) || 0 : 0;
  }
  /**
   * Returns the padding value.
   *
   * @param right - Determines whether to get `paddingRight/Bottom` or `paddingLeft/Top`.
   *
   * @return The padding value in pixel.
   */


  function getPadding(right) {
    return parseFloat(style(track, resolve("padding" + (right ? 'Right' : 'Left'), true))) || 0;
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
/**
 * The component for moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Move component object.
 */


function Move(Splide, Components, options) {
  var _EventInterface6 = EventInterface(Splide),
      on = _EventInterface6.on,
      emit = _EventInterface6.emit;

  var _Components$Layout = Components.Layout,
      slideSize = _Components$Layout.slideSize,
      getPadding = _Components$Layout.getPadding,
      totalSize = _Components$Layout.totalSize,
      listSize = _Components$Layout.listSize,
      sliderSize = _Components$Layout.sliderSize;
  var _Components$Direction = Components.Direction,
      resolve = _Components$Direction.resolve,
      orient = _Components$Direction.orient;
  var _Components$Elements3 = Components.Elements,
      list = _Components$Elements3.list,
      track = _Components$Elements3.track;
  /**
   * Indicates whether the slider is just looping or not.
   */

  var looping;
  /**
   * Indicates whether the component can move the slider or not.
   */

  var waiting;
  /**
   * Keeps the current position.
   */

  var currPosition = 0;
  /**
   * Keeps the rate of position to the slider width.
   */

  var positionRate = 0;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    on([EVENT_RESIZE, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  /**
   * Repositions the slider.
   */


  function reposition() {
    if (options.drag !== 'free') {
      jump(Splide.index);
    } else {
      if (!options[resolve('fixedWidth')] && !options[resolve('autoWidth')]) {
        translate(listSize() * positionRate);
      }

      if (isExceededMax(currPosition)) {
        translate(getLimit(true));
      }
    }
  }
  /**
   * Goes to the slide at the specified index with the Transition component.
   *
   * @param dest  - A destination index to go to.
   * @param index - A slide index.
   * @param prev  - A previous index.
   */


  function move(dest, index, prev) {
    if (!isBusy()) {
      var position = getPosition();
      looping = dest !== index;
      waiting = options.waitForTransition;
      Splide.state.set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Components.Transition.start(dest, function () {
        onMoved(dest, index, prev, position);
      });
    }
  }
  /**
   * Called after the transition ends.
   *
   * @param dest        - A destination index to go to.
   * @param index       - A slide index.
   * @param prev        - A previous index.
   * @param oldPosition - An old position.
   */


  function onMoved(dest, index, prev, oldPosition) {
    if (looping) {
      jump(index);
      looping = false;
    }

    waiting = false;
    Splide.state.set(IDLE);
    emit(EVENT_MOVED, index, prev, dest);

    if (options.trimSpace === 'move' && dest !== prev && oldPosition === getPosition()) {
      Components.Controller.go(dest > prev ? '>' : '<');
    }
  }
  /**
   * Jumps to the slide at the specified index.
   *
   * @param index - An index to jump to.
   */


  function jump(index) {
    translate(toPosition(index, true));
  }
  /**
   * Moves the slider to the specified position.
   *
   * @param position - The destination.
   */


  function translate(position) {
    currPosition = loop(position);
    positionRate = currPosition / listSize();
    Components.Style.ruleBy(list, 'transform', "translate" + resolve('X') + "(" + currPosition + "px)");
  }
  /**
   * Loops the provided position if it exceeds limits.
   *
   * @param position - A position to loop.
   */


  function loop(position) {
    if (!looping && Splide.is(LOOP)) {
      var diff = position - currPosition;
      var exceededMin = isExceededMin(position);
      var exceededMax = isExceededMax(position);

      if (exceededMin && diff > 0 || exceededMax && diff < 0) {
        position += orient(sliderSize() * (exceededMin ? 1 : -1));
      }
    }

    return position;
  }
  /**
   * Cancels transition.
   */


  function cancel() {
    translate(getPosition());
    Components.Transition.cancel();
  }
  /**
   * Returns the closest index to the position.
   *
   * @param position - A position to convert.
   *
   * @return The closest index to the position.
   */


  function toIndex(position) {
    var Slides = Components.Slides.get();
    var index = 0;
    var minDistance = Infinity;

    for (var i = 0; i < Slides.length; i++) {
      var slideIndex = Slides[i].index;
      var distance = abs(toPosition(slideIndex) - position);

      if (distance < minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }

    return index;
  }
  /**
   * Converts the slide index to the position.
   *
   * @param index    - An index to convert.
   * @param trimming - Optional. Whether to trim edge spaces or not.
   *
   * @return The position corresponding with the index.
   */


  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  /**
   * Returns the current position.
   *
   * @return The position of the list element.
   */


  function getPosition() {
    var left = resolve('left');
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  /**
   * Trims spaces on the edge of the slider.
   *
   * @param position - A position to trim.
   *
   * @return A trimmed position.
   */


  function trim(position) {
    if (options.trimSpace && Splide.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize() - listSize()));
    }

    return position;
  }
  /**
   * Returns the offset amount.
   *
   * @param index - An index.
   */


  function offset(index) {
    var focus = options.focus;

    if (focus === 'center') {
      return (listSize() - slideSize(index, true)) / 2;
    }

    return (+focus || 0) * slideSize(index);
  }
  /**
   * Returns the limit number that the slider can move to.
   *
   * @param max - Determines whether to return the maximum or minimum limit.
   *
   * @return The border number.
   */


  function getLimit(max) {
    var trimming = !!options.trimSpace;
    return max ? toPosition(Components.Controller.getEnd(), trimming) : toPosition(0, trimming);
  }
  /**
   * Checks if the slider can move now or not.
   *
   * @return `true` if the slider can move, or otherwise `false`.
   */


  function isBusy() {
    return !!(looping || waiting);
  }
  /**
   * Checks if the provided position exceeds the minimum limit or not.
   *
   * @param position - A position to test.
   * @param offset   - Optional. Offsets the limit in pixel.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */


  function isExceededMin(position, offset) {
    return orient(position) + (offset || 0) < orient(getLimit(false));
  }
  /**
   * Checks if the provided position exceeds the maximum limit or not.
   *
   * @param position - A position to test.
   * @param offset   - Optional. Offsets the limit in pixel.
   *
   * @return `true` if the position exceeds the limit, or otherwise `false`.
   */


  function isExceededMax(position, offset) {
    return orient(position) + (offset || 0) > orient(getLimit(true));
  }
  /**
   * Checks if the slider position exceeds borders or not.
   *
   * @return `true` if the position is over borders, or otherwise `false`.
   */


  function isExceeded() {
    return isExceededMin(currPosition) || isExceededMax(currPosition);
  }

  return {
    mount: mount,
    move: move,
    jump: jump,
    translate: translate,
    cancel: cancel,
    toIndex: toIndex,
    toPosition: toPosition,
    getPosition: getPosition,
    getLimit: getLimit,
    isBusy: isBusy,
    isExceededMin: isExceededMin,
    isExceededMax: isExceededMax,
    isExceeded: isExceeded
  };
}
/**
 * The component for controlling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Controller component object.
 */


function Controller(Splide, Components, options) {
  var _EventInterface7 = EventInterface(Splide),
      on = _EventInterface7.on;

  var Move = Components.Move;
  var _Components$Slides = Components.Slides,
      isEnough = _Components$Slides.isEnough,
      getLength = _Components$Slides.getLength;
  var isLoop = Splide.is(LOOP);
  /**
   * The current index.
   */

  var currIndex = options.start || 0;
  /**
   * The previous index.
   */

  var prevIndex = currIndex;
  /**
   * The latest number of slides.
   */

  var slideCount;
  /**
   * The latest `perMove` value.
   */

  var perMove;
  /**
   * The latest `perMove` value.
   */

  var perPage;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    Move.jump(currIndex);
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_SCROLLED, function () {
      setIndex(Move.toIndex(Move.getPosition()));
    }, 0);
  }
  /**
   * Initializes the component.
   */


  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
  }
  /**
   * Moves the slider by the control pattern.
   *
   * @see `Splide#go()`
   *
   * @param control        - A control pattern.
   * @param allowSameIndex - Optional. Determines whether to allow to go to the current index or not.
   */


  function go(control, allowSameIndex) {
    var dest = parse(control);
    var index = loop(dest);

    if (index > -1 && !Move.isBusy() && (allowSameIndex || index !== currIndex)) {
      setIndex(index);
      Move.move(dest, index, prevIndex);
    }
  }
  /**
   * Parses the control and returns a slide index.
   *
   * @param control - A control pattern to parse.
   */


  function parse(control) {
    var index = currIndex;

    if (isString(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [],
          indicator = _ref[1],
          number = _ref[2];

      if (indicator === '+' || indicator === '-') {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex, true);
      } else if (indicator === '>') {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === '<') {
        index = getPrev(true);
      }
    } else {
      if (isLoop) {
        index = clamp(control, -perPage, slideCount + perPage - 1);
      } else {
        index = clamp(control, 0, getEnd());
      }
    }

    return index;
  }
  /**
   * Returns a next destination index.
   *
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return A next index if available, or otherwise `-1`.
   */


  function getNext(destination) {
    return getAdjacent(false, destination);
  }
  /**
   * Returns a previous destination index.
   *
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return A previous index if available, or otherwise `-1`.
   */


  function getPrev(destination) {
    return getAdjacent(true, destination);
  }
  /**
   * Returns an adjacent destination index.
   *
   * @param prev        - Determines whether to return a previous or next index.
   * @param destination - Optional. Determines whether to get a destination index or a slide one.
   *
   * @return An adjacent index if available, or otherwise `-1`.
   */


  function getAdjacent(prev, destination) {
    var dest = computeDestIndex(currIndex + getPerMove() * (prev ? -1 : 1), currIndex);
    return destination ? dest : loop(dest);
  }
  /**
   * Converts the desired destination index to the valid one.
   * - This may return clone indices if the editor is the loop mode,
   *   or `-1` if there is no slide to go.
   * - There are still slides where the slider can go if borders are between `from` and `dest`.
   *
   * @param dest        - The desired destination.
   * @param from        - A base index.
   * @param incremental - Optional. Whether the control is incremental or not.
   *
   * @return A converted destination index, including clones.
   */


  function computeDestIndex(dest, from, incremental) {
    if (isEnough()) {
      var end = getEnd(); // Will overrun:

      if (dest < 0 || dest > end) {
        if (between(0, dest, from, true) || between(end, from, dest, true)) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = perMove ? dest : dest < 0 ? -(slideCount % perPage || perPage) : slideCount;
          } else if (options.rewind) {
            dest = dest < 0 ? end : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (!isLoop && !incremental && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }

    return dest;
  }
  /**
   * Returns the end index where the slider can go.
   * For example, if the slider has 10 slides and the `perPage` option is 3,
   * the slider can go to the slide 8 (the index is 7).
   *
   * @return An end index.
   */


  function getEnd() {
    var end = slideCount - perPage;

    if (hasFocus() || isLoop && perMove) {
      end = slideCount - 1;
    }

    return max(end, 0);
  }
  /**
   * Loops the provided index only in the loop mode.
   *
   * @param index - An index to loop.
   *
   * @return A looped index.
   */


  function loop(index) {
    if (isLoop) {
      return isEnough() ? index % slideCount + (index < 0 ? slideCount : 0) : -1;
    }

    return index;
  }
  /**
   * Converts the page index to the slide index.
   *
   * @param page - A page index to convert.
   *
   * @return A slide index.
   */


  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, getEnd());
  }
  /**
   * Converts the slide index to the page index.
   *
   * @param index - An index to convert.
   */


  function toPage(index) {
    if (!hasFocus()) {
      index = between(index, slideCount - perPage, slideCount - 1) ? slideCount - 1 : index;
      index = floor(index / perPage);
    }

    return index;
  }
  /**
   * Returns the number of slides to move for '>' and '<'.
   *
   * @return The number of slides to move.
   */


  function getPerMove() {
    return perMove || hasFocus() ? 1 : perPage;
  }
  /**
   * Sets a new index and retains old one.
   *
   * @param index - A new index to set.
   */


  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  /**
   * Returns the current/previous index slide index.
   *
   * @param prev - Optional. Whether to return previous index or not.
   */


  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  /**
   * Verifies if the focus option is available or not.
   *
   * @return `true` if the slider has the focus option.
   */


  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }

  return {
    mount: mount,
    go: go,
    getNext: getNext,
    getPrev: getPrev,
    getEnd: getEnd,
    setIndex: setIndex,
    getIndex: getIndex,
    toIndex: toIndex,
    toPage: toPage,
    hasFocus: hasFocus
  };
}
/**
 * The namespace for SVG elements.
 */


var XML_NAME_SPACE = 'http://www.w3.org/2000/svg';
/**
 * The arrow path.
 */

var PATH = 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z';
/**
 * SVG width and height.
 */

var SIZE = 40;
/**
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Arrows component object.
 */

function Arrows(Splide, Components, options) {
  var _EventInterface8 = EventInterface(Splide),
      on = _EventInterface8.on,
      bind = _EventInterface8.bind,
      emit = _EventInterface8.emit;

  var classes = options.classes,
      i18n = options.i18n;
  var Elements = Components.Elements,
      Controller = Components.Controller;
  var slider = Elements.slider,
      track = Elements.track;
  /**
   * The wrapper element.
   */

  var wrapper = Elements.arrows;
  /**
   * The previous arrow element.
   */

  var prev = Elements.prev;
  /**
   * The next arrow element.
   */

  var next = Elements.next;
  /**
   * Indicates whether the component creates arrows or retrieved from the DOM.
   */

  var created;
  /**
   * An object with previous and next arrows.
   */

  var arrows = {};
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    on(EVENT_UPDATED, init);
  }
  /**
   * Initializes the component.
   */


  function init() {
    if (options.arrows) {
      if (!prev || !next) {
        createArrows();
      }
    }

    if (prev && next) {
      if (!arrows.prev) {
        setAttribute(prev, ARIA_CONTROLS, track.id);
        setAttribute(next, ARIA_CONTROLS, track.id);
        arrows.prev = prev;
        arrows.next = next;
        listen();
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      } else {
        display(wrapper, options.arrows === false ? 'none' : '');
      }
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    if (created) {
      remove(wrapper);
    } else {
      removeAttribute(prev, ALL_ATTRIBUTES);
      removeAttribute(next, ALL_ATTRIBUTES);
    }
  }
  /**
   * Listens to some events.
   */


  function listen() {
    var go = Controller.go;
    on([EVENT_MOUNTED, EVENT_MOVE, EVENT_UPDATED, EVENT_REFRESH, EVENT_SCROLLED], update);
    bind(next, 'click', function () {
      go('>');
    });
    bind(prev, 'click', function () {
      go('<');
    });
  }
  /**
   * Create arrows and append them to the slider.
   */


  function createArrows() {
    var parent = options.arrows === 'slider' && slider ? slider : Splide.root;
    wrapper = create('div', classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    before(wrapper, child(parent));
  }
  /**
   * Creates an arrow button.
   *
   * @param prev - Determines whether to create a previous or next arrow.
   *
   * @return A created button element.
   */


  function createArrow(prev) {
    var arrow = "<button class=\"" + classes.arrow + " " + (prev ? classes.prev : classes.next) + "\" type=\"button\">" + ("<svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\">") + ("<path d=\"" + (options.arrowPath || PATH) + "\" />");
    return parseHtml(arrow);
  }
  /**
   * Updates status of arrows, such as `disabled` and `aria-label`.
   */


  function update() {
    var index = Splide.index;
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
/**
 * The component for auto playing sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Autoplay component object.
 */


function Autoplay(Splide, Components, options) {
  var _EventInterface9 = EventInterface(Splide),
      on = _EventInterface9.on,
      bind = _EventInterface9.bind,
      emit = _EventInterface9.emit;

  var _Components$Elements4 = Components.Elements,
      root = _Components$Elements4.root,
      track = _Components$Elements4.track,
      bar = _Components$Elements4.bar,
      playButton = _Components$Elements4.play,
      pauseButton = _Components$Elements4.pause;
  var interval = RequestInterval(options.interval, Splide.go.bind(Splide, '>'), update);
  var isPaused = interval.isPaused;
  /**
   * Indicates whether the slider is hovered or not.
   */

  var hovered;
  /**
   * Indicates whether one of slider elements has focus or not.
   */

  var focused;
  /**
   * Turns into `true` when autoplay is manually paused.
   */

  var paused;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    var autoplay = options.autoplay;

    if (autoplay) {
      initButton(true);
      initButton(false);
      listen();

      if (autoplay !== 'pause') {
        play();
      }
    }
  }
  /**
   * Initializes a play/pause button.
   *
   * @param forPause - Determines whether to initialize a pause or play button.
   */


  function initButton(forPause) {
    var button = forPause ? pauseButton : playButton;

    if (button) {
      if (!isHTMLButtonElement(button)) {
        setAttribute(button, ROLE, 'button');
      }

      setAttribute(button, ARIA_CONTROLS, track.id);
      setAttribute(button, ARIA_LABEL, options.i18n[forPause ? 'pause' : 'play']);
      bind(button, 'click', forPause ? pause : play);
    }
  }
  /**
   * Listens to some events.
   */


  function listen() {
    if (options.pauseOnHover) {
      bind(root, 'mouseenter mouseleave', function (e) {
        hovered = e.type === 'mouseenter';
        autoToggle();
      });
    }

    if (options.pauseOnFocus) {
      bind(root, 'focusin focusout', function (e) {
        focused = e.type === 'focusin';
        autoToggle();
      });
    }

    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
  }
  /**
   * Starts autoplay and clears all flags.
   */


  function play() {
    if (isPaused() && Components.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = false;
      hovered = false;
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  /**
   * Pauses autoplay.
   *
   * @param manual - If `true`, autoplay keeps paused until `play()` is explicitly called.
   */


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
  /**
   * Toggles play/pause according to current flags.
   * If autoplay is manually paused, this will do nothing.
   */


  function autoToggle() {
    if (!paused) {
      if (!hovered && !focused) {
        play();
      } else {
        pause(false);
      }
    }
  }
  /**
   * Called on every animation frame when auto playing.
   *
   * @param rate - The progress rate between 0 to 1.
   */


  function update(rate) {
    emit(EVENT_AUTOPLAY_PLAYING, rate);

    if (bar) {
      style(bar, {
        width: rate * 100 + "%"
      });
    }
  }

  return {
    mount: mount,
    destroy: interval.cancel,
    play: play,
    pause: pause,
    isPaused: isPaused
  };
}
/**
 * The component for setting the image as the slide background.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Cover component object.
 */


function Cover(Splide, Components, options) {
  var _EventInterface10 = EventInterface(Splide),
      on = _EventInterface10.on;
  /**
   * Called when the component is mounted.
   */


  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, function (img, Slide) {
        toggle(true, img, Slide);
      });
      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply.bind(null, true));
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    apply(false);
  }
  /**
   * Sets/removes the background image to/from all slides.
   *
   * @param cover - If `false`, removes the background image.
   */


  function apply(cover) {
    Components.Slides.forEach(function (Slide) {
      var img = child(Slide.container || Slide.slide, 'img');

      if (img && img.src) {
        toggle(cover, img, Slide);
      }
    });
  }
  /**
   * Sets/removes the background image to/from the parent element.
   *
   * @param cover - If `false`, removes the background image.
   * @param img   - A target image element.
   * @param Slide - A SlideComponent object where the image belongs.
   */


  function toggle(cover, img, Slide) {
    Slide.rule('background', cover ? "center/cover no-repeat url(\"" + img.src + "\")" : '', true);
    display(img, cover ? 'none' : '');
  }

  return {
    mount: mount,
    destroy: destroy
  };
}
/**
 * Triggers the bounce effect when the diff becomes less than this value.
 *
 * @since 3.0.0
 */


var BOUNCE_DIFF_THRESHOLD = 10;
/**
 * The duration of the bounce effect.
 *
 * @since 3.0.0
 */

var BOUNCE_DURATION = 600;
/**
 * The friction factor.
 *
 * @since 3.0.0
 */

var FRICTION_FACTOR = 0.6;
/**
 * The velocity to calculate the scroll duration.
 *
 * @since 3.0.0
 */

var BASE_VELOCITY = 1.2;
/**
 * The minimum duration of scroll.
 *
 * @since 3.0.0
 */

var MIN_DURATION = 800;
/**
 * The component for scrolling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Scroll component object.
 */

function Scroll(Splide, Components, options) {
  var _EventInterface11 = EventInterface(Splide),
      on = _EventInterface11.on,
      emit = _EventInterface11.emit;

  var Move = Components.Move;
  var getPosition = Move.getPosition,
      getLimit = Move.getLimit;
  /**
   * Retains the active RequestInterval object.
   */

  var interval;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  /**
   * Scrolls the slider to the provided destination.
   *
   * @param destination        - The destination to scroll to.
   * @param duration           - Optional. The scroll duration. If omitted, calculates it by the distance.
   * @param suppressConstraint - Optional. Whether to suppress constraint process when the slider exceeds bounds.
   */


  function scroll(destination, duration, suppressConstraint) {
    var start = getPosition();
    var friction = 1;
    duration = duration || computeDuration(abs(destination - start));
    clear();
    interval = RequestInterval(duration, onScrolled, function (rate) {
      var position = getPosition();
      var target = start + (destination - start) * easing(rate);
      var diff = (target - getPosition()) * friction;
      Move.translate(position + diff);

      if (Splide.is(SLIDE) && !suppressConstraint && Move.isExceeded()) {
        friction *= FRICTION_FACTOR;

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          bounce(Move.isExceededMin(getPosition()));
        }
      }
    }, 1);
    emit(EVENT_SCROLL);
    interval.start();
  }
  /**
   * Triggers the bounce effect when the slider reaches bounds.
   *
   * @param backwards - The direction the slider is going towards.
   */


  function bounce(backwards) {
    scroll(getLimit(!backwards), BOUNCE_DURATION, true);
  }
  /**
   * Called when scroll ends or is canceled.
   */


  function onScrolled() {
    emit(EVENT_SCROLLED);
  }
  /**
   * Computes the scroll duration by the distance and the base velocity.
   *
   * @param distance - Distance in pixel.
   *
   * @return The duration for scroll.
   */


  function computeDuration(distance) {
    return max(distance / BASE_VELOCITY, MIN_DURATION);
  }
  /**
   * Clears the active interval.
   */


  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  /**
   * Cancels the active interval and emits the `scrolled` event.
   */


  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onScrolled();
    }
  }
  /**
   * The easing function.
   *
   * @param t - A value to ease.
   *
   * @return An eased value.
   */


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
/**
 * The power of the friction.
 *
 * @since 3.0.0
 */


var FRICTION = 5;
/**
 * If the user stops dragging for this duration with keeping the pointer down, updates the base coord and time.
 *
 * @since 3.0.0
 */

var SAMPLING_INTERVAL = 50;
/**
 * Start events for dragging.
 *
 * @since 3.0.0
 */

var POINTER_DOWN_EVENTS = 'touchstart mousedown';
/**
 * Update events for dragging.
 *
 * @since 3.0.0
 */

var POINTER_MOVE_EVENTS = 'touchmove mousemove';
/**
 * End events for dragging.
 *
 * @since 3.0.0
 */

var POINTER_UP_EVENTS = 'touchend touchcancel mouseup mouseleave';
/**
 * The component for dragging the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Drag component object.
 */

function Drag(Splide, Components, options) {
  var _EventInterface12 = EventInterface(Splide),
      emit = _EventInterface12.emit,
      bind = _EventInterface12.bind,
      unbind = _EventInterface12.unbind;

  var track = Components.Elements.track;
  var _Components$Direction2 = Components.Direction,
      resolve = _Components$Direction2.resolve,
      orient = _Components$Direction2.orient;
  var listSize = Components.Layout.listSize;
  var _Components$Controlle = Components.Controller,
      go = _Components$Controlle.go,
      getEnd = _Components$Controlle.getEnd;
  var Move = Components.Move,
      Scroll = Components.Scroll;
  var translate = Move.translate,
      toIndex = Move.toIndex,
      getPosition = Move.getPosition,
      isExceeded = Move.isExceeded;
  var isSlide = Splide.is(SLIDE);
  var isFade = Splide.is(FADE);
  var isFree = options.drag === 'free';
  /**
   * The coord where a pointer becomes active.
   */

  var startCoord;
  /**
   * Keeps the last time when the component detects dragging.
   */

  var lastTime;
  /**
   * The base slider position where the diff of coords is applied.
   */

  var basePosition;
  /**
   * The base coord to calculate the diff of coords.
   */

  var baseCoord;
  /**
   * The base time when the base position and the base coord are saved.
   */

  var baseTime;
  /**
   * Keeps the last TouchEvent/MouseEvent object.
   */

  var lastEvent;
  /**
   * Indicates whether the user is dragging the slider or not.
   */

  var moving;
  /**
   * Indicates whether the user drags the slider by the mouse or not.
   */

  var isMouse;
  /**
   * The target element to attach listeners.
   */

  var target;
  /**
   * Indicates whether the slider exceeds borders or not.
   */

  var exceeded;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    if (options.drag) {
      bind(track, POINTER_DOWN_EVENTS, onPointerDown);
    }
  }
  /**
   * Called when the user clicks or touches the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */


  function onPointerDown(e) {
    isMouse = e.type === 'mousedown';
    target = isMouse ? window : track;

    if (!(isMouse && e.button)) {
      if (!Move.isBusy()) {
        bind(target, POINTER_MOVE_EVENTS, onPointerMove);
        bind(target, POINTER_UP_EVENTS, onPointerUp);
        Move.cancel();
        Scroll.cancel();
        startCoord = getCoord(e);
      } else {
        prevent(e);
      }
    }
  }
  /**
   * Called while the user moves the pointer on the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */


  function onPointerMove(e) {
    if (e.cancelable) {
      var _min = options.dragMinThreshold || 15;

      if (isMouse || abs(getCoord(e) - startCoord) > _min) {
        moving = true;
        onDrag();
      }

      if (moving) {
        onDragging(e);
        prevent(e, true);
      }
    } else {
      onPointerUp(e);
    }
  }
  /**
   * Called when the user releases pointing devices.
   * Be aware that the TouchEvent object provided by the `touchend` does not contain `Touch` objects,
   * which means the last touch position is not available.
   *
   * @param e - A TouchEvent or MouseEvent object
   */


  function onPointerUp(e) {
    unbind(target, POINTER_MOVE_EVENTS + " " + POINTER_UP_EVENTS);
    moving = false;

    if (lastEvent) {
      onDragged(e);
      lastEvent = null;
    }
  }
  /**
   * Called when the user starts dragging the slider.
   */


  function onDrag() {
    bind(track, 'click', function (e) {
      unbind(track, 'click');
      prevent(e, true);
    }, {
      capture: true
    });
    emit(EVENT_DRAG);
  }
  /**
   * Called while the user is dragging the slider.
   *
   * @param e - A TouchEvent or MouseEvent object
   */


  function onDragging(e) {
    var timeStamp = e.timeStamp;
    var expired = !lastTime || timeStamp - lastTime > SAMPLING_INTERVAL;

    if (expired || isExceeded() !== exceeded) {
      basePosition = getPosition();
      baseCoord = getCoord(e);
      baseTime = timeStamp;
    }

    exceeded = isExceeded();
    lastTime = timeStamp;
    lastEvent = e;

    if (!isFade) {
      translate(basePosition + constrain(getCoord(e) - baseCoord));
    }

    emit(EVENT_DRAGGING);
  }
  /**
   * Called when the user finishes dragging.
   *
   * @param e - A TouchEvent or MouseEvent object
   */


  function onDragged(e) {
    var velocity = computeVelocity(e);

    if (isFade) {
      go(Splide.index + orient(sign(velocity)));
    } else {
      var destination = computeDestination(velocity);

      if (isFree) {
        Scroll.scroll(destination);
      } else {
        go(computeIndex(destination), true);
      }
    }

    lastTime = 0;
    emit(EVENT_DRAGGED);
  }
  /**
   * Computes the drag velocity.
   *
   * @param e - A TouchEvent or MouseEvent object
   *
   * @return The drag velocity.
   */


  function computeVelocity(e) {
    if (Splide.is(LOOP) || !isExceeded()) {
      var diffCoord = getCoord(lastEvent) - baseCoord;
      var diffTime = lastEvent.timeStamp - baseTime;
      var isFlick = e.timeStamp - lastTime < SAMPLING_INTERVAL;

      if (diffTime && isFlick) {
        return diffCoord / diffTime;
      }
    }

    return 0;
  }
  /**
   * Computes the destination by the velocity and the `flickPower` option.
   *
   * @param velocity - The drag velocity.
   *
   * @return The destination.
   */


  function computeDestination(velocity) {
    var flickPower = options.flickPower || 600;
    return getPosition() + sign(velocity) * min(abs(velocity) * flickPower, isFree ? Infinity : listSize() * (options.flickMaxPages || 1));
  }
  /**
   * Converts the destination to the slide index.
   *
   * @param destination - The target destination.
   *
   * @return The destination index.
   */


  function computeIndex(destination) {
    var dest = toIndex(destination);
    return isSlide ? clamp(dest, 0, getEnd()) : dest;
  }
  /**
   * Returns the `pageX` and `pageY` coordinates provided by the event.
   * Be aware that IE does not support both TouchEvent and MouseEvent constructors.
   *
   * @param e - A TouchEvent or MouseEvent object.
   *
   * @return A pageX or pageY coordinate.
   */


  function getCoord(e) {
    return (isMouse ? e : e.touches[0])[resolve('pageX')];
  }
  /**
   * Reduces the distance to move by the predefined friction.
   * This does nothing when the slider type is not `slide`, or the position is inside borders.
   *
   * @param diff - Diff to constrain.
   *
   * @return The constrained diff.
   */


  function constrain(diff) {
    return diff / (exceeded && isSlide ? FRICTION : 1);
  }

  return {
    mount: mount
  };
}
/**
 * The collection of arrow keys of IE.
 *
 * @since 3.0.0
 */


var IE_ARROW_KEYS = ['Left', 'Right', 'Up', 'Down'];
/**
 * The component for controlling the slider by keyboards.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Keyboard component object.
 */

function Keyboard(Splide, Components, options) {
  var _EventInterface13 = EventInterface(Splide),
      on = _EventInterface13.on,
      bind = _EventInterface13.bind,
      unbind = _EventInterface13.unbind;

  var root = Components.Elements.root;
  var resolve = Components.Direction.resolve;
  /**
   * The target element of the keyboard event.
   */

  var target;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    on(EVENT_UPDATED, function () {
      destroy();
      init();
    });
  }
  /**
   * Initializes the component.
   */


  function init() {
    var _options$keyboard = options.keyboard,
        keyboard = _options$keyboard === void 0 ? 'global' : _options$keyboard;

    if (keyboard) {
      if (keyboard === 'focused') {
        target = root;
        setAttribute(root, TAB_INDEX, 0);
      } else {
        target = window;
      }

      bind(target, 'keydown', function (e) {
        var key = normalize(e.key);

        if (key === resolve('ArrowLeft')) {
          Splide.go('<');
        } else if (key === resolve('ArrowRight')) {
          Splide.go('>');
        }
      });
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    if (target) {
      unbind(target, 'keydown');

      if (isHTMLElement(target)) {
        removeAttribute(target, TAB_INDEX);
      }
    }
  }
  /**
   * Absorbs the difference of key names among browsers.
   *
   * @param key - A key to normalize.
   *
   * @return A normalized key.
   */


  function normalize(key) {
    return includes(IE_ARROW_KEYS, key) ? "Arrow" + key : key;
  }

  return {
    mount: mount,
    destroy: destroy
  };
}
/**
 * The data attribute for the src value.
 *
 * @since 3.0.0
 */


var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
/**
 * The data attribute for the srcset value.
 *
 * @since 3.0.0
 */

var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
/**
 * The selector string for images to load.
 *
 * @since 3.0.0
 */

var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
/**
 * The component for lazily loading images.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An LazyLoad component object.
 */

function LazyLoad(Splide, Components, options) {
  var _EventInterface14 = EventInterface(Splide),
      on = _EventInterface14.on,
      off = _EventInterface14.off,
      bind = _EventInterface14.bind,
      emit = _EventInterface14.emit;

  var isSequential = options.lazyLoad === 'sequential';
  /**
   * Stores data of images.
   */

  var images = [];
  /**
   * The current index of images.
   */

  var index = 0;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    if (options.lazyLoad) {
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
        destroy();
        init();
      });

      if (!isSequential) {
        on([EVENT_MOUNTED, EVENT_REFRESH, EVENT_MOVED], observe);
      }
    }
  }
  /**
   * Finds images that contain specific data attributes.
   */


  function init() {
    Components.Slides.forEach(function (Slide) {
      queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

        if (src !== img.src || srcset !== img.srcset) {
          var spinner = create('span', options.classes.spinner, img.parentElement);
          setAttribute(spinner, ROLE, 'presentation');
          images.push({
            img: img,
            Slide: Slide,
            src: src,
            srcset: srcset,
            spinner: spinner
          });
          display(img, 'none');
        }
      });
    });

    if (isSequential) {
      loadNext();
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    index = 0;
    images = [];
  }
  /**
   * Checks how close each image is from the active slide, and determines whether to start loading or not.
   * The last `+1` is for the current page.
   */


  function observe() {
    images = images.filter(function (data) {
      if (data.Slide.isWithin(Splide.index, options.perPage * ((options.preloadPages || 1) + 1))) {
        return load(data);
      }

      return true;
    });

    if (!images.length) {
      off(EVENT_MOVED);
    }
  }
  /**
   * Starts loading the image in the data.
   *
   * @param data - A LazyLoadImagesData object.
   */


  function load(data) {
    var img = data.img;
    addClass(data.Slide.slide, CLASS_LOADING);
    bind(img, 'load error', function (e) {
      onLoad(data, e.type === 'error');
    });
    ['src', 'srcset'].forEach(function (name) {
      if (data[name]) {
        setAttribute(img, name, data[name]);
        removeAttribute(img, name === 'src' ? SRC_DATA_ATTRIBUTE : SRCSET_DATA_ATTRIBUTE);
      }
    });
  }
  /**
   * Called when the image is loaded or any error occurs.
   *
   * @param data  - A LazyLoadImagesData object.
   * @param error - `true` if this method is called on error.
   */


  function onLoad(data, error) {
    var Slide = data.Slide;
    removeClass(Slide.slide, CLASS_LOADING);

    if (!error) {
      remove(data.spinner);
      display(data.img, '');
      emit(EVENT_LAZYLOAD_LOADED, data.img, Slide);
      emit(EVENT_RESIZE);
    }

    if (isSequential) {
      loadNext();
    }
  }
  /**
   * Starts loading a next image.
   */


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
/**
 * The component for handling previous and next arrows.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Arrows component object.
 */


function Pagination(Splide, Components, options) {
  var _EventInterface15 = EventInterface(Splide),
      on = _EventInterface15.on,
      emit = _EventInterface15.emit,
      bind = _EventInterface15.bind,
      unbind = _EventInterface15.unbind;

  var Slides = Components.Slides;
  var _Components$Controlle2 = Components.Controller,
      go = _Components$Controlle2.go,
      toPage = _Components$Controlle2.toPage,
      hasFocus = _Components$Controlle2.hasFocus,
      getIndex = _Components$Controlle2.getIndex;
  /**
   * Stores all pagination items.
   */

  var items = [];
  /**
   * The pagination element.
   */

  var list;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on([EVENT_MOVE, EVENT_SCROLLED], update);
  }
  /**
   * Initializes the pagination.
   */


  function init() {
    destroy();

    if (options.pagination && Slides.isEnough()) {
      createPagination();
      emit(EVENT_PAGINATION_MOUNTED, {
        list: list,
        items: items
      }, getAt(Splide.index));
      update();
    }
  }
  /**
   * Destroys the component.
   */


  function destroy() {
    if (list) {
      remove(list);
      items.forEach(function (item) {
        unbind(item.button, 'click');
      });
      empty(items);
      list = null;
    }
  }
  /**
   * Creates the pagination element and appends it to the slider.
   */


  function createPagination() {
    var length = Splide.length;
    var classes = options.classes,
        i18n = options.i18n,
        perPage = options.perPage;
    var _Components$Elements5 = Components.Elements,
        slider = _Components$Elements5.slider,
        root = _Components$Elements5.root;
    var parent = options.pagination === 'slider' && slider ? slider : root;
    var max = hasFocus() ? length : ceil(length / perPage);
    list = create('ul', classes.pagination, parent);

    var _loop = function _loop(i) {
      var li = create('li', null, list);
      var button = create('button', {
        class: classes.page,
        type: 'button'
      }, li);
      var controls = Slides.getIn(i).map(function (Slide) {
        return Slide.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, 'click', function () {
        go(">" + i);
      });
      setAttribute(button, ARIA_CONTROLS, controls.join(' '));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      emit(EVENT_PAGINATION_PAGE, list, li, button, i);
      items.push({
        li: li,
        button: button,
        page: i
      });
    };

    for (var i = 0; i < max; i++) {
      _loop(i);
    }
  }
  /**
   * Returns the pagination item at the specified index.
   *
   * @param index - An index.
   *
   * @return A pagination item object if available, or otherwise `undefined`.
   */


  function getAt(index) {
    return items[toPage(index)];
  }
  /**
   * Updates the pagination status.
   */


  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());

    if (prev) {
      removeClass(prev.button, CLASS_ACTIVE);
      removeAttribute(prev.button, ARIA_CURRENT);
    }

    if (curr) {
      addClass(curr.button, CLASS_ACTIVE);
      setAttribute(curr.button, ARIA_CURRENT, true);
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
    getAt: getAt
  };
}
/**
 * The keys for triggering the navigation slide.
 *
 * @since 3.0.0
 */


var TRIGGER_KEYS = [' ', 'Enter', 'Spacebar'];
/**
 * The component for syncing multiple sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Sync component object.
 */

function Sync(Splide, Components, options) {
  var splides = Splide.splides;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    if (options.isNavigation) {
      navigate();
    } else {
      sync();
    }
  }
  /**
   * Syncs the current index among all slides.
   * The `processed` array prevents recursive call of handlers.
   */


  function sync() {
    var processed = [];
    splides.concat(Splide).forEach(function (splide, index, instances) {
      EventInterface(splide).on(EVENT_MOVE, function (index, prev, dest) {
        instances.forEach(function (instance) {
          if (instance !== splide && !includes(processed, splide)) {
            processed.push(instance);
            instance.go(instance.is(LOOP) ? dest : index);
          }
        });
        empty(processed);
      });
    });
  }
  /**
   * Makes slides clickable and moves the slider to the index of clicked slide.
   */


  function navigate() {
    var _EventInterface16 = EventInterface(Splide),
        on = _EventInterface16.on,
        emit = _EventInterface16.emit;

    on(EVENT_CLICK, function (Slide) {
      Splide.go(Slide.index);
    });
    on(EVENT_SLIDE_KEYDOWN, function (Slide, e) {
      if (includes(TRIGGER_KEYS, e.key)) {
        Splide.go(Slide.index);
        prevent(e);
      }
    });
    emit(EVENT_NAVIGATION_MOUNTED, Splide.splides);
  }

  return {
    mount: mount
  };
}
/**
 * The component for observing the mouse wheel and moving the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Wheel component object.
 */


function Wheel(Splide, Components, options) {
  var _EventInterface17 = EventInterface(Splide),
      bind = _EventInterface17.bind;
  /**
   * Called when the component is mounted.
   */


  function mount() {
    if (options.wheel) {
      bind(Components.Elements.track, 'wheel', onWheel);
    }
  }
  /**
   * Called when the user rotates the mouse wheel.
   *
   * @param e - A WheelEvent object.
   */


  function onWheel(e) {
    var deltaY = e.deltaY;

    if (deltaY) {
      Splide.go(deltaY < 0 ? '<' : '>');
      prevent(e);
    }
  }

  return {
    mount: mount
  };
}

var ComponentConstructors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Options: Options,
  Direction: Direction,
  Elements: Elements,
  Style: Style,
  Slides: Slides,
  Clones: Clones,
  Layout: Layout,
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
  Wheel: Wheel
});
/**
 * The collection of i18n strings.
 *
 * @since 3.0.0
 */

var I18N = {
  prev: 'Previous slide',
  next: 'Next slide',
  first: 'Go to first slide',
  last: 'Go to last slide',
  slideX: 'Go to slide %s',
  pageX: 'Go to page %s',
  play: 'Start autoplay',
  pause: 'Pause autoplay'
};
/**
 * The collection of default options.
 * Note that this collection does not contain all options.
 *
 * @since 3.0.0
 */

var DEFAULTS = {
  type: 'slide',
  speed: 400,
  waitForTransition: true,
  perPage: 1,
  arrows: true,
  pagination: true,
  interval: 5000,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: 'cubic-bezier(.42,.65,.27,.99)',
  drag: true,
  direction: 'ltr',
  slideFocus: true,
  trimSpace: true,
  classes: CLASSES,
  i18n: I18N
};
/**
 * The component for the fade transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */

function Fade(Splide, Components, options) {
  var _EventInterface18 = EventInterface(Splide),
      on = _EventInterface18.on;

  var ruleBy = Components.Style.ruleBy;
  /**
   * Called when the component is mounted.
   * The nextTick disables the initial fade transition of the first slide.
   */

  function mount() {
    on([EVENT_MOUNTED, EVENT_REFRESH], function () {
      nextTick(function () {
        Components.Slides.forEach(function (Slide) {
          ruleBy(Slide.slide, 'transition', "opacity " + options.speed + "ms " + options.easing);
        });
      });
    });
  }
  /**
   * Starts the transition.
   * Explicitly sets the track height to avoid it will collapse in Safari.
   *
   * @param index - A destination index.
   * @param done  - The callback function that must be called after the transition ends.
   */


  function start(index, done) {
    var track = Components.Elements.track;
    ruleBy(track, 'height', unit(rect(track).height));
    nextTick(function () {
      done();
      ruleBy(track, 'height', '');
    });
  }

  return {
    mount: mount,
    start: start,
    cancel: noop
  };
}
/**
 * The component for the slide transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */


function Slide(Splide, Components, options) {
  var _EventInterface19 = EventInterface(Splide),
      bind = _EventInterface19.bind;

  var Move = Components.Move,
      Controller = Components.Controller;
  var list = Components.Elements.list;
  /**
   * Holds the `done` callback function.
   */

  var endCallback;
  /**
   * Called when the component is mounted.
   */

  function mount() {
    bind(list, 'transitionend', function (e) {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  /**
   * Starts the transition.
   * The Move component calls this method just before the slider moves.
   *
   * @param index - A destination index.
   * @param done  - The callback function that must be called after the transition ends.
   */


  function start(index, done) {
    var destination = Move.toPosition(index, true);
    var position = Move.getPosition();
    var speed = getSpeed(index);

    if (abs(destination - position) >= 1 && speed >= 1) {
      apply("transform " + speed + "ms " + options.easing);
      Move.translate(destination);
      endCallback = done;
    } else {
      Move.jump(index);
      done();
    }
  }
  /**
   * Cancels the transition.
   */


  function cancel() {
    apply('');
  }
  /**
   * Returns the transition speed.
   *
   * @param index - A destination index.
   */


  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;

    if (Splide.is(SLIDE) && rewindSpeed) {
      var prev = Controller.getIndex(true);
      var end = Controller.getEnd();

      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }

    return options.speed;
  }
  /**
   * Applies the transition CSS property to the list element.
   *
   * @param transition - A transition CSS value.
   */


  function apply(transition) {
    Components.Style.ruleBy(list, 'transition', transition);
  }

  return {
    mount: mount,
    start: start,
    cancel: cancel
  };
}
/**
 * The frontend class for the Splide slider.
 *
 * @since 3.0.0
 */


var Splide = /*#__PURE__*/function () {
  /**
   * The Splide constructor.
   *
   * @param target  - The selector for the target element, or the element itself.
   * @param options - Optional. An object with options.
   */
  function Splide(target, options) {
    /**
     * The EventBusObject object.
     */
    this.event = EventBus();
    /**
     * The collection of all component objects.
     */

    this.Components = {};
    /**
     * The StateObject object.
     */

    this.state = State(CREATED);
    /**
     * Splide instances to sync with.
     */

    this.splides = [];
    /**
     * The collection of options.
     */

    this.opts = {};
    /**
     * The collection of extensions.
     */

    this.Extensions = {};
    var root = isString(target) ? query(document, target) : target;
    assert(root, root + " is invalid.");
    this.root = root;
    merge(DEFAULTS, Splide.defaults);
    merge(merge(this.opts, DEFAULTS), options || {});
  }
  /**
   * Initializes the instance.
   *
   * @param Extensions - Optional. An object with extensions.
   * @param Transition - Optional. A Transition component.
   *
   * @return `this`
   */


  var _proto = Splide.prototype;

  _proto.mount = function mount(Extensions, Transition) {
    var _this3 = this;

    this.state.set(CREATED);
    this.Transition = Transition || this.Transition || (this.is(FADE) ? Fade : Slide);
    this.Extensions = Extensions || this.Extensions;
    var Constructors = assign({}, ComponentConstructors, this.Extensions, {
      Transition: this.Transition
    });
    var Components = this.Components;
    forOwn(Constructors, function (Component, key) {
      var component = Component(_this3, _this3.Components, _this3.opts);
      Components[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components, function (component) {
      component.mount && component.mount();
    });
    forOwn(Components, function (component) {
      component.mounted && component.mounted();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    this.state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  }
  /**
   * Syncs the slider with the provided one.
   * This method must be called before the `mount()`.
   *
   * @example
   * ```ts
   * var primary   = new Splide();
   * var secondary = new Splide();
   *
   * primary.sync( secondary );
   * primary.mount();
   * secondary.mount();
   * ```
   *
   * @param splide - A Splide instance to sync with.
   *
   * @return `this`
   */
  ;

  _proto.sync = function sync(splide) {
    this.splides.push(splide);
    splide.splides.push(this);
    return this;
  }
  /**
   * Moves the slider with the following control pattern.
   *
   * | Pattern | Description |
   * |---|---|
   * | `i` | Goes to the slide `i` |
   * | `'+${i}'` | Increments the slide index by `i` |
   * | `'-${i}'` | Decrements the slide index by `i` |
   * | `'>'` | Goes to the next page |
   * | `'<'` | Goes to the previous page |
   * | `>${i}` | Goes to the page `i` |
   *
   * In most cases, `'>'` and `'<'` notations are enough to control the slider
   * because they respect `perPage` and `perMove` options.
   *
   * @example
   * ```ts
   * var splide = new Splide();
   *
   * // Goes to the slide 1:
   * splide.go( 1 );
   *
   * // Increments the index:
   * splide.go( '+2' );
   *
   * // Goes to the next page:
   * splide.go( '>' );
   *
   * // Goes to the page 2:
   * splide.go( '>2' );
   * ```
   *
   * @param control
   */
  ;

  _proto.go = function go(control) {
    this.Components.Controller.go(control);
  }
  /**
   * Registers an event handler.
   *
   * @example
   * ```ts
   * var splide = new Splide();
   *
   * // Listens to a single event:
   * splide.on( 'move', function() {} );
   *
   * // Listens to multiple events:
   * splide.on( 'move resize', function() {} );
   *
   * // Appends a namespace:
   * splide.on( 'move.myNamespace resize.myNamespace', function() {} );
   * ```
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to append a namespace.
   * @param callback - A callback function.
   *
   * @return `this`
   */
  ;

  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  }
  /**
   * Removes the registered all handlers for the specified event or events.
   * If you want to only remove a particular handler, use namespace to identify it.
   *
   * @example
   * ```ts
   * var splide = new Splide();
   *
   * // Removes all handlers assigned to "move":
   * splide.off( 'move' );
   *
   * // Only removes handlers that belong to the specified namespace:
   * splide.off( 'move.myNamespace' );
   * ```
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to append a namespace.
   *
   * @return `this`
   */
  ;

  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  }
  /**
   * Emits an event and triggers registered handlers.
   *
   * @param event - An event name to emit.
   * @param args  - Optional. Any number of arguments to pass to handlers.
   *
   * @return `this`
   */
  ;

  _proto.emit = function emit(event) {
    var _this$event;

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (_this$event = this.event).emit.apply(_this$event, [event].concat(args));

    return this;
  }
  /**
   * Inserts a slide at the specified position.
   *
   * @example
   * ```ts
   * var splide = new Splide();
   * splide.mount();
   *
   * // Adds the slide by the HTML:
   * splide.add( '<li></li> );
   *
   * // or adds the element:
   * splide.add( document.createElement( 'li' ) );
   * ```
   *
   * @param slides - A slide element, an HTML string that represents a slide, or an array with them.
   * @param index  - Optional. An index to insert a slide at.
   *
   * @return `this`
   */
  ;

  _proto.add = function add(slides, index) {
    this.Components.Slides.add(slides, index);
    return this;
  }
  /**
   * Removes slides that match the matcher
   * that can be an index, an array with indices, a selector, or an iteratee function.
   *
   * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
   */
  ;

  _proto.remove = function remove(matcher) {
    this.Components.Slides.remove(matcher);
    return this;
  }
  /**
   * Checks the slider type.
   *
   * @param type - A type to test.
   *
   * @return `true` if the type matches the current one, or otherwise `false`.
   */
  ;

  _proto.is = function is(type) {
    return this.opts.type === type;
  }
  /**
   * Refreshes the slider.
   *
   * @return `this`
   */
  ;

  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  }
  /**
   * Destroys the slider.
   *
   * @param completely - Optional. If `true`, Splide will not remount the slider by breakpoints.
   *
   * @return `this`
   */
  ;

  _proto.destroy = function destroy(completely) {
    var event = this.event,
        state = this.state;

    if (state.is(CREATED)) {
      // Postpones destruction requested before the slider becomes ready.
      event.on(EVENT_READY, this.destroy.bind(this, completely), this);
    } else {
      forOwn(this.Components, function (component) {
        component.destroy && component.destroy(completely);
      });
      event.emit(EVENT_DESTROY);
      event.destroy();
      empty(this.splides);
      state.set(DESTROYED);
    }

    return this;
  }
  /**
   * Returns options.
   *
   * @return An object with the latest options.
   */
  ;

  _createClass(Splide, [{
    key: "options",
    get: function get() {
      return this.opts;
    }
    /**
     * Merges options to the current options and emits `updated` event.
     *
     * @param options - An object with new options.
     */
    ,
    set: function set(options) {
      var opts = this.opts;
      merge(opts, options);

      if (!this.state.is(CREATED)) {
        this.emit(EVENT_UPDATED, opts);
      }
    }
    /**
     * Returns the number of slides without clones.
     *
     * @return The number of slides.
     */

  }, {
    key: "length",
    get: function get() {
      return this.Components.Slides.getLength(true);
    }
    /**
     * Returns the active slide index.
     *
     * @return The active slide index.
     */

  }, {
    key: "index",
    get: function get() {
      return this.Components.Controller.getIndex();
    }
  }]);

  return Splide;
}();
/**
 * Changes the default options for all Splide instances.
 */


Splide.defaults = {};
/**
 * The collection of state numbers.
 */

Splide.STATES = STATES;
export { CLASSES, CLASS_ACTIVE, CLASS_ARROW, CLASS_ARROWS, CLASS_ARROW_NEXT, CLASS_ARROW_PREV, CLASS_AUTOPLAY, CLASS_CLONE, CLASS_CONTAINER, CLASS_INITIALIZED, CLASS_LIST, CLASS_LOADING, CLASS_NEXT, CLASS_PAGINATION, CLASS_PAGINATION_PAGE, CLASS_PAUSE, CLASS_PLAY, CLASS_PREV, CLASS_PROGRESS, CLASS_PROGRESS_BAR, CLASS_ROOT, CLASS_SLIDE, CLASS_SLIDER, CLASS_SPINNER, CLASS_TRACK, CLASS_VISIBLE, EVENT_ACTIVE, EVENT_ARROWS_MOUNTED, EVENT_ARROWS_UPDATED, EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY, EVENT_AUTOPLAY_PLAYING, EVENT_CLICK, EVENT_DESTROY, EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING, EVENT_HIDDEN, EVENT_INACTIVE, EVENT_LAZYLOAD_LOADED, EVENT_MOUNTED, EVENT_MOVE, EVENT_MOVED, EVENT_NAVIGATION_MOUNTED, EVENT_PAGINATION_MOUNTED, EVENT_PAGINATION_PAGE, EVENT_PAGINATION_UPDATED, EVENT_READY, EVENT_REFRESH, EVENT_RESIZE, EVENT_RESIZED, EVENT_SCROLL, EVENT_SCROLLED, EVENT_SLIDE_KEYDOWN, EVENT_UPDATED, EVENT_VISIBLE, EventBus, EventInterface, RequestInterval, STATUS_CLASSES, Splide, State, Throttle, Splide as default };
