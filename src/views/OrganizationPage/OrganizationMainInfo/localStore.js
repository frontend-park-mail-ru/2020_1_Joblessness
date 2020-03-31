import {createLocalStore} from '../../../ulils';

const withLocalStore = createLocalStore({
  preview : '',
  raw: [],
}, true, 'organizations', true);

export default withLocalStore;
export {
  withLocalStore,
};
