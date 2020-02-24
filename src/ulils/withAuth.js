import {Page} from '../Page';

/**
 * Auth wrapper
 * @param {Page} WcUnAuth - unauthorised component version
 * @param {Page} WcAuth - authorised component version
 * @return {Page}
 */
export const withAuth = (WcUnAuth, WcAuth) => {
  return class extends Page {
        #authenticated;
        #unauthenticated;

        /**
       * store 2 component versions
       * @param {any} args
       */
        constructor(...args) {
          super(...args);
          // @TODO create on first render
          this.#authenticated = new WcAuth(...args);
          this.#unauthenticated = new WcUnAuth(...args);
        }

        /**
       * check Page docs
       * @return {*}
       */
        get container() {
          return window.isAuthenticated ?
                this.#authenticated.container :
                this.#unauthenticated.container;
        }
        /**
       * check Page docs
       */
        requestRender() {
          // super.requestRender();
          if (window.isAuthenticated) {
            this.#authenticated.props = {
              ...this.#authenticated.props,
              ...this.props,
            };
            this.#authenticated.requestRender();
          } else {
            this.#unauthenticated.props = {
              ...this.#unauthenticated.props,
              ...this.props,
            };
            // this.#unauthenticated.props = this.props;
            this.#unauthenticated.requestRender();
          }
        }
        /**
       * check Page docs
       * @return {string}
       */
        render() {
          return window.isAuthenticated ?
                this.#authenticated.render() :
                this.#unauthenticated.render();
        }
        /**
       * check Page docs
       * @return {bool}
       */
        isHidden() {
          return window.isAuthenticated ?
                this.#authenticated.isHidden() :
                this.#unauthenticated.isHidden();
        }
        /**
       * check Page docs
       */
        hidePage() {
          this.#authenticated.hidePage();
          this.#unauthenticated.hidePage();
        }
        /**
       * check Page docs
       */
        showPage() {
          if (this.isHidden()) {
                window.isAuthenticated ?
                    this.#authenticated.showPage() :
                    this.#unauthenticated.showPage();
          }
        }
  };
};
