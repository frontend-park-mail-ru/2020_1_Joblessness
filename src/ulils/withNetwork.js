import {validateFunction, validateString} from './validators';

/**
 *
 * @param {string} url - url to fetch
 * @param {function} prepareRequestBody - request body to send
 * @param {Page} WrappedComponent - Component to wrap
 * @param {string} propName - key to store response in Component.props[key]
 * @param {Object} defaultProps - default value -
 * used before response is received (Optimistic update)
 * @return {Page} - Wrapped Component
 */
const withNetwork = (url, prepareRequestBody = () => ({}), WrappedComponent,
    propName='fetched', defaultProps = {}) => {
  validateString(url, 'url', true);
  validateString(propName, 'propName', true);
  validateFunction(prepareRequestBody, prepareRequestBody, true);
  if (!WrappedComponent.isPageComponent) {
    throw new Error(`
        Expected Page Component as WrappedComponent
        `);
  }
  return class extends WrappedComponent {
    /**
       * fetch on creation. Draw after response.
       * @param {any}args - constructor args
       */
    constructor(...args) {
      super(...args);
      this.props[propName] = defaultProps;

      fetch(url, prepareRequestBody(this))
          .then((r) => r.json())
          .then((json) => {
            this.props[propName] = json;
            if (!this.isHidden()) {
              this.requestRender();
            }
          })
          .catch(console.err);
    }
  };
};

export {
  withNetwork,
};
