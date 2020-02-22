/**
 *
 * @param {string} url - url to fetch
 * @param {Page} WrappedComponent - Component to wrap
 * @param {string} propName - key to store response in Component.props[key]
 * @param {Object} defaultProps - default value - used before response is received (Optimistic update)
 * @returns {Page} - Wrapped Component
 */
import {validateString} from "./index";

const withNetwork = (url, WrappedComponent, propName="fetched", defaultProps = {}) => {
    validateString(url, "url", true);
    validateString(propName, "propName", true);
    if(!WrappedComponent.isPageComponent) {
        throw new Error(`
        Expected Page Component as WrappedComponent
        `)
    }
    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            this.props[propName] = defaultProps;

            fetch(url)
                .then(r => r.json())
                .then(json => {
                    this.props[propName] = json;
                    if (!this.domBox.hidden)
                        this.requestRender()
                })
                .catch(console.err);
        }
    }
};

export {
    withNetwork
}