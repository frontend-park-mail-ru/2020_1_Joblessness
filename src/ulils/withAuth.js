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
          this.#authenticated = new WcAuth(this.dom);
          this.#authenticated.requestRender = () => {
            this.requestRender();
          };
          this.#authenticated.isHidden = () => this.isHidden();

          this.#unauthenticated = new WcUnAuth(this.dom);
          this.#unauthenticated.requestRender = () => {
            this.requestRender();
          };
          this.#unauthenticated.isHidden = () => this.isHidden();
        }

        /**
     *
     */
        requestRender() {
          const page = window.isAuthenticated ? this.#authenticated :
            this.#unauthenticated;
          if (typeof page.render !== 'function') {
            throw new Error(`
            Method render is reserved by Page Component and
            must be overwritten by function with return
            value of type string!`);
          }
          page.componentWillMount &&
            page.componentWillMount();
          const toShow = page.render();

          if (toShow) {
            this.dom.innerHTML = toShow;
          } else {
            console.error(`
            Render function must return string.
            Setting innerHTML is not supported anymore!`);
          }

          this.showPage();
          page.componentDidMount &&
            page.componentDidMount();
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
  };
};
