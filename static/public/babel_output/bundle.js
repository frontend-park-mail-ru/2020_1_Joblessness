'use strict';

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
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__ = __webpack_require__(5);

    var Navigator = function () {
        function Navigator() {
            _classCallCheck(this, Navigator);

            this.vacancyPage = new __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__["a" /* default */]();
            this.resumePage = new __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__["a" /* default */]();

            this.render();

            this.addNavEvents();
        }

        _createClass(Navigator, [{
            key: 'parentDom',
            value: function parentDom() {
                return '#app-box';
            }
        }, {
            key: 'domName',
            value: function domName() {
                return 'nav-bar';
            }
        }, {
            key: 'htmlTemplate',
            value: function htmlTemplate() {
                return '\n            <button class="nav-btn to-page-' + this.vacancyPage.name('en') + '">' + this.vacancyPage.name('ru') + '</button>\n            <button class="nav-btn to-page-' + this.resumePage.name('en') + '">' + this.resumePage.name('ru') + '</button>\n        ';
            }
        }, {
            key: 'render',
            value: function render() {
                var domBox = document.createElement("div");
                domBox.className = '' + this.domName();
                document.querySelector("#app-box").appendChild(domBox);
                domBox.innerHTML = this.htmlTemplate();
            }
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
            key: 'template',
            value: function template() {
                // заменить на pug
                return '<div>\u0412\u0410\u041A\u0410\u041D\u0421\u0418\u0418</div>';
            }
        }, {
            key: 'render',
            value: function render() {
                this.createDomBox(this.domName()).innerHTML = this.template();
            }
        }]);

        return VacancyPage;
    }(__WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */]);
    /* harmony export (immutable) */

    __webpack_exports__["a"] = VacancyPage;

    /***/
},
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);

    var ResumePage = function (_WEBPACK_IMPORTED_MO2) {
        _inherits(ResumePage, _WEBPACK_IMPORTED_MO2);

        function ResumePage() {
            _classCallCheck(this, ResumePage);

            return _possibleConstructorReturn(this, (ResumePage.__proto__ || Object.getPrototypeOf(ResumePage)).call(this));
        }

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