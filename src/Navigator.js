"use strict";

/**
 * Navigator
 * @class
 * @singleton
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
        if (typeof routes !== 'object' || routes === null) {
            throw new Error(`
            Expected object as field routes. Received ${routes}!`)
        }
        this.routes = routes
    }

    hideAll(container) {
        if (!container) {
            Object
                .keys(this.routes)
                .forEach(p => this.routes[p].hidePage())
        } else {
            Object
                .keys(this.routes)
                .filter(p => this.routes[p].container === container)
                .forEach(p => this.routes[p].hidePage())
        }
    }

    /**
     * Open requested page in navigator
     * @public
     * @param {string} path
     */
    showPage = (path) => {
        //Hide all pages
        //@TODO should hide only pages appended to specific container
        if (this.routes[path]) {
            const page = this.routes[path];
            if (page) {
                this.hideAll(page.container);
                this.routes[path]?.requestRender();
                window.history.replaceState({}, '', '/' + path);
            }
        } else {
            this.hideAll();
            this.routes['404']?.requestRender();
            window.history.replaceState({}, '', "/404");
        }
    };

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

    addRoutes(newRoutes) {
        //@TODO validation
        this.routes = {
            ...this.routes,
            ...newRoutes,
        }
    }
}

Navigator = new Navigator();

export {
    Navigator,
}