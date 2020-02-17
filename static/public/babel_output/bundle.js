'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 1);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  /**
   * Page - класс от которого наследуются страницы
   * описывает общие методы и реализует метод создания в DOM бокса под страницу
   * наверное можно заменить на миксин createDomBox
   */

  var Page = function () {
    function Page() {
      _classCallCheck(this, Page);

      this.render();
    }

    _createClass(Page, [{
      key: 'name',
      value: function name() {}
    }, {
      key: 'domName',
      value: function domName() {
        console.log(this.name() + '-page');
        return this.name() + '-page';
      }
    }, {
      key: 'createDomBox',
      value: function createDomBox(domName) {
        var domBox = document.createElement("div");
        domBox.className = 'page ' + domName;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        document.querySelector("#app-box").appendChild(domBox);
        return domBox;
      }
    }, {
      key: 'template',
      value: function template() {}
    }, {
      key: 'render',
      value: function render() {}
    }]);

    return Page;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["a"] = Page;
  ;

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Navigator_js__ = __webpack_require__(2);

  // запускает все приложение. Точка создание - навигатор

  var App = function App() {
    _classCallCheck(this, App);

    console.log("Application was created");
    new __WEBPACK_IMPORTED_MODULE_0__Navigator_js__["a" /* default */]();
  };
  /* harmony export (immutable) */

  __webpack_exports__["default"] = App;

  window.addEventListener("load", function () {
    new App();
    document.querySelector("#app-box").hidden = false;
  });

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__ = __webpack_require__(8);

  var Navigator = function () {
    function Navigator() {
      _classCallCheck(this, Navigator);

      // сюда добавляете свои страницы
      this.vacancyPage = new __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__["a" /* default */]();
      this.resumePage = new __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__["a" /* default */]();

      this.render();

      this.addNavEvents();
    }

    // родительский элемент


    _createClass(Navigator, [{
      key: 'parentDom',
      value: function parentDom() {
        return '#app-box';
      }

      // имя класса самого элемента

    }, {
      key: 'domName',
      value: function domName() {
        return 'nav-bar';
      }

      // возвращает строку, которая в html описывает наполнение элемента

    }, {
      key: 'htmlTemplate',
      value: function htmlTemplate() {
        // здесь ссылка переход на страницу
        return '\n            <button class="nav-btn to-page-' + this.vacancyPage.name('en') + '">' + this.vacancyPage.name('ru') + '</button>\n            <button class="nav-btn to-page-' + this.resumePage.name('en') + '">' + this.resumePage.name('ru') + '</button>\n        ';
      }

      // создает сам dom элемент

    }, {
      key: 'render',
      value: function render() {
        var domBox = document.createElement("div");
        domBox.className = '' + this.domName();
        document.querySelector("#app-box").appendChild(domBox);
        domBox.innerHTML = this.htmlTemplate();
      }

      // здесь определяется событие перехода на страницу. querySelector позволяет определить элемент по классу

    }, {
      key: 'addNavEvents',
      value: function addNavEvents() {
        var _this = this;

        document.querySelector('.to-page-' + this.vacancyPage.name('en')).addEventListener('click', function () {
          return Object(__WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__["a" /* default */])(_this.vacancyPage.domName());
        });
        document.querySelector('.to-page-' + this.resumePage.name('en')).addEventListener('click', function () {
          return Object(__WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__["a" /* default */])(_this.resumePage.domName());
        });
      }
    }]);

    return Navigator;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["a"] = Navigator;

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = showPage;

  function showPage(pageDomName) {
    console.log('PAGE');
    console.log(pageDomName);
    var allPages = document.getElementsByClassName("page");
    for (var i = 0; i < allPages.length; i++) {
      allPages[i].hidden = true;
    }
    document.querySelector('.' + pageDomName).hidden = false;
  }

  /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug__);

  // смотри пояснения к резюме

  var VacancyPage = function (_WEBPACK_IMPORTED_MO) {
    _inherits(VacancyPage, _WEBPACK_IMPORTED_MO);

    function VacancyPage() {
      _classCallCheck(this, VacancyPage);

      return _possibleConstructorReturn(this, (VacancyPage.__proto__ || Object.getPrototypeOf(VacancyPage)).call(this));
    }

    _createClass(VacancyPage, [{
      key: 'name',
      value: function name() {
        var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

        if (lang === 'en') {
          return 'vacancy';
        } else if (lang === 'ru') {
          return 'вакансии';
        }
      }

      //  не нужен, если используется pug
      // template() { // заменить на pug
      //     return `<div>ВАКАНСИИ</div>`;
      // }

      // был this.template, когда не было pug

    }, {
      key: 'render',
      value: function render() {
        this.createDomBox(this.domName()).innerHTML = __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug___default()();
      }
    }]);

    return VacancyPage;
  }(__WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */]);
  /* harmony export (immutable) */

  __webpack_exports__["a"] = VacancyPage;

  /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

  var pug = __webpack_require__(6);

  function template(locals) {
    var pug_html = "",
        pug_mixins = {},
        pug_interp;pug_html = pug_html + '<form><header><h1>\u041D\u043E\u0432\u0430\u044F \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u044F</h1></header><main><section class="sub-form"><h3>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</h3><section class="oneline-three-elements"><label class="input-name" for="job-title">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label><div class="inputs-wrapper"><input class="input" id="job-title" type="text"></div><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04301</span></section><section class="oneline-three-elements"><label class="input-name" for="description">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</label><textarea class="input" id="description"></textarea><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04303</span></section><section class="oneline-three-elements"><label class="input-name" for="skills">\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438</label><input class="input" id="skills" type="text"><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04304</span></section><section class="oneline-three-elements"><label class="input-name">\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0445\u043E\u0434\u0430</label><div class="inputs-wrapper"><div class="input payment"><input id="payment-from" type="number"><input id="payment-to" type="number"><select id="currency"><option>\u0440\u0443\u0431.</option><option>EUR</option><option>USD</option></select></div><label for="before-taxes"><input id="before-taxes" name="salary" type="radio" value="before-taxes">                            \u0414\u043E \u0432\u044B\u043F\u043B\u0430\u0442\u044B \u043D\u0430\u043B\u043E\u0433\u043E\u0432</label><label for="after-taxes"><input id="after-taxes" name="salary" type="radio" value="after-taxes">                            \u041D\u0430 \u0440\u0443\u043A\u0438</label></div><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04305</span></section></section><section class="sub-form"><h3>\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B</h3><section class="oneline-three-elements"><label class="input-name" for="town">\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435</label><input class="input" id="town" type="text"><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04306</span></section><section class="oneline-three-elements"><label class="input-name">\u0410\u0434\u0440\u0435\u0441 \u043E\u0444\u0438\u0441\u0430</label><div class="inputs-wrapper"><label for="show-addr"><input id="show-addr" name="address" type="radio" value="show-addr">                            \u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441</label><label for="dont-show-addr"><input id="dont-show-addr" name="address" type="radio" value="dont-show-addr">                            \u041D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441</label><input class="input" id="address" type="text"><label for="show-only-metro"><input id="show-only-metro" type="checkbox" value="show-only-metro">                            \u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0430\u043D\u0446\u0438\u044E \u043C\u0435\u0442\u0440\u043E</label></div><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section></section><section class="sub-form"><h3>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</h3><section class="oneline-three-elements"><label class="input-name">\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label><div class="inputs-wrapper"><input class="input" id="manager" type="text"><label for="show-only-metro"><input id="notificatione-by-email" type="checkbox" value="show-only-metro">                            \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u043E \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u044F\u0445 \u043F\u043E \u043F\u043E\u0447\u0442\u0435</label></div><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430</span></section><section class="oneline-three-elements"><label class="input-name">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</label><div class="inputs-wrapper"><label for="show-contact"><input id="show-contact" name="contact" type="radio" value="show-contact">                            \u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0432 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label><label for="dont-show-contact"><input id="dont-show-contact" name="contact" type="radio" value="dont-show-contact">                            \u041D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0432 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label></div><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="oneline-three-elements"><label class="input-name" for="manager-email">Email</label><input class="input" id="manager-email" type="email"><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="oneline-three-elements"><label class="input-name" for="manager-phone">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label><input class="input" id="manager-phone" type="tel" pattern="+7-[0-9]{3}-[0-9]{3}-[0-9]{4}"><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="oneline-three-elements"><label class="input-name" for="comment">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</label><input class="input" id="comment" type="text"><span class="input-description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section></section></main><footer><label for="save-temp"><input id="save-temp" type="checkbox" value="save-temp">                \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u0430\u043A \u0448\u0430\u0431\u043B\u043E\u043D</label><br><button type="submit">\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C</button></footer></form>';;return pug_html;
  };
  module.exports = template;

  /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var pug_has_own_property = Object.prototype.hasOwnProperty;

  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */

  exports.merge = pug_merge;
  function pug_merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = pug_merge(attrs, a[i]);
      }
      return attrs;
    }

    for (var key in b) {
      if (key === 'class') {
        var valA = a[key] || [];
        a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
      } else if (key === 'style') {
        var valA = pug_style(a[key]);
        valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
        var valB = pug_style(b[key]);
        valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
        a[key] = valA + valB;
      } else {
        a[key] = b[key];
      }
    }

    return a;
  };

  /**
   * Process array, object, or string as a string of classes delimited by a space.
   *
   * If `val` is an array, all members of it and its subarrays are counted as
   * classes. If `escaping` is an array, then whether or not the item in `val` is
   * escaped depends on the corresponding item in `escaping`. If `escaping` is
   * not an array, no escaping is done.
   *
   * If `val` is an object, all the keys whose value is truthy are counted as
   * classes. No escaping is done.
   *
   * If `val` is a string, it is counted as a class. No escaping is done.
   *
   * @param {(Array.<string>|Object.<string, boolean>|string)} val
   * @param {?Array.<string>} escaping
   * @return {String}
   */
  exports.classes = pug_classes;
  function pug_classes_array(val, escaping) {
    var classString = '',
        className,
        padding = '',
        escapeEnabled = Array.isArray(escaping);
    for (var i = 0; i < val.length; i++) {
      className = pug_classes(val[i]);
      if (!className) continue;
      escapeEnabled && escaping[i] && (className = pug_escape(className));
      classString = classString + padding + className;
      padding = ' ';
    }
    return classString;
  }
  function pug_classes_object(val) {
    var classString = '',
        padding = '';
    for (var key in val) {
      if (key && val[key] && pug_has_own_property.call(val, key)) {
        classString = classString + padding + key;
        padding = ' ';
      }
    }
    return classString;
  }
  function pug_classes(val, escaping) {
    if (Array.isArray(val)) {
      return pug_classes_array(val, escaping);
    } else if (val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      return pug_classes_object(val);
    } else {
      return val || '';
    }
  }

  /**
   * Convert object or string to a string of CSS styles delimited by a semicolon.
   *
   * @param {(Object.<string, string>|string)} val
   * @return {String}
   */

  exports.style = pug_style;
  function pug_style(val) {
    if (!val) return '';
    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      var out = '';
      for (var style in val) {
        /* istanbul ignore else */
        if (pug_has_own_property.call(val, style)) {
          out = out + style + ':' + val[style] + ';';
        }
      }
      return out;
    } else {
      return val + '';
    }
  };

  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = pug_attr;
  function pug_attr(key, val, escaped, terse) {
    if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
      return '';
    }
    if (val === true) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    }
    var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
    if ((type === 'object' || type === 'function') && typeof val.toJSON === 'function') {
      val = val.toJSON();
    }
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
      if (!escaped && val.indexOf('"') !== -1) {
        return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
      }
    }
    if (escaped) val = pug_escape(val);
    return ' ' + key + '="' + val + '"';
  };

  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} terse whether to use HTML5 terse boolean attributes
   * @return {String}
   */
  exports.attrs = pug_attrs;
  function pug_attrs(obj, terse) {
    var attrs = '';

    for (var key in obj) {
      if (pug_has_own_property.call(obj, key)) {
        var val = obj[key];

        if ('class' === key) {
          val = pug_classes(val);
          attrs = pug_attr(key, val, false, terse) + attrs;
          continue;
        }
        if ('style' === key) {
          val = pug_style(val);
        }
        attrs += pug_attr(key, val, false, terse);
      }
    }

    return attrs;
  };

  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */

  var pug_match_html = /["&<>]/;
  exports.escape = pug_escape;
  function pug_escape(_html) {
    var html = '' + _html;
    var regexResult = pug_match_html.exec(html);
    if (!regexResult) return _html;

    var result = '';
    var i, lastIndex, escape;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
      switch (html.charCodeAt(i)) {
        case 34:
          escape = '&quot;';break;
        case 38:
          escape = '&amp;';break;
        case 60:
          escape = '&lt;';break;
        case 62:
          escape = '&gt;';break;
        default:
          continue;
      }
      if (lastIndex !== i) result += html.substring(lastIndex, i);
      lastIndex = i + 1;
      result += escape;
    }
    if (lastIndex !== i) return result + html.substring(lastIndex, i);else return result;
  };

  /**
   * Re-throw the given `err` in context to the
   * the pug in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @param {String} str original source
   * @api private
   */

  exports.rethrow = pug_rethrow;
  function pug_rethrow(err, filename, lineno, str) {
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(7).readFileSync(filename, 'utf8');
    } catch (ex) {
      pug_rethrow(err, null, lineno);
    }
    var context = 3,
        lines = str.split('\n'),
        start = Math.max(lineno - context, 0),
        end = Math.min(lines.length, lineno + context);

    // Error context
    var context = lines.slice(start, end).map(function (line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Pug') + ':' + lineno + '\n' + context + '\n\n' + err.message;
    throw err;
  };

  /***/
},
/* 7 */
/***/function (module, exports) {

  /* (ignored) */

  /***/},
/* 8 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);

  // наследуемся от страницы

  var ResumePage = function (_WEBPACK_IMPORTED_MO2) {
    _inherits(ResumePage, _WEBPACK_IMPORTED_MO2);

    function ResumePage() {
      _classCallCheck(this, ResumePage);

      // вызов родительского конструктора
      return _possibleConstructorReturn(this, (ResumePage.__proto__ || Object.getPrototypeOf(ResumePage)).call(this));
    }

    // просто возврат имени. Используется для определения, какую страницу отрисовывать
    // см showPage и page, там это используется


    _createClass(ResumePage, [{
      key: 'name',
      value: function name() {
        var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

        if (lang === 'en') {
          return 'resume';
        } else if (lang === 'ru') {
          return 'резюме';
        }
      }
    }, {
      key: 'template',
      value: function template() {
        var vacancyForm = '';
        return '<div>\u0420\u0415\u0417\u042E\u041C\u0415</div>';
      }
    }, {
      key: 'render',
      value: function render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
      }
    }]);

    return ResumePage;
  }(__WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */]);
  /* harmony export (immutable) */

  __webpack_exports__["a"] = ResumePage;

  /***/
}]
/******/);