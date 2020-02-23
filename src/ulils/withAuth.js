import {Page} from "../Page";

export const withAuth = (WcUnAuth, WcAuth) => {

    return class extends Page {
        #authenticated;
        #unauthenticated;
        constructor(...args) {
            super(...args);
            this.#authenticated = new WcAuth(...args)
            this.#unauthenticated = new WcUnAuth(...args)
        }

        get container() {
            return window.isAuthenticated ?
                this.#authenticated.container :
                this.#unauthenticated.container
        }

        requestRender() {
            // super.requestRender();
            if(window.isAuthenticated) {
                this.#authenticated.props = {
                    ...this.#authenticated.props,
                    ...this.props
                };
                this.#authenticated.requestRender();
            } else {
                this.#unauthenticated.props = {
                    ...this.#unauthenticated.props,
                    ...this.props
                };
                // this.#unauthenticated.props = this.props;
                this.#unauthenticated.requestRender();
            }
        }

        render() {
            return window.isAuthenticated ?
                this.#authenticated.render() :
                this.#unauthenticated.render();
        }

        isHidden() {
            window.isAuthenticated ?
                this.#authenticated.isHidden() :
                this.#unauthenticated.isHidden();
        }
        hidePage() {
            this.#authenticated.hidePage();
            this.#unauthenticated.hidePage();
        }
        showPage() {
            if (this.isHidden()) {
                window.isAuthenticated ?
                    this.#authenticated.showPage() :
                    this.#unauthenticated.showPage();
            }
        }

    }
};