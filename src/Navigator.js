"use strict";

import {getBus} from "./ulils/getBus";
import {validateString} from './ulils';
import {hideAll} from "./ulils/showPage";

/**
 * Navigator
 * @class
 * Осуществляет переключение между страницами
 * На вход получает объект routes,
 * в котором ключем является data-page элемента,
 * а значением - название конструктора страницы, находящейся в BUS
 */
class Navigator {
    /**
     * Все страницы создаются здесь и помещаются в глобальный объект Bus
     */
    constructor(routes = {}) {
        this.addNavEvents();
        if( typeof routes !== 'object' || routes === null ) {
            throw new Error(`
            Expected object as field routes. Received ${routes}!`)
        }
        this.routes = routes
    }

    /**
     * Open requested page in navigator
     * @public
     * @param {string} pageName
     */
    showPage = (pageName) => {
        hideAll();
        if (typeof this.routes[pageName] === 'string') {
            if (!getBus || !getBus().pagesOnScreen) {
                throw new Error(`
                Unable to get BUS. Report bug at https://github.com/frontend-park-mail-ru/2020_1_Joblessness`);
            }
            getBus().pagesOnScreen?.[this.routes[pageName]]?.requestRender();
            window.history.replaceState({}, '', '/' + pageName);
        } else {
            getBus().pagesOnScreen?.NotFoundPage?.requestRender();
            window.history.replaceState({}, '', "/404");
            //@TODO Are there any cases when we should throw this error?
            // throw new Error(`
            // Unable to find ${pageName} in routes.
            // You must have forgotten to add it to Application Routes!`);
        }
    };

    // имя класса самого элемента
    /**
     * @deprecated
     * Navigator на данный момент не привязывается к элементу на странице.
     */
    // domName() {
    //     return 'nav-bar'
    // }

    /**
     * Обработка нажатий на все ссылки с целью перехода на другую страницу
     */
    addNavEvents() {
        document.body.addEventListener('click', (e) => {
            const {target} = e;

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();
                this.showPage(target.dataset.page);
            }
        });
    }
}


/**
 * Automatically adds pages to BUS and creates navigator with desired pages.
 * Useful shortcut.
 * @param {Page} pages - Page components to be shown
 * @param {Object} routes - Page components to be displayed at
 * @param {string} container - dom element id to insert elements
 * @returns {Navigator}
 */
const withBus = (pages, routes, container) => {
    //@TODO убрать привязку к BUS.
    validateString(container, "container", true);
    let pagesToShow = {};
    for (let page of Object.keys(pages)) {
        if(!pages[page].isPageComponent) {
            throw new Error(`
            Expected Page Component as value in route ${page}. Received ${pages[pages]}`)
        }
        pagesToShow[page] = new pages[page](container)
    }

    getBus().pagesOnScreen = {
        ...getBus().pagesOnScreen,
        ...pagesToShow,
    };
    return new Navigator(routes)
};
export {
    withBus,
    Navigator,
}