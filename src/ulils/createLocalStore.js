/**
 *
 * @param store
 * @param useLocalStorage
 * @param key
 * @param initFromLocalStore
 * @returns {function(*): {new(any): {storeId}, prototype: {storeId}}}
 */
export const createLocalStore = (store,
    useLocalStorage = false, key = '', initFromLocalStore = false) => (
  (WrappedComponent) => {
    return class extends WrappedComponent {
      /**
       * append store to object
       * @param {any} props
       */
      constructor(props) {
        super(props);

        const keyToUse = typeof key === 'function' ? key() : key;
        if (initFromLocalStore && keyToUse !== '') {
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          }
        }
        this.props.getStore = () => store;
        this.props.setStore = (s, cb) => {
          const keyToUse = typeof key === 'function' ? key() : key;
          if (typeof s === 'object') {
            store = {...store, ...s};
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
            cb?.();
            return;
          }
          if (typeof s === 'function') {
            store = {...store, ...s({...store})};
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
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
