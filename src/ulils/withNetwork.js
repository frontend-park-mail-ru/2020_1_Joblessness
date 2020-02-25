import {validateFunction, validateString} from './validators';

/**
 *
 * @param {string|function} url - url to fetch
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
  validateString(propName, 'propName', true);
  validateFunction(prepareRequestBody, prepareRequestBody, true);
  if (!WrappedComponent.isPageComponent) {
    throw new Error(`
        Expected Page Component as WrappedComponent
        `);
  }
  // eslint-disable-next-line
  return class extends WrappedComponent {
    /**
       * fetch on creation. Draw after response.
       * @param {any}args - constructor args
       */
    constructor(args) {
      super(args);
      this.props[propName] = defaultProps;
    }

    /**
     *
     */
    componentWillMount = () => {
      const realUrl = typeof url === 'function' ? url() : url;
      fetch(realUrl, prepareRequestBody(this))
          .then(async (r) => {
            const res = await parseResponse(r);
            this.props[propName] = res;
            if (!this.isHidden()) {
              // super.requestRender();
              // @TODO fix
              console.log('received', res);
              console.log(super.dom);
            }
          })
          .catch(console.err);
    }
  };
};

export {
  withNetwork,
};
