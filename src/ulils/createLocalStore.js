/**
 * sharable object between several pages
 * @param {object} store
 * @return {Page}
 */
export const createLocalStore = (store,
                                 useLocalStorage = false, key = '', initFromLocalStore = false) => (
  (WrappedComponent) => {
    return class extends WrappedComponent {
      #storeId;
      /**
       * append store to object
       * @param {any} props
       */
      constructor(props) {
        super(props);
        if(initFromLocalStore && key !== '') {
          const newStore = window.localStorage.getItem(key);
          if(newStore) {
            store = JSON.parse(newStore);
          }
        }
        this.props.getStore = () => store;
        this.props.setStore = (s, cb) => {
          if (typeof s === 'object') {
            store = {...store, ...s};
            if(useLocalStorage)
              window.localStorage.setItem(key, JSON.stringify(store));
            cb?.();
            return;
          }
          if (typeof s === 'function') {
            store = {...store, ...s({...store})};
            if(useLocalStorage)
              window.localStorage.setItem(key, JSON.stringify(store));
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
