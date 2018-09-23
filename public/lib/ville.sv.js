/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translate__ = __webpack_require__(1);


Object(__WEBPACK_IMPORTED_MODULE_0__translate__["a" /* translate */])(VILLE, {
  game: "spel",
  init: "initiera",
  load: "ladda",
  autoscale: "autoskala",
  thread: "tråd",
  sequence: "sekvens",
  completed: "färdig",
  repeat: "upprepa",
  wait: "vänta",
  parallel: "parallellt",
  proceed: "fortsätt",
  sprite: "bild",
  remove: "ta_bort",
  key: "knapp",
  down: "ner",
  up: "upp",
  cancel: "avbryt",
  move: "flytta",
  to: "till",
  by: "med",
  time: "tid",
  scale: "skala",
  rotate: "rotera",
  show: "visa",
  hide: "dölj",
  sound: "ljud",
  repeat: "upprepa",
  stop: "stoppa"
})

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = translate;
function translate(object, language) {
  for (let key of Object.getOwnPropertyNames(object)) {
    if (!language[key]) {
      continue
    }
    if (typeof object[key] === "object") {
      object[language[key]] = translate(object[key], language)
    }
    if (typeof object[key] === "function") {
      object[language[key]] = function () {
        let result = object[key](...arguments)
        if (result) {
          return translate(result, language)
        }
      }
    }
  }
  return object
}

/***/ })
/******/ ]);