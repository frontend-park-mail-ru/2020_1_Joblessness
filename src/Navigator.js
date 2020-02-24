'use strict';

/**
 * Navigator
 * Осуществляет переключение между страницами
 * На вход получает объект routes,
 * в котором ключем является data-page элемента,
 * а значением - название конструктора страницы, находящейся в BUS
 */
class Navigator {
  /**
   * Переключает страницы
   * @param {object} routes - allowed pages and 404 page
   */
  constructor(routes = {}) {
    this.addNavEvents();
    if (typeof routes !== 'object' || routes === null) {
      throw new Error(`
            Expected object as field routes. Received ${routes}!`);
    }
    this.routes = routes;
  }

  /**
   * hide all pages appended to container
   * @param {string}container
   */
  hideAll(container) {
    // Parse based on type of container
    if (!container) {
      Object
          .keys(this.routes)
          .forEach((p) => p[0]!== '_' && this.routes[p].hidePage());
    } else {
      Object
          .keys(this.routes)
          .filter((p) => this.routes[p].container === container)
          .forEach((p) => this.routes[p].hidePage());
    }
  }

  /**
     * Open requested page in navigator
     * @public
     * @param {string} path
     */
  showPage(path) {
    // Hide all pages
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
            window.history.replaceState({}, '', '/404');
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

  /**
   *
   */
  updateAllPages() {
    Object
        .keys(this.routes)
        .forEach( (k) => {
          if (!this.routes[k].isHidden()) {
            console.log(k);
            this.routes[k].requestRender();
          }
          // !this.routes[k].isHidden() && this.routes[k].requestRender();
        });
  }
  /**
   * add new routes to this.routes
   * @param {object} newRoutes
   */
  addRoutes(newRoutes) {
    // @TODO validation
    this.routes = {
      ...this.routes,
      ...newRoutes,
    };
  }
}

Navigator = new Navigator();

export {
  Navigator,
};
