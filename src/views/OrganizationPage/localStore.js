import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  mainInfo: {
    preview : [],
    raw: [],
  }
}, true, 'organizations', true);

export default withLocalStore;
export {
  withLocalStore,
};
