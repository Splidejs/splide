/*!
 * Splide.js
 * Version  : 1.2.5
 * License  : MIT
 * Copyright: 2019 Naotoshi Fujita
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Splide"] = factory();
	else
		root["Splide"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/utils/object.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Some utility functions related with Object, supporting IE.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Iterate an object like Array.forEach.
 * IE doesn't support forEach of HTMLCollection.
 *
 * @param {Object}    obj       - An object.
 * @param {function}  callback  - A function handling each value. Arguments are value, property and index.
 */
function each(obj, callback) {
  Object.keys(obj).some(function (key, index) {
    return callback(obj[key], key, index);
  });
}
/**
 * Return values of the given object as an array.
 * IE doesn't support Object.values.
 *
 * @param {Object} obj - An object.
 *
 * @return {Array} - An array containing all values of the given object.
 */

function values(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}
/**
 * Check if the given subject is object or not.
 *
 * @param {*} subject - A subject to be verified.
 *
 * @return {boolean} - True if object, false otherwise.
 */

function isObject(subject) {
  return typeof subject === 'object';
}
/**
 * Merge two objects deeply.
 *
 * @param {Object} to   - An object where "from" is merged.
 * @param {Object} from - An object merged to "to".
 *
 * @return {Object} - A merged object.
 */

function merge(_ref, from) {
  var to = _extends({}, _ref);

  if (isObject(to) && isObject(from)) {
    each(from, function (value, key) {
      if (isObject(value)) {
        if (!isObject(to[key])) {
          to[key] = {};
        }

        to[key] = merge(to[key], value);
      } else {
        to[key] = value;
      }
    });
  }

  return to;
}
// CONCATENATED MODULE: ./src/js/core/event.js
/**
 * The function for providing an Event object simply managing events.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The function for providing an Event object simply managing events.
 */

/* harmony default export */ var core_event = (function () {
  /**
   * Store all handlers.
   *
   * @type {Object}
   */
  var handlers = {};
  return {
    /**
     * Subscribe the given event(s).
     *
     * @param {string}    event   - An event name. Use space to separate multiple events.
     *                              Also, namespace is accepted by dot, such as 'resize.{namespace}'.
     * @param {function}  handler - A callback function.
     */
    on: function on(event, handler) {
      event.split(' ').forEach(function (name) {
        // Prevent an event with a namespace from being registered twice.
        if (name.indexOf('.') > -1 && handlers[name]) {
          return;
        }

        if (!handlers[name]) {
          handlers[name] = [];
        }

        handlers[name].push(handler);
      });
    },

    /**
     * Unsubscribe the given event.
     *
     * @param {string} event - A event name.
     */
    off: function off(event) {
      event.split(' ').forEach(function (name) {
        return delete handlers[name];
      });
    },

    /**
     * Emit an event.
     *
     * @param {string}  event - An event name.
     * @param {*}       args  - Any number of arguments passed to handlers.
     */
    emit: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      each(handlers, function (callbacks, name) {
        if (name.split('.')[0] === event) {
          if (callbacks) {
            for (var i in callbacks) {
              callbacks[i].apply(callbacks, args);
            }
          }
        }
      });
    }
  };
});
// CONCATENATED MODULE: ./src/js/core/state.js
/**
 * The function providing a super simple state system.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The function providing a super simple state system.
 *
 * @param {string|number} initialState - Provide the initial state value.
 */
/* harmony default export */ var state = (function (initialState) {
  /**
   * Store the current state.
   *
   * @type {string|number}
   */
  var curr = initialState;
  return {
    /**
     * Change state.
     *
     * @param {string|number} state - A new state.
     */
    set: function set(state) {
      curr = state;
    },

    /**
     * Verify if the current state is given one or not.
     *
     * @param {string|number} state - A state name to be verified.
     *
     * @return {boolean} - True if the current state is the given one.
     */
    is: function is(state) {
      return state === curr;
    }
  };
});
// CONCATENATED MODULE: ./src/js/constants/classes.js
/**
 * Export class names.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * A root class name.
 *
 * @type {string}
 */
var ROOT = 'splide';
/**
 * The definition table of all classes for elements.
 * They might be modified by options.
 *
 * @type {Object}
 */

var ELEMENT_CLASSES = {
  root: ROOT,
  slider: ROOT + "__slider",
  track: ROOT + "__track",
  list: ROOT + "__list",
  slide: ROOT + "__slide",
  container: ROOT + "__slide__container",
  arrows: ROOT + "__arrows",
  arrow: ROOT + "__arrow",
  prev: ROOT + "__arrow--prev",
  next: ROOT + "__arrow--next",
  pagination: ROOT + "__pagination",
  page: ROOT + "__pagination__page",
  clone: ROOT + "__slide--clone",
  progress: ROOT + "__progress",
  bar: ROOT + "__progress__bar",
  autoplay: ROOT + "__autoplay",
  play: ROOT + "__play",
  pause: ROOT + "__pause",
  spinner: ROOT + "__spinner",
  sr: ROOT + "__sr"
};
/**
 * Definitions of status classes.
 *
 * @type {Object}
 */

var STATUS_CLASSES = {
  active: 'is-active',
  visible: 'is-visible',
  loading: 'is-loading'
};
// CONCATENATED MODULE: ./src/js/constants/i18n.js
/**
 * Export i18n texts as object.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Texts for i18n.
 *
 * @type {Object}
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
// CONCATENATED MODULE: ./src/js/constants/defaults.js
/**
 * Export default options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


var DEFAULTS = {
  /**
   * Determine a slider type.
   * - 'slide': Regular slider.
   * - 'loop' : Carousel slider.
   * - 'fade' : Change slides with fade transition. perPage, drag options are ignored.
   *
   * @type {string}
   */
  type: 'slide',

  /**
   * Whether to rewind a slider before the first slide or after the last one.
   * In "loop" mode, this option is ignored.
   *
   * @type {boolean}
   */
  rewind: false,

  /**
   * Transition speed in milliseconds.
   *
   * @type {number}
   */
  speed: 400,

  /**
   * Define slider max width.
   *
   * @type {number}
   */
  width: 0,

  /**
   * Define slider height.
   *
   * @type {number}
   */
  height: 0,

  /**
   * Fix width of slides. CSS format is allowed such as 10em, 80% or 80vw.
   * perPage number will be ignored when this option is falsy.
   *
   * @type {number|string}
   */
  fixedWidth: 0,

  /**
   * Fix height of slides. CSS format is allowed such as 10em, 80vh but % unit is not accepted.
   * heightRatio option will be ignored when this option is falsy.
   *
   * @type {number}
   */
  fixedHeight: 0,

  /**
   * Determine height of slides by ratio to a slider width.
   * This will be ignored when the fixedHeight is provided.
   *
   * @type {number}
   */
  heightRatio: 0,

  /**
   * Determine how many slides should be displayed per page.
   *
   * @type {number}
   */
  perPage: 1,

  /**
   * Determine how many slides should be moved when a slider goes to next or perv.
   *
   * @type {number}
   */
  perMove: 0,

  /**
   * Start index.
   *
   * @type {number}
   */
  start: 0,

  /**
   * Determine which slide should be focused if there are multiple slides in a page.
   * A string "center" is acceptable for centering slides.
   *
   * @type {boolean|number|string}
   */
  focus: false,

  /**
   * Gap between slides. CSS format is allowed such as 1em.
   *
   * @type {number|string}
   */
  gap: 0,

  /**
   * Set padding-left/right in horizontal mode or padding-top/bottom in vertical one.
   * Give a single value to set a same size for both sides or
   * do an object for different sizes.
   * Also, CSS format is allowed such as 1em.
   *
   * @example
   * - 10: Number
   * - '1em': CSS format.
   * - { left: 0, right: 20 }: Object for different sizes in horizontal mode.
   * - { top: 0, bottom: 20 }: Object for different sizes in vertical mode.
   *
   * @type {number|string|Object}
   */
  padding: 0,

  /**
   * Whether to append arrows.
   *
   * @type {boolean}
   */
  arrows: true,

  /**
   * Change the arrow SVG path like 'm7.61 0.807-2.12...'.
   *
   * @type {string}
   */
  arrowPath: '',

  /**
   * Whether to append pagination(indicator dots) or not.
   *
   * @type {boolean}
   */
  pagination: true,

  /**
   * Activate autoplay.
   *
   * @type {boolean}
   */
  autoplay: false,

  /**
   * Autoplay interval in milliseconds.
   *
   * @type {number}
   */
  interval: 5000,

  /**
   * Whether to stop autoplay when a slider is hovered.
   *
   * @type {boolean}
   */
  pauseOnHover: true,

  /**
   * Whether to stop autoplay when a slider elements are focused.
   * True is recommended for accessibility.
   *
   * @type {boolean}
   */
  pauseOnFocus: true,

  /**
   * Loading images lazily.
   * Image src must be provided by a data-splide-lazy attribute.
   *
   * - false: Do nothing.
   * - 'nearby': Only images around an active slide will be loaded.
   * - 'sequential': All images will be sequentially loaded.
   *
   * @type {boolean|string}
   */
  lazyLoad: false,

  /**
   * This option works only when a lazyLoad option is "nearby".
   * Determine how many pages(not slides) around an active slide should be loaded beforehand.
   *
   * @type {number}
   */
  preloadPages: 1,

  /**
   * Easing for CSS transition. For example, linear, ease or cubic-bezier().
   *
   * @type {string}
   */
  easing: 'cubic-bezier(.42,.65,.27,.99)',

  /**
   * Whether to control a slide via keyboard.
   *
   * @type {boolean}
   */
  keyboard: true,

  /**
   * Whether to allow mouse drag and touch swipe.
   *
   * @type {boolean}
   */
  drag: true,

  /**
   * Threshold for determining if the action is "flick" or "swipe".
   * Around 0.5 is recommended.
   *
   * @type {number}
   */
  flickThreshold: .6,

  /**
   * Determine power of flick. The larger number this is, the farther a slider runs by flick.
   * Around 500 is recommended.
   *
   * @type {number}
   */
  flickPower: 600,

  /**
   * Limit a number of pages to move by flick.
   *
   * @type {number}
   */
  flickMaxPages: 1,

  /**
   * Slider direction.
   * - 'ltr': Left to right.
   * - 'rtl': Right to left.
   * - 'ttb': Top to bottom.
   *
   * @type {string}
   */
  direction: 'ltr',

  /**
   * Set img src to background-image of its parent element.
   * Images with various sizes can be displayed as same dimension without cropping work.
   * fixedHeight or heightRatio is required.
   *
   * @type {boolean}
   */
  cover: false,

  /**
   * Whether to enable accessibility(aria and screen reader texts) or not.
   *
   * @type {boolean}
   */
  accessibility: true,

  /**
   * Determine if a slider is navigation for another.
   * Use "sync" API to synchronize two sliders.
   *
   * @type {boolean}
   */
  isNavigation: false,

  /**
   * Whether to trim spaces before the fist slide or after the last one when "focus" is not 0.
   *
   * @type {boolean}
   */
  trimSpace: true,

  /**
   * Breakpoints definitions.
   *
   * @example
   * {
   *   '1000': {
   *     perPage: 3,
   *     gap: 20
   *   },
   *   '600': {
   *     perPage: 1,
   *     gap: 5,
   *   }
   * }
   *
   * @type {boolean|Object}
   */
  breakpoints: false,

  /**
   * Collection of class names.
   *
   * @see ./classes.js
   *
   * @type {Object}
   */
  classes: ELEMENT_CLASSES,

  /**
   * Collection of i18n texts.
   *
   * @see ./i18n.js
   *
   * @type {Object}
   */
  i18n: I18N
};
// CONCATENATED MODULE: ./src/js/utils/dom.js
/**
 * Some utility functions related with DOM.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Find the first element matching the given selector.
 * Be aware that all selectors after a space are ignored.
 *
 * @param {Element|Node}  elm       - An ancestor element.
 * @param {string}        selector  - DOMString.
 *
 * @return {Element|null} - A found element or null.
 */

function find(elm, selector) {
  return elm && selector ? elm.querySelector(selector.split(' ')[0]) : null;
}
/**
 * Find a first child having the given class.
 *
 * @param {Element} parent    - A parent element.
 * @param {string}  className - A class name.
 *
 * @return {Element|null} - A found element on success. Null on failure.
 */

function child(parent, className) {
  if (parent) {
    var children = values(parent.children);

    for (var i in children) {
      var _child = children[i];

      if (hasClass(_child, className.split(' ')[0])) {
        return _child;
      }
    }
  }

  return null;
}
/**
 * Create an element with some optional attributes.
 *
 * @param {string} tag   - A tag name.
 * @param {Object} attrs - An object any attribute pairs of name and value.
 *
 * @return {Element} - A created element.
 */

function create(tag, attrs) {
  var elm = document.createElement(tag);
  each(attrs, function (value, key) {
    return setAttribute(elm, key, value);
  });
  return elm;
}
/**
 * Apply styles to the given element.
 *
 * @param {Element} elm     - An element where styles are applied.
 * @param {Object}  styles  - Object containing styles.
 */

function applyStyle(elm, styles) {
  if (elm) {
    each(styles, function (value, prop) {
      elm.style[prop] = value || '';
    });
  }
}
/**
 * Add classes to the element.
 *
 * @param {Element} elm     - An element where classes are added.
 * @param {string}  classes - Class names being added.
 */

function addClass(elm) {
  if (elm) {
    for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classes[_key - 1] = arguments[_key];
    }

    classes.forEach(function (name) {
      if (name) {
        elm.classList.add(name);
      }
    });
  }
}
/**
 * Remove a class from the element.
 *
 * @param {Element} elm       - An element where classes are removed.
 * @param {string}  className - A class name being removed.
 */

function removeClass(elm, className) {
  if (elm) {
    elm.classList.remove(className);
  }
}
/**
 * Verify if the provided element has the class or not.
 *
 * @param {Element} elm       - An element.
 * @param {string}  className - A class name.
 *
 * @return {boolean} - True if the element has the class or false if not.
 */

function hasClass(elm, className) {
  return !!elm && elm.classList.contains(className);
}
/**
 * Set attribute to the given element.
 *
 * @param {Element}                 elm   - An element where an attribute is assigned.
 * @param {string}                  name  - Attribute name.
 * @param {string|number|boolean}   value - Attribute value.
 */

function setAttribute(elm, name, value) {
  if (elm) {
    elm.setAttribute(name, value);
  }
}
/**
 * Get attribute from the given element.
 *
 * @param {Element} elm  - An element where an attribute is assigned.
 * @param {string}  name - Attribute name.
 *
 * @return {string|null} - The value of the given attribute if available. Null if not.
 */

function getAttribute(elm, name) {
  if (elm) {
    return elm.getAttribute(name);
  }

  return null;
}
/**
 * Remove attribute from the given element.
 *
 * @param {Element} elm   - An element where an attribute is removed.
 * @param {string}  name  - Attribute name.
 */

function removeAttribute(elm, name) {
  if (elm) {
    elm.removeAttribute(name);
  }
}
/**
 * Listen a native event.
 *
 * @param {Element|Window}  elm     - An element or window object.
 * @param {string}          event   - An event name or event names separated with space.
 * @param {function}        handler - Callback function.
 * @param {Object}          options - Optional. Options.
 *
 * @return {function[]} - Functions to stop subscription.
 */

function subscribe(elm, event, handler, options) {
  if (options === void 0) {
    options = {};
  }

  if (elm) {
    return event.split(' ').map(function (e) {
      elm.addEventListener(e, handler, options);
      return function () {
        return elm.removeEventListener(e, handler);
      };
    });
  }

  return [];
}
// CONCATENATED MODULE: ./src/js/transitions/slide/index.js
/**
 * The component for general slide effect transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The component for general slide effect transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var transitions_slide = (function (Splide, Components) {
  /**
   * Hold the list element.
   *
   * @type {Element}
   */
  var list;
  /**
   * Hold the onEnd callback function.
   *
   * @type {function}
   */

  var endCallback;
  return {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      list = Components.Elements.list;
      subscribe(list, 'transitionend', function (e) {
        if (e.target === list && endCallback) {
          endCallback();
        }
      });
    },

    /**
     * Start transition.
     *
     * @param {number}   destIndex - Destination slide index that might be clone's.
     * @param {number}   newIndex  - New index.
     * @param {Object}   coord     - Destination coordinates.
     * @param {function} onEnd     - Callback function must be invoked when transition is completed.
     */
    start: function start(destIndex, newIndex, coord, onEnd) {
      endCallback = onEnd;
      applyStyle(list, {
        transition: "transform " + Splide.options.speed + "ms " + Splide.options.easing,
        transform: "translate(" + coord.x + "px," + coord.y + "px)"
      });
    }
  };
});
// CONCATENATED MODULE: ./src/js/transitions/fade/index.js
/**
 * The component for fade transition.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The component for fade transition.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var fade = (function (Splide, Components) {
  Components.Options.fix({
    perPage: 1,
    gap: 0,
    padding: 0
  });

  if (Components.Drag) {
    Components.Drag.required = false;
  }

  var Fade = {
    /**
     * Called when the component is mounted.
     * Apply transition style to the first slide.
     */
    mount: function mount() {
      apply(Splide.index);
    },

    /**
     * Start transition.
     *
     * @param {number}    destIndex - Destination slide index that might be clone's.
     * @param {number}    newIndex  - New index.
     * @param {Object}    coord     - Destination coordinates.
     * @param {function}  onEnd     - Callback function must be invoked when transition is completed.
     */
    start: function start(destIndex, newIndex, coord, onEnd) {
      apply(newIndex);
      onEnd();
    }
  };
  /**
   * Apply transition style to the slide specified by the given index.
   *
   * @param {number} index - A slide index.
   */

  function apply(index) {
    var Slide = Components.Slides.getSlide(index);
    var options = Splide.options;

    if (Slide) {
      applyStyle(Slide.slide, {
        transition: "opacity " + options.speed + "ms " + options.easing
      });
    }
  }

  return Fade;
});
// CONCATENATED MODULE: ./src/js/transitions/index.js
/**
 * Export transition components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


// CONCATENATED MODULE: ./src/js/constants/types.js
/**
 * Export slider types.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Normal slider.
 *
 * @type {string}
 */
var SLIDE = 'slide';
/**
 * Loop after the last slide and before the first one.
 *
 * @type {string}
 */

var LOOP = 'loop';
/**
 * The track doesn't move.
 *
 * @type {string}
 */

var FADE = 'fade';
// CONCATENATED MODULE: ./src/js/core/composer.js
/**
 * Provide a function for composing components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * Compose components.
 *
 * @param {Splide}   Splide     - Splide instance.
 * @param {Object}   Components - Additional components.
 * @param {function} Transition - Change component for transition.
 *
 * @return {Object} - An object containing all components.
 */

function compose(Splide, Components, Transition) {
  var components = {};
  each(Components, function (Component, name) {
    components[name] = Component(Splide, components, name.toLowerCase());
  });
  Transition = Transition || Splide.is(FADE) ? fade : transitions_slide;
  components.Transition = Transition(Splide, components);
  return components;
}
// CONCATENATED MODULE: ./src/js/utils/error.js
/**
 * Utility functions for outputting logs.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Prefix of an error massage.
 *
 * @type {string}
 */
var MESSAGE_PREFIX = '[SPLIDE]';
/**
 * Display an error message on the browser console.
 *
 * @param {string} message - An error message.
 */

function error_error(message) {
  console.error(MESSAGE_PREFIX + " " + message);
}
/**
 * Check existence of the given object and throw an error if it doesn't.
 *
 * @throws {Error}
 *
 * @param {*}      subject - A subject to be confirmed.
 * @param {string} message - An error message.
 *
 * @return {*} - A given subject itself.
 */

function exist(subject, message) {
  if (!subject) {
    throw new Error(message);
  }

  return subject;
}
// CONCATENATED MODULE: ./src/js/constants/states.js
/**
 * Export state constants.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Splide has been just created.
 *
 * @type {number}
 */
var CREATED = 1;
/**
 * All components have been mounted and initialized.
 *
 * @type {number}
 */

var MOUNTED = 2;
/**
 * Splide is ready for transition.
 *
 * @type {number}
 */

var IDLE = 3;
/**
 * Splide is moving.
 *
 * @type {number}
 */

var MOVING = 4;
// CONCATENATED MODULE: ./src/js/splide.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The main class for applying Splide to an element.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */









/**
 * The main class for applying Splide to an element,
 * providing some APIs to control the behavior.
 */

var splide_Splide =
/*#__PURE__*/
function () {
  /**
   * Splide constructor.
   *
   * @throws {Error} When the given root element or selector is invalid.
   *
   * @param {Element|string}  root        - A selector for a root element or an element itself.
   * @param {Object}          options     - Optional. Options to change default behaviour.
   * @param {Object}          Components  - Optional. Components.
   */
  function Splide(root, options, Components) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    if (Components === void 0) {
      Components = {};
    }

    this.root = root instanceof HTMLElement ? root : find(document, root);
    exist(this.root, 'An invalid root element or selector was given.');
    this.Components = {};
    this.Event = core_event();
    this.State = state(CREATED);
    this._options = merge(DEFAULTS, options);
    this._index = 0;
    this._components = Components;
    this.on('move drag', function () {
      return _this.State.set(MOVING);
    }).on('moved dragged', function () {
      return _this.State.set(IDLE);
    });
  }
  /**
   * Compose and mount components.
   *
   * @param {Object}   Extensions - Optional. Additional components.
   * @param {function} Transition - Optional. Set a custom transition component.
   *
   * @return {Splide|null} - This instance or null if an exception occurred.
   */


  var _proto = Splide.prototype;

  _proto.mount = function mount(Extensions, Transition) {
    var _this2 = this;

    if (Extensions === void 0) {
      Extensions = {};
    }

    if (Transition === void 0) {
      Transition = null;
    }

    this.Components = compose(this, merge(this._components, Extensions), Transition);

    try {
      each(this.Components, function (component, key) {
        var required = component.required;

        if (required === undefined || required) {
          component.mount && component.mount();
        } else {
          delete _this2.Components[key];
        }
      });
    } catch (e) {
      error_error(e.message);
      return null;
    }

    each(this.Components, function (component) {
      component.mounted && component.mounted();
    });
    this.State.set(MOUNTED);
    this.emit('mounted');
    this.State.set(IDLE);
    this.emit('ready');
    applyStyle(this.root, {
      visibility: 'visible'
    });
    return this;
  }
  /**
   * Set sync target.
   *
   * @param {Splide} splide - A Splide instance.
   *
   * @return {Splide} - This instance.
   */
  ;

  _proto.sync = function sync(splide) {
    this.sibling = splide;
    return this;
  }
  /**
   * Register callback fired on the given event(s).
   *
   * @param {string}    event   - An event name. Use space to separate multiple events.
   *                              Also, namespace is accepted by dot, such as 'resize.{namespace}'.
   * @param {function}  handler - A callback function.
   *
   * @return {Splide} - This instance.
   */
  ;

  _proto.on = function on(event, handler) {
    this.Event.on(event, handler);
    return this;
  }
  /**
   * Unsubscribe the given event.
   *
   * @param {string} event - A event name.
   *
   * @return {Splide} - This instance.
   */
  ;

  _proto.off = function off(event) {
    this.Event.off(event);
    return this;
  }
  /**
   * Emit an event.
   *
   * @param {string}  event - An event name.
   * @param {*}       args  - Any number of arguments passed to handlers.
   */
  ;

  _proto.emit = function emit(event) {
    var _this$Event;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_this$Event = this.Event).emit.apply(_this$Event, [event].concat(args));

    return this;
  }
  /**
   * Go to the slide specified by the given control.
   *
   * @param {string|number} control - A control pattern.
   * @param {boolean}       wait    - Optional. Whether to wait for transition.
   */
  ;

  _proto.go = function go(control, wait) {
    if (wait === void 0) {
      wait = true;
    }

    if (this.State.is(IDLE) || this.State.is(MOVING) && !wait) {
      this.Components.Controller.go(control, false);
    }
  }
  /**
   * Verify whether the slider type is the given one or not.
   *
   * @param {string} type - A slider type.
   *
   * @return {boolean} - True if the slider type is the provided type or false if not.
   */
  ;

  _proto.is = function is(type) {
    return type === this._options.type;
  }
  /**
   * Return the current slide index.
   *
   * @return {number} - The current slide index.
   */
  ;

  _createClass(Splide, [{
    key: "index",
    get: function get() {
      return this._index;
    }
    /**
     * Set the current slide index.
     *
     * @param {number|string} index - A new index.
     */
    ,
    set: function set(index) {
      this._index = parseInt(index);
    }
    /**
     * Return length of slides.
     * This is an alias of Slides.length.
     *
     * @return {number} - A number of slides.
     */

  }, {
    key: "length",
    get: function get() {
      return this.Components.Slides.length;
    }
    /**
     * Return options.
     *
     * @return {Object} - Options object.
     */

  }, {
    key: "options",
    get: function get() {
      return this._options;
    }
    /**
     * Set options with merging the given object to the current one.
     *
     * @param {Object} options - New options.
     */
    ,
    set: function set(options) {
      this._options = merge(this._options, options);

      if (!this.State.is(CREATED)) {
        this.emit('updated', this._options);
      }
    }
    /**
     * Return the class list.
     * This is an alias of Splide.options.classList.
     *
     * @return {Object} - An object containing all class list.
     */

  }, {
    key: "classes",
    get: function get() {
      return this._options.classes;
    }
    /**
     * Return the i18n strings.
     * This is an alias of Splide.options.i18n.
     *
     * @return {Object} - An object containing all i18n strings.
     */

  }, {
    key: "i18n",
    get: function get() {
      return this._options.i18n;
    }
  }]);

  return Splide;
}();


// CONCATENATED MODULE: ./src/js/components/options/index.js
/**
 * The component for initializing options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The component for initializing options.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_options = (function (Splide) {
  /**
   * Store the root element.
   */
  var root = Splide.root;
  /**
   * Retrieve options from the data attribute.
   * Note that IE10 doesn't support dataset property.
   *
   * @type {string}
   */

  var options = getAttribute(root, 'data-splide');

  if (options) {
    try {
      Splide.options = JSON.parse(options);
    } catch (e) {
      error_error('"data-splide" must be a valid JSON.');
    }
  }

  return {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      Splide.index = Splide.options.start;
    },

    /**
     * Fix some options that must be never changed by breakpoints.
     *
     * @param {Object} fixedOptions - Options to be fixed.
     */
    fix: function fix(fixedOptions) {
      var options = merge(Splide.options, fixedOptions);
      var breakpoints = options.breakpoints;

      if (breakpoints) {
        each(breakpoints, function (value, key) {
          options.breakpoints[key] = merge(breakpoints[key], fixedOptions);
        });
      }

      Splide.options = options;
    }
  };
});
// CONCATENATED MODULE: ./src/js/components/elements/index.js
/**
 * The component for the root element.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The property name for UID stored in a window object.
 *
 * @type {string}
 */

var UID_NAME = 'splideUid';
/**
 * The component for the root element.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_elements = (function (Splide) {
  /**
   * Hold the root element.
   *
   * @type {Element}
   */
  var root = Splide.root;
  /**
   * Hold the class list.
   *
   * @type {Object}
   */

  var classes = Splide.classes;
  /*
   * Assign unique ID to the root element if it doesn't have the one.
   * Note that IE doesn't support padStart() to fill the uid by 0.
   */

  if (!root.id) {
    var uid = window[UID_NAME] || 0;
    window[UID_NAME] = ++uid;
    root.id = "splide" + (uid < 10 ? '0' + uid : uid);
  }
  /**
   * Elements component object.
   *
   * @type {Object}
   */


  var Elements = {
    /**
     * Called when the component is mounted.
     * Collect main elements and store them as member properties.
     */
    mount: function mount() {
      var message = 'was not found.';
      this.slider = child(root, classes.slider);
      this.track = find(root, "." + classes.track);
      exist(this.track, "A track " + message);
      this.list = child(this.track, classes.list);
      exist(this.list, "A list " + message);
      this.slides = values(this.list.children);
      exist(this.slides.length, "A slide " + message);
      var arrows = findParts(classes.arrows);
      this.arrows = {
        prev: find(arrows, "." + classes.prev),
        next: find(arrows, "." + classes.next)
      };
      var autoplay = findParts(classes.autoplay);
      this.bar = find(findParts(classes.progress), "." + classes.bar);
      this.play = find(autoplay, "." + classes.play);
      this.pause = find(autoplay, "." + classes.pause);
      init();
    },

    /**
     * Called after all components are mounted.
     */
    mounted: function mounted() {
      var rootClass = classes.root;
      var options = Splide.options;
      addClass(root, "" + rootClass, rootClass + "--" + options.type, rootClass + "--" + options.direction, options.drag ? rootClass + "--draggable" : '', options.isNavigation ? rootClass + "--nav" : '');
    }
  };
  /**
   * Find parts only from children of the root or track.
   *
   * @return {Element|null} - A found element or null.
   */

  function findParts(className) {
    return child(root, className) || child(Elements.slider, className);
  }
  /**
   * Initialization.
   * Assign ID to some elements if it's not available.
   */


  function init() {
    if (!Elements.track.id) {
      Elements.track.id = root.id + "-track";
    }

    if (!Elements.list.id) {
      Elements.list.id = root.id + "-list";
    }
  }

  return Elements;
});
// CONCATENATED MODULE: ./src/js/constants/directions.js
/**
 * Export layout modes.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Enumerate slides from left to right.
 *
 * @type {string}
 */
var LTR = 'ltr';
/**
 * Enumerate slides from right to left.
 *
 * @type {string}
 */

var RTL = 'rtl';
/**
 * Enumerate slides in a col.
 *
 * @type {string}
 */

var TTB = 'ttb';
// CONCATENATED MODULE: ./src/js/utils/utils.js
/**
 * A package of some miscellaneous utility functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Check if the given value is between min and max.
 * Min will be returned when the value is less than min or max will do when greater than max.
 *
 * @param {number} value - A number to be checked.
 * @param {number} m1    - Minimum or maximum number.
 * @param {number} m2    - Maximum or minimum number.
 *
 * @return {number} - A value itself, min or max.
 */

function between(value, m1, m2) {
  return Math.min(Math.max(value, m1 > m2 ? m2 : m1), m1 > m2 ? m1 : m2);
}
/**
 * The sprintf method with minimum functionality.
 *
 * @param {string} format       - The string format.
 * @param {string} replacements - Replacements accepting multiple arguments.
 *
 * @returns {string} - Converted string.
 */

function sprintf(format) {
  for (var _len = arguments.length, replacements = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    replacements[_key - 1] = arguments[_key];
  }

  var i = 0;
  return format.replace(/%s/g, function () {
    return replacements[i++];
  });
}
/**
 * Append px unit to the given subject if necessary.
 *
 * @param {number|string} value - A value that may not include an unit.
 *
 * @return {string} - If the value is string, return itself.
 *                    If number, do value + "px". An empty string, otherwise.
 */

function unit(value) {
  var type = typeof value;

  if (type === 'string') {
    return value;
  } else if (type === 'number' && value > 0) {
    return parseFloat(value) + 'px';
  }

  return '';
}
/**
 * Convert the given value to pixel.
 *
 * @param {Element}       root  - Root element where a dummy div is appended.
 * @param {string|number} value - CSS value to be converted, such as 10rem.
 *
 * @return {number} - Pixel.
 */

function toPixel(root, value) {
  if (typeof value === 'number') {
    return value;
  }

  var div = create('div', {});
  applyStyle(div, {
    position: 'absolute',
    width: value
  });
  root.appendChild(div);
  var px = div.clientWidth;
  root.removeChild(div);
  return px;
}
// CONCATENATED MODULE: ./src/js/components/controller/index.js
/**
 * The component for controlling the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



var floor = Math.floor;
/**
 * The component for controlling the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var controller = (function (Splide, Components) {
  /**
   * Store current options.
   *
   * @type {Object}
   */
  var options;
  /**
   * Controller component object.
   *
   * @type {Object}
   */

  var Controller = {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      options = Splide.options;
      bind();
    },

    /**
     * Make track run by the given control.
     * - "+{i}" : Increment the slide index by i.
     * - "-{i}" : Decrement the slide index by i.
     * - "{i}"  : Go to the slide whose index is i.
     * - ">"    : Go to next page.
     * - "<"    : Go to prev page.
     * - ">{i}" : Go to page i.
     *
     * @param {string|number} control  - A control pattern.
     * @param {boolean}       silently - Go to the destination without event emission.
     */
    go: function go(control, silently) {
      var destIndex = this.trim(this.parse(control));
      Components.Track.go(destIndex, this.rewind(destIndex), silently);
    },

    /**
     * Parse the given control and return the destination index for the track.
     *
     * @param {string} control - A control target pattern.
     *
     * @return {string|number} - A parsed target.
     */
    parse: function parse(control) {
      var index = Splide.index;
      var matches = String(control).match(/([+\-<>])(\d+)?/);
      var indicator = matches ? matches[1] || '' : '';
      var number = matches ? parseInt(matches[2]) : 0;

      switch (indicator) {
        case '+':
          index += number || 1;
          break;

        case '-':
          index -= number || 1;
          break;

        case '>':
          index = this.pageToIndex(number > -1 ? number : this.indexToPage(index) + 1);
          break;

        case '<':
          index = this.pageToIndex(number > -1 ? number : this.indexToPage(index) - 1);
          break;

        default:
          index = parseInt(control);
      }

      return index;
    },

    /**
     * Compute index from the given page number.
     *
     * @param {number} page - Page number.
     *
     * @return {number} - A computed page number.
     */
    pageToIndex: function pageToIndex(page) {
      if (hasFocus()) {
        return page;
      }

      var length = Splide.length;
      var perPage = options.perPage;
      var index = page * perPage;
      index = index - (this.pageLength * perPage - length) * floor(index / length); // Adjustment for the last page.

      if (length - perPage <= index && index < length) {
        index = length - perPage;
      }

      return index;
    },

    /**
     * Compute page number from the given slide index.
     *
     * @param index - Slide index.
     *
     * @return {number} - A computed page number.
     */
    indexToPage: function indexToPage(index) {
      if (hasFocus()) {
        return index;
      }

      var length = Splide.length;
      var perPage = options.perPage; // Make the last "perPage" number of slides belong to the last page.

      if (length - perPage <= index && index < length) {
        return floor((length - 1) / perPage);
      }

      return floor(index / perPage);
    },

    /**
     * Trim the given index according to the current mode.
     * Index being returned could be less than 0 or greater than the length in Loop mode.
     *
     * @param {number} index - An index being trimmed.
     *
     * @return {number} - A trimmed index.
     */
    trim: function trim(index) {
      if (!Splide.is(LOOP)) {
        index = options.rewind ? this.rewind(index) : between(index, 0, this.edgeIndex);
      }

      return index;
    },

    /**
     * Rewind the given index if it's out of range.
     *
     * @param {number} index - An index.
     *
     * @return {number} - A rewound index.
     */
    rewind: function rewind(index) {
      var edge = this.edgeIndex;

      if (Splide.is(LOOP)) {
        while (index > edge) {
          index -= edge + 1;
        }

        while (index < 0) {
          index += edge + 1;
        }
      } else {
        if (index > edge) {
          index = 0;
        } else if (index < 0) {
          index = edge;
        }
      }

      return index;
    },

    /**
     * Check if the direction is "rtl" or not.
     *
     * @return {boolean} - True if "rtl" or false if not.
     */
    isRtl: function isRtl() {
      return options.direction === RTL;
    },

    /**
     * Return the page length.
     *
     * @return {number} - Max page number.
     */
    get pageLength() {
      var length = Splide.length;
      return hasFocus() ? length : Math.ceil(length / options.perPage);
    },

    /**
     * Return the edge index.
     *
     * @return {number} - Edge index.
     */
    get edgeIndex() {
      var length = Splide.length;

      if (hasFocus() || options.isNavigation || Splide.is(LOOP)) {
        return length - 1;
      }

      return length - options.perPage;
    },

    /**
     * Return the index of the previous slide.
     *
     * @return {number} - The index of the previous slide if available. -1 otherwise.
     */
    get prevIndex() {
      var prev = Splide.index - 1;

      if (Splide.is(LOOP) || options.rewind) {
        prev = this.rewind(prev);
      }

      return prev > -1 ? prev : -1;
    },

    /**
     * Return the index of the next slide.
     *
     * @return {number} - The index of the next slide if available. -1 otherwise.
     */
    get nextIndex() {
      var next = Splide.index + 1;

      if (Splide.is(LOOP) || options.rewind) {
        next = this.rewind(next);
      }

      return Splide.index < next && next <= this.edgeIndex || next === 0 ? next : -1;
    }

  };
  /**
   * Listen some events.
   */

  function bind() {
    Splide.on('move', function (newIndex) {
      Splide.index = newIndex;
    }).on('updated', function (newOptions) {
      options = newOptions;
      Splide.index = Controller.rewind(Controller.trim(Splide.index));
    });
  }
  /**
   * Verify if the focus option is available or not.
   *
   * @return {boolean} - True if a slider has the focus option.
   */


  function hasFocus() {
    return Splide.options.focus !== false;
  }

  return Controller;
});
// CONCATENATED MODULE: ./src/js/components/slides/slide.js
/**
 * The sub component for handling each slide.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The sub component for handling each slide.
 *
 * @param {number}  index     - An unique slide index.
 * @param {number}  realIndex - Clones should pass a real slide index.
 * @param {Element} slide     - A slide element.
 * @param {Splide}  Splide    - A Splide instance.
 *
 * @return {Object} - The sub component object.
 */

function slide_Slide(index, realIndex, slide, Splide) {
  return {
    /**
     * Slide element.
     *
     * @type {Element}
     */
    slide: slide,

    /**
     * Slide index.
     *
     * @type {number}
     */
    index: index,

    /**
     * Real index for clones.
     *
     * @type {number}
     */
    realIndex: realIndex,

    /**
     * Container element if available.
     *
     * @type {Element|null}
     */
    container: find(slide, "." + Splide.classes.container),

    /**
     * Whether this is clone or not.
     *
     * @type {boolean}
     */
    isClone: realIndex > -1,

    /**
     * Called when the component is mounted.
     */
    init: function init() {
      var _this = this;

      if (!slide.id && !this.isClone) {
        var number = index + 1;
        slide.id = Splide.root.id + "-slide" + (number < 10 ? '0' + number : number);
      }

      Splide.on('mounted moved updated', function () {
        _this.update(_this.isActive(), false);

        _this.update(_this.isVisible(), true);
      }).on('resize', function () {
        _this.update(_this.isVisible(), true);
      });
    },

    /**
     * Update classes for activity or visibility.
     *
     * @param {boolean} active        - Is active/visible or not.
     * @param {boolean} forVisibility - Toggle classes for activity or visibility.
     */
    update: function update(active, forVisibility) {
      var type = forVisibility ? 'visible' : 'active';
      var className = STATUS_CLASSES[type];

      if (active) {
        addClass(slide, className);
        Splide.emit("" + type, this);
      } else {
        if (hasClass(slide, className)) {
          removeClass(slide, className);
          Splide.emit("" + (forVisibility ? 'hidden' : 'inactive'), this);
        }
      }
    },

    /**
     * Check whether this slide is active or not.
     *
     * @return {boolean} - True if the slide is active or false if not.
     */
    isActive: function isActive() {
      return Splide.index === index;
    },

    /**
     * Check whether this slide is visible or not.
     *
     * @return {boolean} - True if the slide is visible or false if not.
     */
    isVisible: function isVisible() {
      var _Splide$options = Splide.options,
          focus = _Splide$options.focus,
          trimSpace = _Splide$options.trimSpace;
      var activeIndex = Splide.index,
          length = Splide.length;
      var isCenter = 'center' === focus;
      var numInView = Splide.Components.Layout.numInView;
      var offset = isCenter ? numInView / 2 : parseInt(focus) || 0;

      if (trimSpace) {
        if (activeIndex < offset) {
          return index < numInView;
        } else if (activeIndex >= length - (numInView - offset)) {
          return index >= length - numInView;
        }
      }

      var min = activeIndex - offset + (isCenter && numInView % 2 === 0 ? 1 : 0);
      return min <= index && index < activeIndex + numInView - offset;
    },

    /**
     * Calculate how far this slide is from another slide and
     * return true if the distance is within the given number.
     *
     * @param {number} from   - Index of a target slide.
     * @param {number} within - True if the slide is within this number.
     *
     * @return {boolean} - True if the slide is within this number or false otherwise.
     */
    isWithin: function isWithin(from, within) {
      var diff = Math.abs(from - index);

      if (!Splide.is(SLIDE) && !this.isClone) {
        diff = Math.min(diff, Splide.length - diff);
      }

      return diff < within;
    }
  };
}
// CONCATENATED MODULE: ./src/js/components/slides/index.js
/**
 * The component for handling all slides including clones.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The component for handling all slides including clones.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_slides = (function (Splide, Components) {
  /**
   * Store slide elements.
   *
   * @type {Array}
   */
  var slides = [];
  /**
   * Store slide instances.
   *
   * @type {Array}
   */

  var Slides = [];
  return {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      slides = Components.Elements.slides;

      for (var i in slides) {
        this.register(parseInt(i), -1, slides[i]);
      }
    },

    /**
     * Register a slide to create a Slide object and handle its behavior.
     *
     * @param {number}  index     - A unique index.
     * @param {number}  realIndex - A real index for clones. Set -1 for real slides.
     * @param {Element} slide     - A slide element.
     */
    register: function register(index, realIndex, slide) {
      var slideObject = slide_Slide(index, realIndex, slide, Splide);
      slideObject.init();
      Slides.push(slideObject);
    },

    /**
     * Return the Slide object designated by the index.
     *
     * @return {Object|undefined} - A Slide object if available. Undefined if not.
     */
    getSlide: function getSlide(index) {
      return Slides.filter(function (Slide) {
        return Slide.index === index;
      })[0];
    },

    /**
     * Return slide elements.
     *
     * @param {boolean} includeClones - Whether to include cloned slides or not.
     * @param {boolean} objects       - Whether to return elements or Slide objects
     *
     * @return {Object[]|Element[]} - Slide objects or elements.
     */
    getSlides: function getSlides(includeClones, objects) {
      if (objects) {
        return includeClones ? Slides : Slides.filter(function (Slide) {
          return !Slide.isClone;
        });
      }

      return includeClones ? Slides.map(function (Slide) {
        return Slide.slide;
      }) : slides;
    },

    /**
     * Return Slide objects belonging to the given page.
     *
     * @param {number} page - A page number.
     *
     * @return {Object[]} - An array containing Slide objects.
     */
    getSlidesByPage: function getSlidesByPage(page) {
      var idx = Components.Controller.pageToIndex(page);
      var options = Splide.options;
      var max = options.focus !== false ? 1 : options.perPage;
      return Slides.filter(function (_ref) {
        var index = _ref.index;
        return idx <= index && index < idx + max;
      });
    },

    /**
     * Return slides length without clones.
     *
     * @return {number} - Slide length.
     */
    get length() {
      return slides.length;
    },

    /**
     * Return "Slides" length including clones.
     *
     * @return {number} - Slide length including clones.
     */
    get total() {
      return Slides.length;
    }

  };
});
// CONCATENATED MODULE: ./src/js/components/track/resolvers/vertical.js
/**
 * The resolver component for vertical move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The resolver component for vertical move.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The resolver object.
 */

/* harmony default export */ var vertical = (function (Splide, Components) {
  /**
   * Hold the Layout object.
   *
   * @type {Object}
   */
  var Layout = Components.Layout;
  return {
    /**
     * Set position with CSS transform.
     *
     * @param {Element} list    - A list element.
     * @param {number} position - A new position value.
     */
    translate: function translate(list, position) {
      applyStyle(list, {
        transform: "translateY(" + position + "px)"
      });
    },

    /**
     * Calculate position by index.
     *
     * @param {number} index - Slide index.
     *
     * @return {Object} - Calculated position.
     */
    toPosition: function toPosition(index) {
      return -(index * (Layout.slideHeight + Layout.gap) + this.offset);
    },

    /**
     * Calculate the closest slide index from the given position.
     *
     * @return {number} - The closest slide index.
     */
    toIndex: function toIndex(position) {
      return Math.round(-(position + this.offset) / (Layout.slideHeight + Layout.gap));
    },

    /**
     * Trim redundant spaces on the left or right edge if necessary.
     *
     * @param {number} position - Position value to be trimmed.
     *
     * @return {number} - Trimmed position.
     */
    trim: function trim(position) {
      var edge = -(Layout.listHeight - (Layout.height + Layout.gap));
      return between(position, edge, 0);
    },

    /**
     * Return current offset value, considering direction and a number of clones.
     *
     * @return {number} - Offset amount.
     */
    get offset() {
      var height = Layout.height,
          slideHeight = Layout.slideHeight,
          gap = Layout.gap;
      var focus = Splide.options.focus;
      var focusOffset;

      if (focus === 'center') {
        focusOffset = (height - slideHeight) / 2;
      } else {
        focusOffset = (parseInt(focus) || 0) * (slideHeight + gap);
      }

      return (slideHeight + gap) * Components.Clones.length / 2 - focusOffset;
    }

  };
});
// CONCATENATED MODULE: ./src/js/components/track/resolvers/horizontal.js
/**
 * The resolver component for horizontal move.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The resolver component for horizontal move.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The resolver object.
 */

/* harmony default export */ var horizontal = (function (Splide, Components) {
  /**
   * Hold the Layout object.
   *
   * @type {Object}
   */
  var Layout = Components.Layout;
  return {
    /**
     * Set position with CSS transform.
     *
     * @param {Element} list     - A list element.
     * @param {number}  position - A new position value.
     */
    translate: function translate(list, position) {
      applyStyle(list, {
        transform: "translateX(" + position + "px)"
      });
    },

    /**
     * Calculate position by index.
     *
     * @param {number} index - Slide index.
     *
     * @return {Object} - Calculated position.
     */
    toPosition: function toPosition(index) {
      return this.sign * (index * (Layout.slideWidth + Layout.gap) + this.offset);
    },

    /**
     * Calculate the closest slide index from the given position.
     *
     * @return {number} - The closest slide position.
     */
    toIndex: function toIndex(position) {
      return Math.round((this.sign * position - this.offset) / (Layout.slideWidth + Layout.gap));
    },

    /**
     * Trim redundant spaces on the left or right edge if necessary.
     *
     * @param {number} position - Position value to be trimmed.
     *
     * @return {number} - Trimmed position.
     */
    trim: function trim(position) {
      var edge = this.sign * (Layout.listWidth - (Layout.width + Layout.gap));
      return between(position, edge, 0);
    },

    /**
     * Return sign according to the direction.
     *
     * @return {number} - -1 for LTR or 1 or RTL.
     */
    get sign() {
      return Components.Controller.isRtl() ? 1 : -1;
    },

    /**
     * Return current offset value, considering direction and a number of clones.
     *
     * @return {number} - Offset amount.
     */
    get offset() {
      var width = Layout.width,
          slideWidth = Layout.slideWidth,
          gap = Layout.gap;
      var focus = Splide.options.focus;
      var focusOffset;

      if (focus === 'center') {
        focusOffset = (width - slideWidth) / 2;
      } else {
        focusOffset = (parseInt(focus) || 0) * (slideWidth + gap);
      }

      return (slideWidth + gap) * Components.Clones.length / 2 - focusOffset;
    }

  };
});
// CONCATENATED MODULE: ./src/js/components/track/index.js
/**
 * The component for moving list in the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */





/**
 * The component for moving list in the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_track = (function (Splide, Components) {
  /**
   * Store the list element.
   *
   * @type {Element}
   */
  var list;
  /**
   * Store the Resolver for direction.
   *
   * @type {Object}
   */

  var Resolver;
  /**
   * Store the current position.
   *
   * @type {number}
   */

  var currPosition = 0;
  /**
   * Whether the current direction is vertical or not.
   *
   * @type {boolean}
   */

  var isVertical = Splide.options.direction === TTB;
  return {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      list = Components.Elements.list;
      Resolver = isVertical ? vertical(Splide, Components) : horizontal(Splide, Components);
    },

    /**
     * Called after the component is mounted.
     * The resize event must be registered after the Layout's one is done.
     */
    mounted: function mounted() {
      var _this = this;

      if (!Splide.is(FADE)) {
        Splide.on('mounted resize updated', function () {
          _this.jump(Splide.index);
        });
      }
    },

    /**
     * Go to the given destination index.
     * After arriving there, the track is jump to the new index without animation, mainly for loop mode.
     *
     * @param {number}  destIndex - A destination index.
     *                              This can be negative or greater than slides length for reaching clones.
     * @param {number}  newIndex  - An actual new index. They are always same in Slide and Rewind mode.
     * @param {boolean} silently  - If true, suppress emitting events.
     */
    go: function go(destIndex, newIndex, silently) {
      var _this2 = this;

      var newPosition = this.trim(this.toPosition(destIndex));
      var prevIndex = Splide.index;

      if (!silently) {
        Splide.emit('move', newIndex, prevIndex, destIndex);
      }

      if (Math.abs(newPosition - currPosition) >= 1 || Splide.is(FADE)) {
        Components.Transition.start(destIndex, newIndex, this.toCoord(newPosition), function () {
          _this2.end(destIndex, newIndex, prevIndex, silently);
        });
      } else {
        this.end(destIndex, newIndex, prevIndex, silently);
      }
    },

    /**
     * Called whenever slides arrive at a destination.
     *
     * @param {number}  destIndex - A destination index.
     * @param {number}  newIndex  - A new index.
     * @param {number}  prevIndex - A previous index.
     * @param {boolean} silently  - If true, suppress emitting events.
     */
    end: function end(destIndex, newIndex, prevIndex, silently) {
      applyStyle(list, {
        transition: ''
      });

      if (!Splide.is(FADE)) {
        this.jump(newIndex);
      }

      if (!silently) {
        Splide.emit('moved', newIndex, prevIndex, destIndex);
      }
    },

    /**
     * Move the track to the specified index.
     *
     * @param {number} index - A destination index where the track jumps.
     */
    jump: function jump(index) {
      var position = this.trim(this.toPosition(index));
      this.translate(position);
    },

    /**
     * Set position.
     *
     * @param {number} position - A new position value.
     */
    translate: function translate(position) {
      currPosition = position;
      Resolver.translate(list, position);
    },

    /**
     * Calculate position by index.
     *
     * @param {number} index - Slide index.
     *
     * @return {Object} - Calculated position.
     */
    toPosition: function toPosition(index) {
      return Resolver.toPosition(index);
    },

    /**
     * Calculate the closest slide index by the given position.
     *
     * @return {number} - The closest slide index.
     */
    toIndex: function toIndex(position) {
      return Resolver.toIndex(position);
    },

    /**
     * Trim redundant spaces on the left or right edge if necessary.
     *
     * @param {number} position - Position value to be trimmed.
     *
     * @return {number} - Trimmed position.
     */
    trim: function trim(position) {
      if (!Splide.options.trimSpace || Splide.is(LOOP)) {
        return position;
      }

      return Resolver.trim(position);
    },

    /**
     * Return coordinates object by the given position.
     *
     * @param {number} position - A position value.
     *
     * @return {Object} - A coordinates object.
     */
    toCoord: function toCoord(position) {
      return {
        x: isVertical ? 0 : position,
        y: isVertical ? position : 0
      };
    },

    /**
     * Return current position.
     *
     * @return {number} - Current position.
     */
    get position() {
      return currPosition;
    },

    /**
     * Return current offset value including focus offset.
     *
     * @return {number} - Offset amount.
     */
    get offset() {
      return Resolver.offset;
    }

  };
});
// CONCATENATED MODULE: ./src/js/components/clones/index.js
/**
 * The component for cloning some slides for "loop" mode of the track.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The component for cloning some slides for "loop" mode of the track.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_clones = (function (Splide, Components) {
  /**
   * Store information of all clones.
   *
   * @type {Array}
   */
  var clones = [];
  /**
   * Clones component object.
   *
   * @type {Object}
   */

  var Clones = {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      if (Splide.is(LOOP)) {
        generateClones();
      }
    },

    /**
     * Return all clones.
     *
     * @return {Element[]} - Cloned elements.
     */
    get clones() {
      return clones;
    },

    /**
     * Return clone length.
     *
     * @return {number} - A length of clones.
     */
    get length() {
      return clones.length;
    }

  };
  /**
   * Generate and append clones.
   * Clone count is determined by:
   * - Max pages a flick action can move.
   * - Whether the slide length is enough for perPage.
   */

  function generateClones() {
    var Slides = Components.Slides,
        list = Components.Elements.list;
    var _Splide$options = Splide.options,
        perPage = _Splide$options.perPage,
        drag = _Splide$options.drag,
        _Splide$options$flick = _Splide$options.flickMaxPages,
        flickMaxPages = _Splide$options$flick === void 0 ? 1 : _Splide$options$flick;
    var length = Slides.length;
    var count = perPage * (drag ? flickMaxPages + 1 : 1) + (length < perPage ? perPage : 0);
    var slides = Slides.getSlides(false, false);

    while (slides.length < count) {
      slides = slides.concat(slides);
    }

    slides.slice(0, count).forEach(function (elm, index) {
      var clone = cloneDeeply(elm);
      list.appendChild(clone);
      clones.push(clone);
      Slides.register(index + length, index, clone);
    });
    slides.slice(-count).forEach(function (elm, index) {
      var clone = cloneDeeply(elm);
      list.insertBefore(clone, slides[0]);
      clones.push(clone);
      Slides.register(index - count, index, clone);
    });
  }
  /**
   * Clone deeply the given element.
   *
   * @param {Element} elm - An element being duplicated.
   *
   * @return {Node} - A cloned node(element).
   */


  function cloneDeeply(elm) {
    var clone = elm.cloneNode(true);
    addClass(clone, Splide.classes.clone); // ID should not be duplicated.

    removeAttribute(clone, 'id');
    return clone;
  }

  return Clones;
});
// CONCATENATED MODULE: ./src/js/components/layout/resolvers/horizontal.js
/**
 * The resolver component for horizontal layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The resolver component for horizontal layout.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {Object} options    - Current options.
 *
 * @return {Object} - The resolver object.
 */

/* harmony default export */ var resolvers_horizontal = (function (Splide, Components, options) {
  /**
   * Keep the Elements component.
   *
   * @type {string}
   */
  var Elements = Components.Elements;
  /**
   * Keep the root element.
   *
   * @type {Element}
   */

  var root = Splide.root;
  /**
   * Keep the track element.
   *
   * @type {Element}
   */

  var track = Elements.track;
  return {
    /**
     * Margin property name.
     *
     * @type {string}
     */
    marginProp: options.direction === RTL ? 'marginLeft' : 'marginRight',

    /**
     * Always 0 because the height will be determined by inner contents.
     *
     * @type {number}
     */
    height: 0,

    /**
     * Always 0 because the height will be determined by inner contents.
     *
     * @type {number}
     */
    listHeight: 0,

    /**
     * Gap in px.
     *
     * @type {number}
     */
    gap: toPixel(root, options.gap),

    /**
     * An object containing padding left and right in px.
     *
     * @type {Object}
     */
    padding: function () {
      var padding = options.padding;
      var _padding$left = padding.left,
          left = _padding$left === void 0 ? padding : _padding$left,
          _padding$right = padding.right,
          right = _padding$right === void 0 ? padding : _padding$right;
      return {
        left: toPixel(root, left),
        right: toPixel(root, right)
      };
    }(),

    /**
     * Initialization.
     */
    init: function init() {
      applyStyle(track, {
        paddingLeft: unit(this.padding.left),
        paddingRight: unit(this.padding.right)
      });
    },

    /**
     * Return slider width without padding.
     *
     * @return {number} - Current slider width.
     */
    get width() {
      return track.clientWidth - this.padding.left - this.padding.right;
    },

    /**
     * Return list width.
     *
     * @return {number} - Current list width.
     */
    get listWidth() {
      return (this.slideWidth + this.gap) * Components.Slides.total;
    },

    /**
     * Return the slide width in px.
     *
     * @return {number} - The slide width.
     */
    get slideWidth() {
      var width = options.fixedWidth || (this.width + this.gap) / options.perPage - this.gap;
      return toPixel(root, width);
    },

    /**
     * Return the slide height in px.
     *
     * @return {number} - The slide height.
     */
    get slideHeight() {
      var height = options.height || options.fixedHeight || this.width * options.heightRatio;
      return toPixel(root, height);
    },

    /**
     * Return the number of slides in the current view.
     *
     * @return {number} - The number of slides in view.
     */
    get numInView() {
      if (options.fixedWidth) {
        return Math.floor((this.width + this.gap) / (this.slideWidth + this.gap)) || 1;
      }

      return options.perPage;
    }

  };
});
// CONCATENATED MODULE: ./src/js/components/layout/resolvers/vertical.js
/**
 * The resolver component for vertical layout.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The resolver component for vertical layout.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {Object} options    - Current options.
 *
 * @return {Object} - The resolver object.
 */

/* harmony default export */ var resolvers_vertical = (function (Splide, Components, options) {
  /**
   * Keep the Elements component.
   *
   * @type {string}
   */
  var Elements = Components.Elements;
  /**
   * Keep the root element.
   *
   * @type {Element}
   */

  var root = Splide.root;
  /**
   * Keep the track element.
   *
   * @type {Element}
   */

  var track = Elements.track;
  return {
    /**
     * Margin property name.
     *
     * @type {string}
     */
    marginProp: 'marginBottom',

    /**
     * Gap in px.
     *
     * @type {number}
     */
    gap: toPixel(root, options.gap),

    /**
     * An object containing padding left and right in px.
     *
     * @type {Object}
     */
    padding: function () {
      var padding = options.padding;
      var _padding$top = padding.top,
          top = _padding$top === void 0 ? padding : _padding$top,
          _padding$bottom = padding.bottom,
          bottom = _padding$bottom === void 0 ? padding : _padding$bottom;
      return {
        top: toPixel(root, top),
        bottom: toPixel(root, bottom)
      };
    }(),

    /**
     * Init slider styles according to options.
     */
    init: function init() {
      applyStyle(track, {
        paddingTop: unit(this.padding.top),
        paddingBottom: unit(this.padding.bottom)
      });
    },

    /**
     * Return slider width without padding.
     *
     * @return {number} - Current slider width.
     */
    get width() {
      return track.clientWidth;
    },

    /**
     * Return slide height without padding.
     *
     * @return {number} - Slider height.
     */
    get height() {
      var height = options.height || this.width * options.heightRatio;
      exist(height, '"height" or "heightRatio" is missing.');
      return toPixel(Splide.root, height) - this.padding.top - this.padding.bottom;
    },

    /**
     * Return list width.
     *
     * @return {number} - Current list width.
     */
    get listWidth() {
      return this.width;
    },

    /**
     * Return list height.
     *
     * @return {number} - Current list height.
     */
    get listHeight() {
      return (this.slideHeight + this.gap) * Components.Slides.total;
    },

    /**
     * Return the slide width in px.
     *
     * @return {number} - The slide width.
     */
    get slideWidth() {
      return toPixel(Splide.root, options.fixedWidth || this.width);
    },

    /**
     * Return the slide height in px.
     *
     * @return {number} - The slide height.
     */
    get slideHeight() {
      var height = options.fixedHeight || (this.height + this.gap) / options.perPage - this.gap;
      return toPixel(Splide.root, height);
    },

    /**
     * Return the number of slides in the current view.
     *
     * @return {number} - The number of slides in view.
     */
    get numInView() {
      if (options.fixedHeight) {
        return Math.floor((this.height + this.gap) / (this.slideHeight + this.gap)) || 1;
      }

      return options.perPage;
    }

  };
});
// CONCATENATED MODULE: ./src/js/utils/time.js
/**
 * A package of utility functions related with time.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Simple throttle function that controls how often the given function is executed.
 *
 * @param {function} func - A function to be throttled.
 * @param {number}   wait - Time in millisecond for interval of execution.
 *
 * @return {Function} - A debounced function.
 */
function throttle(func, wait) {
  var timeout = null; // Declare function by the "function" keyword to prevent "this" from being inherited.

  return function () {
    if (!timeout) {
      timeout = setTimeout(function () {
        func();
        timeout = null;
      }, wait);
    }
  };
}
/**
 * Custom setInterval function that provides progress rate as callback.
 *
 * @param {function} callback - A callback function fired every time the interval time passes.
 * @param {number}   interval - Interval duration in milliseconds.
 * @param {function} progress - A callback function fired whenever the progress goes.
 *
 * @return {Object} - An object containing play() and pause() functions.
 */

function createInterval(callback, interval, progress) {
  var _window = window,
      requestAnimationFrame = _window.requestAnimationFrame;
  var start,
      elapse,
      rate,
      _pause = true;

  var step = function step(timestamp) {
    if (_pause) {
      return;
    }

    if (!start) {
      start = timestamp;
    }

    elapse = timestamp - start;
    rate = elapse / interval;

    if (elapse >= interval) {
      start = 0;
      rate = 1;
      callback();
    }

    if (progress) {
      progress(rate);
    }

    requestAnimationFrame(step);
  };

  return {
    pause: function pause() {
      _pause = true;
      start = 0;
    },
    play: function play() {
      start = 0;

      if (_pause) {
        _pause = false;
        requestAnimationFrame(step);
      }
    }
  };
}
// CONCATENATED MODULE: ./src/js/components/layout/index.js
/**
 * The component for handing slide layouts and their sizes.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */





/**
 * Interval time for throttle.
 *
 * @type {number}
 */

var THROTTLE = 50;
/**
 * The component for handing slide layouts and their sizes.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var layout = (function (Splide, Components) {
  /**
   * Store the root element.
   *
   * @type {Element}
   */
  var root = Splide.root;
  /**
   * Store the list element.
   *
   * @type {Element}
   */

  var list;
  /**
   * Store all Slide objects.
   *
   * @type {Object}
   */

  var Slides;
  /**
   * Hold a resolver object.
   *
   * @type {Object}
   */

  var Resolver;
  /**
   * Whether the slider is vertical or not.
   * @type {boolean}
   */

  var isVertical = Splide.options.direction === 'ttb';
  /**
   * Keep the Elements component.
   *
   * @type {string}
   */

  var Elements = Components.Elements;
  /**
   * Layout component object.
   *
   * @type {Object}
   */

  var Layout = {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      list = Elements.list;
      Slides = Components.Slides.getSlides(true, true);
      bind();
      init();
    },

    /**
     * Return slider width without padding.
     *
     * @return {number} - Current slide width.
     */
    get width() {
      return Resolver.width;
    },

    /**
     * Return slider height without padding.
     *
     * @return {number}
     */
    get height() {
      return Resolver.height;
    },

    /**
     * Return list width.
     *
     * @return {number} - Current list width.
     */
    get listWidth() {
      return Resolver.listWidth;
    },

    /**
     * Return list height.
     *
     * @return {number} - Current list height.
     */
    get listHeight() {
      return Resolver.listHeight;
    },

    /**
     * Return slide width including gap size.
     * Note that slideWidth * perPage is NOT equal to slider width.
     *
     * @return {number} - Current slide width including gap size.
     */
    get slideWidth() {
      return Resolver.slideWidth;
    },

    /**
     * Return slide height.
     *
     * @return {number} - Computed slide height.
     */
    get slideHeight() {
      return Resolver.slideHeight;
    },

    /**
     * Return gap in px.
     *
     * @return {Object} - Gap amount in px.
     */
    get gap() {
      return Resolver.gap;
    },

    /**
     * Return padding object.
     *
     * @return {Object} - An object containing padding left and right in horizontal mode
     *                    or top and bottom in vertical one.
     */
    get padding() {
      return Resolver.padding;
    },

    /**
     * Return the number of slides in the current view.
     *
     * @return {number} - The number of slides in view.
     */
    get numInView() {
      return Resolver.numInView;
    }

  };
  /**
   * Init slider styles according to options.
   */

  function init() {
    var options = Splide.options;

    if (isVertical) {
      Resolver = resolvers_vertical(Splide, Components, options);
    } else {
      Resolver = resolvers_horizontal(Splide, Components, options);
    }

    Resolver.init();
    applyStyle(root, {
      maxWidth: unit(options.width)
    });

    for (var i in Slides) {
      var _applyStyle;

      applyStyle(Slides[i].slide, (_applyStyle = {}, _applyStyle[Resolver.marginProp] = unit(Resolver.gap), _applyStyle));
    }

    resize();
  }
  /**
   * Listen the resize native event with throttle.
   * Initialize when the component is mounted or options are updated.
   */


  function bind() {
    var throttledResize = throttle(function () {
      Splide.emit('resize');
    }, THROTTLE);
    subscribe(window, 'resize', throttledResize);
    Splide.on('mounted resize', resize).on('updated', init);
  }
  /**
   * Resize the list and slides including clones.
   */


  function resize() {
    applyStyle(list, {
      width: unit(Layout.listWidth),
      height: unit(Layout.listHeight)
    });
    applyStyle(Components.Elements.track, {
      height: unit(Layout.height)
    });
    var slideWidth = unit(Resolver.slideWidth);
    var slideHeight = unit(Resolver.slideHeight);

    for (var i in Slides) {
      var _Slides$i = Slides[i],
          slide = _Slides$i.slide,
          container = _Slides$i.container;
      applyStyle(container, {
        height: slideHeight
      });
      applyStyle(slide, {
        width: slideWidth,
        height: !container ? slideHeight : ''
      });
    }
  }

  return Layout;
});
// CONCATENATED MODULE: ./src/js/components/drag/index.js
/**
 * The component for supporting mouse drag and swipe.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */






/**
 * Adjust how much the track can be pulled on the first or last page.
 * The larger number this is, the farther the track moves.
 * This should be around 5.
 *
 * @type {number}
 */

var FRICTION_REDUCER = 5;
/**
 * To start dragging the track, the drag angle must be less than this threshold.
 *
 * @type {number}
 */

var ANGLE_THRESHOLD = 30;
/**
 * When a drag distance is over this value, the action will be treated as "swipe", not "flick".
 *
 * @type {number}
 */

var SWIPE_THRESHOLD = 150;
/**
 * The component supporting mouse drag and swipe.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var drag = (function (Splide, Components) {
  /**
   * Store the Move component.
   *
   * @type {Object}
   */
  var Track = Components.Track;
  /**
   * Store the Controller component.
   *
   * @type {Object}
   */

  var Controller = Components.Controller;
  /**
   * Coordinate of the track on starting drag.
   *
   * @type {Object}
   */

  var startCoord;
  /**
   * Analyzed info on starting drag.
   * 
   * @type {Object|null}
   */

  var startInfo;
  /**
   * Analyzed info being updated while dragging/swiping.
   *
   * @type {Object}
   */

  var currentInfo;
  /**
   * Determine whether slides are being dragged or not.
   *
   * @type {boolean}
   */

  var isDragging = false;
  /**
   * Whether the slider direction is vertical or not.
   *
   * @type {boolean}
   */

  var isVertical = Splide.options.direction === TTB;
  /**
   * Axis for the direction.
   *
   * @type {string}
   */

  var axis = isVertical ? 'y' : 'x';
  /**
   * Drag component object.
   *
   * @type {Object}
   */

  var Drag = {
    /**
     * Mount only when the drag option is true.
     *
     * @type {boolean}
     */
    required: Splide.options.drag,

    /**
     * Whether dragging is disabled or not.
     *
     * @type {boolean}
     */
    disabled: false,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      var list = Components.Elements.list;
      subscribe(list, 'touchstart mousedown', start);
      subscribe(list, 'touchmove mousemove', move, {
        passive: false
      });
      subscribe(list, 'touchend touchcancel mouseleave mouseup dragend', end); // Prevent dragging an image or anchor itself.

      each(list.querySelectorAll('img, a'), function (elm) {
        subscribe(elm, 'dragstart', function (e) {
          e.preventDefault();
        }, {
          passive: false
        });
      });
    }
  };
  /**
   * Called when the track starts to be dragged.
   *
   * @param {TouchEvent|MouseEvent} e - TouchEvent or MouseEvent object.
   */

  function start(e) {
    if (!Drag.disabled && !isDragging && Splide.State.is(IDLE)) {
      startCoord = Track.toCoord(Track.position);
      startInfo = analyze(e, {});
      currentInfo = startInfo;
    }
  }
  /**
   * Called while the track being dragged.
   *
   * @param {TouchEvent|MouseEvent} e - TouchEvent or MouseEvent object.
   */


  function move(e) {
    if (startInfo) {
      currentInfo = analyze(e, startInfo);

      if (isDragging) {
        if (e.cancelable) {
          e.preventDefault();
        }

        var position = startCoord[axis] + currentInfo.offset[axis];
        Track.translate(resist(position));
      } else {
        if (shouldMove(currentInfo)) {
          Splide.emit('drag', startInfo);
          isDragging = true;
        }
      }
    }
  }
  /**
   * Determine whether to start moving the track or not by drag angle.
   *
   * @param {Object} info - An information object.
   *
   * @return {boolean} - True if the track should be moved or false if not.
   */


  function shouldMove(_ref) {
    var offset = _ref.offset;

    if (Splide.State.is(IDLE)) {
      var angle = Math.atan(Math.abs(offset.y) / Math.abs(offset.x)) * 180 / Math.PI;

      if (isVertical) {
        angle = 90 - angle;
      }

      return angle < ANGLE_THRESHOLD;
    }

    return false;
  }
  /**
   * Resist dragging the track on the first/last page because there is no more.
   *
   * @param {number} position - A position being applied to the track.
   *
   * @return {Object} - Adjusted position.
   */


  function resist(position) {
    if (!Splide.is(LOOP)) {
      var trim = Track.trim,
          toPosition = Track.toPosition;
      var sign = Controller.isRtl() ? -1 : 1;

      var _start = sign * trim(toPosition(0));

      var _end = sign * trim(toPosition(Controller.edgeIndex));

      position *= sign;

      if (position > _start) {
        position = FRICTION_REDUCER * Math.log(position - _start) + _start;
      } else if (position < _end) {
        position = -FRICTION_REDUCER * Math.log(_end - position) + _end;
      }

      position *= sign;
    }

    return position;
  }
  /**
   * Called when dragging ends.
   */


  function end() {
    startInfo = null;

    if (isDragging) {
      Splide.emit('dragged', currentInfo);
      go(currentInfo);
      isDragging = false;
    }
  }
  /**
   * Go to the slide determined by the analyzed data.
   *
   * @param {Object} info - An info object.
   */


  function go(info) {
    var velocity = info.velocity[axis];
    var absV = Math.abs(velocity);

    if (absV > 0) {
      var Layout = Components.Layout;
      var options = Splide.options;
      var sign = velocity < 0 ? -1 : 1;
      var destination = Track.position;

      if (absV > options.flickThreshold && Math.abs(info.offset[axis]) < SWIPE_THRESHOLD) {
        destination += sign * Math.min(absV * options.flickPower, Layout.width * (options.flickMaxPages || 1));
      }

      var index = Track.toIndex(destination); // Do not allow the track to go to a previous position.

      if (index === Splide.index) {
        index += Controller.isRtl() ? sign : -sign;
      }

      if (!Splide.is(LOOP)) {
        index = between(index, 0, Controller.edgeIndex);
      }

      Controller.go(index, options.isNavigation);
    }
  }
  /**
   * Analyze the given event object and return important information for handling swipe behavior.
   *
   * @param {Event}   e          - Touch or Mouse event object.
   * @param {Object}  startInfo  - Information analyzed on start for calculating difference from the current one.
   *
   * @return {Object} - An object containing analyzed information, such as offset, velocity, etc.
   */


  function analyze(e, startInfo) {
    var timeStamp = e.timeStamp,
        touches = e.touches;

    var _ref2 = touches ? touches[0] : e,
        clientX = _ref2.clientX,
        clientY = _ref2.clientY;

    var _ref3 = startInfo.to || {},
        _ref3$x = _ref3.x,
        fromX = _ref3$x === void 0 ? clientX : _ref3$x,
        _ref3$y = _ref3.y,
        fromY = _ref3$y === void 0 ? clientY : _ref3$y;

    var startTime = startInfo.timeStamp || 0;
    var offset = {
      x: clientX - fromX,
      y: clientY - fromY
    };
    var duration = timeStamp - startTime;
    var velocity = {
      x: offset.x / duration,
      y: offset.y / duration
    };
    return {
      from: {
        x: fromX,
        y: fromY
      },
      to: {
        x: clientX,
        y: clientY
      },
      offset: offset,
      timeStamp: timeStamp,
      velocity: velocity
    };
  }

  return Drag;
});
// CONCATENATED MODULE: ./src/js/components/click/index.js
/**
 * The component for handling a click event.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The component for handling a click event.
 * Click should be disabled during drag/swipe.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_click = (function (Splide, Components) {
  /**
   * Whether click is disabled or not.
   *
   * @type {boolean}
   */
  var disabled = false;
  /**
   * Click component object.
   *
   * @type {Object}
   */

  var Click = {
    /**
     * Mount only when the drag is activated and the slide type is not "fade".
     *
     * @type {boolean}
     */
    required: Splide.options.drag && !Splide.is(FADE),

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      subscribe(Components.Elements.track, 'click', click, {
        capture: true
      });
      Splide.on('drag', function () {
        disabled = true;
      }).on('moved', function () {
        disabled = false;
      });
    }
  };
  /**
   * Called when a track element is clicked.
   *
   * @param {Event} e - A click event.
   */

  function click(e) {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  return Click;
});
// CONCATENATED MODULE: ./src/js/components/autoplay/index.js
/**
 * The component for playing slides automatically.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * Set of pause flags.
 */

var PAUSE_FLAGS = {
  HOVER: 1,
  FOCUS: 2,
  MANUAL: 3
};
/**
 * The component for playing slides automatically.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_autoplay = (function (Splide, Components, name) {
  /**
   * Store pause flags.
   *
   * @type {Array}
   */
  var flags = [];
  /**
   * Store an interval object.
   *
   * @type {Object};
   */

  var interval;
  /**
   * Autoplay component object.
   *
   * @type {Object}
   */

  var Autoplay = {
    /**
     * Required only when the autoplay option is true.
     *
     * @type {boolean}
     */
    required: Splide.options.autoplay,

    /**
     * Called when the component is mounted.
     * Note that autoplay starts only if there are slides over perPage number.
     */
    mount: function mount() {
      var options = Splide.options;
      var _Components$Elements = Components.Elements,
          slides = _Components$Elements.slides,
          bar = _Components$Elements.bar;

      if (slides.length > options.perPage) {
        interval = createInterval(function () {
          Splide.go('>');
        }, options.interval, function (rate) {
          Splide.emit(name + ":playing", rate);
          bar && applyStyle(bar, {
            width: rate * 100 + "%"
          });
        });
        bind();
        this.play();
      }
    },

    /**
     * Start autoplay.
     *
     * @param {number} flag - A pause flag to be removed.
     */
    play: function play(flag) {
      if (flag === void 0) {
        flag = 0;
      }

      flags = flags.filter(function (f) {
        return f !== flag;
      });

      if (!flags.length) {
        Splide.emit(name + ":play");
        interval.play();
      }
    },

    /**
     * Pause autoplay.
     * Note that Array.includes is not supported by IE.
     *
     * @param {number} flag - A pause flag to be added.
     */
    pause: function pause(flag) {
      if (flag === void 0) {
        flag = 0;
      }

      interval.pause();

      if (flags.indexOf(flag) === -1) {
        flags.push(flag);
      }

      if (flags.length === 1) {
        Splide.emit(name + ":pause");
      }
    }
  };
  /**
   * Listen some events.
   */

  function bind() {
    var options = Splide.options;
    var Elements = Components.Elements;
    var sub = Splide.sub;
    var elms = [Splide.root, sub ? sub.root : null];

    if (options.pauseOnHover) {
      switchOn(elms, 'mouseleave', PAUSE_FLAGS.HOVER, true);
      switchOn(elms, 'mouseenter', PAUSE_FLAGS.HOVER, false);
    }

    if (options.pauseOnFocus) {
      switchOn(elms, 'focusout', PAUSE_FLAGS.FOCUS, true);
      switchOn(elms, 'focusin', PAUSE_FLAGS.FOCUS, false);
    }

    subscribe(Elements.play, 'click', function () {
      // Need to be removed a focus flag at first.
      Autoplay.play(PAUSE_FLAGS.FOCUS);
      Autoplay.play(PAUSE_FLAGS.MANUAL);
    });
    switchOn([Elements.pause], 'click', PAUSE_FLAGS.MANUAL, false); // Rewind the timer when others move the slide.

    Splide.on('move', function () {
      Autoplay.play();
    });
  }
  /**
   * Play or pause on the given event.
   *
   * @param {Element[]} elms  - Elements.
   * @param {string}    event - An event name or names.
   * @param {number}    flag  - A pause flag defined on the top.
   * @param {boolean}   play  - Determine whether to play or pause.
   */


  function switchOn(elms, event, flag, play) {
    for (var i in elms) {
      subscribe(elms[i], event, function () {
        Autoplay[play ? 'play' : 'pause'](flag);
      });
    }
  }

  return Autoplay;
});
// CONCATENATED MODULE: ./src/js/components/cover/index.js
/**
 * The component for change an img element to background image of its wrapper.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The component for change an img element to background image of its wrapper.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_cover = (function (Splide, Components) {
  /**
   * Hold options.
   *
   * @type {Object}
   */
  var options = Splide.options;
  /**
   * Cover component object.
   *
   * @type {Object}
   */

  var Cover = {
    /**
     * To set an image as cover, the height option is required.
     *
     * @type {boolean}
     */
    required: options.cover && (options.height || options.heightRatio || options.fixedHeight),

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      Components.Slides.getSlides(true, false).forEach(function (slide) {
        var img = find(slide, 'img');

        if (img && img.src) {
          cover(img);
        }
      });
      Splide.on('lazyload:loaded', function (img) {
        cover(img);
      });
    }
  };
  /**
   * Set background image of the parent element, using source of the given image element.
   *
   * @param {Element} img - An image element.
   */

  function cover(img) {
    var parent = img.parentElement;

    if (parent) {
      applyStyle(parent, {
        background: "center/cover no-repeat url(\"" + img.src + "\")"
      });
      applyStyle(img, {
        display: 'none'
      });
    }
  }

  return Cover;
});
// CONCATENATED MODULE: ./src/js/components/arrows/path.js
/**
 * Export vector path for an arrow.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Namespace definition for SVG element.
 *
 * @type {string}
 */
var XML_NAME_SPACE = 'http://www.w3.org/2000/svg';
/**
 * The arrow vector path.
 *
 * @type {number}
 */

var PATH = 'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z';
/**
 * SVG width and height.
 *
 * @type {number}
 */

var SIZE = 40;
// CONCATENATED MODULE: ./src/js/components/arrows/index.js
/**
 * The component for appending prev/next arrows.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The component for appending prev/next arrows.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_arrows = (function (Splide, Components, name) {
  /**
   * Keep all created elements.
   *
   * @type {Object}
   */
  var arrows;
  /**
   * Store the class list.
   *
   * @type {Object}
   */

  var classes = Splide.classes;
  /**
   * Hold the root element.
   *
   * @type {Element}
   */

  var root = Splide.root;
  /**
   * Arrows component object.
   *
   * @type {Object}
   */

  var Arrows = {
    /**
     * Required when the arrows option is true.
     *
     * @type {boolean}
     */
    required: Splide.options.arrows,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      var Elements = Components.Elements;
      var arrowsOption = Splide.options.arrows;
      arrows = Elements.arrows; // If arrows were not found in HTML, let's generate them.

      if ((!arrows.prev || !arrows.next) && arrowsOption) {
        arrows = createArrows();
        var slider = Elements.slider;
        var parent = arrowsOption === 'slider' && slider ? slider : root;
        parent.insertBefore(arrows.wrapper, parent.firstChild);
      }

      if (arrows) {
        listen();
        bind();
      }

      this.arrows = arrows;
    },

    /**
     * Called after all components are mounted.
     */
    mounted: function mounted() {
      Splide.emit(name + ":mounted", arrows.prev, arrows.next);
    }
  };
  /**
   * Subscribe click events.
   */

  function listen() {
    var perMove = Splide.options.perMove;
    subscribe(arrows.prev, 'click', function () {
      Splide.go(perMove ? "-" + perMove : '<');
    });
    subscribe(arrows.next, 'click', function () {
      Splide.go(perMove ? "+" + perMove : '>');
    });
  }
  /**
   * Update a disable attribute.
   */


  function bind() {
    Splide.on('mounted move updated', function () {
      var _arrows = arrows,
          prev = _arrows.prev,
          next = _arrows.next;
      var _Components$Controlle = Components.Controller,
          prevIndex = _Components$Controlle.prevIndex,
          nextIndex = _Components$Controlle.nextIndex;
      var hasSlides = Splide.length > 1;
      prev.disabled = prevIndex < 0 || !hasSlides;
      next.disabled = nextIndex < 0 || !hasSlides;
      Splide.emit(name + ":updated", prev, next, prevIndex, nextIndex);
    });
  }
  /**
   * Create a wrapper and arrow elements.
   *
   * @return {Object} - An object contains created elements.
   */


  function createArrows() {
    var wrapper = create('div', {
      "class": classes.arrows
    });
    var prev = createArrow(true);
    var next = createArrow(false);
    wrapper.appendChild(prev);
    wrapper.appendChild(next);
    return {
      wrapper: wrapper,
      prev: prev,
      next: next
    };
  }
  /**
   * Create an arrow element.
   *
   * @param {boolean} isPrev - Determine to create a prev arrow or next arrow.
   *
   * @return {Element} - A created arrow element.
   */


  function createArrow(isPrev) {
    var arrow = create('button', {
      "class": classes.arrow + " " + (isPrev ? classes.prev : classes.next)
    });
    arrow.innerHTML = "<svg xmlns=\"" + XML_NAME_SPACE + "\"\tviewBox=\"0 0 " + SIZE + " " + SIZE + "\"\twidth=\"" + SIZE + "\"\theight=\"" + SIZE + "\">" + ("<path d=\"" + (Splide.options.arrowPath || PATH) + "\" />") + "</svg>";
    return arrow;
  }

  return Arrows;
});
// CONCATENATED MODULE: ./src/js/components/pagination/index.js
/**
 * The component for handling pagination
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The event name for updating some attributes of pagination nodes.
 *
 * @type {string}
 */

var ATTRIBUTES_UPDATE_EVENT = 'move.page';
/**
 * The event name for "update".
 *
 * @type {string}
 */

var UPDATE_EVENT = 'updated.page';
/**
 * The component for handling pagination
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var pagination = (function (Splide, Components, name) {
  /**
   * Store all data for pagination.
   * - list: A list element.
   * - items: An array that contains objects(li, button, index, page).
   *
   * @type {Object}
   */
  var data = {};
  /**
   * Hold a parent element of pagination.
   *
   * @type {Element}
   */

  var parent;
  /**
   * Pagination component object.
   *
   * @type {Object}
   */

  var Pagination = {
    /**
     * Required only when the pagination option is true.
     *
     * @type {boolean}
     */
    required: Splide.options.pagination,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      data = createPagination();
      var slider = Components.Elements.slider;
      parent = Splide.options.pagination === 'slider' && slider ? slider : Splide.root;
      parent.appendChild(data.list);
      bind();
    },

    /**
     * Called after all components are mounted.
     */
    mounted: function mounted() {
      var index = Splide.index;
      Splide.emit(name + ":mounted", data, this.getItem(index));
      update(index, -1);
    },

    /**
     * Destroy the pagination.
     * Be aware that node.remove() is not supported by IE.
     */
    destroy: function destroy() {
      if (data && data.list) {
        parent.removeChild(data.list);
      }

      Splide.off(ATTRIBUTES_UPDATE_EVENT);
      data = null;
    },

    /**
     * Return an item by index.
     *
     * @param {number} index - A slide index.
     *
     * @return {Object|undefined} - An item object on success or undefined on failure.
     */
    getItem: function getItem(index) {
      return data.items[Components.Controller.indexToPage(index)];
    },

    /**
     * Return object containing pagination data.
     *
     * @return {Object} - Pagination data including list and items.
     */
    get data() {
      return data;
    }

  };
  /**
   * Listen some events.
   */

  function bind() {
    Splide.on(ATTRIBUTES_UPDATE_EVENT, update).on(UPDATE_EVENT, function () {
      Pagination.destroy();

      if (Splide.options.pagination) {
        Pagination.mount();
        Pagination.mounted();
      }
    });
  }
  /**
   * Update attributes.
   *
   * @param {number} index     - Active index.
   * @param {number} prevIndex - Prev index.
   */


  function update(index, prevIndex) {
    var prev = Pagination.getItem(prevIndex);
    var curr = Pagination.getItem(index);

    if (prev) {
      removeClass(prev.button, STATUS_CLASSES.active);
    }

    if (curr) {
      addClass(curr.button, STATUS_CLASSES.active);
    }

    Splide.emit(name + ":updated", data, prev, curr);
  }
  /**
   * Create a wrapper and button elements.
   *
   * @return {Object} - An object contains all data.
   */


  function createPagination() {
    var options = Splide.options;
    var classes = Splide.classes;
    var list = create('ul', {
      "class": classes.pagination
    });
    var Slides = Components.Slides;
    var items = Slides.getSlides(false, true).filter(function (Slide) {
      return options.focus !== false || Slide.index % options.perPage === 0;
    }).map(function (Slide, page) {
      var li = create('li', {});
      var button = create('button', {
        "class": classes.page
      });
      li.appendChild(button);
      list.appendChild(li);
      subscribe(button, 'click', function () {
        Splide.go(">" + page);
      });
      return {
        li: li,
        button: button,
        page: page,
        Slides: Slides.getSlidesByPage(page)
      };
    });
    return {
      list: list,
      items: items
    };
  }

  return Pagination;
});
// CONCATENATED MODULE: ./src/js/components/lazyload/index.js
/**
 * The component for loading slider images lazily.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The name for a data attribute.
 *
 * @type {string}
 */

var SRC_DATA_NAME = 'data-splide-lazy';
/**
 * The component for loading slider images lazily.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 * @param {string} name       - A component name as a lowercase string.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var components_lazyload = (function (Splide, Components, name) {
  /**
   * Next index for sequential loading.
   *
   * @type {number}
   */
  var nextIndex = 0;
  /**
   * Store objects containing an img element and a Slide object.
   *
   * @type {Object[]}
   */

  var images = [];
  /**
   * Store a lazyload option value.
   *
   * @type {string|boolean}
   */

  var lazyload = Splide.options.lazyLoad;
  /**
   * Whether to load images sequentially or not.
   *
   * @type {boolean}
   */

  var isSequential = lazyload === 'sequential';
  /**
   * Lazyload component object.
   *
   * @type {Object}
   */

  var Lazyload = {
    /**
     * Mount only when the lazyload option is provided.
     *
     * @type {boolean}
     */
    required: lazyload,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      Components.Slides.getSlides(true, true).forEach(function (Slide) {
        var img = find(Slide.slide, "[" + SRC_DATA_NAME + "]");

        if (img) {
          images.push({
            img: img,
            Slide: Slide
          });
          applyStyle(img, {
            visibility: 'hidden'
          });
        }
      });

      if (images.length) {
        if (isSequential) {
          loadNext();
        } else {
          Splide.on('mounted', function () {
            check(Splide.index);
          }).on("moved." + name, function (index) {
            check(index);
          });
        }
      }
    }
  };
  /**
   * Check how close each image is from the active slide and
   * determine whether to start loading or not according to the distance.
   *
   * @param {number} index - Current index.
   */

  function check(index) {
    var options = Splide.options;
    images = images.filter(function (image) {
      if (image.Slide.isWithin(index, options.perPage * (options.preloadPages + 1))) {
        load(image.img, image.Slide);
        return false;
      }

      return true;
    }); // Unbind if all images are loaded.

    if (!images.length) {
      Splide.off("moved." + name);
    }
  }
  /**
   * Start loading an image.
   * Creating a clone of the image element since setting src attribute directly to it
   * often occurs 'hitch', blocking some other processes of a browser.
   *
   * @param {Element} img   - An image element.
   * @param {Object}  Slide - A Slide object.
   */


  function load(img, Slide) {
    addClass(Slide.slide, STATUS_CLASSES.loading);
    var spinner = create('span', {
      "class": Splide.classes.spinner
    });
    img.parentElement.appendChild(spinner);

    img.onload = function () {
      loaded(img, spinner, Slide, false);
    };

    img.onerror = function () {
      loaded(img, spinner, Slide, true);
    };

    setAttribute(img, 'src', getAttribute(img, SRC_DATA_NAME));
  }
  /**
   * Start loading a next image in images array.
   */


  function loadNext() {
    if (nextIndex < images.length) {
      var image = images[nextIndex];
      load(image.img, image.Slide);
    }

    nextIndex++;
  }
  /**
   * Called just after the image was loaded or loading was aborted by some error.
   *
   * @param {Element} img     - An image element.
   * @param {Element} spinner - A spinner element.
   * @param {Object}  Slide   - A Slide object.
   * @param {boolean} error   - True if the image was loaded successfully or false on error.
   */


  function loaded(img, spinner, Slide, error) {
    removeClass(Slide.slide, STATUS_CLASSES.loading);

    if (!error) {
      img.parentElement.removeChild(spinner);
      applyStyle(img, {
        visibility: 'visible'
      });
      Splide.emit(name + ":loaded", img);
    }

    if (isSequential) {
      loadNext();
    }
  }

  return Lazyload;
});
// CONCATENATED MODULE: ./src/js/components/keyboard/index.js
/**
 * The component for controlling slides via keyboard.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Map a key to a slide control.
 *
 * @type {Object}
 */

var KEY_MAP = {
  horizontal: {
    ArrowLeft: '<',
    ArrowRight: '>',
    // For IE.
    Left: '<',
    Right: '>'
  },
  vertical: {
    ArrowUp: '<',
    ArrowDown: '>',
    // For IE.
    Up: '<',
    Down: '>'
  }
};
/**
 * The component for controlling slides via keyboard.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var keyboard = (function (Splide) {
  /**
   * Hold functions to remove event listener.
   *
   * @type {Array|undefined}
   */
  var removers;
  return {
    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      var map = KEY_MAP[Splide.options.direction === 'ttb' ? 'vertical' : 'horizontal'];
      Splide.on('mounted updated', function () {
        if (removers) {
          removers[0]();
          removers = undefined;
        }

        if (Splide.options.keyboard) {
          removers = subscribe(Splide.root, 'keydown', function (e) {
            if (map[e.key]) {
              Splide.go(map[e.key]);
            }
          });
        }
      });
    }
  };
});
// CONCATENATED MODULE: ./src/js/constants/a11y.js
/**
 * Export aria attribute names.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Attribute name for aria-current.
 *
 * @type {string}
 */
var ARIA_CURRENRT = 'aria-current';
/**
 * Attribute name for aria-control.
 *
 * @type {string}
 */

var ARIA_CONTROLS = 'aria-controls';
/**
 * Attribute name for aria-control.
 *
 * @type {string}
 */

var ARIA_LABEL = 'aria-label';
/**
 * Attribute name for aria-labelledby.
 *
 * @type {string}
 */

var ARIA_LABELLEDBY = 'aria-labelledby';
/**
 * Attribute name for aria-hidden.
 *
 * @type {string}
 */

var ARIA_HIDDEN = 'aria-hidden';
/**
 * Attribute name for tab-index.
 *
 * @type {string}
 */

var TAB_INDEX = 'tabindex';
// CONCATENATED MODULE: ./src/js/components/a11y/index.js
/**
 * The component for enhancing accessibility.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The component for enhancing accessibility.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var a11y = (function (Splide, Components) {
  /**
   * Hold a i18n object.
   *
   * @type {Object}
   */
  var i18n = Splide.i18n;
  /**
   * A11y component object.
   *
   * @type {Object}
   */

  var A11y = {
    /**
     * Required only when the accessibility option is true.
     *
     * @type {boolean}
     */
    required: Splide.options.accessibility,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      Splide.on('visible', function (Slide) {
        updateSlide(Slide.slide, true);
      }).on('hidden', function (Slide) {
        updateSlide(Slide.slide, false);
      }).on('arrows:mounted', initArrows).on('arrows:updated', updateArrows).on('pagination:mounted', initPagination).on('pagination:updated', updatePagination);

      if (Splide.options.isNavigation) {
        Splide.on('navigation:mounted', initNavigation).on('active', function (Slide) {
          updateNavigation(Slide, true);
        }).on('inactive', function (Slide) {
          updateNavigation(Slide, false);
        });
      }

      initAutoplay();
    }
  };
  /**
   * Update slide attributes when it gets visible or hidden.
   *
   * @param {Element} slide   - A slide element.
   * @param {Boolean} visible - True when the slide gets visible, or false when hidden.
   */

  function updateSlide(slide, visible) {
    setAttribute(slide, ARIA_HIDDEN, !visible);
    setAttribute(slide, TAB_INDEX, visible ? 0 : -1);
  }
  /**
   * Initialize arrows if they are available.
   * Append screen reader elements and add aria-controls attribute.
   *
   * @param {Element} prev - Previous arrow element.
   * @param {Element} next - Next arrow element.
   */


  function initArrows(prev, next) {
    var controls = Components.Elements.track.id;
    setAttribute(prev, ARIA_CONTROLS, controls);
    setAttribute(next, ARIA_CONTROLS, controls);
  }
  /**
   * Update arrow attributes.
   *
   * @param {Element} prev      - Previous arrow element.
   * @param {Element} next      - Next arrow element.
   * @param {number}  prevIndex - Previous slide index or -1 when there is no precede slide.
   * @param {number}  nextIndex - Next slide index or -1 when there is no next slide.
   */


  function updateArrows(prev, next, prevIndex, nextIndex) {
    var index = Splide.index;
    var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
    var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
    setAttribute(prev, ARIA_LABEL, prevLabel);
    setAttribute(next, ARIA_LABEL, nextLabel);
  }
  /**
   * Initialize pagination if it's available.
   * Append a screen reader element and add aria-controls/label attribute to each item.
   *
   * @param {Object} data       - Data object containing all items.
   * @param {Object} activeItem - An initial active item.
   */


  function initPagination(data, activeItem) {
    if (activeItem) {
      setAttribute(activeItem.button, ARIA_CURRENRT, true);
    }

    data.items.forEach(function (item) {
      var options = Splide.options;
      var text = options.focus === false && options.perPage > 1 ? i18n.pageX : i18n.slideX;
      var label = sprintf(text, item.page + 1);
      var button = item.button;
      var controls = [];
      item.Slides.forEach(function (Slide) {
        controls.push(Slide.slide.id);
      });
      setAttribute(button, ARIA_CONTROLS, controls.join(' '));
      setAttribute(button, ARIA_LABEL, label);
    });
  }
  /**
   * Update pagination attributes.
   *
   * @param {Object}  data - Data object containing all items.
   * @param {Element} prev - A previous active element.
   * @param {Element} curr - A current active element.
   */


  function updatePagination(data, prev, curr) {
    if (prev) {
      removeAttribute(prev.button, ARIA_CURRENRT);
    }

    if (curr) {
      setAttribute(curr.button, ARIA_CURRENRT, true);
    }
  }
  /**
   * Initialize autoplay buttons.
   */


  function initAutoplay() {
    var Elements = Components.Elements;
    [Elements.play, Elements.pause].forEach(function (elm, index) {
      if (elm) {
        if (!isButton(elm)) {
          setAttribute(elm, 'role', 'button');
        }

        setAttribute(elm, ARIA_CONTROLS, Elements.track.id);
        setAttribute(elm, ARIA_LABEL, i18n[index === 0 ? 'play' : 'pause']);
      }
    });
  }
  /**
   * Initialize navigation slider.
   * Add button role, aria-label, aria-controls to slide elements and append screen reader text to them.
   *
   * @param {Splide} main - A main Splide instance.
   */


  function initNavigation(main) {
    var Slides = Components.Slides.getSlides(true, true);
    Slides.forEach(function (Slide) {
      var slide = Slide.slide;

      if (!isButton(slide)) {
        setAttribute(slide, 'role', 'button');
      }

      var slideIndex = Slide.realIndex > -1 ? Slide.realIndex : Slide.index;
      var label = sprintf(i18n.slideX, slideIndex + 1);
      var mainSlide = main.Components.Slides.getSlide(slideIndex);
      setAttribute(slide, ARIA_LABEL, label);

      if (mainSlide) {
        setAttribute(slide, ARIA_CONTROLS, mainSlide.slide.id);
      }
    });
  }
  /**
   * Update navigation attributes.
   *
   * @param {Object}  Slide  - A target Slide object.
   * @param {boolean} active - True if the slide is active or false if inactive.
   */


  function updateNavigation(_ref, active) {
    var slide = _ref.slide;

    if (active) {
      setAttribute(slide, ARIA_CURRENRT, true);
    } else {
      removeAttribute(slide, ARIA_CURRENRT);
    }
  }
  /**
   * Check if the given element is button or not.
   *
   * @param {Element} elm - An element to be checked.
   *
   * @return {boolean} - True if the given element is button.
   */


  function isButton(elm) {
    return elm.tagName.toLowerCase() === 'button';
  }

  return A11y;
});
// CONCATENATED MODULE: ./src/js/components/sync/index.js
/**
 * The component for synchronizing a slider with another.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */



/**
 * The event name for sync.
 *
 * @type {string}
 */

var SYNC_EVENT = 'move.sync';
/**
 * The keys for triggering the navigation button.
 *
 * @type {String[]}
 */

var TRIGGER_KEYS = [' ', 'Enter', 'Spacebar'];
/**
 * The component for synchronizing a slider with another.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */

/* harmony default export */ var sync = (function (Splide) {
  /**
   * Keep the sibling Splide instance.
   *
   * @type {Splide}
   */
  var sibling = Splide.sibling;
  /**
   * Whether the sibling slider is navigation or not.
   *
   * @type {Splide|boolean}
   */

  var isNavigation = sibling && sibling.options.isNavigation;
  /**
   * Layout component object.
   *
   * @type {Object}
   */

  var Sync = {
    /**
     * Required only when the sub slider is available.
     *
     * @type {boolean}
     */
    required: !!sibling,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      syncMain();
      syncSibling();

      if (isNavigation) {
        bind();
      }
    },

    /**
     * Called after all components are mounted.
     */
    mounted: function mounted() {
      if (isNavigation) {
        sibling.emit('navigation:mounted', Splide);
      }
    }
  };
  /**
   * Listen the primary slider event to move secondary one.
   * Must unbind a handler at first to avoid infinite loop.
   */

  function syncMain() {
    Splide.on(SYNC_EVENT, function (newIndex, prevIndex, destIndex) {
      sibling.off(SYNC_EVENT).go(sibling.is(LOOP) ? destIndex : newIndex, false);
      syncSibling();
    });
  }
  /**
   * Listen the secondary slider event to move primary one.
   * Must unbind a handler at first to avoid infinite loop.
   */


  function syncSibling() {
    sibling.on(SYNC_EVENT, function (newIndex, prevIndex, destIndex) {
      Splide.off(SYNC_EVENT).go(Splide.is(LOOP) ? destIndex : newIndex, false);
      syncMain();
    });
  }
  /**
   * Listen some events on each slide.
   */


  function bind() {
    var Slides = sibling.Components.Slides.getSlides(true, true);
    Slides.forEach(function (Slide) {
      var slide = Slide.slide;
      /*
       * Listen mouseup and touchend events to handle click.
       * Need to check "IDLE" status because slides can be moving by Drag component.
       */

      subscribe(slide, 'mouseup touchend', function (e) {
        // Ignore a middle or right click.
        if (!e.button || e.button === 0) {
          moveSibling(Slide.index);
        }
      });
      /*
       * Subscribe keyup to handle Enter and Space key.
       * Note that Array.includes is not supported by IE.
       */

      subscribe(slide, 'keyup', function (e) {
        if (TRIGGER_KEYS.indexOf(e.key) > -1) {
          e.preventDefault();
          moveSibling(Slide.index);
        }
      }, {
        passive: false
      });
    });
  }

  function moveSibling(index) {
    if (Splide.State.is(IDLE)) {
      sibling.go(index);
    }
  }

  return Sync;
});
// CONCATENATED MODULE: ./src/js/components/breakpoints/index.js
/**
 * The component for updating options according to a current window width.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * The component for updating options according to a current window width.
 *
 * @param {Splide} Splide - A Splide instance.
 *
 * @return {Object} - The component object.
 */
/* harmony default export */ var components_breakpoints = (function (Splide) {
  /**
   * Store breakpoints.
   *
   * @type {Object|boolean}
   */
  var breakpoints = Splide.options.breakpoints;
  /**
   * Keep initial options.
   *
   * @type {Object}
   */

  var initialOptions;
  /**
   * An array containing objects of point and MediaQueryList.
   *
   * @type {Object[]}
   */

  var map = [];
  /**
   * Hold the previous breakpoint.
   *
   * @type {number|undefined}
   */

  var prevPoint;
  /**
   * Breakpoints component object.
   *
   * @type {Object}
   */

  var Breakpoints = {
    /**
     * Required only when the breakpoints definition is provided and browser supports matchMedia.
     *
     * @type {boolean}
     */
    required: breakpoints && matchMedia,

    /**
     * Called when the component is mounted.
     */
    mount: function mount() {
      map = Object.keys(breakpoints).sort(function (n, m) {
        return parseInt(n) - parseInt(m);
      }).map(function (point) {
        return {
          point: point,
          mql: matchMedia("(max-width:" + point + "px)")
        };
      });
      bind();
    },

    /**
     * Called after all components are mounted.
     * Keep initial options to apply them when no breakpoint matches.
     */
    mounted: function mounted() {
      initialOptions = Splide.options;
    }
  };
  /**
   * Listen some events to update options when media query is changed.
   */

  function bind() {
    Splide.on('mounted resize', function () {
      var point = getPoint();

      if (point !== prevPoint) {
        Splide.options = breakpoints[point] || initialOptions;
        prevPoint = point;
      }
    });
  }
  /**
   * Return the breakpoint matching current window width.
   * Note that Array.prototype.find is not supported by IE.
   *
   * @return {number|string} - A breakpoint as number or string. -1 if no point matches.
   */


  function getPoint() {
    var item = map.filter(function (item) {
      return item.mql.matches;
    })[0];
    return item ? item.point : -1;
  }

  return Breakpoints;
});
// CONCATENATED MODULE: ./src/js/components/index.js
/**
 * Export components.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


















var COMPLETE = {
  Options: components_options,
  Elements: components_elements,
  Controller: controller,
  Slides: components_slides,
  Track: components_track,
  Clones: components_clones,
  Layout: layout,
  Drag: drag,
  Click: components_click,
  Autoplay: components_autoplay,
  Cover: components_cover,
  Arrows: components_arrows,
  Pagination: pagination,
  LazyLoad: components_lazyload,
  Keyboard: keyboard,
  Sync: sync,
  A11y: a11y,
  Breakpoints: components_breakpoints
};
var LIGHT = {
  Options: components_options,
  Elements: components_elements,
  Controller: controller,
  Slides: components_slides,
  Track: components_track,
  Clones: components_clones,
  Layout: layout,
  Drag: drag,
  Autoplay: components_autoplay,
  Arrows: components_arrows,
  Pagination: pagination,
  A11y: a11y
};
// CONCATENATED MODULE: ./build/module/module.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return module_Splide; });
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Export Splide class for import.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * Export Splide class for import from other projects.
 */

var module_Splide =
/*#__PURE__*/
function (_Core) {
  _inheritsLoose(Splide, _Core);

  function Splide(root, options) {
    return _Core.call(this, root, options, COMPLETE) || this;
  }

  return Splide;
}(splide_Splide);



/***/ })
/******/ ]);
});