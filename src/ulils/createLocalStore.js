/**
 * sharable object between several pages
 * @param {object} store
 * @return {Page}
 */
export const createLocalStore = (store) => (
  (WrappedComponent) => {
    return class extends WrappedComponent {
      /**
       * append store to object
       * @param {any} props
       */
      constructor(props) {
        super(props);
        this.props.getStore = () => store;
        this.props.setStore = (s, cb) => {
          if (typeof s === 'object') {
            store = {...store, ...s};
            cb?.();
            return;
          }
          if (typeof s === 'function') {
            store = {...store, ...s(store)};
            cb?.();
            return;
          }
          throw new Error(`
          Error! 
          Expected function or object as newStoreState, received ${typeof s}!`,
          );
        };
      }
    };
  }
);
