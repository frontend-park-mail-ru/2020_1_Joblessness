"use strict";

import { getBus } from "./ulils/getBus";
import { validators } from './ulils';
import {hideAll} from "./ulils/showPage";

class Navigator {
    /**
     * Все страницы создаются здесь и помещаются в глобальный объект Bus
     */
    constructor(routes = {}) {
        this.addNavEvents();
        this.routes = routes
    }
    showPage = (pageName) => {
        hideAll();
        if( typeof this.routes[pageName] === 'string' ) {
            if( !getBus || !getBus().pagesOnScreen ) {
                throw new Error(`
                Unable to get BUS. Report bug at https://github.com/frontend-park-mail-ru/2020_1_Joblessness`);
            }
            getBus().pagesOnScreen?.[this.routes[pageName]]?.showPage()
        } else {
            throw new Error(`
            Unable to find ${pageName} in routes. 
            You must have forgotten to add it to Application Routes!`);
        }
    };
    // имя класса самого элемента
    domName() {
        return 'nav-bar'
    }
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



const withBus = (pages, routes, container) => {
    validators.validateString(container, "container", true);
    //@TODO validate pages
    let pagesToShow = {};
    for( let page of Object.keys(pages) ) {
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