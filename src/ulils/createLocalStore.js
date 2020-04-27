/**
 *
 * @param store
 * @param useLocalStorage
 * @param key
 * @param initFromLocalStore
 * @param globalReducers
 * @returns {function(*): {new(any): {storeId}, prototype: {storeId}}}
 */
export const createLocalStore = (store,
                                 useLocalStorage = false, key = '', initFromLocalStore = false, globalReducers = {}) => (
  (WrappedComponent, reducers = {}) => {
    return class extends WrappedComponent {
      /**
       * append store to object
       * @param {any} props
       */
      #initial;
      constructor(props) {
        super(props);
        const newReducers = {};
        for(let r of Object.entries(reducers)) {
          newReducers[r[0]] = (oldS, newS) => r[1](this, oldS, newS);
        }
        globalReducers = {...globalReducers, ...newReducers};
        this.#initial = clone(store);
        const keyToUse = typeof key === 'function' ? key() : key;
        if (initFromLocalStore && keyToUse !== '') {
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          }
        }
        this.props.getStore = () => store;
        this.props.resetStore = () => {
          store = clone(this.#initial);
        };
        this.props.reloadStore = () => {
          const keyToUse = typeof key === 'function' ? key() : key;
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          } else {
            store = clone(this.#initial);
          }
        };
        this.props.setStore = (s, cb) => {
          const keyToUse = typeof key === 'function' ? key() : key;
          if (typeof s === 'object') {
            const oldStore = clone(store)
            store = clone({...store, ...s});
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
            for(let r of Object.entries(globalReducers)) {
              r[1](oldStore, store);
            }
            cb?.(store);
            return;
          }
          if (typeof s === 'function') {
            const oldStore = clone(store);
            store = clone({...store, ...s({...store})});
            if (useLocalStorage) {
              window.localStorage.setItem(keyToUse, JSON.stringify(store));
            }
            for(let r of Object.entries(globalReducers)) {
              r[1](oldStore, store);
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

const clone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {
    return {...obj};
  }
}