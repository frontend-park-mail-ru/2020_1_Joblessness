import {validateFunction, validateString} from './validators';
import {Navigator} from '../Navigator';
import {request} from '../ulils'
/**
 * sends request on server before rendering and updates component after
 * response is received
 * @param {string|function} url - url to fetch
 * @param {function} prepareRequestBody - request body to send
 * @param {Page} WrappedComponent - Component to wrap
 * @param {string} propName - key to store response in Component.props[key]
 * @param {Object} defaultProps - default value -
 * @param {function} parseResponse - prepare props from response
 * used before response is received (Optimistic update)
 * @return {Page} - Wrapped Component
 */
const withNetwork = (url, prepareRequestBody = async () => ({}),
    WrappedComponent, propName='fetched', defaultProps = {},
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
    componentWillMount = async () => {
      const realUrl = typeof url === 'function' ? await url() : url;
      // console.log('will!!');
      const headers = await prepareRequestBody(this);
      request.get(realUrl, headers)
          .then(async (r) => {
            const res = await parseResponse(r);
            if ( res !== null ) {
              this.props[propName] = res;
              if (!this.isHidden()) {
                Navigator.showPage(location.pathname)
              }
            }
          })
          .catch(console.err);
      super.componentWillMount && super.componentWillMount()
    }
  };
};

export {
  withNetwork,
};
