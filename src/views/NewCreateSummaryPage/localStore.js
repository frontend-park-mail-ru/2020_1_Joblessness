import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  experience: [],
  education: [],
  keywords: '',
});

export default withLocalStore;
export {
  withLocalStore,
};
