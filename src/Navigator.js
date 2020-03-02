/**
 * Navigator
 * Осуществляет переключение между страницами
 * На вход получает объект routes,
 * в котором ключем является data-page элемента,
 * а значением - название конструктора страницы, находящейся в BUS
 * [{
 *   path: string
 *   element: Page
 *   parent: string
 *   childRoutes: {
 *      path: string
 *      parent: string
 *      childRootes: {
 *        ...
 *      }
 *   }]
 *   or {[path]: Page}
 * }
 */
class Navigator {
  #routes;

  /**
   * Переключает страницы
   * @param {object} routes - allowed pages and 404 page
   */
  constructor(routes = []) {
    this.addNavEvents();
    if (typeof routes !== 'object' || routes === null) {
      throw new Error(`
            Expected object as field routes. Received ${routes}!`);
    }
    this.#routes = [];
    this.addRoutes(routes);
  }

  hideAll(routes) {
    if(routes) {
      for(let route of routes) {
        route.element.hidePage();
        this.hideAll(route.children)
      }
    }
  }

  showChildren(children, path) {
    if(!children)
      return;
    for (let route of children) {
      if (route.path.comp.test(path)) {
        this.hideAll(children);
        route.element.requestRender();
        this.showChildren(route.childRoutes, path.replace(route.path.raw, ''));
        break;
      }
    }
  }
  /**
   * Open requested page in navigator
   * @public
   * @param {string} path
   */
  showPage(path) {
    // Hide all pages
    console.log(path);
    for (let route of this.#routes) {
      if (route.path.comp.test(path)) {
        this.hideAll(this.#routes);
        route.element.requestRender();
        if(path[0] === '/') {
          window.history.pushState({}, '', path);
        } else {
          window.history.pushState({}, '', '/' + path);
        }
        this.showChildren(route.childRoutes, path.replace(route.path.raw, ''));
        break;
      }
    }
  }

  /**
   * Обработка нажатий на все ссылки с целью перехода на другую страницу
   */
  addNavEvents() {
    window.onpopstate = (e) => {
      const pathname = window.location.pathname.replace('/', '');
      // Hide all pages
      let path = '';
      if(pathname[0] === '/') {
        path = pathname.substring(1);
      } else {
        path = pathname;
      }
      console.log(path)
      for (let route of this.#routes) {
        if (route.path.comp.test(path)) {
          this.hideAll(this.#routes);
          route.element.requestRender();
          this.showChildren(route.childRoutes, path.replace(route.path.raw, ''));
          break;
        }
      }
    };
    window.linkGo = (e) => {
      if(e[0] === '/') {
        this.showPage(e);
      }
      else {
        const loc = window.location.pathname.split('/');
        if(loc[loc.length - 1].length === 0) {
          loc.pop();
        }
        loc.pop();
        const l = loc.join('/');
        this.showPage(l.substr(1) + '/' + e)
      }
    };
  }

  /**
   *
   */
  updateAllPages() {
    this.#routes
      .forEach(r => {
          if (r.isHidden()) {
            r.requestRender();
          }
        }
      );
  }

  parseObjectRoute(route) {
    if( route ) {
      const {path, element = null, parent = null, childRoutes = []} = route;

      return {
        element,
        path: {
          comp: new RegExp(path),
          raw: path,
        },
        parent,
        childRoutes: childRoutes.map(c => this.parseObjectRoute(c)).filter(c => c)
      };
    }
    return null
  }

  /**
   * add new routes to this.routes
   * @param {object} routes
   */
  addRoutes(routes) {
    for (const route of routes) {
      if (route instanceof Object) {
        this.#routes.push(this.parseObjectRoute(route));
      }
    }
  }
}

Navigator = new Navigator();

export {
  Navigator,
};
