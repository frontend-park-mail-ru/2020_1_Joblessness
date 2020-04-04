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
      #initial;
      constructor(props) {
        super(props);
        this.#initial = {...store};
        const keyToUse = typeof key === 'function' ? key() : key;
        if (initFromLocalStore && keyToUse !== '') {
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          }
        }
        this.props.getStore = () => store;
        this.props.reloadStore = () => {
          const keyToUse = typeof key === 'function' ? key() : key;
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          } else {
            store = {...this.#initial};
          }
        }
        this.props.setStore = (s, cb) => {
          const keyToUse = typeof key === 'function' ? key() : key;
          if (typeof s === 'object') {
            store = {...store, ...s};
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
            cb?.(store);
            return;
          }
          if (typeof s === 'function') {
            store = {...store, ...s({...store})};
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
            cb?.(store);
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
