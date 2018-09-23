(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VILLE", [], factory);
	else if(typeof exports === 'object')
		exports["VILLE"] = factory();
	else
		root["VILLE"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = task;
/* harmony export (immutable) */ __webpack_exports__["a"] = get_tasks;
/* harmony export (immutable) */ __webpack_exports__["b"] = have_task_manager;
let _handlers = []

function task(job) {
  return _handlers[_handlers.length - 1].add(job)
}

function get_tasks(job) {
  let tasks = []
  _handlers.push({
    add: (task) => {
      tasks.push(task)
      return task
    }
  })
  job()
  _handlers.pop()
  return tasks
}

function have_task_manager() {
  return _handlers.length > 0
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sequence;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thread__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);



function sequence(job) {
  let _repeat = 1
  let _completed = false
  let _cancel = false

  let _sequence = function* () {
    for (let i = 0; i < _repeat; i++) {
      let tasks = Object(__WEBPACK_IMPORTED_MODULE_1__task__["a" /* get_tasks */])(job)
      for (let task of tasks) {
        if (_cancel) {
          _completed = true
          return
        }
        for (let step of task()) {
          if (_cancel) {
            _completed = true
            return
          }
          yield
        }
      }
      if (_repeat > 1) {
        yield
      }
    }
    _completed = true
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_1__task__["b" /* have_task_manager */])()) {
    Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
      yield* _sequence()
    })
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_0__thread__["b" /* thread */])(function* () {
      yield* _sequence()
    })
  }

  return {
    cancel: function () {
      Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
        _cancel = true
      })
    },
    completed: function () {
      return _completed
    },
    repeat: function (times = Number.MAX_VALUE) {
      _repeat = times
      return this
    }
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tween;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ease__ = __webpack_require__(4);




function tween(object) {
  let _ease = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].linear
  let _to = {}
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
    let from = {}
    for (let prop in _to) {
      from[prop] = object[prop]
    }
    let elapsed_time = 0
    while (elapsed_time < _time && _time > 0) {
      elapsed_time += Object(__WEBPACK_IMPORTED_MODULE_0__time__["a" /* time */])()
      for (let prop in from) {
        object[prop] = interpolation(from[prop],
          _to[prop], Math.min(1, elapsed_time / _time), _ease)
      }
      yield
    }
    for (let prop in from) {
      object[prop] = _to[prop]
    }
  })

  return {
    to: function (value) {
      _to = value
      return this
    },
    ease: function (value = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].sine_inout) {
      _ease = value
      return this
    },
    time: function (value) {
      _time = value
      return this
    }
  }
}

function interpolation(a, b, t, easing) {
  return a + (b - a) * easing(t)
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = thread;
/* harmony export (immutable) */ __webpack_exports__["a"] = run_threads;
let _old_threads = [], _new_threads = [], _id = 0

function thread(job) {
  if (typeof job !== "function") {
    throw new TypeError(
      "A thread only acceps a 'generator function' as an argument")
  }
  job = job()
  if (!job || !job.next) {
    throw new TypeError(
      "A thread only acceps a 'generator function' as an argument")
  }
  let thread = {
    job: job, priority: 0, id: _id++, cancel: false
  }
  _new_threads.push(thread)
  return {
    cancel: function () {
      thread.cancel = true
    },
    priority: function (value) {
      thread.priority = value
      return this
    }
  }
}

function run_threads() {
  if (_new_threads.length > 0) {
    for (let i = 0; i < _new_threads.length; i++) {
      _old_threads.push(_new_threads[i])
    }
    _new_threads = []
  }
  do_threads(_old_threads)

  // New threads might have been added, run those in the same frame.
  do_threads(_new_threads)
}

function do_threads(threads) {
  threads.sort((a, b) => {
    if (a.priority === b.priority) {
      return b.id - a.id
    }
    return b.priority - a.priority
  })
  for (let i = threads.length - 1; i >= 0; i--) {
    if (threads[i].cancel || threads[i].job.next().done) {
      threads.splice(i, 1)
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ease = {}
/* harmony export (immutable) */ __webpack_exports__["a"] = ease;


// Based on https://gist.github.com/gre/1650294

ease.linear = (t) => t

ease.sine_in = (t) => -1 * Math.cos(t * (Math.PI / 2)) + 1
ease.sine_inout = (t) => -0.5 * (Math.cos(Math.PI * t) - 1)
ease.sine_out = (t) => Math.sin(t * (Math.PI / 2))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sequence__ = __webpack_require__(1);


let game = {}

game.init = (config = {}) => {
  let { width = 800, height = 600, autoscale = true } = config

  game.renderer = PIXI.autoDetectRenderer({ width, height })
  game.root = new PIXI.Container()
  document.body.appendChild(game.renderer.view)

  if (autoscale) {
    window.onresize = () => {
      game.renderer.resize(window.innerWidth, window.innerHeight)
      game.root.position.set(window.innerWidth / 2, window.innerHeight / 2)
      game.root.scale.set(
        Math.min(window.innerWidth / width, window.innerHeight / height)
      )
    }
    window.onresize()
  }
}

game.load = (start) => {
  fetch("assets.json").then((res) => {
    if (res.ok) {
      return res.json()
    }
  }).then((assets) => {
    Object.assign(game, assets)
    for (let name in assets) {
      PIXI.loader.add(name, assets[name])
    }
    PIXI.loader.load(() => {
      if (!start) {
        return
      }
      Object(__WEBPACK_IMPORTED_MODULE_0__sequence__["a" /* sequence */])(start)
    })
  })
}

game.render = () => {
  if (!game.renderer) {
    return
  }
  game.renderer.render(game.root)
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = time;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thread__ = __webpack_require__(3);



function time() {
  return _elapsed_time / 1000
}

let _last = 0
let _elapsed_time = 0

function animation(timestamp) {
  _elapsed_time = timestamp - _last
  _last = timestamp

  Object(__WEBPACK_IMPORTED_MODULE_1__thread__["a" /* run_threads */])()
  __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */].render()

  requestAnimationFrame(animation)
}

requestAnimationFrame(animation)

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = repeat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);


function repeat(job) {
  let _times = Number.MAX_VALUE
  let _completed = false
  let _cancel = false

  Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
    for (let i = 0; i < _times; i++) {
      if (_cancel) {
        _completed = true
        return
      }
      let tasks = Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* get_tasks */])(job)
      for (let task of tasks) {
        yield* task()
      }
      yield
    }
    _completed = true
  })

  return {
    cancel: function () {
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        _cancel = true
      })
    },
    stop: function () {
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        _stop = true
      })
    },
    completed: function () {
      return _completed
    },
    times: function (value) {
      _times = value
    }
  }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = vector;
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }
  neg() {
    this.x = -this.x
    this.y = -this.y
    return this
  }
  mul(value) {
    this.x *= value
    this.y *= value
    return this
  }
  add(vector) {
    this.x += vector.x
    this.y += vector.y
    return this
  }
  sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }
  set(x, y) {
    this.x = x
    this.y = y
    return this
  }
}

function vector(x, y) {
  return new Vector(x, y)
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = add_collider;
/* harmony export (immutable) */ __webpack_exports__["b"] = collision;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sat__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__proceed__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repeat__ = __webpack_require__(7);




let _colliders = {}

function add_collider(collider) {
  let group = collider.group() || ""
  if (!_colliders[group]) {
    _colliders[group] = []
  }
  _colliders[group].push(collider)
}

function collision(groups = [{ a: "", b: "" }]) {
  let _proceed = Object(__WEBPACK_IMPORTED_MODULE_1__proceed__["a" /* proceed */])(() => {
    Object(__WEBPACK_IMPORTED_MODULE_2__repeat__["a" /* repeat */])(() => {
      let colliders = get_colliders()
      for (let g of groups) {
        detect_collisions(colliders[g.a], colliders[g.b])
      }
    })
  }).priority(100)

  return {
    cancel: () => {
      _proceed.cancel()
    }
  }
}

function get_colliders() {
  let result = {}
  for (let name in _colliders) {
    result[name] = []
    for (let i = _colliders[name].length - 1; i >= 0; i--) {
      let c = _colliders[name][i]
      if (c.destroyed === true) {
        _colliders[name].splice(i, 1)
        continue
      }
      result[name].push({
        object: c.object(),
        center: c.center(),
        points: c.points(),
        collision: c.collision
      })
    }
  }
  return result
}

function detect_collisions(a, b) {
  if (!a || !b) {
    return
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = (a === b ? i + 1 : 0); j < b.length; j++) {
      if (a[i] === b[j]) {
        continue
      }
      let mtv = Object(__WEBPACK_IMPORTED_MODULE_0__sat__["a" /* sat */])(a[i], b[j])
      if (!mtv) {
        continue
      }
      Object(__WEBPACK_IMPORTED_MODULE_1__proceed__["a" /* proceed */])(() => {
        a[i].collision(b[j].object, mtv)
      })
      Object(__WEBPACK_IMPORTED_MODULE_1__proceed__["a" /* proceed */])(() => {
        b[j].collision(a[i].object, mtv.neg())
      })
    }
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = proceed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thread__ = __webpack_require__(3);



function proceed(job) {
  let _cancel = false
  let _thread
  let _priority = 0

  Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
    if (_cancel) {
      return
    }
    _thread = Object(__WEBPACK_IMPORTED_MODULE_1__thread__["b" /* thread */])(function* () {
      let tasks = Object(__WEBPACK_IMPORTED_MODULE_0__task__["a" /* get_tasks */])(job)
      for (let task of tasks) {
        yield* task()
      }
    })
    _thread.priority(_priority)
  })
  return {
    cancel: function () {
      if (_thread) {
        _thread.cancel()
      }
      _cancel = true
    },
    priority: function (value) {
      if (_thread) {
        _thread.priority(value)
      }
      _priority = value
      return this
    }
  }
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return __WEBPACK_IMPORTED_MODULE_0__time__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thread__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "thread", function() { return __WEBPACK_IMPORTED_MODULE_1__thread__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "game", function() { return __WEBPACK_IMPORTED_MODULE_2__game__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprite__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sprite", function() { return __WEBPACK_IMPORTED_MODULE_3__sprite__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__text__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return __WEBPACK_IMPORTED_MODULE_4__text__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__remove__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return __WEBPACK_IMPORTED_MODULE_5__remove__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__key__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return __WEBPACK_IMPORTED_MODULE_6__key__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aabb__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "aabb", function() { return __WEBPACK_IMPORTED_MODULE_7__aabb__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__collision__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "collision", function() { return __WEBPACK_IMPORTED_MODULE_8__collision__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wait__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return __WEBPACK_IMPORTED_MODULE_9__wait__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__task__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "task", function() { return __WEBPACK_IMPORTED_MODULE_10__task__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sequence__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sequence", function() { return __WEBPACK_IMPORTED_MODULE_11__sequence__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__parallel__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parallel", function() { return __WEBPACK_IMPORTED_MODULE_12__parallel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tween__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tween", function() { return __WEBPACK_IMPORTED_MODULE_13__tween__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ease__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ease", function() { return __WEBPACK_IMPORTED_MODULE_14__ease__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__move__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "move", function() { return __WEBPACK_IMPORTED_MODULE_15__move__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__rotate__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return __WEBPACK_IMPORTED_MODULE_16__rotate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__scale__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return __WEBPACK_IMPORTED_MODULE_17__scale__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__show__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "show", function() { return __WEBPACK_IMPORTED_MODULE_18__show__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__hide__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return __WEBPACK_IMPORTED_MODULE_19__hide__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__sound__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sound", function() { return __WEBPACK_IMPORTED_MODULE_20__sound__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__proceed__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "proceed", function() { return __WEBPACK_IMPORTED_MODULE_21__proceed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__repeat__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return __WEBPACK_IMPORTED_MODULE_22__repeat__["a"]; });
























/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sprite;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);



function sprite(name) {
  let sprite
  if (!name) {
    sprite = new PIXI.Sprite()
  } else if (PIXI.loader.resources[name]) {
    sprite = new PIXI.Sprite(PIXI.loader.resources[name].texture)
  } else {
    sprite = new PIXI.Sprite.fromImage(name)
  }
  sprite.anchor.set(0.5)

  Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
    __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */].root.addChild(sprite)
  })
  return sprite
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = text;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);



function text(txt) {
  let text = new PIXI.Text(txt, {
    fontFamily: "Helvetica", fontSize: 36, fill: 0xffffff, align: "center"
  });
  text.anchor.set(0.5)

  Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
    __WEBPACK_IMPORTED_MODULE_0__game__["a" /* game */].root.addChild(text)
  })
  return text
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = remove;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);


function remove(object) {
  Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
    if (object.parent) {
      object.parent.removeChild(object)
    }
  })
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = key;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__repeat__ = __webpack_require__(7);




function key(key) {
  return {
    down: (job) => {
      let handler
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        handler = add_handler(key, "down", job)
      })
      return {
        cancel: () => {
          Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
            remove_handler(key, "down", handler)
          })
        }
      }
    },
    up: (job) => {
      let handler
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        handler = add_handler(key, "up", job)
      })
      return {
        cancel: () => {
          Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
            remove_handler(key, "up", handler)
          })
        }
      }
    },
    repeat: (job) => {
      let down_handler, up_handler
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        let rep
        down_handler = add_handler(key, "down", () => {
          rep = Object(__WEBPACK_IMPORTED_MODULE_2__repeat__["a" /* repeat */])(job)
        })
        up_handler = add_handler(key, "up", () => {
          rep.cancel()
        })
      })
      return {
        cancel: () => {
          Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
            remove_handler(key, "down", down_handler)
            remove_handler(key, "up", up_handler)
          })
        }
      }
    },
  }
}

let _handlers = { down: {}, up: {} }

function add_handler(key, type, job) {
  key = key.toLowerCase()
  let seq
  if (!_handlers[type][key]) {
    _handlers[type][key] = []
  }
  let handler = () => {
    if (seq && !seq.completed()) {
      return
    }
    seq = Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(job)
  }
  _handlers[type][key].push(handler)
  return handler
}

function remove_handler(key, type, handler) {
  key = key.toLowerCase()
  if (!_handlers[type][key]) {
    return
  }
  let index = _handlers[type][key].indexOf(handler)
  _handlers[type][key].splice(index, 1)
}

document.addEventListener("keydown", (evt) => {
  let key = evt.key.toLowerCase()
  if (!_handlers.down[key] || _handlers.down[key].length === 0) {
    return
  }
  _handlers.down[key].slice(-1)[0]()
})

document.addEventListener("keyup", (evt) => {
  let key = evt.key.toLowerCase()
  if (!_handlers.up[key] || _handlers.up[key].length === 0) {
    return
  }
  _handlers.up[key].slice(-1)[0]()
})

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = aabb;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collision__ = __webpack_require__(9);




function aabb(object) {
  let _handle_callback, _sizex, _sizey, _graphics, _visible = false, _group, _collider_aabb

  Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
    create_collider_graphics()
    Object(__WEBPACK_IMPORTED_MODULE_2__collision__["a" /* add_collider */])(_collider_aabb)
  })

  function create_collider_graphics() {
    if (_graphics) {
      object.removeChild(_graphics)
    }
    let bounds = get_bounds_rectangle()
    _graphics = new PIXI.Graphics(true)
    _graphics.visible = _visible
    _graphics.lineStyle(_visible ? 0.0001 : 0, 0xff0000, 0.8)
    _graphics
      .moveTo(bounds.left, bounds.top)
      .lineTo(bounds.right, bounds.top)
      .lineTo(bounds.right, bounds.bottom)
      .lineTo(bounds.left, bounds.bottom)
      .lineTo(bounds.left, bounds.top)
    object.addChild(_graphics)
  }

  function get_bounds_rectangle() {
    if (_sizex && _sizey) {
      return new PIXI.Rectangle(_sizex / -2, _sizey / -2, _sizex, _sizey)
    }
    return object.getLocalBounds()
  }

  _collider_aabb = {
    type: function () {
      return "aabb"
    },
    group: function (value) {
      if (value !== undefined) {
        _group = value
        return this
      }
      return _group
    },
    center: function () {
      let { x, y } = object.getGlobalPosition()
      return Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(x, y)
    },
    object: function () {
      return object
    },
    handle: function (value) {
      _handle_callback = value
      return this
    },
    points: function () {
      let bounds = _graphics.getBounds()
      return [
        Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(bounds.left, bounds.top),
        Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(bounds.right, bounds.bottom),
        Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(bounds.right, bounds.top),
        Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(bounds.left, bounds.bottom)
      ]
    },
    size: function (x, y) {
      _sizex = x
      _sizey = y
      Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
        create_collider_graphics()
      })
      return this
    },
    show: function () {
      _visible = true
      Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
        create_collider_graphics()
      })
      return this
    },
    collision: function (collider, mtv) {
      if (_handle_callback) {
        _handle_callback(collider, mtv)
      }
    },
    destroy: function () {
      this.destroyed = true
    }
  }
  return _collider_aabb
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(8);


class Shape {
  constructor(points) {
    this.points = points
  }
  project(axis) {
    let dot = this.points[0].dot(axis)
    let min = dot
    let max = dot
    for (let i = 1; i < this.points.length; i++) {
      dot = this.points[i].dot(axis)
      min = Math.min(dot, min)
      max = Math.max(dot, max)
    }
    return new Projection(min, max)
  }
}

class Projection {
  constructor(min, max) {
    this.min = min
    this.max = max
  }
  overlap(proj) {
    if (this.min < proj.min) {
      return proj.min - this.max
    } else {
      return this.min - proj.max
    }
  }
}

function sat(collider_a, collider_b) {
  let axes = [
    Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(0, 1),
    Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])(1, 0)
  ]
  let overlap = Number.MAX_VALUE
  let mtv = Object(__WEBPACK_IMPORTED_MODULE_0__vector__["a" /* vector */])()
  let shape_a = new Shape(collider_a.points)
  let shape_b = new Shape(collider_b.points)

  for (let axis of axes) {
    let p1 = shape_a.project(axis)
    let p2 = shape_b.project(axis)
    if (p1.overlap(p2) >= 0) {
      return undefined
    }
    if (Math.abs(p1.overlap(p2)) < overlap) {
      overlap = Math.abs(p1.overlap(p2))
      mtv = axis
    }
  }

  let d = collider_a.center.sub(collider_b.center)
  if (d.dot(mtv) < 0) {
    mtv.neg()
  }
  return mtv.mul(overlap)
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = wait;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time__ = __webpack_require__(6);



function wait(seconds = Number.MAX_VALUE) {
  let _cancel = false

  Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
    let elapsed_time = 0
    while (elapsed_time < seconds && !_cancel) {
      elapsed_time += Object(__WEBPACK_IMPORTED_MODULE_1__time__["a" /* time */])()
      yield
    }
  })

  return {
    cancel: () => {
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        _cancel = true
      })
    }
  }
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parallel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thread__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(0);



function parallel(job) {
  let _repeat = 1
  let _completed = false
  let _cancel = false

  let _parallel = function* () {
    for (let i = 0; i < _repeat; i++) {
      let tasks = Object(__WEBPACK_IMPORTED_MODULE_1__task__["a" /* get_tasks */])(job)
      tasks.reverse()
      for (let i = 0; i < tasks.length; i++) {
        tasks[i] = tasks[i]()
      }
      while (tasks.length > 0) {
        for (let i = tasks.length - 1; i >= 0; i--) {
          if (_cancel) {
            _completed = true
            return
          }
          if (tasks[i].next().done) {
            tasks.splice(i, 1)
          }
        }
        yield
      }
    }
    _completed = true
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_1__task__["b" /* have_task_manager */])()) {
    Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
      yield* _parallel()
    })
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_0__thread__["b" /* thread */])(function* () {
      yield* _parallel()
    })
  }

  return {
    cancel: () => {
      Object(__WEBPACK_IMPORTED_MODULE_1__task__["c" /* task */])(function* () {
        _cancel = true
      })
    },
    completed: () => {
      return _completed
    },
    repeat: (times = Number.MAX_VALUE) => {
      _repeat = times
      return this
    }
  }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = move;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ease__ = __webpack_require__(4);




function move(object) {
  let _to = {}
  let _by = {}
  let _ease = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].linear
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(() => {
    if (_to.x !== undefined || _to.y !== undefined) {
      Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object).to(_to).time(_time).ease(_ease)
      return
    }
    if (_by.x !== undefined) {
      _by.x += object.x
    }
    if (_by.y !== undefined) {
      _by.y += object.y
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object).to(_by).time(_time).ease(_ease)
  })

  return {
    to: function (value) {
      if (value.x !== undefined) {
        _to.x = value.x
      }
      if (value.y !== undefined) {
        _to.y = value.y
      }
      return this
    },
    by: function (value) {
      if (value.x !== undefined) {
        _by.x = value.x
      }
      if (value.y !== undefined) {
        _by.y = value.y
      }
      return this
    },
    ease: function (value = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].sine_inout) {
      _ease = value
      return this
    },
    time: function (value) {
      _time = value
      return this
    }
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rotate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ease__ = __webpack_require__(4);




const deg_to_rad = (Math.PI * 2) / 360

function rotate(object) {
  let _to
  let _by
  let _ease = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].linear
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(() => {
    let rotation = object.rotation
    if (_by !== undefined) {
      rotation = object.rotation + _by * deg_to_rad
    }
    if (_to !== undefined) {
      rotation = _to * deg_to_rad
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object).to({ rotation }).time(_time).ease(_ease)
  })

  return {
    to: function (value) {
      _to = value
      return this
    },
    by: function (value) {
      _by = value
      return this
    },
    ease: function (value = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].sine_inout) {
      _ease = value
      return this
    },
    time: function (value) {
      _time = value
      return this
    }
  }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ease__ = __webpack_require__(4);




function scale(object) {
  let _to = {}
  let _by = {}
  let _ease = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].linear
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(() => {
    if (_to.x !== undefined || _to.y !== undefined) {
      Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object.scale).to(_to).time(_time).ease(_ease)
      return
    }
    if (_by.x !== undefined) {
      _by.x += object.scale.x
    }
    if (_by.y !== undefined) {
      _by.y += object.scale.y
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object.scale).to(_by).time(_time).ease(_ease)
  })

  return {
    to: function (value) {
      if (typeof value === "number") {
        _to.x = value
        _to.y = value
      }
      else {
        if (value.x !== undefined) {
          _to.x = value.x
        }
        if (value.y !== undefined) {
          _to.y = value.y
        }
      }
      return this
    },
    by: function (value) {
      if (typeof value === "number") {
        _by.x = value
        _by.y = value
      }
      else {
        if (value.x !== undefined) {
          _by.x = value.x
        }
        if (value.y !== undefined) {
          _by.y = value.y
        }
      }
      return this
    },
    ease: function (value = __WEBPACK_IMPORTED_MODULE_2__ease__["a" /* ease */].sine_inout) {
      _ease = value
      return this
    },
    time: function (value) {
      _time = value
      return this
    }
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = show;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);



function show(object) {
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(() => {
    Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object).to({ alpha: 1 }).time(_time)
  })

  return {
    time: function (value) {
      _time = value
    }
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hide;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequence__ = __webpack_require__(1);



function hide(object) {
  let _time = 0

  Object(__WEBPACK_IMPORTED_MODULE_1__sequence__["a" /* sequence */])(() => {
    Object(__WEBPACK_IMPORTED_MODULE_0__tween__["a" /* tween */])(object).to({ alpha: 0 }).time(_time)
  })

  return {
    time: function (value) {
      _time = value
    }
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sound;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(0);


function sound(url) {
  let _completed = false

  Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
    let audio = new Audio(url)
    audio.onended = () => {
      _completed = true
    }
    audio.play()
  })

  return {
    wait: function () {
      Object(__WEBPACK_IMPORTED_MODULE_0__task__["c" /* task */])(function* () {
        while (!_completed) {
          yield
        }
      })
    }
  }
}

/***/ })
/******/ ]);
});