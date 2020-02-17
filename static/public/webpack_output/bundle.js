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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
class Page {
    constructor() {
        this.render();
    }

    name() {}

    domName() {
        console.log(`${this.name()}-page`);
        return `${this.name()}-page`;
    }

    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        document.querySelector("#app-box").appendChild(domBox);
        return domBox;
    }

    template() {}

    render() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Page;
;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Navigator_js__ = __webpack_require__(2);




// запускает все приложение. Точка создание - навигатор
class App {
    constructor () {
        console.log("Application was created");
        new __WEBPACK_IMPORTED_MODULE_0__Navigator_js__["a" /* default */]();
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = App;


window.addEventListener("load", function () {
    new App();
    document.querySelector("#app-box").hidden = false;
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__ = __webpack_require__(8);






class Navigator {
    constructor() {
        // сюда добавляете свои страницы
        this.vacancyPage = new __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__["a" /* default */]();
        this.resumePage = new __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__["a" /* default */]();

        this.render();

        this.addNavEvents();
    }

    // родительский элемент
    parentDom() {
        return '#app-box';
    }

    // имя класса самого элемента
    domName() {
        return 'nav-bar'
    }

    // возвращает строку, которая в html описывает наполнение элемента
    htmlTemplate() {
        // здесь ссылка переход на страницу
        return `
            <button class="nav-btn to-page-${this.vacancyPage.name('en')}">${this.vacancyPage.name('ru')}</button>
            <button class="nav-btn to-page-${this.resumePage.name('en')}">${this.resumePage.name('ru')}</button>
        `;
    }

    // создает сам dom элемент
    render() {
        let domBox = document.createElement("div");
        domBox.className = `${this.domName()}`;
        document.querySelector("#app-box").appendChild(domBox);
        domBox.innerHTML = this.htmlTemplate();
    }

    // здесь определяется событие перехода на страницу. querySelector позволяет определить элемент по классу
    addNavEvents() {
        document.querySelector(`.to-page-${this.vacancyPage.name('en')}`)
            .addEventListener('click', () => Object(__WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__["a" /* default */])(this.vacancyPage.domName()));
        document.querySelector(`.to-page-${this.resumePage.name('en')}`)
            .addEventListener('click', () => Object(__WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__["a" /* default */])(this.resumePage.domName()));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Navigator;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = showPage;


function showPage(pageDomName) {
    console.log('PAGE')
    console.log(pageDomName)
    let allPages = document.getElementsByClassName("page");
    for (let i = 0; i < allPages.length; i++) {
        allPages[i].hidden = true;
    }
    document.querySelector(`.${pageDomName}`).hidden = false;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug__);





// смотри пояснения к резюме
class VacancyPage extends __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */] {
    constructor() {
        super();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy'
        } else if (lang === 'ru') {
            return 'вакансии'
        }
    }

    //  не нужен, если используется pug
    // template() { // заменить на pug
    //     return `<div>ВАКАНСИИ</div>`;
    // }

    // был this.template, когда не было pug
    render() {
        this.createDomBox(this.domName()).innerHTML = __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug___default()();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VacancyPage;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(6);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform\u003E\u003Cheader\u003E\u003Ch1\u003EНовая вакансия\u003C\u002Fh1\u003E\u003C\u002Fheader\u003E\u003Cmain\u003E\u003Csection class=\"sub-form\"\u003E\u003Ch3\u003EОсновная информация\u003C\u002Fh3\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"job-title\"\u003EНазвание вакансии\u003C\u002Flabel\u003E\u003Cdiv class=\"inputs-wrapper\"\u003E\u003Cinput class=\"input\" id=\"job-title\" type=\"text\"\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"input-description\"\u003EПодсказка1\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"description\"\u003EОписание\u003C\u002Flabel\u003E\u003Ctextarea class=\"input\" id=\"description\"\u003E\u003C\u002Ftextarea\u003E\u003Cspan class=\"input-description\"\u003EПодсказка3\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"skills\"\u003EОсновные навыки\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"skills\" type=\"text\"\u003E\u003Cspan class=\"input-description\"\u003EПодсказка4\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\"\u003EПредположительный уровень дохода\u003C\u002Flabel\u003E\u003Cdiv class=\"inputs-wrapper\"\u003E\u003Cdiv class=\"input payment\"\u003E\u003Cinput id=\"payment-from\" type=\"number\"\u003E\u003Cinput id=\"payment-to\" type=\"number\"\u003E\u003Cselect id=\"currency\"\u003E\u003Coption\u003Eруб.\u003C\u002Foption\u003E\u003Coption\u003EEUR\u003C\u002Foption\u003E\u003Coption\u003EUSD\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Clabel for=\"before-taxes\"\u003E\u003Cinput id=\"before-taxes\" name=\"salary\" type=\"radio\" value=\"before-taxes\"\u003E                            До выплаты налогов\u003C\u002Flabel\u003E\u003Clabel for=\"after-taxes\"\u003E\u003Cinput id=\"after-taxes\" name=\"salary\" type=\"radio\" value=\"after-taxes\"\u003E                            На руки\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"input-description\"\u003EПодсказка5\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E\u003Csection class=\"sub-form\"\u003E\u003Ch3\u003EМесто работы\u003C\u002Fh3\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"town\"\u003EВакансия в городе\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"town\" type=\"text\"\u003E\u003Cspan class=\"input-description\"\u003EПодсказка6\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\"\u003EАдрес офиса\u003C\u002Flabel\u003E\u003Cdiv class=\"inputs-wrapper\"\u003E\u003Clabel for=\"show-addr\"\u003E\u003Cinput id=\"show-addr\" name=\"address\" type=\"radio\" value=\"show-addr\"\u003E                            Показывать адрес\u003C\u002Flabel\u003E\u003Clabel for=\"dont-show-addr\"\u003E\u003Cinput id=\"dont-show-addr\" name=\"address\" type=\"radio\" value=\"dont-show-addr\"\u003E                            Не показывать адрес\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"address\" type=\"text\"\u003E\u003Clabel for=\"show-only-metro\"\u003E\u003Cinput id=\"show-only-metro\" type=\"checkbox\" value=\"show-only-metro\"\u003E                            Показывать только станцию метро\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"input-description\"\u003EПодсказка7\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E\u003Csection class=\"sub-form\"\u003E\u003Ch3\u003EКонтактные данные\u003C\u002Fh3\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\"\u003EМенеджер вакансии\u003C\u002Flabel\u003E\u003Cdiv class=\"inputs-wrapper\"\u003E\u003Cinput class=\"input\" id=\"manager\" type=\"text\"\u003E\u003Clabel for=\"show-only-metro\"\u003E\u003Cinput id=\"notificatione-by-email\" type=\"checkbox\" value=\"show-only-metro\"\u003E                            Уведомлять о вакансиях по почте\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"input-description\"\u003EПодсказка\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\"\u003EКонтактная информация\u003C\u002Flabel\u003E\u003Cdiv class=\"inputs-wrapper\"\u003E\u003Clabel for=\"show-contact\"\u003E\u003Cinput id=\"show-contact\" name=\"contact\" type=\"radio\" value=\"show-contact\"\u003E                            Показывать в вакансии\u003C\u002Flabel\u003E\u003Clabel for=\"dont-show-contact\"\u003E\u003Cinput id=\"dont-show-contact\" name=\"contact\" type=\"radio\" value=\"dont-show-contact\"\u003E                            Не показывать в вакансии\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"input-description\"\u003EПодсказка7\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"manager-email\"\u003EEmail\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"manager-email\" type=\"email\"\u003E\u003Cspan class=\"input-description\"\u003EПодсказка7\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"manager-phone\"\u003EТелефон\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"manager-phone\" type=\"tel\" pattern=\"+7-[0-9]{3}-[0-9]{3}-[0-9]{4}\"\u003E\u003Cspan class=\"input-description\"\u003EПодсказка7\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection class=\"oneline-three-elements\"\u003E\u003Clabel class=\"input-name\" for=\"comment\"\u003EКомментарий\u003C\u002Flabel\u003E\u003Cinput class=\"input\" id=\"comment\" type=\"text\"\u003E\u003Cspan class=\"input-description\"\u003EПодсказка7\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E\u003C\u002Fmain\u003E\u003Cfooter\u003E\u003Clabel for=\"save-temp\"\u003E\u003Cinput id=\"save-temp\" type=\"checkbox\" value=\"save-temp\"\u003E                Сохранить как шаблон\u003C\u002Flabel\u003E\u003Cbr\u003E\u003Cbutton type=\"submit\"\u003EРазместить\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
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
  var classString = '', padding = '';
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
  } else if (val && typeof val === 'object') {
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
  if (typeof val === 'object') {
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
  var type = typeof val;
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
function pug_attrs(obj, terse){
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
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
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
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);




// наследуемся от страницы
class ResumePage extends __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */] {
    constructor() {
        // вызов родительского конструктора
        super();
    }

    // просто возврат имени. Используется для определения, какую страницу отрисовывать
    // см showPage и page, там это используется
    name(lang='en') {
        if (lang === 'en') {
            return 'resume'
        } else if (lang === 'ru') {
            return 'резюме'
        }
    }

    template() {
        let vacancyForm = ``
        return `<div>РЕЗЮМЕ</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ResumePage;


/***/ })
/******/ ]);