import {createLocalStore} from '../../ulils';
import {getUserId} from './getUserId';

const withLocalStore = createLocalStore({
  user: {
    avatar: '',
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    tag: '',
  },
  summaries: [],
  mainInfo: {},
}, true, () => `users/${getUserId()}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
