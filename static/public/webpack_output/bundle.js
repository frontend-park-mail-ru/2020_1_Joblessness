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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__ = __webpack_require__(5);






class Navigator {
    constructor() {
        this.vacancyPage = new __WEBPACK_IMPORTED_MODULE_1__views_vacancy_page_VacancyPage_js__["a" /* default */]();
        this.resumePage = new __WEBPACK_IMPORTED_MODULE_2__views_resume_page_ResumePage_js__["a" /* default */]();

        this.render();

        this.addNavEvents();
    }

    parentDom() {
        return '#app-box';
    }

    domName() {
        return 'nav-bar'
    }

    htmlTemplate() {
        return `
            <button class="nav-btn to-page-${this.vacancyPage.name('en')}">${this.vacancyPage.name('ru')}</button>
            <button class="nav-btn to-page-${this.resumePage.name('en')}">${this.resumePage.name('ru')}</button>
        `;
    }

    render() {
        let domBox = document.createElement("div");
        domBox.className = `${this.domName()}`;
        document.querySelector("#app-box").appendChild(domBox);
        domBox.innerHTML = this.htmlTemplate();
    }

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

    template() { // заменить на pug
        return `<div>ВАКАНСИИ</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VacancyPage;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__ = __webpack_require__(0);




class ResumePage extends __WEBPACK_IMPORTED_MODULE_0__modules_Page_js__["a" /* default */] {
    constructor() {
        super();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'resume'
        } else if (lang === 'ru') {
            return 'резюме'
        }
    }

    template() {
        return `<div>РЕЗЮМЕ</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ResumePage;


/***/ })
/******/ ]);