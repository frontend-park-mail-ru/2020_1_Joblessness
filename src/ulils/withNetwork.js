import {validateFunction, validateString} from './validators';

/**
 *
 * @param {string} url - url to fetch
 * @param {function} prepareRequestBody - request body to send
 * @param {Page} WrappedComponent - Component to wrap
 * @param {string} propName - key to store response in Component.props[key]
 * @param {Object} defaultProps - default value -
 * @param {function} parseResponse - prepare props from response
 * used before response is received (Optimistic update)
 * @return {Page} - Wrapped Component
 */
const withNetwork = (url, prepareRequestBody = () => ({}), WrappedComponent,
    propName='fetched', defaultProps = {},
    parseResponse = async (r) => r.json()) => {
  validateString(url, 'url', true);
  validateString(propName, 'propName', true);
  validateFunction(prepareRequestBody, prepareRequestBody, true);
  if (!WrappedComponent.isPageComponent) {
    throw new Error(`
        Expected Page Component as WrappedComponent
        `);
  }
  // eslint-disable-next-line
  return class extends WrappedComponent {
    #wasSent;
    /**
       * fetch on creation. Draw after response.
       * @param {any}args - constructor args
       */
    constructor(...args) {
      super(...args);
      this.props[propName] = defaultProps;
      this.#wasSent = false;
    }
    componentWillMount = () => {
      if (!this.#wasSent) {
        fetch(url, prepareRequestBody(this))
            .then(async (r) => {
              const res = await parseResponse(r);
              this.props[propName] = res;
              if (!this.isHidden()) {
                this.requestRender();
              }
              this.#wasSent = true;
            })
            .catch(console.err);
      }
    }
  };
};

export {
  withNetwork,
};
