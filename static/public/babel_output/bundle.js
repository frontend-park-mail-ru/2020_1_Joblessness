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
    /******/return __webpack_require__(__webpack_require__.s = 2);
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
            this.addEventsOn();
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
            key: 'addEventsOn',
            value: function addEventsOn() {}
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
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Navigator_js__ = __webpack_require__(3);

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
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__ulils_showPage_js__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__ = __webpack_require__(5);
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
/* 4 */
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
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__vacancy_page_pug__ = __webpack_require__(6);
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
        }, {
            key: 'validateForm',
            value: function validateForm() {
                var formIsValid = true;
                document.querySelectorAll('.input').forEach(function (input) {
                    var inputIsValid = true;
                    if (input.type === 'mail' && input.type.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
                        inputIsValid = false;
                    } else if (input.type === 'tel' && input.type.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
                        inputIsValid = false;
                    } else if (input.type === 'text' && input.innerHTML === '') {
                        inputIsValid = false;
                    } else if (input.classList.contains('number_pos') && parseFloat(input.innerHTML) <= 0) {
                        inputIsValid = false;
                    } else if (input.type === 'number' && parseFloat(input.innerHTML) != 0) {
                        inputIsValid = false;
                    }

                    if (!inputIsValid) {
                        input.classList.add('form__invalid_input');
                        formIsValid = false;
                    } else {
                        input.classList.remove('form__invalid_input');
                    }
                });
                //TODO перенести в отдельный класс и унаследовать от него форму

                return formIsValid;
            }
        }, {
            key: 'addEventsOn',
            value: function addEventsOn() {
                var _this3 = this;

                document.querySelector('.vacancy_page__button_submit').addEventListener('click', function () {
                    if (_this3.validateForm()) {
                        console.log('da');
                        //TODO создание запроса
                    } else {
                        console.log('ne');
                    }
                });
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
/* 6 */
/***/function (module, exports, __webpack_require__) {

    var pug = __webpack_require__(1);

    function template(locals) {
        var pug_html = "",
            pug_mixins = {},
            pug_interp;pug_html = pug_html + '<div class="vacancy_form"><header><h1>\u041D\u043E\u0432\u0430\u044F \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u044F</h1></header><main><section class="sub_form"><h3>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</h3><section class="form__section_three_elements"><label class="input_name">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label><input class="input" name="job-title" type="text"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04301</span></section><section class="form__section_three_elements"><label class="input_name">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</label><textarea class="input" name="description" type="text"></textarea><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04303</span></section><section class="form__section_three_elements"><label class="input_name">\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438</label><input class="input" name="skills" type="text"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04304</span></section><section class="form__section_three_elements"><label class="input_name">\u041F\u0440\u0435\u0434\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0445\u043E\u0434\u0430</label><div class="inputs_wrapper"><div class="payment inputs_wrapper_filling"><input class="input" name="payment-from" type="number"><input class="input" name="payment-to" type="number"><select class="input" name="currency"><option value="rub">\u0440\u0443\u0431.</option><option value="eur">EUR</option><option value="usd">USD</option></select></div><div class="inputs_wrapper_filling radio_buttons_set"><label><input class="input_radio" name="salary_type" type="radio" value="before-taxes">                            \u0414\u043E \u0432\u044B\u043F\u043B\u0430\u0442\u044B \u043D\u0430\u043B\u043E\u0433\u043E\u0432</label><label><input class="input_radio" name="salary_type" type="radio" value="after-taxes">                            \u041D\u0430 \u0440\u0443\u043A\u0438</label></div></div><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04305</span></section></section><section class="sub_form"><h3>\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B</h3><section class="form__section_three_elements"><label class="input_name">\u0412\u0430\u043A\u0430\u043D\u0441\u0438\u044F \u0432 \u0433\u043E\u0440\u043E\u0434\u0435</label><input class="input" name="town" type="text"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04306</span></section><section class="form__section_three_elements"><label class="input_name">\u0410\u0434\u0440\u0435\u0441 \u043E\u0444\u0438\u0441\u0430</label><div class="inputs_wrapper"><label class="inputs_wrapper_filling"><input class="input_checkbox" name="invisible_address" type="checkbox" value="dont-show-addr">                            \u041D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441</label><input class="input inputs_wrapper_filling" name="address" type="text"></div><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section></section><section class="sub_form"><h3>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</h3><section class="form__section_three_elements"><label class="input_name">\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label><div class="inputs-wrapper"><input class="input inputs_wrapper_filling" name="manager" type="text"><label class="inputs_wrapper_filling"><input class="input_checkbox notificate_by_email" name="notification-by-email" type="checkbox">                            \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u044F\u0442\u044C \u043E \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u044F\u0445 \u043F\u043E \u043F\u043E\u0447\u0442\u0435</label></div><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430</span></section><section class="form__section_three_elements"><label class="input_name">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</label><div class="inputs_wrapper"><label class="inputs_wrapper_filling"><input class="input_checkbox" name="invisible_contacts" type="checkbox" value="dont-show-contact">                            \u041D\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0432 \u0432\u0430\u043A\u0430\u043D\u0441\u0438\u0438</label></div><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="form__section_three_elements"><label class="input_name">Email</label><input class="input" name="manager-email" type="email"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="form__section_three_elements"><label class="input_name">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label><input class="input" name="manager-phone" type="tel" pattern="+7-[0-9]{3}-[0-9]{3}-[0-9]{4}"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section><section class="form__section_three_elements"><label class="input_name">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</label><input class="input" name="comment" type="text"><span class="input_description">\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u04307</span></section></section></main><footer><label><input class="input_checkbox save_temp" name="save-temp" type="checkbox" value="save-temp">                \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u0430\u043A \u0448\u0430\u0431\u043B\u043E\u043D</label><br><button class="button vacancy_page__button_submit">\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C</button></footer></div>';;return pug_html;
    };
    module.exports = template;

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
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__resume_page_pug__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__resume_page_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__resume_page_pug__);

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
            key: 'addEventsOn',
            value: function addEventsOn() {}

            // template() {
            //     let vacancyForm = ``
            //     return `<div>РЕЗЮМЕ</div>`;
            // }

        }, {
            key: 'render',
            value: function render() {
                this.createDomBox(this.domName()).innerHTML = __WEBPACK_IMPORTED_MODULE_1__resume_page_pug___default()();
            }
        }]);

        return ResumePage;
    }(__WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */]);
    /* harmony export (immutable) */

    __webpack_exports__["a"] = ResumePage;

    /***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

    var pug = __webpack_require__(1);

    function template(locals) {
        var pug_html = "",
            pug_mixins = {},
            pug_interp;pug_html = pug_html + '<div class="vacancy_form"><header><h1>\u0412\u0430\u0448\u0435 \u0440\u0435\u0437\u044E\u043C\u0435</h1></header><main><section class="section_settings"><div class="summary_preparation_actions"><button class="button load_button">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437 \u0444\u0430\u0439\u043B\u0430</button><button class="button buy_button">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0440\u0435\u0437\u044E\u043C\u0435</button></div><div class="user_summary_actions"><select class="input choose_summary_lang" name="summary_lang"><option name="en" value="en">In English</option><option name="ru" value="ru">\u041F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438</option></select><div class="only_icons_buttons"><button class="button print_button">\u041F\u0435\u0447\u0430\u0442\u044C</button><button class="button delete_summary_button">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button></div></div></section><section class="sub_form"><h3>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</h3><section class="form__section_two_elements"><label class="input_name">\u0418\u043C\u044F</label><input class="input" type="text" name="name"></section><section class="form__section_two_elements"><label class="input_name">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label><input class="input" type="text" name="surname"></section><section class="form__section_two_elements"><label class="input_name">\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D</label><input class="input" type="tel" name="phone" pattern="+7-[0-9]{3}-[0-9]{3}-[0-9]{4}"></section><section class="form__section_two_elements"><label class="input_name">\u0413\u043E\u0440\u043E\u0434 \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u044F</label><input class="input" type="text" name="city"></section></section><section class="sub_form"><h3>\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</h3><section class="form__section_two_elements"><label class="input_name">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F</label><div class="inputs_wrapper"><div class="inputs_wrapper_filling date"><input class="input" type="number" name="day" placeholder="\u0414\u0435\u043D\u044C"><select class="input" name="month"><option>\u041C\u0435\u0441\u044F\u0446</option></select><input class="input" type="number" name="year" placeholder="\u0413\u043E\u0434"></div></div></section><section class="form__section_two_elements"><label class="input_name">\u041F\u043E\u043B</label><div class="inputs_wrapper"><label class="inputs_wrapper_filling"><input class="input_checkbox" name="male" type="radio" value="male">                            \u041C\u0443\u0436\u0441\u043A\u043E\u0439</label><label class="inputs_wrapper_filling"><input class="input_checkbox" name="female" type="radio" value="female">                            \u0416\u0435\u043D\u0441\u043A\u0438\u0439</label></div></section><section class="form__section_two_elements"><label class="input_name">\u0413\u0440\u0430\u0436\u0434\u0430\u043D\u0441\u0442\u0432\u043E</label><div class="inputs_wrapper"><input class="inputs_wrapper_filling input" type="text" name="citizenship"><div class="inputs_wrapper_filling tags_place"><div class="tag"><span class="tag_name">\u0420\u043E\u0441\u0441\u0438\u044F</span><button class="button delete_tag_button">X</button></div></div></div></section><section class="form__section_two_elements"><label class="input_name">\u041E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B</label><div class="inputs_wrapper"><label class="inputs_wrapper_filling"><input class="input_checkbox" name="have" type="radio" value="have">                            \u0415\u0441\u0442\u044C \u043E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B</label><label class="inputs_wrapper_filling"><input class="input_checkbox" name="dont_have" type="radio" value="dont_have">                            \u041D\u0435\u0442 \u043E\u043F\u044B\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u044B</label><div><span>80% \u0440\u0430\u0431\u043E\u0442\u043E\u0434\u0430\u0442\u0435\u043B\u0435\u0439 \u043D\u0435 \u0440\u0430\u0441\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u044E\u0442 \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442\u043E\u0432 \u0431\u0435\u0437 \u043E\u043F\u044B\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u044B.\n\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u043F\u044B\u0442 \u0438\u043B\u0438 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u044C \u043F\u043E\u0447\u0435\u043C\u0443 \u0435\u0433\u043E \u043D\u0435\u0442,\n\u0432\u044B\u0431\u0440\u0430\u0432 \u043F\u0440\u0438\u0447\u0438\u043D\u0443 \u0438\u0437 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u0438\u043B\u0438 \u043E\u043F\u0438\u0441\u0430\u0432 \u0441\u0432\u043E\u044E.</span><textarea class="input" name="no_exp_explanation"></textarea></div></div></section></section><section class="sub_form"><h3>\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C</h3>                ***</section><section class="sub_form"><h3>\u0414\u0440\u0443\u0433\u0430\u044F \u0432\u0430\u0436\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</h3>                ***</section></main><footer><button class="button from__button_submit">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C</button></footer></div>';;return pug_html;
    };
    module.exports = template;

    /***/
}]
/******/);