'use strict';

/**
 * Navigator
 * Осуществляет переключение между страницами
 * На вход получает объект routes,
 * в котором ключем является data-page элемента,
 * а значением - название конструктора страницы, находящейся в BUS
 */
class Navigator {
  #routes;
  #dynamicRoutes;

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
    this.#routes = {};
    this.#dynamicRoutes = {};
    this.addRoutes(routes);
  }

  /**
   * hide all pages appended to container
   * @param {string}container
   */
  hideAll(container) {
    // Parse based on type of container
    const allRoutes = {
      ...this.#routes,
      ...this.#dynamicRoutes,
    };
    if (!container) {
      Object
        .keys(allRoutes)
        .forEach((p) => p[0] !== '_' && allRoutes[p].hidePage());
    } else {
      Object
        .keys(allRoutes)
        .filter((p) => allRoutes[p].container === container)
        .forEach((p) => allRoutes[p].hidePage());
    }
  }

  /**
   * Open requested page in navigator
   * @public
   * @param {string} path
   */
  showPage(path) {
    // Hide all pages
    if (this.#routes[path]) {
      const page = this.#routes[path];// check static paths
      if (page) {
        window.history.pushState({}, '', '/' + path);
        this.hideAll(page.container);
        let p = this.#routes[path];
        if(p.parent)
          this.#routes[p.parent]?.requestRender();
        this.#routes[path]?.requestRender();
      }
    } else {
      for (const r of Object.keys(this.#dynamicRoutes)) {
        if (new RegExp(r).test(path)) {
          window.history.pushState({}, '', '/' + path);
          this.hideAll(this.#dynamicRoutes[r].container);
          this.#dynamicRoutes[r]?.requestRender();
          return;
        }
      }
      window.history.pushState({}, '', '/404');
      this.hideAll();
      this.#routes['404']?.requestRender();
    }
  };

  /**
   * Обработка нажатий на все ссылки с целью перехода на другую страницу
   */
  addNavEvents() {
    window.onpopstate = (e) => {
      console.log(window.location.pathname);
      const path = window.location.pathname.replace('/', '');
      // Hide all pages
      if (this.#routes[path]) {
        const page = this.#routes[path];// check static paths
        if (page) {
          this.hideAll(page.container);
          const p = this.#routes[path];
          //@TODO change input format to perform more complex updates
          if(p.parent)
            this.#routes[p.parent]?.requestRender();
          this.#routes[path]?.requestRender();
        }
      } else {
        for (const r of Object.keys(this.#dynamicRoutes)) {
          if (new RegExp(r).test(path)) {
            this.hideAll(this.#dynamicRoutes[r].container);
            this.#dynamicRoutes[r]?.requestRender();
            return;
          }
        }
        this.hideAll();
        this.#routes['404']?.requestRender();
      }
    };
    window.linkGo = (e) => {
      this.showPage(e);
    };
  }

  /**
   *
   */
  updateAllPages() {
    const allRoutes = {
      ...this.#dynamicRoutes,
      ...this.#routes,
    };
    Object
      .keys(allRoutes)
      .forEach((k) => {
        if (!allRoutes[k].isHidden()) {
          allRoutes[k].requestRender();
        }
      });
  }

  /**
   * add new routes to this.routes
   * @param {object} routes
   */
  addRoutes(routes) {
    const isDynamic = /[?*]/;
    for (const route of Object.keys(routes)) {
      if (isDynamic.test(route)) {
        this.#dynamicRoutes[route] = routes[route];
      } else {
        this.#routes[route] = routes[route];
      }
    }
  }
}

Navigator = new Navigator();

export {
  Navigator,
};
