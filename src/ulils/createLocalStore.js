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
        this.#initial = Object.assign({}, store);
        const keyToUse = typeof key === 'function' ? key() : key;
        if (initFromLocalStore && keyToUse !== '') {
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          }
        }
        this.props.getStore = () => store;
        this.props.resetStore = () => {
          store = Object.assign({}, this.#initial);
        };
        this.props.reloadStore = () => {
          const keyToUse = typeof key === 'function' ? key() : key;
          const newStore = window.localStorage.getItem(keyToUse);
          if (newStore) {
            store = JSON.parse(newStore);
          } else {
            store = Object.assign({}, this.#initial);
          }
        };
        this.props.setStore = (s, cb) => {
          const keyToUse = typeof key === 'function' ? key() : key;
          if (typeof s === 'object') {
            const oldStore = Object.assign({}, store);
            store = Object.assign({},{...store, ...s});
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
            const oldStore = Object.assign({}, store);
            store = Object.assign({}, {...store, ...s({...store})});
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

function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {});
  }
}
